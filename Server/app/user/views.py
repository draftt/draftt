from rest_framework import generics, authentication, permissions, status
from rest_framework.authtoken.views import ObtainAuthToken, APIView
from rest_framework.settings import api_settings
from rest_framework.response import Response
from user.serializers import UserSerializer, AuthTokenSerializer,  \
                            ActivationSerializer
from rest_framework.authtoken.models import Token


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for the user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manages authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve return authenticated user"""
        return self.request.user


class LogoutUser(APIView):
    """Manages user logout"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        """Retrieve return authenticated user"""
        Token.objects.filter(user=self.request.user).delete()
        return Response(data="User Logged out", status=status.HTTP_200_OK)


class ActivationView(APIView):
    """Manages the activation link"""

    def post(self, request, *args, **kwargs):
        data = {
            'uid': kwargs['uid'],
            'token': kwargs['token']
        }
        serializer_class = ActivationSerializer(data=data)
        serializer_class.is_valid(raise_exception=True)
        user = serializer_class.user
        user.is_verified = True
        user.save(update_fields=['is_verified'])
        return Response(
            data="User verified",
            status=status.HTTP_204_NO_CONTENT
            )
