from api_crud.settings.base import *
import os

SECRET_KEY = os.environ['BACKEND_SECRET_KEY']

DEBUG = False

# SECURITY WARNING: Should use CORS_ALLOWED_ORIGINS instead of these 2 things
# CORS_ORIGIN_ALLOW_ALL = True
# ALLOWED_HOSTS = ['*']

CORS_ALLOWED_ORIGINS = [os.environ['FRONTEND_PUBLIC_URL']]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ['POSTGRES_DB'],
        'USER': os.environ['POSTGRES_USER'],
        'PASSWORD': os.environ['POSTGRES_PASSWORD'],
        'HOST': 'db',  # set in docker-compose.yml
        'PORT': os.environ['POSTGRES_PORT']
    }
}
