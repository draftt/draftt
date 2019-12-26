from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

ACTIVATION_URL = reverse('user:activate')
CREATE_USER_URL = reverse('user:createuser')

def create_user(**params):
    return get_user_model().objects.create_user(**params)


class PublicUserApiTests(TestCase):
    """Test the users API (public) that does not require authentication"""

    def setUp(self):
        self.client = APIClient()
        payload = { 'username': 'testuser',
                    'email': 'test@draftt.com', 
                    'password': 'testpass'
                    }
        self.test_user= create_user(**payload)

    def tearDown(self):
        self.test_user.delete()

    def test_activation_data_returned_on_creation(self):
        """ Test if required activation data is returned on account
            creation"""
        payload = {
            'username': 'newuser',
            'email': 'test@tester.com',
            'password': 'testpass123',
            'fullname': 'Test Name 123'
        }
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertIn('timestamp', res.data)
        self.assertIn('uid', res.data)

    def test_new_user_inactive(self):
        """ Test new user is inactive by default"""
        payload = {
            'username': 'newuser',
            'email': 'test@tester.com',
            'password': 'testpass123',
            'fullname': 'Test Name 123'
        }
        self.client.post(CREATE_USER_URL, payload)

        user = get_user_model().objects.get(username=payload['username'])
        
        self.assertFalse(user.is_active)

    

    