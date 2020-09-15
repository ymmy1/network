from datetime import datetime
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Post(models.Model):
    username = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user")
    # avatar = models.ForeignKey("User", on_delete=models.PROTECT, related_name="username_avatar")
    likes = models.PositiveSmallIntegerField(default=0, blank=True, null=True)
    body = models.TextField(blank=True)
    timestamp = models.DateTimeField(default=datetime.now())
    liked = models.BooleanField(default=False)

class Profile(models.Model):
    username = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="user")
    # avatar = models.ForeignKey("User", on_delete=models.PROTECT, related_name="username_avatar")
    following = models.PositiveSmallIntegerField(default=0, blank=True, null=True)
    followers = models.PositiveSmallIntegerField(default=0, blank=True, null=True)
    likes = models.PositiveSmallIntegerField(default=0, blank=True, null=True)