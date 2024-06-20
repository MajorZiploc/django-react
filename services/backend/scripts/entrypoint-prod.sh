#!/bin/bash

pip3 install --upgrade pip -r requirements.txt;

if [[ -z "$MINT_WORKER_TYPE" ]]; then
  echo "Launching Server"
  python manage.py makemigrations --no-input
  python manage.py migrate --no-input
  python -m gunicorn -b "0.0.0.0:${BACKEND_PORT}" api_crud.wsgi:application
else
  echo "Launching MI Celery Worker"
  # do not run the web app for the celery worker
  celery -A api_crud worker  "${MINT_WORKER_OPTIONS}" -O fair -l info --concurrency=1 -n "${MINT_WORKER_TYPE}-%h" -Q "${CELERY_WORKER_QUEUES}"
fi
