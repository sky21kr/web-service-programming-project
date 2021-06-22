from django.contrib import admin
from .models import ClassTable
from .models import ToDoTable
from .models import MainToDoTable
from .models import UserTable

# Register your models here.

admin.site.register(ClassTable)
admin.site.register(ToDoTable)
admin.site.register(MainToDoTable)
admin.site.register(UserTable)