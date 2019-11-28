from rest_framework import generics, authentication, permissions, status
from rest_framework.authtoken.views import ObtainAuthToken, APIView
from rest_framework.settings import api_settings
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from oauth2_provider.views import TokenView

from django.utils.decorators import decorator_from_middleware
from internal_auth.middleware import GrantSubTypeMiddleware


class ExtendedTokenView(TokenView):
    # Apply middlerware to the POST method of OAuthToolkit
    @decorator_from_middleware(GrantSubTypeMiddleware)
    def post(self, request, *args, **kwargs):
        # Call original post function provided by OAuthToolkit
        return super().post(request, *args, **kwargs)



                


