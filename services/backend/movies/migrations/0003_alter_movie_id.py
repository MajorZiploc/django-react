# Generated by Django 4.0.2 on 2022-02-13 00:19

from django.db import migrations, models


class Migration(migrations.Migration):

  dependencies = [
      ('movies', '0002_auto_20220211_2214'),
  ]

  operations = [
      migrations.AlterField(
          model_name='movie',
          name='id',
          field=models.AutoField(primary_key=True, serialize=False),
      ),
  ]