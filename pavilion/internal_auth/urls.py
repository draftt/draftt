from django.urls import path, include
from internal_auth.views import ExtendedTokenView
app_name = 'internal_auth'

urlpatterns = [
    path('token/', ExtendedTokenView.as_view(), name="token"),
    path('', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('', include('social_django.urls', namespace="external")),
]
