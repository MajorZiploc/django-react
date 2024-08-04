Walk through this:
  https://docs.render.com/deploy-django
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

TODO:
  switch to a different service for free db:
    https://www.koyeb.com/blog/top-postgresql-database-free-tiers-in-2024
      https://www.koyeb.com/
      https://aiven.io/
      https://aws.amazon.com/rds/postgresql/pricing/
        THIS: aws rds looks like the best choice here assuming you can cap the amount of data stored in the instance
  recreate the django-react web_service to have the majorziploc_django style url
    rename old service and replicate it. then delete the old web_service
  backend always gives make a 400 bad request with strict cors settings
    related to cors restrictions
      currently left it with dev like settings
        need to restrict it down again
      consider ssh'ing into it and running a debug_shell to look at various settings
        !figure out how to ssh into servers from render
  move to infra as code with blueprint render.yaml file
    currently my render.yaml file here isnt used, its using settings from render GUI
    https://docs.render.com/infrastructure-as-code#generating-a-blueprint-from-existing-services

NOTES:
  paused services
  deleted redis bcuz no pause option
