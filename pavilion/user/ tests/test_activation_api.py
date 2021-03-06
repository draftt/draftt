from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.core import mail
from rest_framework.test import APIClient
from rest_framework import status
from django.conf import settings
import logging

log = logging.getLogger(__name__)
VERIFICATION_URL = reverse('user:verify')
CREATE_USER_URL = reverse('user:createuser')


def extract_code_from_mail(body):
    possible_codes = [s for s in body.split() if
                      s.isdigit() and len(s) is settings.CODE_LENGTH]
    if not possible_codes:  # pragma: no cover
        return False
    return possible_codes[0]


class VerificationApiTests(TestCase):
    """Test the users API (public) that does not require authentication"""

    def setUp(self):
        self.client = APIClient()
        self.payload = {'username': 'testuser',
                        'email': 'test@draftt.com',
                        'password': 'testpass'
                        }
        self.res = self.client.post(CREATE_USER_URL, self.payload)

    def test_verification_data_returned_on_creation(self):
        """ Test if required verification data is returned on account
            creation"""

        self.assertIn('timestamp', self.res.data)
        self.assertIn('uid', self.res.data)

    def test_new_user_unverified(self):
        """ Test new user is unverified by default"""
        user = get_user_model().objects.get(
            username=self.payload['username'])
        self.assertFalse(user.is_verified)

    def test_verification_email_send(self):
        """ Test verificationEmail sent"""
        self.assertTrue(len(mail.outbox) == 1)
        self.assertIn("Verify", mail.outbox[0].subject)
        self.assertEqual(mail.outbox[0].to[0], self.payload['email'])
        self.assertTrue(mail.outbox[0].body)

    def test_verify_user(self):
        """Tests the verification link to verify a user"""
        code = extract_code_from_mail(mail.outbox[0].body)
        timestamp = self.res.data['timestamp']
        uid = self.res.data['uid']
        code = timestamp + '-' + code
        verify_payload = {
            'uid': uid,
            'token': code
        }
        act_res = self.client.post(VERIFICATION_URL, verify_payload)
        user = get_user_model().objects.get(
            username=self.payload['username'])
        self.assertEqual(act_res.status_code, status.HTTP_200_OK)
        self.assertTrue(user.is_verified)

    def test_verify_user_fails(self):
        """
        Tests the verification link to verify a
            user fails with wrong code
        """
        code = extract_code_from_mail(mail.outbox[0].body)
        timestamp = self.res.data['timestamp']
        uid = self.res.data['uid']
        code = timestamp + '-' + "123456"
        verify_payload = {
            'uid': uid,
            'token': code
        }
        act_res = self.client.post(VERIFICATION_URL, verify_payload)
        user = get_user_model().objects.get(
            username=self.payload['username'])
        self.assertEqual(act_res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(user.is_verified)

    def test_verify_email_send(self):
        """ Tests if confirmation email is sent after verification"""
        user = get_user_model().objects.get(
            username=self.payload['username'])
        user.is_verified = True
        user.save(update_fields=['is_verified'])

        self.assertTrue(len(mail.outbox) == 2)
        self.assertIn("verified", mail.outbox[1].body)
