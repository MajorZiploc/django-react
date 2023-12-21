#!/bin/bash

pip3 install --upgrade pip -r requirements.txt;

python manage.py makemigrations --no-input
python manage.py migrate --no-input

if [[ -v MINT_WORKER_TYPE ]]; then
  echo "Launching MINT Celery Worker"
  # do not run the web app for the celery worker
  celery -A api_crud worker  ${MINT_WORKER_OPTIONS} -O fair -l info --concurrency=1 -n ${MINT_WORKER_TYPE}-%h -Q ${CELERY_WORKER_QUEUES}
else
  python manage.py runserver 0.0.0.0:8000
fi

