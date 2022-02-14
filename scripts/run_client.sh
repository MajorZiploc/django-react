#!/usr/bin/env bash

scriptpath="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
yarn --cwd "$scriptpath/../packages/client" start;

