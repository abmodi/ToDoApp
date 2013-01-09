'''
Created on 07-Jan-2013

@author: abmodi
'''

from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()
from views import ToDo

urlpatterns = patterns('',
    url(r'^todos/?$', ToDo.as_view()),
    url(r'^todos/(?P<todo_id>\d+)', ToDo.as_view()),
    )
