import json

import mock

from oauthlib.common import Request
from oauthlib.oauth2.rfc6749 import errors
from internal_auth.external_token_grant import ExternalTokenGrant
from oauthlib.oauth2.rfc6749.tokens import BearerToken
from unittest import TestCase

class ExternalGrantTest(TestCase):

    def setUp(self):
        mock_client = mock.MagicMock()
        mock_client.user.return_value = 'mocked user'
        self.request = Request('http://a.b/path')
        self.request.grant_type = 'external_token'
        self.request.provider = 'facebook'
        self.request.access_token = '1234567'
        self.request.client = mock_client
        self.request.scopes = ('mocked', 'scopes')
        self.mock_validator = mock.MagicMock()

        # Mocked Class which returns true instad of contacting social-django
        class MockedExternalGrant(ExternalTokenGrant):
            def __init__(self,**kwargs):
                super().__init__(**kwargs)

            def external_validator(self, provider, access_code, request):
                return True
        
        self.auth = MockedExternalGrant(
                request_validator=self.mock_validator)
        self.success_auth = MockedExternalGrant(request_validator=self.mock_validator)

    def set_client(self, request, *args, **kwargs):
        request.client = mock.MagicMock()
        request.client.client_id = 'mocked'
        return True

    def test_create_token_response(self):
        
        bearer = BearerToken(self.mock_validator)
        headers, body, status_code = self.auth.create_token_response(
                self.request, bearer)
        token = json.loads(body)
        self.assertEqual(self.mock_validator.save_token.call_count, 1)
        self.assertIn('access_token', token)
        self.assertIn('token_type', token)
        self.assertIn('expires_in', token)
        self.assertIn('refresh_token', token)
        # ensure client_authentication_required() is properly called
        self.mock_validator.client_authentication_required.assert_called_once_with(self.request)
        # fail client authentication
        self.mock_validator.reset_mock()
        self.mock_validator.validate_user.return_value = True
        self.mock_validator.authenticate_client.return_value = False
        status_code = self.auth.create_token_response(self.request, bearer)[2]
        self.assertEqual(status_code, 401)
        self.assertEqual(self.mock_validator.save_token.call_count, 0)

        # mock client_authentication_required() returning False then fail
        self.mock_validator.reset_mock()
        self.mock_validator.client_authentication_required.return_value = False
        self.mock_validator.authenticate_client_id.return_value = False
        status_code = self.auth.create_token_response(self.request, bearer)[2]
        self.assertEqual(status_code, 401)
        self.assertEqual(self.mock_validator.save_token.call_count, 0)
