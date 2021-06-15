from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ClassTableSerializer
from .models import ClassTable


# Create your views here.
class ClassTableView(viewsets.ModelViewSet):
    serializer_class = ClassTableSerializer
    queryset = ClassTable.objects.all()