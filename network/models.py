from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    avatar = models.TextField(default="avatar_bucket.png")
    following = models.PositiveSmallIntegerField(default=0, blank=True, null=True)
    followers = models.PositiveSmallIntegerField(default=0, blank=True, null=True)
    likes = models.PositiveSmallIntegerField(default=0, blank=True, null=True)
    pass


class Post(models.Model):
    username = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user")
    likes = models.PositiveSmallIntegerField(default=0, blank=True, null=True)
    body = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    liked = models.BooleanField(default=False)
    
