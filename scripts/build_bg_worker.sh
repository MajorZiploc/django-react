#!/usr/bin/env bash
# Exit on error
set -o errexit

cd ./services/backend

pip install -r requirements.txt
