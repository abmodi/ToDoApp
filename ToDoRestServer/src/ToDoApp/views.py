from django.core import serializers
from django.http import HttpResponse

from models import ToDoItem

from simple_rest import Resource

import json

class ToDo(Resource):
    
    def _serialize(self,todos):
        oldjs = json.loads(todos);
        newjs = []
        for c in oldjs:
            temp = c['fields']
            temp['id'] = c['pk']
            newjs.append(temp)
            
        newJson = json.dumps(newjs)
        return newJson
    
    def get(self, request,todo_id=None, **kwargs):
        json_serializer = serializers.get_serializer('json')()
        if todo_id:
            todos = json_serializer.serialize(ToDoItem.objects.filter(pk=todo_id))
        else:
            todos = json_serializer.serialize(ToDoItem.objects.all())
        return HttpResponse(self._serialize(todos), content_type='application/json; charset=utf-8', status=200)

    
    def post(self, request, *args, **kwargs):
        hack_json_value = request.POST.keys()[0]
        hack_query_dict = json.loads(hack_json_value)
        desc = hack_query_dict['title']
        stat = hack_query_dict['completed']
        starr = hack_query_dict['starred']
        todoitem = ToDoItem.objects.create(title = desc,completed=stat,starred=starr)
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
