from rest_framework import serializers
from .models import ClassTable
from .models import ToDoTable
from .models import MainToDoTable



class ClassTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassTable
        fields = '__all__'

class ToDoTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoTable
        fields = '__all__'

class MainToDoTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainToDoTable
        fields = '__all__'