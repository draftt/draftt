from rest_framework import generics, permissions, status
from rest_framework.authtoken.views import APIView
from rest_framework.response import Response
from user.serializers import UserSerializer, ActivationSerializer, \
    UpdatePasswordSerializer
from rest_framework.authtoken.models import Token
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from .utils import email_code
from django.contrib.auth import get_user_model


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        # Add timestamp and user details to return data
        return_data = email_code(code_type="activation", user=user)
        return_data.update(serializer.data)
        return Response(
            return_data, status=status.HTTP_201_CREATED, headers=headers)


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manages authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (OAuth2Authentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve return authenticated user"""
        return self.request.user


class LogoutUser(APIView):
    """Manages user logout"""
    serializer_class = UserSerializer
    authentication_classes = (OAuth2Authentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        """Retrieve return authenticated user"""
        Token.objects.filter(user=self.request.user).delete()
        return Response(data="User Logged out", status=status.HTTP_200_OK)


class ActivationView(APIView):
    """Manages the activation link"""

    def post(self, request, *args, **kwargs):
        serializer_class = ActivationSerializer(data=request.data)
        serializer_class.is_valid(raise_exception=True)
        user = serializer_class.user
        user.is_active = True
        user.save(update_fields=['is_active'])
        return Response(
            data="User Activated",
            status=status.HTTP_200_OK
        )


class ResetPasswordView(APIView):
    """
        Allows users to reset their password through email verification.
        GET Method is used for requesting a verification code.
        PATCH Method is used to provide the verification code and new
        password.
    """

    def post(self, request, *args, **kwargs):
        try:
            email = request.data['email']
        except KeyError:
            return Response(
                data = "Email not provided",
                status=status.HTTP_400_BAD_REQUEST
            )
        user = get_user_model().objects.get(email=email)
        return_data = email_code(code_type="reset_password", user=user)
        return Response(
            return_data,
            status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        serializer = UpdatePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        password = serializer.validated_data.pop('password', None)
        user.set_password(password)
        user.save()
        return Response(
            data="Password Reset Successful",
            status=status.HTTP_204_NO_CONTENT
        )
