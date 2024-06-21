Walk through this:
  https://docs.render.com/deploy-django#manual-deployment
  NOTE:
    env vars on render on the django web_service
      PORT=8000 and make sure BACKEND_PORT is the same value as it
      PYTHON_VERSION=3.12

make a db and connect its url via POSTGRES_EXTERNAL_URL
  https://docs.render.com/databases#create-your-database

make a redis service and connect its url via HL_REDIS_URL
  https://docs.render.com/redis

add react site: https://docs.render.com/deploy-create-react-app

add background worker: https://docs.render.com/deploy-celery
  NOTE: costs $7 minimum for a background worker service
  add celery
  use redis url at first
    switch to rabbitmq if it is actually needed
general blueprint render.yaml file
  https://docs.render.com/infrastructure-as-code#generating-a-blueprint-from-existing-services

TODO:
  backend always gives make a 400 bad request with strict cors settings
    related to cors restrictions
      currently left it with dev like settings
        need to restrict it down again
      consider ssh'ing into it and running a debug_shell to look at various settings
        !figure out how to ssh into servers from render
