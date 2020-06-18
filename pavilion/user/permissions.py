from rest_framework import permissions

class isVerified(permissions.BasePermission):
    """
    Allows users who are verified (email etc)
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_verified)