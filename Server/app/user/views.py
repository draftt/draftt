from user.serializers import UserSerializer
from rest_framework import generics

class CreateUserView(generics.CreateAPIView):
    """Create a new user in our database"""

    serializer_class = UserSerializer
    



