from oauth2_provider.oauth2_backends import OAuthLibCore
from oauth2_provider.settings import oauth2_settings
from .external_token_grant import ExternalTokenGrant
class ExtOAuthLibCore(OAuthLibCore):
    def __init__(self, server=None):
        super().__init__(server)
        self.server.grant_types['external_token']=ExternalTokenGrant