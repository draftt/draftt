from oauth2_provider.oauth2_backends import OAuthLibCore
from oauth2_provider.settings import oauth2_settings
from .external_token_grant import ExternalTokenGrant
from .ext_validator import ExtendedOAuth2Validator
import logging 
log = logging.getLogger(__name__)

class ExtOAuthLibCore(OAuthLibCore):
    def __init__(self, server=None):
        validator = ExtendedOAuth2Validator()
        external_token_grant = ExternalTokenGrant(request_validator=validator)
        super().__init__(server)
        self.server.grant_types['external_token']=external_token_grant