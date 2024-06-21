from api_crud.settings.base import *
import os
import uuid
import socket
import redis

REDIS_HOST = os.getenv("HL_REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("HL_REDIS_PORT", 6379))
REDIS_USERNAME = os.getenv("HL_REDIS_USERNAME")
REDIS_PASSWORD = os.getenv("HL_REDIS_PASSWORD")
REDIS_SSL = os.getenv("HL_REDIS_SSL_ENABLED", "false")
REDIS_CLIENT = redis.StrictRedis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    username=REDIS_USERNAME,
    password=REDIS_PASSWORD,
    ssl=(REDIS_SSL.lower() == "true"),
)
REDIS_CLIENT.client_setname(f"{socket.gethostname()}-{uuid.uuid4()}")

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

SECRET_KEY = os.environ['BACKEND_SECRET_KEY']

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
