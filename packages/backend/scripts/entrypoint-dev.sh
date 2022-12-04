#!/bin/bash

python manage.py safemigrate --no-input --database=default

python manage.py runserver 0.0.0.0:8000
