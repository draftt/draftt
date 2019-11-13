from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.validators import ValidationError


class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Test creating new user with email successful or not"""
        username = "test"
        email = "test@draftt.com"
        password = 'PasswordTest123'
        user = get_user_model().objects.create_user(
            username=username,
            email=email,
            password=password
        )

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Tests if the email is normalized"""
        email = "test@draftt.com"
        user = get_user_model().objects.create_user(
            username="tester", email=email, password="PasswordTest")

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test if error is raised if no email is provided"""
        username = "tester"
        with self.assertRaises(ValidationError):
            get_user_model().objects.create_user(
                username, email="invalidemail.com", password="123456789")

    def test_create_new_superuser(self):
        """Test creating a superuser"""
        user = get_user_model().objects.create_superuser(
            username="test",
            email="test@test.com",
            password="password"
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)
