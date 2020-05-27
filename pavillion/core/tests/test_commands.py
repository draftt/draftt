from django.core.management import call_command
from django.db.utils import OperationalError
from django.test import TestCase
from django.contrib.auth import get_user_model
from oauth2_provider.models import get_application_model
from unittest.mock import patch


Application = get_application_model()
User = get_user_model()


class CommandTests(TestCase):

    def test_wait_for_db_readt(self):
        """Test waiting for db when it is available"""
        with patch('django.db.utils.ConnectionHandler.__getitem__') as gi:
            gi.return_value = True
            call_command('wait_for_db')
            self.assertEqual(gi.call_count, 1)

    @patch('time.sleep', return_value=True)
    def test_wait_for_db(self, ts):
        """Test waiting for db"""
        with patch('django.db.utils.ConnectionHandler.__getitem__') as gi:
            # Raises Operational error first 5 times
            gi.side_effect = [OperationalError] * 5 + [True]
            call_command('wait_for_db')
            self.assertEqual(gi.call_count, 6)


class SetupCommandTests(TestCase):

    def setUp(self):
        self.env = patch.dict('os.environ', {'DEBUG': 'False'})

    def test_setup_command(self):
        """Tests the setup command to auto create admin and app"""
        self.assertTrue(User.objects.count() == 0)
        call_command('setup')
        self.assertTrue(User.objects.count() > 0)
        self.assertTrue(Application.objects.count() > 0)

    def test_setup_dont_create(self):
        """Tests to not create the objects if already exist"""
        call_command('setup')
        call_command('setup')
        self.assertTrue(User.objects.count() == 1)
        self.assertTrue(Application.objects.count() == 1)

    def test_setup_not_debug(self):
        """Test if debug is false in settings"""
        with self.env:
            call_command('setup')
            self.assertTrue(Application.objects.count() == 0)
            self.assertTrue(User.objects.count() == 0)
