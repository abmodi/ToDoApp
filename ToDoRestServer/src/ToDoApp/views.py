from django.core import serializers
from django.http import HttpResponse

from models import ToDoItem

from simple_rest import Resource

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

import json

def serialize(jsonData):
    oldjs = json.loads(jsonData);
    newjs = []
    for c in oldjs:
        temp = c['fields']
        temp['id'] = c['pk']
        newjs.append(temp)
        
    newJson = json.dumps(newjs)
    return newJson

class ToDo(Resource):
    
    def get(self, request,todo_id=None, **kwargs):
        if request.user.is_authenticated():
            json_serializer = serializers.get_serializer('json')()
            if todo_id:
                todos = json_serializer.serialize(ToDoItem.objects.filter(pk=todo_id))
            else:
                todos = json_serializer.serialize(ToDoItem.objects.filter(username=request.user.username))
            return HttpResponse(serialize(todos), content_type='application/json; charset=utf-8', status=200)

    
    def post(self, request,*args, **kwargs):
        hack_json_value = request.POST.keys()[0]
        hack_query_dict = json.loads(hack_json_value)
        desc = hack_query_dict['title']
        stat = hack_query_dict['completed']
        starr = hack_query_dict['starred']
        todoitem = ToDoItem.objects.create(title = desc,completed=stat,starred=starr,username=request.user.username)
        return HttpResponse(todoitem.id,status=201)
    
    def delete(self,request,todo_id):
        todo = ToDoItem.objects.get(pk=todo_id)
        todo.delete()
        return HttpResponse(status=200)
    
    def put(self, request, *args, **kwargs):
        hack_json_value = request.POST.keys()[0]
        hack_query_dict = json.loads(hack_json_value)
        desc = hack_query_dict['title']
        stat = hack_query_dict['completed']
        starr = hack_query_dict['starred']
        todo_id = hack_query_dict['id']
        todo = ToDoItem.objects.get(pk=todo_id)
        todo.title = desc
        todo.completed = stat
        todo.starred = starr
        todo.save()# Create your views here.
        return HttpResponse(status=200)
 
 
class Session(Resource):
     
    def post(self,request,uri=None):
        un = request.POST['username']
        pw = request.POST['password']
        if uri and uri == "signup":
            email = request.POST['email']
            user = User.objects.create_user(username=un, email=email, password=pw)
            user.save();
            
        user = authenticate(username = un, password = pw)
        if user is not None:
            if user.is_active:
                login(request,user)
            else:
                return HttpResponse('{"success":false,"error":"User has been banned"}');
                # do something -- can't figure it out right now
        else:
            return HttpResponse('{"success":false,"error":"Invalid Username or password"}');
        return HttpResponse('{"success":true}',status=200)
        