from api_crud.settings.base import *
import os
import dj_database_url

DEBUG = False

# Tell Django to copy static assets into a path called `staticfiles` (this is specific to Render)
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# Enable the WhiteNoise storage backend, which compresses static files to reduce disk use
# and renames the files with unique names for each version to support long-term caching
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# SECURITY WARNING: Should use CORS_ALLOWED_ORIGINS instead of these 2 things
# CORS_ORIGIN_ALLOW_ALL = True
# ALLOWED_HOSTS = ['*']

CORS_ALLOWED_ORIGIN = ['https://majorziploc-react.onrender.com', 'https://django-react-z6z4.onrender.com']

CORS_ALLOW_METHODS = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
]

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ["POSTGRES_EXTERNAL_URL"], # f'postgresql://${os.environ["POSTGRES_USER"]}:${os.environ["POSTGRES_USER"]}@${os.environ["POSTGRES_HOST"]}:${os.environ["POSTGRES_PORT"]}/api_crud_db',
        conn_max_age=600
    )
}
