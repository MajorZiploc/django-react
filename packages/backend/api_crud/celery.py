import os
from celery import Celery
from . import celeryconfig

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api_crud.settings.dev")
app = Celery("api_crud")

app.config_from_object(celeryconfig)
app.autodiscover_tasks()  # Only autodiscovers tasks in files named tasks.py
