from django.core.validators import validate_email, ValidationError
from core.email import ActivationEmail, ResetPasswordEmail
from codegen.code_generator import CodeGenerator
from core.utils import encode_uid


def val_email(email):
    try:
        validate_email(email)
        valid_email = True
    except ValidationError:
        valid_email = False
    return valid_email


def email_code(code_type, user):
    # Initiate code generator with the code_type
    codegen = CodeGenerator(code_type)
    # Get the timestamp and code generated
    timestamp, code = codegen.make_token(user).split('-')
    # Pass on the code and user object to email function
    context = {"user": user, "code": code}
    if code_type == "activation":
        ActivationEmail(context=context).send([user.email])
    elif code_type == "reset_password":
        ResetPasswordEmail(context=context).send([user.email])
    uid = encode_uid(user.pk)
    # Return the timestamp and uid
    return {"timestamp": timestamp, "uid": uid}
