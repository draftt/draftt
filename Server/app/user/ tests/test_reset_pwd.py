from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.core import mail
from rest_framework.test import APIClient
from rest_framework import status
from django.conf import settings
from django.core.mail import outbox
import logging

User = get_user_model()
log = logging.getLogger(__name__)
RESET_PWD_URL = reverse('user:reset_pwd')

def extract_code_from_mail(body):
    possible_codes = [s for s in body.split() if 
                        s.isdigit() and len(s) is settings.CODE_LENGTH]
    if not possible_codes:
        return False
    return possible_codes[0]


class ResetPwdApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.test_user = User.objects.create_user(
            username = 'testuser',
            email = 'test@test.com',
            password = 'supersecretpassword',
            is_active = True
        )
        payload = {
            'email': 'test@test.com'
        }
        self.code_request = self.client.post(RESET_PWD_URL, payload)



    def test_request_code(self):
        """Test request succeeds and check if required stuff is 
        provided"""

        self.assertEqual(self.code_request.status_code, status.HTTP_200_OK)
        self.assertIn('timestamp', self.code_request.data)
        self.assertIn('uid', self.code_request.data)

    def test_email_not_provided(self):
        """Test if gives error when no data is provided"""
        res = self.client.post(RESET_PWD_URL)
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

    def test_code_reset(self):
        """Test reset process"""
        code = extract_code_from_mail(mail.outbox[0].body)
        timestamp = self.code_request.data['timestamp']
        uid = self.code_request.data['uid']
        code = timestamp+ '-' + code
        reset_payload = {
            'uid': uid,
            'token':code,
            'password': 'newsupersecretpass'
        }
        reset_response = self.client.patch(RESET_PWD_URL, reset_payload)
        self.assertEqual(reset_response.status_code,status.HTTP_204_NO_CONTENT)
        self.test_user = get_user_model().objects.get(pk=self.test_user.pk)   
        self.assertTrue(self.test_user.check_password('newsupersecretpass'))
        