from django.core.management.base import BaseCommand
from app.settings import DEBUG
from django.contrib.auth import get_user_model
from oauth2_provider.models import get_application_model

Application = get_application_model()
User = get_user_model()


class Command(BaseCommand):
    """Django command to pause execution until db is available"""

    def createsuper(self):
        su = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@admin.com",
            password="admin"
        )
        return su

    def createapp(self, superuser):
        form_data = {
            "name": "Test App",
            "client_id": "T001",
            "user": superuser,
            "client_secret": "R2D2",
            "client_type": Application.CLIENT_CONFIDENTIAL,
            "redirect_uris": "http://localhost:8000",
            "authorization_grant_type": Application.GRANT_PASSWORD,
        }
        new_application = Application(**form_data)
        new_application.full_clean()
        new_application.save()
        self.stdout.write(
            self.style.SUCCESS('client_id: T001')
        )
        self.stdout.write(
            self.style.SUCCESS('client_secret: R2D2')
        )

    def handle(self, *args, **options):
        if DEBUG is False:
            return
        self.stdout.write("Running in Debug Mode")
        if Application.objects.count() > 0 or User.objects.count() > 0:
            self.stdout.write('Already test set up.')
            return
        su = self.createsuper()
        self.createapp(su)
        self.stdout.write(self.style.SUCCESS('Test Setup complete.'))
