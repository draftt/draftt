from django.test import TestCase
from django.contrib.auth import get_user_model

class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Test creating new user with email successful or not"""
        email = "test@draftt.com"
        password = 'PasswordTest123'
        user = get_user_model().objects.create_user(
            email=email,
            password=password
        )

        self.assertEqual(user.email,email)
        self.assertTrue(user.check_password(password))
    
    def test_new_user_email_normalized(self):
        """Tests if the email is normalized"""
        email = "test@DRAFTT.COM"
        user = get_user_model().objects.create_user(email,"PasswordTest")

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test if error is raised if no email is provided"""
        email = ""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(email,"123")
