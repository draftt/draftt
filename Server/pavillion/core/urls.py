from django.urls import path
from core import views

app_name = 'core'

"""Redirects to the create user or login functions for each request"""
urlpatterns = [
    path('status/', views.StatusView.as_view(), name='apistatus')
]
