#!/usr/bin/env bash

build_services=("$@");
if [[ ${#build_services[@]} -lt 1 ]]; then
  echo 'No services to build';
  exit 0;
fi

this_path=$(dirname "`realpath $0`");
. "$this_path/../.env.bash";
. "$this_path/service-vars.sh";
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD;

for service in $build_services; do
  . "$this_path/../packages/$service/just.bash" "$this_path/../packages/$service";
  just_build;
done;

docker-compose -f compose.yml -f compose-prod.yml build "${build_services[@]}";
