# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from .models import Post
# Create your views here.


posts = [

	{
		"author" : "Mudassir",
		"title" : "Dummy Post",
		"content": "1st post Content",
		"date_posted" : "August 21, 2018"
	},
	{
		"author" : "Ali",
		"title" : "Dummy Post 2",
		"content": "2nd post Content",
		"date_posted" : "September 21, 2018"
	}
]

def home(request):
	#context = {'posts' : posts, 'title': 'Test'}
	context = {'posts': Post.objects.all(), 'title': 'Test'}
	return render(request, 'blog/home.html', context)


def about(request):
	return render(request, 'blog/about.html')