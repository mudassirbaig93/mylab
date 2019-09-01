from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url('^about', views.about, name='blog-about'),
    url(r'', views.home, name='blog-home'),

]