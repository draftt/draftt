from rest_framework import status
from rest_framework.authtoken.views import APIView
from rest_framework.response import Response


class StatusView(APIView):
    """Returns 200 to signal connection successful"""

    def get(self, request):
        """return true"""
        return Response(data="Connected", status=status.HTTP_200_OK)
