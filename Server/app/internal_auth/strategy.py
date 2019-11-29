from social_django.strategy import DjangoStrategy
import logging
from django.conf import settings

log=logging.getLogger(__name__)

class DRFStrategy(DjangoStrategy):

    def __init__(self, storage, request=None, tpl=None):
        self.request = request
        self.session = {}
        super(DjangoStrategy, self).__init__(storage, tpl)

    def request_data(self, merge=True):
        if not self.request:
            return {}
        data = self.request.body
        log.info(data)
        return data

    def request_host(self):
        return settings.DOMAIN

    def request_is_secure(self):
    """Is the request using HTTPS?"""
    return self.request.http_method =='https'