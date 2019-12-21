from rest_framework import generics, permissions, status
from rest_framework.authtoken.views import ObtainAuthToken, APIView
from rest_framework.settings import api_settings
from rest_framework.response import Response
from user.serializers import UserSerializer, AuthTokenSerializer,  \
    ActivationSerializer
from rest_framework.authtoken.models import Token
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from core.email import ActivationEmail
from codegen.code_generator import CodeGenerator
from core.utils import encode_uid
import logging

log = logging.getLogger(__name__)
def email_code(code_type,user):
    # Initiate code generator with the code_type
    codegen = CodeGenerator(code_type)
    # Get the timestamp and code generated
    timestamp,code=codegen.make_token(user).split('-')
    # Pass on the code and user object to email function
    context={"user": user,"code":code}
    ActivationEmail(context=context).send([user.email])
    uid = encode_uid(user.pk)
    # Return the timestamp and uid
    return {"timestamp":timestamp,"uid":uid}

class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        headers = self.get_success_headers(serializer.data)
        # Add timestamp and user details to return data
        return_data= email_code(code_type="activation",user=user)
        return_data.update(serializer.data)
        return Response(return_data, status=status.HTTP_201_CREATED, headers=headers)



class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for the user"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


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
        data = {
            'uid': kwargs['uid'],
            'token': kwargs['token']
        }
        serializer_class = ActivationSerializer(data=data)
        serializer_class.is_valid(raise_exception=True)
        user = serializer_class.user
        user.is_active = True
        user.save(update_fields=['is_active'])
        return Response(
            data="User Activated",
            status=status.HTTP_204_NO_CONTENT
        )

