from rest_framework import serializers
from .models import ClassTable


class ClassTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassTable
        fields = '__all__'