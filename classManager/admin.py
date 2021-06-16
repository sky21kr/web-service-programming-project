from django.contrib import admin
from .models import ClassTable
from .models import ToDoTable
from .models import MainToDoTable

# Register your models here.

admin.site.register(ClassTable)
admin.site.register(ToDoTable)
admin.site.register(MainToDoTable)