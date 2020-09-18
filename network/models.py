from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    avatar = models.TextField(default="avatar_bucket.png")
    following_count = models.PositiveSmallIntegerField(default=0, blank=True, null=True)
    followers_count = models.PositiveSmallIntegerField(default=0, blank=True, null=True)
    like_count = models.PositiveSmallIntegerField(default=0, blank=True, null=True)
    followers = models.ManyToManyField("User", related_name="followers_id")
    following = models.ManyToManyField("User", related_name="following_id")
    pass


class Post(models.Model):
    username = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user")
    likes = models.PositiveSmallIntegerField(default=0, blank=True, null=True)
    body = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    liked = models.BooleanField(default=False)
    
