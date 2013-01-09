from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

import settings
from views import home

urlpatterns = patterns('',
    url(r'^$',home),
    url(r'^api/',include('ToDoApp.urls')),
    # Examples:
    # url(r'^$', 'ToDoRestServer.views.home', name='home'),
    # url(r'^ToDoRestServer/', include('ToDoRestServer.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += patterns('',
            (r'^static/(.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    )
