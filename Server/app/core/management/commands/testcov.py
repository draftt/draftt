import sys

from coverage import Coverage
from django.core.management.commands.test import Command as BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **kwargs):  # pragma: no cover
        cov = Coverage()
        cov.erase()
        cov.start()

        super().handle(*args, **kwargs)

        cov.stop()
        cov.save()
        covered = cov.report()
        if covered < 100:
            sys.exit(1)