# Generated by Django 3.0.8 on 2020-09-17 06:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0010_remove_user_avatar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='body',
        ),
        migrations.RemoveField(
            model_name='post',
            name='liked',
        ),
        migrations.RemoveField(
            model_name='post',
            name='likes',
        ),
        migrations.RemoveField(
            model_name='post',
            name='timestamp',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='following',
        ),
    ]