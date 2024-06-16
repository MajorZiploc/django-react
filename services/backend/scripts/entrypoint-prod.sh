#!/bin/bash
python manage.py makemigrations --no-input
python manage.py migrate --no-input

# python manage.py runserver 0.0.0.0:$PORT

if [[ -v MINT_WORKER_TYPE ]]; then
  echo "Launching MI Celery Worker"
  # do not run the web app for the celery worker
  celery -A api_crud worker  ${MINT_WORKER_OPTIONS} -O fair -l info --concurrency=1 -n ${MINT_WORKER_TYPE}-%h -Q ${CELERY_WORKER_QUEUES}
else
  API_PROCESSES=6

  pyuwsgi --module=api_crud.wsgi \
        --http :8000 \
        --master \
        --processes=${API_PROCESSES} \
        --harakiri=1800 \
        --lazy \
        --threads=2 \
        --buffer-size=32768
fi

