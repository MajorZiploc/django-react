#!/usr/bin/env bash

this_path=$(dirname "`realpath $0`");
. "$this_path/../.env.bash";

# TODO: Should the docker username be AWS or $DOCKER_USERNAME
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com;
