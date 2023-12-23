import os
from celery import Celery
from api_crud import celeryconfig

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api_crud.settings.dev")
app = Celery("api_crud", broker=celeryconfig.broker_url)

app.config_from_object(celeryconfig)
app.autodiscover_tasks()  # Only autodiscovers tasks in files named tasks.py

# # only consume external events from the beat worker
# if os.environ.get("MI_WORKER_TYPE") == "celery-beat-worker":
#     # steps for listening and sending events to another system
#     app.steps["consumer"].add(todo_consumer_here)
#     with app.pool.acquire(block=True) as conn:
#         channel = conn.channel()
#         channel.exchange_declare(
#             exchange="otherSystemEvents", type="fanout", auto_delete=False
#         )
#         channel.exchange_declare(
#             exchange="miOtherSystemReceiver",
#             type="topic",
#             durable=True,
#             auto_delete=False,
#         )
#         channel.exchange_bind(
#             source="otherSystemEvents", destination="miOtherSystemReceiver"
#         )
#         channel.exchange_declare(
#             exchange="miEventChange", type="topic", durable=True, auto_delete=False
#         )
