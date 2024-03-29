from datetime import timedelta
from celery import (
  shared_task,
)
from django.utils.timezone import now
from integrations.models import ScheduledJob
from api_crud import celeryconfig

@shared_task(name="test_task")
def test_task(*args, **kwargs):
    msg = f"task worked and ran with args:{args}, kwargs:{kwargs}"
    print(msg)
    return msg

@shared_task(name="delayed_task_watchdog")
def delayed_task_watchdog():
    # Should do anything cleaning that tasks may need
    # TODO: this should likely deal with tasks that are stale and need to be updated or deleted in the db
    pass

# TODO: ?is there a nicer way of doing this rather than using a dict
schedulable_tasks = {
    'test_task': test_task,
}

@shared_task(name="schedule_jobs")
def schedule_jobs():
    current_time = now()
    # jobs = ScheduledJob.objects.filter(next_scheduled__lte=current_time, next_scheduled__gte=current_time - timedelta(seconds=celeryconfig.schedule_jobs_interval_seconds))
    jobs = ScheduledJob.objects.filter(next_scheduled__lte=current_time)
    for job in jobs:
        task = schedulable_tasks.get(job.job_type, None)
        if not task:
            continue
        # TODO: should consider how to handle failed tasks. as is, it will not retry or anything
        task(**job.job_info)
        current_time = now()
        job.last_ran = current_time
        job.next_scheduled = current_time + timedelta(seconds=job.delay_seconds or 0)
        job.run_count = job.run_count + 1
        if job.delete_after_count is not None and job.run_count >= job.delete_after_count:
            job.delete()
        else:
            job.save()
