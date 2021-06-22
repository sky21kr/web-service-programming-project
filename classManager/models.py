from django.db import models

# Create your models here.
class ClassTable(models.Model):
    classId = models.AutoField(primary_key=True)
    className = models.TextField()

    # def __str__(self):
    #     return self.text

class ToDoTable(models.Model):
    classId = models.ForeignKey("ClassTable", related_name="classTable", on_delete=models.CASCADE, db_column="class")
    toDoId = models.AutoField(primary_key=True)
    contents = models.TextField()
    checkedDate = models.TextField(blank=True)


class MainToDoTable(models.Model):
    toDoId = models.AutoField(primary_key=True)
    contents = models.TextField()
    checkedDate = models.TextField(blank=True)