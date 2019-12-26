from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse('user:activate')


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

    
    

    