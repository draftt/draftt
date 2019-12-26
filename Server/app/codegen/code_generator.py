from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.crypto import constant_time_compare,salted_hmac
from django.utils.http import int_to_base36, base36_to_int
from .utils import truncate
from django.conf import settings
from datetime import datetime
class CodeGenerator(PasswordResetTokenGenerator):
    """
    Numeric small code generator based on Django
    Password Reset Token Generator that supports 
    seconds timeout.
    """

    def __init__(self, code_type="default"):
        super().__init__()
        self.key_salt += code_type

    def make_token(self, user):
        """
        Return a token that can be used once to do a password reset
        for the given user.
        """
        return self._make_token_with_timestamp(user, self._num_seconds(self._now()))

    def check_token(self, user, token):
        """
        Check that a password reset token is correct for a given user.
        """
        if not (user and token):
            return False
        # Parse the token
        try:
            ts_b36, _ = token.split("-")
        except ValueError:
            return False

        try:
            ts = base36_to_int(ts_b36)
        except ValueError:
            return False
        # Check that the timestamp/uid has not been tampered with
        if not constant_time_compare(self._make_token_with_timestamp(user, ts), token):
            return False
        # Check the timestamp is within limit.
        if (self._num_seconds(self._now()) - ts) > settings.CODE_TIMEOUT:
            return False

        return True

    
    def _make_token_with_timestamp(self, user, timestamp):
        ts_b36 = int_to_base36(timestamp)
        hash_string = salted_hmac(
            self.key_salt,
            self._make_hash_value(user, timestamp),
            secret=self.secret,
        ).hexdigest()
        # Truncate the hash_string and ensure we have 6 characters
        hash_string = truncate(hash_string)[-settings.CODE_LENGTH:]
        return "%s-%s" % (ts_b36, hash_string)

    def _num_seconds(self, dt):
        return int((dt - datetime(2001, 1, 1)).total_seconds())

    def _now(self):
        # Used for mocking in tests
        return datetime.now()
