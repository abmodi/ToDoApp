from django.db import models

# Create your models here.
class ToDoItem(models.Model):
    title = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    completed = models.BooleanField()
    starred = models.BooleanField()
    
    def __unicode__(self):
        return self.title