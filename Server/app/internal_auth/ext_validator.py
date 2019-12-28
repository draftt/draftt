from oauth2_provider.oauth2_validators import OAuth2Validator
from oauthlib.oauth2.rfc6749 import errors
from .models import ExtendedApplication
from django.urls import reverse
from django_global_request.middleware import get_request
from social_django.views import NAMESPACE
from social_django.utils import load_backend, load_strategy
from social_core.exceptions import MissingBackend
from social_core.utils import requests
import logging
log = logging.getLogger(__name__)

EXT_GRANT_TYPE_MAPPING = {
    "authorization_code": (ExtendedApplication.GRANT_AUTHORIZATION_CODE, ),
    "password": (ExtendedApplication.GRANT_PASSWORD, ),
    "external_token": (ExtendedApplication.GRANT_EXTERNAL_TOKEN, ),
    "client_credentials": (ExtendedApplication.GRANT_CLIENT_CREDENTIALS, ),
    "refresh_token": (
        ExtendedApplication.GRANT_AUTHORIZATION_CODE,
        ExtendedApplication.GRANT_PASSWORD,
        ExtendedApplication.GRANT_CLIENT_CREDENTIALS,
    )
}


class ExtendedOAuth2Validator(OAuth2Validator):
    """ Extension to the default OAuth2Validator
        to include external-token grant type
    """

    def validate_grant_type(
            self,
            client_id,
            grant_type,
            client,
            request,
            *args,
            **kwargs):
        """
        Validate both grant_type is a valid string and
        grant_type is allowed for current workflow
        """
        assert(grant_type in EXT_GRANT_TYPE_MAPPING)
        return request.client.allows_grant_type(
            *EXT_GRANT_TYPE_MAPPING[grant_type])

    def external_validator(self, provider, access_code, request):
        """
        Calls the social backend to validate the access_code and get information
        """
        strategy = load_strategy(request=get_request())
        log.debug('Loading provider backend %s.', request.provider)
        try:
            backend = load_backend(
                strategy, provider, reverse(
                    "%s:complete" %
                    NAMESPACE, args=(
                        provider,)))
        except MissingBackend:
            raise errors.InvalidRequestError(
                description='Invalid provider given',
                request=request)
        log.debug(
            'Dispatching authentication to provider %s.',
            request.provider)
        try:
            user = backend.do_auth(access_token=request.access_token)
        except requests.HTTPError as e:
            raise errors.InvalidRequestError(
                description="Backend responded with HTTP{0}: {1}.".format(
                    e.response.status_code, e.response.text), request=request)

        if not user:
            raise errors.InvalidGrantError(
                'Invalid access-code', request=request)
        if not user.is_active:
            raise errors.InvalidGrantError('User inactive', request=request)
        request.user = user
        return True