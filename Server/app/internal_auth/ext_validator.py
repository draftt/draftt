from oauth2_provider.oauth2_validators import OAuth2Validator
from .models import ExtendedApplication
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
