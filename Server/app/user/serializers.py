from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _
from django.core.validators import validate_email, ValidationError
import logging
User = get_user_model()

def val_email(email):
    try:
        validate_email(email)
        valid_email = True
    except ValidationError:
        valid_email = False
    return valid_email


class UserSerializer(serializers.ModelSerializer):
    """Serializer for users object"""

    class Meta:
        model = get_user_model()
        fields = ('name','username','email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        return get_user_model().objects.create_user(**validated_data)

class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    username_or_email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""

        username_or_email = attrs.get("username_or_email")
        if (val_email(username_or_email)):
            user = User.objects.get(email=username_or_email)
            username = user.username
        else:
            username = username_or_email
        logging.error("Error",username)
        if username is not None:
                user = authenticate(
                    request = self.context.get('request'),
                    username = username,
                    password = attrs.get("password")
                )
                if user:
                    if not user.is_active:
                        msg = _('User account is disabled.')
                        raise serializers.ValidationError(msg)

                    attrs['user'] = user
                    return attrs
                else:
                    msg = _('Unable to log in with provided credentials.')
                    raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Account with this email/username does not exists')
            raise serializers.ValidationError(msg, code='authorization')