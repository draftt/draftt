from rest_framework import serializers
from django.contrib.auth import get_user_model
from core.utils import decode_uid
from django.core.validators import ValidationError
from codegen.code_generator import CodeGenerator
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Serializer for users object"""

    class Meta:
        model = get_user_model()
        fields = ('fullname', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        """
        Create a new user with encrypted password and return it
        with the timestamp for verification
        """
        user = get_user_model().objects.create_user(**validated_data)

        return user

    def update(self, instance, validated_data):
        """Update a user, set the pwd, and return updated data"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class UidAndTokenSerializer(serializers.Serializer):

    uid = serializers.CharField()
    token = serializers.CharField()
    code_type = ""
    default_error_messages = {
        "invalid_token": "The Token is invalid.",
        "invalid_uid": "No such user exists.",
    }

    def validate(self, attrs):
        validated_data = super().validate(attrs)
        codegen = CodeGenerator(code_type=self.code_type)
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

        is_token_valid = codegen.check_token(
            self.user, self.initial_data.get("token", "")
        )
        if is_token_valid:
            return validated_data
        else:
            key_error = "invalid_token"
            raise ValidationError(
                {"token": [self.error_messages[key_error]]}, code=key_error
            )


class VerificationSerializer(UidAndTokenSerializer):
    code_type = "verification"
    default_error_messages = {
        "stale_token": "User already verified",
    }

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if not self.user.is_verified:
            return attrs
        raise serializers.ValidationError(
            "User already verified", code='authorization')


class UpdatePasswordSerializer(UidAndTokenSerializer):
    code_type = "reset_password"
    password = serializers.CharField(min_length=5, write_only=True)
