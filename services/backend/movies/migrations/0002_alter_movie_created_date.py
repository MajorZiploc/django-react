# Generated by Django 4.1.7 on 2023-10-11 01:26

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='created_date',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
    ]
