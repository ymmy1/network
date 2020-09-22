
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("profile/<int:profile_id>", views.profile, name="profile"),
    path("unlike_post", views.unlike_post, name="unlike_post"),
    path("follow_user", views.follow_user, name="follow_user"),
    path("like_post", views.like_post, name="like_post"),
    path("new_post", views.new_post, name="new_post"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register")
]
