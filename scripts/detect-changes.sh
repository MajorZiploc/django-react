#!/usr/bin/env bash

full_path=$(realpath $0);
dir_path=$(dirname $full_path);
source $dir_path/service-vars.sh;

changed_files=`git log -m -1 --name-only --pretty='format:'`;
build_services=();

function add_service {
  for service in "${build_services[@]}"; do
    if [[ "$1" == "$service" ]]; then
      return;
    fi
  done
  build_services+=( $1 );
}

function add_services {
  add_service $1;
}

for file in $changed_files; do
  if [[ $file =~ packages/([^/]+) ]]; then
    add_services ${BASH_REMATCH[1]};
  fi
done

for service in "${build_services[@]}"; do
  echo $service;
done
