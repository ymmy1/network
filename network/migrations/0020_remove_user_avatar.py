# Generated by Django 3.0.8 on 2020-09-17 06:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0019_auto_20200916_2335'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='avatar',
        ),
    ]
