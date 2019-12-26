
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from oauth2_provider.models import get_application_model
from django.core.management import call_command

LOGIN_URL = reverse('internal_auth:token')
Application = get_application_model()


class PasswordLoginApiTests(TestCase):
    """Test cases for grant_type password login"""

    def setUp(self):
        self.client = APIClient()

        self.test_user = get_user_model().objects.create_user(
            username='testuser',
            email='test@test.com',
            password='testpassword',
            is_active=True)
        self.superuser = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@test.com",
            password="adminpassword"
        )
        self.app = Application.objects.create(
            name="Test Login App",
            user=self.superuser,
            client_type=Application.CLIENT_CONFIDENTIAL,
            authorization_grant_type=Application.GRANT_PASSWORD,
        )

    def tearDown(self):
        self.app.delete()
        self.test_user.delete()
        self.superuser.delete()

    def test_login_with_username(self):
        """Test token creation with username"""

        payload = {'grant_type': 'password',
                   'grant_sub_type': 'username',
                   'username': 'testuser',
                   'password': 'testpassword',
                   'client_id': self.app.client_id,
                   'client_secret': self.app.client_secret}

        res = self.client.post(LOGIN_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_login_with_email(self):
        """Test token creation with username"""

        payload = {'grant_type': 'password',
                   'grant_sub_type': 'email',
                   'email': 'test@test.com',
                   'password': 'testpassword',
                   'client_id': self.app.client_id,
                   'client_secret': self.app.client_secret}

        res = self.client.post(LOGIN_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_no_user(self):
        """Test that token is not created if user doens't exist"""

        payload = {'grant_type': 'password',
                   'grant_sub_type': 'username',
                   'username': 'newtest',
                   'password': 'testpassword',
                   'client_id': self.app.client_id,
                   'client_secret': self.app.client_secret}
        res = self.client.post(LOGIN_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

        payload = {'grant_type': 'password',
                   'grant_sub_type': 'email',
                   'email': 'newtest@email.com',
                   'password': 'testpassword',
                   'client_id': self.app.client_id,
                   'client_secret': self.app.client_secret}
        res = self.client.post(LOGIN_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
