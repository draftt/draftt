from django.db import models
from django.contrib.auth.models import AbstractBaseUser, \
    BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):

    def create_user(self, username, password=None, **extra_fields):
        """Creates a new user"""
        if not username:
            raise ValueError('Users must have an email address')
        user = self.model(username= username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, password):
        """Creates and saves a new super user"""

        user = self.create_user(username, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user




class User(AbstractBaseUser, PermissionsMixin):
    """User model supporting emails"""
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, unique= True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    """Assigns usermanager created above to the class"""
    objects = UserManager()

    USERNAME_FIELD = 'username'
