# Generated by Django 3.0.8 on 2020-09-17 06:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0009_remove_post_avatar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='avatar',
        ),
    ]
