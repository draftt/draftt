from django.test import TestCase
from .code_generator import CodeGenerator
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from django.conf import settings


class CodegenTests(TestCase):

    def setUp(self):

        self.test_user = get_user_model().objects.create_user(
            username='testuser',
            email='test@testcode.com',
            password='supersecretpassword',
            is_active=True
        )
        self.base_codegen = CodeGenerator()
        self.base_code = self.base_codegen.make_token(self.test_user)

    def test_code_gen_check(self):
        """ Test if code gen checker is working """
        self.assertTrue(self.base_codegen.check_token(
            self.test_user, self.base_code))

    def test_code_timeout(self):
        """Tests if code expires after the set time and is rejected"""
        class TestCodeGen(CodeGenerator):
            def __init__(self, now):
                super().__init__()
                self._mocked_now = now

            def _now(self):
                return self._mocked_now

        endtime_codegen = TestCodeGen(
            datetime.now() + timedelta(seconds=settings.CODE_TIMEOUT))
        self.assertTrue(endtime_codegen.check_token(
            self.test_user, self.base_code))

        expired_codegen = TestCodeGen(
            datetime.now() + timedelta(seconds=settings.CODE_TIMEOUT + 1))
        self.assertFalse(expired_codegen.check_token(
            self.test_user, self.base_code))

    def test_code_length(self):
        """Tests if the length of code is same as defined in settings"""
        ts, code = self.base_code.split('-')
        self.assertTrue(len(code) is settings.CODE_LENGTH)

    def test_code_type(self):
        """Tests whether the code type works or not"""

        diff_codegen = CodeGenerator(code_type="testingtype")
        diff_code = diff_codegen.make_token(self.test_user)

        self.assertFalse(self.base_codegen.check_token(
            self.test_user, diff_code))
        self.assertFalse(diff_codegen.check_token(
            self.test_user, self.base_code))

        self.assertTrue(diff_codegen.check_token(self.test_user, diff_code))
