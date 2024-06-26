from api_crud.settings.base import *
import os

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

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
        'HOST': os.environ['POSTGRES_HOST'],
        'PORT': os.environ['POSTGRES_PORT']
    }
}
