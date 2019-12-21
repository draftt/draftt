from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _
from django.core.validators import validate_email, ValidationError
from core.utils import decode_uid
from django.contrib.auth.tokens import default_token_generator
from core.email import ActivationEmail
from codegen.code_generator import CodeGenerator
User = get_user_model()


def val_email(email):
    try:
        validate_email(email)
        valid_email = True
    except ValidationError:
        valid_email = False
    return valid_email

def email_code(code_type,user):
    # Initiate code generator with the code_type
    codegen = CodeGenerator(code_type)
    # Get the timestamp and code generated
    timestamp,code=codegen.make_token(user).split('-')
    # Pass on the code and user object to email function
    context={"user": user,"token":code}
    ActivationEmail(context=context).send([user.email])
    # Return the timestamp
    return timestamp


class UserSerializer(serializers.ModelSerializer):
    """Serializer for users object"""

    class Meta:
        model = get_user_model()
        timestamp=""
        fields = ('fullname', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        """
        Create a new user with encrypted password and return it
        with the timestamp for activation
        """
        user = get_user_model().objects.create_user(**validated_data)
        
        self.timestamp = email_code(code_type="activation",user=user)
        return user

    def update(self, instance, validated_data):
        """Update a user, set the pwd, and return updated data"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


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
        if username is not None:
            user = authenticate(
                request=self.context.get('request'),
                username=username,
                password=attrs.get("password")
            )
            if user:
                if not user.is_active:
                    msg = _('User account is inactive.')
                    raise serializers.ValidationError(msg)

                attrs['user'] = user
                return attrs
            else:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Account with this email/username does not exists')
            raise serializers.ValidationError(msg, code='authorization')


class UidAndTokenSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    default_error_messages = {
        "invalid_token": "The Token is invalid.",
        "invalid_uid": "No such user exists.",
    }

    def validate(self, attrs):
        validated_data = super().validate(attrs)
        token_generator = default_token_generator
        # uid validation have to be here, because validate_<field_name>
        # doesn't work with modelserializer
        try:
            uid = decode_uid(self.initial_data.get("uid", ""))
            self.user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            key_error = "invalid_uid"
            raise ValidationError(
                {"uid": [self.error_messages[key_error]]}, code=key_error
            )

        is_token_valid = token_generator.check_token(
            self.user, self.initial_data.get("token", "")
        )
        if is_token_valid:
            return validated_data
        else:
            key_error = "invalid_token"
            raise ValidationError(
                {"token": [self.error_messages[key_error]]}, code=key_error
            )


class ActivationSerializer(UidAndTokenSerializer):
    default_error_messages = {
        "stale_token": "User already activated",
    }

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if not self.user.is_active:
            return attrs
        raise serializers.ValidationError(
            "User already active", code='authorization')
