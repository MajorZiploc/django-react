from celery import (
  shared_task,
)

@shared_task(name="test_task")
def test_task():
  msg = "task worked"
  print(msg)
  return msg

@shared_task(name="delayed_task_watchdog")
def delayed_task_watchdog():
    pass


@shared_task(name="schedule_jobs")
def schedule_jobs():
    pass
