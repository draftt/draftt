
import json
import logging

from oauthlib.oauth2.rfc6749 import errors
from oauthlib.oauth2.rfc6749.grant_types.base import GrantTypeBase

log = logging.getLogger(__name__)


class ExternalTokenGrant(GrantTypeBase):

    """External token grant
        Grant type to accept and authorize external token requests
        i.e. Google/Facebook Auth Code
    """

    def create_token_response(self, request, token_handler):
        """
        Follows the same routine as password token grant in oauthlib
        """
        headers = self._get_default_headers()

        try:
            if self.request_validator.client_authentication_required(request):
                log.debug('Authenticating client, %r.', request)
                if not self.request_validator.authenticate_client(request):
                    log.debug('Client authentication failed, %r.', request)
                    raise errors.InvalidClientError(request=request)
            elif not self.request_validator.authenticate_client_id(request.client_id, request):
                log.debug('Client authentication failed, %r.', request)
                raise errors.InvalidClientError(request=request)
            log.debug('Validating access token request, %r.', request)
            self.validate_token_request(request)
        except errors.OAuth2Error as e:
            log.debug('Client error in token request, %s.', e)
            headers.update(e.headers)
            return headers, e.json, e.status_code

        token = token_handler.create_token(
            request, self.refresh_token)

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

        for validator in self.custom_validators.pre_token:
            validator(request)

        # Check if the provider and access_code are provided
        for param in ('grant_type', 'provider', 'access_token'):
            if not getattr(request, param, None):
                raise errors.InvalidRequestError(
                    'Request is missing %s parameter.' %
                    param, request=request)

        for param in ('grant_type', 'provider', 'access_token', 'scope'):
            if param in request.duplicate_params:
                raise errors.InvalidRequestError(
                    description='Duplicate %s parameter.' %
                    param, request=request)

        # This error should rarely (if ever) occur if requests are routed to
        # grant type handlers based on the grant_type parameter.
        if not request.grant_type == 'external_token':
            raise errors.UnsupportedGrantTypeError(request=request)

        if not self.request_validator.external_validator(
                request.provider,
                request.access_token,
                request):
            raise errors.InvalidGrantError(
                'Invalid token or provider', request=request)
        else:
            if not hasattr(request.client, 'client_id'):
                raise NotImplementedError(
                    'Validate user must set the '
                    'request.client.client_id attribute '
                    'in authenticate_client.')
        
        log.debug('Authorizing access to user %r.', request.user)

        self.validate_grant_type(request)

        if request.client:
            request.client_id = request.client_id or request.client.client_id
        self.validate_scopes(request)

        for validator in self.custom_validators.post_token:
            validator(request)


