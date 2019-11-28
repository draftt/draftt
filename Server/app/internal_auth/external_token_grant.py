
import json
import logging

from .. import errors, utils
from ..request_validator import RequestValidator
from oauthlib.oauth2.rfc6749.grant_types.base import GrantTypeBase

log = logging.getLogger(__name__)

class ExternalTokenGrant(GrantTypeBase):

    """External token grant
        Grant type to accept and authorize external token requests
        i.e. Google/Facebook Auth Code
    """

    def __init__(self, request_validator=None,
                 issue_new_refresh_tokens=True,
                 **kwargs):
        super().__init__(
            request_validator,
            issue_new_refresh_tokens=issue_new_refresh_tokens,
            **kwargs)

    def create_token_response(self, request, token_handler):
        """Create a new access token from an external token.
        :param request: OAuthlib request.
        :type request: oauthlib.common.Request
        :param token_handler: A token handler instance, for example of type
                              oauthlib.oauth2.BearerToken.
        If valid and authorized, the authorization server issues an access
        token as described . If the request failed verification or is invalid,
        the authorization server returns an error response.
        """
        headers = self._get_default_headers()
        try:
            log.debug('Validating external token request, %r.', request)
            self.validate_token_request(request)
        except errors.OAuth2Error as e:
            log.debug('Client error in token request, %s.', e)
            headers.update(e.headers)
            return headers, e.json, e.status_code

        token = token_handler.create_token(request,
                                           refresh_token=self.issue_new_refresh_tokens)

        for modifier in self._token_modifiers:
            token = modifier(token)

        self.request_validator.save_token(token, request)

        log.debug('Issuing new token to client id %r (%r), %r.',
                  request.client_id, request.client, token)
        return headers, json.dumps(token), 200

    def validate_token_request(self, request):
        """
        :param request: OAuthlib request.
        :type request: oauthlib.common.Request
        """
        if request.grant_type != 'external_token':
            raise errors.UnsupportedGrantTypeError(request=request)

        for validator in self.custom_validators.pre_token:
            validator(request)

        if request.access_code is None:
            raise errors.InvalidRequestError(
                description='Missing access-code parameter.',
                request=request)
        if request.provider is None:
            raise errors.InvalidRequestError(
                description='Missing provider parameter.',
                request=request)

        # Because refresh tokens are typically long-lasting credentials used to
        # request additional access tokens, the refresh token is bound to the
        # client to which it was issued.  If the client type is confidential or
        # the client was issued client credentials (or assigned other
        # authentication requirements), the client MUST authenticate with the
        # authorization server as described in Section 3.2.1.
        # https://tools.ietf.org/html/rfc6749#section-3.2.1
        if self.request_validator.client_authentication_required(request):
            log.debug('Authenticating client, %r.', request)
            if not self.request_validator.authenticate_client(request):
                log.debug('Invalid client (%r), denying access.', request)
                raise errors.InvalidClientError(request=request)
        elif not self.request_validator.authenticate_client_id(request.client_id, request):
            log.debug('Client authentication failed, %r.', request)
            raise errors.InvalidClientError(request=request)

        # Ensure client is authorized use of this grant type
        self.validate_grant_type(request)

        # REQUIRED. The refresh token issued to the client.
        log.debug('Validating refresh token %s for client %r.',
                  request.refresh_token, request.client)
        if not self.request_validator.validate_refresh_token(
                request.refresh_token, request.client, request):
            log.debug('Invalid refresh token, %s, for client %r.',
                      request.refresh_token, request.client)
            raise errors.InvalidGrantError(request=request)

        original_scopes = utils.scope_to_list(
            self.request_validator.get_original_scopes(
                request.refresh_token, request))

        if request.scope:
            request.scopes = utils.scope_to_list(request.scope)
            if (not all(s in original_scopes for s in request.scopes)
                and not self.request_validator.is_within_original_scope(
                    request.scopes, request.refresh_token, request)):
                log.debug('Refresh token %s lack requested scopes, %r.',
                          request.refresh_token, request.scopes)
                raise errors.InvalidScopeError(request=request)
        else:
            request.scopes = original_scopes

        for validator in self.custom_validators.post_token:
            validator(request)