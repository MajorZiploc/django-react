#!/usr/bin/env bash

this_path=$(dirname "`realpath $0`");
. "$this_path/../.env.bash";

build_services=("$@");
if [[ ${#build_services[@]} -lt 1 ]]; then
  echo 'No images to push';
  exit 0
fi

function push_image {
  docker tag django-react-$1 $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/django-react-$1;
  docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/django-react-$1;
}

export AWS_PAGER='';
for service in "${build_services[@]}"; do
  aws ecr create-repository --repository-name "django-react-$service";
  push_image $service;
done
