#!/usr/bin/env bash

cd ./services/backend && python -m gunicorn -b "0.0.0.0:${BACKEND_PORT}" api_crud.wsgi:application
