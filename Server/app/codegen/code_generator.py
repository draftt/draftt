from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.crypto import salted_hmac
from django.utils.http import int_to_base36
from .utils import truncate


class CodeGenerator(PasswordResetTokenGenerator):
    """
    Numeric small code generator based on Django
    Password Reset Token Generator
    """

    def __init__(self, code_type="default"):
        super(CodeGenerator, self).__init__()
        self.key_salt += code_type

    def _make_token_with_timestamp(self, user, timestamp):
        ts_b36 = int_to_base36(timestamp)
        hash_string = salted_hmac(
            self.key_salt,
            self._make_hash_value(user, timestamp),
            secret=self.secret,
        ).hexdigest()
        # Truncate the hash_string and ensure we have 6 characters
        hash_string = truncate(hash_string)[-6:]
        return "%s-%s" % (ts_b36, hash_string)
