# Generated by Django 3.0.8 on 2020-09-16 05:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_auto_20200913_2331'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2020, 9, 15, 22, 47, 20, 320716)),
        ),
    ]
