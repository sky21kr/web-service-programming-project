from rest_framework import serializers
from .models import ClassTable
from .models import ToDoTable
from .models import MainToDoTable
from .models import UserTable



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

class UserTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTable
        fields = '__all__'