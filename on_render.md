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

TODO:
add celery and rabbitmq
add react site
