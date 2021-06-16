from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ClassTableSerializer
from .serializers import ToDoTableSerializer
from .serializers import MainToDoTableSerializer
from .models import ClassTable
from .models import ToDoTable
from .models import MainToDoTable

# Create your views here.
class ClassTableView(viewsets.ModelViewSet):
    serializer_class = ClassTableSerializer
    queryset = ClassTable.objects.all()

# Create your views here.
class ToDoTableView(viewsets.ModelViewSet):
    serializer_class = ToDoTableSerializer
    queryset = ToDoTable.objects.all()

# Create your views here.
class MainToDoTableView(viewsets.ModelViewSet):
    serializer_class = MainToDoTableSerializer
    queryset = MainToDoTable.objects.all()