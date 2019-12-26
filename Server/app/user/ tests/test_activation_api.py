from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.core import mail
from rest_framework.test import APIClient
from rest_framework import status

ACTIVATION_URL = reverse('user:activate')
CREATE_USER_URL = reverse('user:createuser')

def create_user(**params):
    return get_user_model().objects.create_user(**params)


class ActivationApiTests(TestCase):
    """Test the users API (public) that does not require authentication"""

    def setUp(self):
        self.client = APIClient()
        self.payload = { 'username': 'testuser',
                    'email': 'test@draftt.com', 
                    'password': 'testpass'
                    }
        self.res = self.client.post(CREATE_USER_URL, self.payload)
        self.user =  get_user_model().objects.get(
            username=self.payload['username'])

    def tearDown(self):
        self.user.delete()

    def test_activation_data_returned_on_creation(self):
        """ Test if required activation data is returned on account
            creation"""

        self.assertIn('timestamp', self.res.data)
        self.assertIn('uid', self.res.data)

    def test_new_user_inactive(self):
        """ Test new user is inactive by default"""        
        self.assertFalse(self.user.is_active)
    
    def test_activation_email_send(self):
        """ Test activation Email sent"""
        self.assertTrue(len(mail.outbox) == 1)
        self.assertIn("Activate", mail.outbox[0].subject)

    # def test_activation_code_expires(self):

    # def test_activate_user(self):
