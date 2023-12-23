#!/bin/bash

pip3 install --upgrade pip -r requirements.txt;

MINT_WORKER_OPTIONS="$1";
MINT_WORKER_TYPE="$2";
CELERY_WORKER_QUEUES="$3";

if [[ -z "$MINT_WORKER_TYPE" ]]; then
  python manage.py makemigrations --no-input
  python manage.py migrate --no-input
  python manage.py runserver 0.0.0.0:8000;
else
  echo "Launching MINT Celery Worker"
  # NOTE: do not run the web app for the celery worker
  # celery -A api_crud worker  ${MINT_WORKER_OPTIONS} -O fair -l info --concurrency=1 -n ${MINT_WORKER_TYPE}-%h -Q ${CELERY_WORKER_QUEUES}
  # NOTE: Use below if the above 'autoreload_celery' command is not found; hotreloading will not work with the below so you need to restart the container for changes to take effect
  python3 manage.py autoreload_celery --mint_worker_options "${MINT_WORKER_OPTIONS}" --mint_worker_type "${MINT_WORKER_TYPE}" --celery_worker_queues "${CELERY_WORKER_QUEUES}";
fi

