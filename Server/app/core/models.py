from django.db import models
from django.contrib.auth.models import AbstractBaseUser, \
    BaseUserManager, PermissionsMixin
from django.core.validators import validate_email


class UserManager(BaseUserManager):

    def create_user(self, username, email, password, **extra_fields):
        """Creates a new user"""
        if not username:
            raise ValueError('Users must have a username')
        if not email:
            raise ValueError('Users must have an email-address')
        if not password:
            raise ValueError('Users must have a password')
        validate_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        """Creates and saves a new super user"""

        user = self.create_user(username, email, password,
                                is_superuser=True, is_staff=True,
                                is_verified=True)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """User model supporting emails"""
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    """Assigns usermanager created above to the class"""
    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
