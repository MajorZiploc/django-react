#!/usr/bin/env bash
# Exit on error
set -o errexit

celery -A api_crud worker  "${MINT_WORKER_OPTIONS}" -O fair -l info --concurrency=1 -n "${MINT_WORKER_TYPE}-%h" -Q "${CELERY_WORKER_QUEUES}"
