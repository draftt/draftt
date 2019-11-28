from django.db import models
from oauth2_provider.models import AbstractApplication
from django.utils.translation import ugettext_lazy as _

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
    GRANT_EXTERNAL = "external_token"
    GRANT_TYPES = (
        (GRANT_EXTERNAL,_("External")),
        (GRANT_AUTHORIZATION_CODE, _("Authorization code")),
        (GRANT_IMPLICIT, _("Implicit")),
        (GRANT_PASSWORD, _("Resource owner password-based")),
        (GRANT_CLIENT_CREDENTIALS, _("Client credentials")),
    )