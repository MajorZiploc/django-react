#!/usr/bin/env bash

scriptpath="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
. "$HOME/.venv/django-react/bin/activate";
python3 "$scriptpath/../packages/server/manage.py" runserver;

