import uuid
from django.db import models
from django.utils.timezone import now

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
