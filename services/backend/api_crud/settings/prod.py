from api_crud.settings.base import *
import os
import dj_database_url
# from corsheaders.defaults import default_headers

DEBUG = False

# Tell Django to copy static assets into a path called `staticfiles` (this is specific to Render)
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# Enable the WhiteNoise storage backend, which compresses static files to reduce disk use
# and renames the files with unique names for each version to support long-term caching
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# TODO: need to swap these out. Currently doesnt work tho. Might require custom domains instead of the onrender subdomains that are free?
# SECURITY WARNING: Should use CORS_ALLOWED_ORIGINS instead of these 2 things
CORS_ORIGIN_ALLOW_ALL = True
ALLOWED_HOSTS = ['*']

# CORS_ALLOWED_ORIGINS = [os.environ['FRONTEND_PUBLIC_URL'], os.environ['BACKEND_PUBLIC_URL']]

# CORS_ALLOW_CREDENTIALS = True

# CORS_ALLOW_HEADERS = list(default_headers) + [
#     'authorization',
#     'x-requested-with',
#     'x-csrftoken',
# ]

# CORS_ALLOW_METHODS = [
#     'GET',
#     'POST',
#     'PUT',
#     'PATCH',
#     'DELETE',
#     'OPTIONS',
# ]

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ["POSTGRES_EXTERNAL_URL"], # f'postgresql://${os.environ["POSTGRES_USER"]}:${os.environ["POSTGRES_USER"]}@${os.environ["POSTGRES_HOST"]}:${os.environ["POSTGRES_PORT"]}/api_crud_db',
        conn_max_age=600
    )
}
