from django.urls import path
from user import views

app_name = 'user'

"""Redirects to the create user or login functions for each request"""
urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('login/', views.CreateTokenView.as_view(), name='login'),
]
