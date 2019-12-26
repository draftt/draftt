from django.core.validators import validate_email, ValidationError
from django.contrib.auth import get_user_model


def get_username(email):
    User = get_user_model()
    try:
        validate_email(email)
        return User.objects.get(email=email).username
    except ValidationError:
        return None


class GrantSubTypeMiddleware:
    """Middleware to get username if email is provided for login"""

    def process_request(self, request):
        req = request.request
        req.POST._mutable = True
        # Formats password grant type for oauth toolkit
        # to return access-token even if user provided email
        if req.POST['grant_type'] == "password":
            if req.POST['grant_sub_type'] == "email":
                try:
                    username = get_username(req.POST['email'])
                except get_user_model().DoesNotExist:
                    username = "invalidusername"
                req.POST.pop('email')
                req.POST['username'] = username
            req.POST.pop('grant_sub_type')
        req.POST._mutable = False

    def process_exception(self, request, exception):
        return None
