import os
import sys
import re

broker_url = os.environ.get("MQ_URL", "amqp://guest:guest@mq")

accept_content = ["json"]
task_serializer = "json"

# rabbitmq can actually support up to 255 but according to the
# docs that would require many more erlang processes and thus
# reduce the responsiveness of our rabbit instance.
# Docs: https://www.rabbitmq.com/priority.html
task_queue_max_priority = 10
task_default_priority = 1
task_time_limit = 60 * 29 + 30
task_soft_time_limit = 60 * 29

task_default_queue = "crud_api_default_queue"

imports = "api_crud"

worker_prefetch_multiplier = 1
task_acks_late = True

# imports = "partner_integrations.tasks.tasks"


beat_schedule = {
    # "delayed_task_watchdog": {
    #     "task": "delayed_task_watchdog",
    #     "schedule": 10,
    #     "args": None,
    # },
    "schedule_jobs": {"task": "schedule_jobs", "schedule": 30, "args": None},
}

# TODO: make these line up with queues in .env
# as of now, this is just an example
# reference celery routing docs: https://docs.celeryq.dev/en/latest/userguide/routing.html#basics
task_routes = ([
    ('feed.tasks.*', {'queue': 'feeds'}),
    ('web.tasks.*', {'queue': 'web'}),
    (re.compile(r'(video|image)\.tasks\..*'), {'queue': 'media'}),
],)

# use these settings when you want the messages to be sent straight to the workers and not go into the rabbitmq message queue
# IS_TESTING = "test" in sys.argv
# if IS_TESTING:
#     task_always_eager = True
#     task_eager_propagates = True
