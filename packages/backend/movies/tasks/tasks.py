from celery import (
  shared_task,
)

@shared_task(name="test_task")
def test_task():
  msg = "task worked"
  print(msg)
  return msg
