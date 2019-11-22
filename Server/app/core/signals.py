from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User
from .email import ActivationEmail


@receiver(post_save, sender=User)
def send_activation_email(sender, instance, created, **kwargs):
    """Sends the user an email with activation link on creation"""
    user = instance
    """Does not send email if superuser or active"""
    if created and not user.is_staff:
        context = {"user": user}
        ActivationEmail(context=context).send([user.email])
