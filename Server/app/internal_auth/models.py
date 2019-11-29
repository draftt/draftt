from oauth2_provider.models import AbstractApplication
from django.utils.translation import ugettext_lazy as _
import logging
log = logging.getLogger(__name__)


class ExtendedApplication(AbstractApplication):
    """
    Extends the Application Model to support external token auth
    for e.g. facebook or google authentication
    """

    GRANT_AUTHORIZATION_CODE = "authorization-code"
    GRANT_IMPLICIT = "implicit"
    GRANT_PASSWORD = "password"
    GRANT_CLIENT_CREDENTIALS = "client-credentials"
    # Adding our new grant-type
    GRANT_EXTERNAL_TOKEN = "external_token"
    GRANT_TYPES = (
        (GRANT_EXTERNAL_TOKEN, _("External")),
        (GRANT_AUTHORIZATION_CODE, _("Authorization code")),
        (GRANT_IMPLICIT, _("Implicit")),
        (GRANT_PASSWORD, _("Resource owner password-based")),
        (GRANT_CLIENT_CREDENTIALS, _("Client credentials")),
    )

    def allows_grant_type(self, *grant_types):
        return (self.authorization_grant_type in grant_types or
                self.GRANT_EXTERNAL_TOKEN in grant_types)
