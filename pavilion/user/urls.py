from django.urls import path
from user import views

app_name = 'user'

"""Redirects to the create user or login functions for each request"""
urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='createuser'),
    path('account/', views.ManageUserView.as_view(), name='account'),
    path('verify/', views.VerificationView.as_view(), name='verify'),
    path('reset_pwd/', views.ResetPasswordView.as_view(), name='reset_pwd'),
]
