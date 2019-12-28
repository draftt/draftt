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
        
        self.auth = ExternalTokenGrant(
                request_validator=self.mock_validator)

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

    def test_create_token_response_without_refresh_token(self):
        # self.auth.refresh_token = False so we don't generate a refresh token
        self.auth = ExternalTokenGrant(
                request_validator=self.mock_validator, refresh_token=False)
        bearer = BearerToken(self.mock_validator)
        headers, body, status_code = self.auth.create_token_response(
                self.request, bearer)
        token = json.loads(body)
        self.assertEqual(self.mock_validator.save_token.call_count, 1)
        self.assertIn('access_token', token)
        self.assertIn('token_type', token)
        self.assertIn('expires_in', token)
        # ensure no refresh token is generated
        self.assertNotIn('refresh_token', token)
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

    def test_custom_auth_validators_unsupported(self):
        authval1, authval2 = mock.Mock(), mock.Mock()
        expected = ('ExternalTokenGrant does not '
                    'support authorization validators. Use token '
                              'validators instead.')
        with self.assertRaises(ValueError) as caught:
            ExternalTokenGrant(self.mock_validator,
                                                  pre_auth=[authval1])
        self.assertEqual(caught.exception.args[0], expected)
        with self.assertRaises(ValueError) as caught:
            ExternalTokenGrant(self.mock_validator,
                                                  post_auth=[authval2])
        self.assertEqual(caught.exception.args[0], expected)
        with self.assertRaises(AttributeError):
            self.auth.custom_validators.pre_auth.append(authval1)
        with self.assertRaises(AttributeError):
            self.auth.custom_validators.pre_auth.append(authval2)

