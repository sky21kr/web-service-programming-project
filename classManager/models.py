from django.db import models

# Create your models here.
class ClassTable(models.Model):
    classId = models.TextField()
    className = models.TextField()

    # def __str__(self):
    #     return self.text

class ToDoTable(models.Model):
    toDoId = models.TextField()
    contents = models.TextField()

class MainToDoTable(models.Model):
    contents = models.TextField()