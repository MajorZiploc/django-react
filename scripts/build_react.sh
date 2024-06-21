#!/usr/bin/env bash
# Exit on error
set -o errexit

cd ./services/frontend

npm i

npm run build
