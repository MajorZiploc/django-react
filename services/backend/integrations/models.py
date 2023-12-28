import uuid
from django.db import models
from django.utils.timezone import now

# TODO: Would be nice to have this in its own 'scheduler' app instead of being in 'integrations'
class ScheduledJob(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job_type = models.TextField()
    next_scheduled = models.DateTimeField()
    delay_seconds = models.IntegerField()
    job_info = models.JSONField(default=dict)
    last_ran = models.DateTimeField(null=True)
    run_count = models.IntegerField(default=0)
    delete_after_count = models.IntegerField(default=1)

class AuditableModel(models.Model):
    created_date = models.DateTimeField(default=now, editable=False)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Movie(AuditableModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    year = models.IntegerField()
    creator = models.ForeignKey('auth.User', related_name='movies', on_delete=models.CASCADE)

    class Meta:
        ordering = ['-id']
