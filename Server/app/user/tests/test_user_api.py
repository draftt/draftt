from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient

from rest_framework import status

CREATE_USER_URL = reverse('user:create')
LOGIN_URL = reverse('user:login')
ACCOUNT_URL = reverse('user:account')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class PublicUserApiTests(TestCase):
    """Test the users API (public) that does not require authentication"""

    def setUp(self):
        self.client = APIClient()
    # User Creation Tests #

    def test_create_valid_user_success(self):
        """Test creating user with valid payload is successful"""
        payload = {
            'username': 'testuser',
            'email': 'test@draftt.com',
            'password': 'testpass123',
            'name': 'Test Name'
        }
        res = self.client.post(CREATE_USER_URL, payload)
        """Check if user is created"""
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        user = get_user_model().objects.get(**res.data)
        """Check if password is set properly"""
        self.assertTrue(user.check_password(payload['password']))
        """Check password not returned"""
        self.assertNotIn('password', res.data)

    def test_user_exists(self):
        """Test creating user that already exists fails"""
        payload = {'username': 'testuser',
                   'email': 'test@draftt.com', 'password': 'testpass'}
        create_user(**payload)

        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short(self):
        """Test minimum password length > 5"""
        payload = {'username': 'testuser',
                   'email': 'test@draftt.com', 'password': 'pass'}
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = get_user_model().objects.filter(
            username=payload['username']
        ).exists()
        self.assertFalse(user_exists)

    #############################
    # Create Auth Token Tests   #

    def test_create_token_for_user(self):
        """Test that a token is created for the user"""
        create_user(username="userfortest",
                    email="testuser@draftt.com", password="testpassword")

        payload = {'username_or_email': "userfortest",
                   'password': 'testpassword'}
        res = self.client.post(LOGIN_URL, payload)

        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_invalid_credentials(self):
        """Test that token is not created if """
        """invalid credentials are provided"""
        create_user(username='test', email="test@draftt.com",
                    password='testpass')
        payload = {'username': 'test',
                   'password': 'nottherightpassword'}
        res = self.client.post(LOGIN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_no_user(self):
        """Test that token is not created if user doens't exist"""
        payload = {'username_or_email': 'testuser', 'password': 'testpassword'}
        res = self.client.post(LOGIN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_missing_field(self):
        """Test that email/username and password are required"""
        payload = {'username_or_email': 'testuser', 'password': 'testpassword'}
        res = self.client.post(LOGIN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_user_unauthoried(self):
        """Test that authentication is required for user"""
        res = self.client.get(ACCOUNT_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserApiTests(TestCase):
    """Test API that requires authentication"""

    def setUp(self):
        self.user = create_user(
            name="Test User",
            username="testuser",
            email="test@draftt.com",
            password="testingpassword",
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_profile_success(self):
        """Test retrieving account data for logged in user"""
        res = self.client.get(ACCOUNT_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {
            'name': self.user.name,
            'username': self.user.username,
            'email': self.user.email,
        })

    def test_post_account_unallows(self):
        """Test that POST request is unallowed on the account page"""
        res = self.client.post(ACCOUNT_URL, {})

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_user_account(self):
        """Tests updating the account infor for authenticated users"""
        payload = {
            'name': 'newusername',
            'password': 'newpassword123',
            'email': 'newtestemail@gmail.com',
            'username': 'newusername'
        }
        res = self.client.patch(ACCOUNT_URL, payload)

        self.user.refresh_from_db()
        self.assertEqual(self.user.name, payload['name'])
        self.assertEqual(self.user.username, payload['username'])
        self.assertEqual(self.user.email, payload['email'])
        self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
