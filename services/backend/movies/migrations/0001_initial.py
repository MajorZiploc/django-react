# Generated by Django 4.1.7 on 2023-10-11 01:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('genre', models.CharField(max_length=100)),
                ('year', models.IntegerField()),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='movies', to=settings.AUTH_USER_MODEL)),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('updated_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
    ]
