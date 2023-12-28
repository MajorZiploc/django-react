from celery import (
  shared_task,
)
from django.utils.timezone import now, timedelta
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

# TODO: TEST
@shared_task(name="schedule_jobs")
def schedule_jobs():
    current_time = now()
    # jobs = ScheduledJob.objects.filter(next_scheduled__lte=current_time, next_scheduled__gte=current_time - timedelta(seconds=celeryconfig.schedule_jobs_interval_seconds))
    jobs = ScheduledJob.objects.filter(next_scheduled__lte=current_time)
    for job in jobs:
        task = schedulable_tasks.get(job.job_type, None)
        if not task:
            continue
        task(**job.job_info)
        job.next_scheduled = now() + timedelta(seconds=job.delay_seconds or 0)
        job.run_count = job.run_count + 1
        if job.run_count >= job.delete_after_count:
            job.delete()
        else:
            job.save()
