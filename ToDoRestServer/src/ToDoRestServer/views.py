'''
Created on 06-Jan-2013

@author: abmodi
'''

from django.shortcuts import render_to_response

def home(request):
    return render_to_response("index.html")
