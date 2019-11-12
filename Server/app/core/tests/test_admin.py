from django.test import TestCase , Client
from django.contrib.auth import get_user_model
from django.urls import reverse


class AdminSiteTests(TestCase):

    def setUp(self):

        self.client = Client()
        self.admin_user= get_user_model().objects.create_superuser(
            email="admin@draftt.com",
            password="password"
        )
        self.client.force_login(self.admin_user)
        self.user = get_user_model().objects.create_user(
            email='test@draftt.com',
            password="password",
            name="Test user FullName"
        )

    def test_users_listed(self):
        """Test users are listed or not"""
        url = reverse('admin:core_user_changelist')
        res = self.client.get(url)

        self.assertContains(res,self.user.name)
        self.assertContains(res,self.user.email)
    
    def test_user_change_page(self):
        """Test if user editing page works"""
        url = reverse('admin:core_user_change', args=[self.user.id])
        res = self.client.get(url)

        """Check if HTTP response is ok (200)"""
        self.assertEqual(res.status_code,200)

    def test_create_user_age(self):
        """Test that the create user page works"""
        url = reverse('admin:core_user_add')
        res = self.client.get(url)

        self.assertEqual(res.status_code, 200)
        
         
