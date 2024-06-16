"""
Django settings for api_crud project.

Generated by 'django-admin startproject' using Django 2.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os
import uuid
import socket

import redis

import os
import datetime

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'ftov1!91yf@7f7&g2%*@0_e^)ac&f&9jeloc@#v76#^b1dhbl#'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
    'DEFAULT_TOKEN_EXPIRE_TIME': datetime.timedelta(hours=6),
    'SIMPLE_JWT': {
        'ACCESS_TOKEN_LIFETIME': datetime.timedelta(hours=6),
        'SLIDING_TOKEN_REFRESH_LIFETIME': datetime.timedelta(days=2),
    },
    # 'TEST_REQUEST_DEFAULT_FORMAT': 'json'
}

REDIS_HOST = os.getenv("HL_REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("HL_REDIS_PORT", 6379))
REDIS_PASSWORD = os.getenv("HL_REDIS_PASSWORD")
REDIS_SSL = os.getenv("HL_REDIS_SSL_ENABLED", "false")
REDIS_CLIENT = redis.StrictRedis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    password=REDIS_PASSWORD,
    ssl=(REDIS_SSL.lower() == "true"),
)
REDIS_CLIENT.client_setname(f"{socket.gethostname()}-{uuid.uuid4()}")

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'django_filters',
    'authentication',
    'integrations',
    "django_celery_beat",
]

SITE_ID = 1

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'api_crud.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api_crud.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'

DEFAULT_AUTO_FIELD = "django.db.models.AutoField"

LOGIN_URL = "/admin/login"

WHITELIST_URLS = [r"^%s" % LOGIN_URL.lstrip("/"), r"^test/anonymous"]

def global_template_variables(request):
    """Provides global variables to all templates."""
    return {'project_env': os.getenv('PROJECT_ENV', None)}

TEMPLATES = [
  {
    "BACKEND": "django.template.backends.django.DjangoTemplates",
    "DIRS": [],
    "APP_DIRS": True,
    "OPTIONS": {
      "context_processors": [
        "django.template.context_processors.debug",
        "django.template.context_processors.request",
        "django.contrib.auth.context_processors.auth",
        "django.contrib.messages.context_processors.messages",
        "api_crud.settings.base.global_template_variables",
      ]
    },
  }
]

# Django email settings
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = "587"
EMAIL_HOST_USER = "todo@todo.net"
EMAIL_HOST_PASSWORD = "user@password"
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False

DEV_EMAIL_ALERT_RECEIVER = "devteam@todo.net"
CS_EMAIL_ALERT_RECEIVER = "support@todo.net"

REDIS_HOST = os.getenv("HL_REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("HL_REDIS_PORT", "6379"))
REDIS_PASSWORD = os.getenv("HL_REDIS_PASSWORD")
REDIS_SSL = os.getenv("HL_REDIS_SSL_ENABLED", "false")

REDIS_CLIENT = redis.StrictRedis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    password=REDIS_PASSWORD,
    ssl=(REDIS_SSL.lower() == "true"),
)
REDIS_CLIENT.client_setname(f"{socket.gethostname()}-{uuid.uuid4()}")
