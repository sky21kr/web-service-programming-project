"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.views.generic import TemplateView
from classManager.views import ClassTableViewSet
from classManager.views import ToDoTableViewSet
from classManager.views import MainToDoTableViewSet


# router = routers.DefaultRouter()
# router.register('class', views.ClassTableView, 'class')

class HomeTemplateView(TemplateView):
    template_name = 'index.html'

urlpatterns = [
    path('', HomeTemplateView.as_view(), name='home'),
    path('admin/', admin.site.urls),
    path('api/class', ClassTableViewSet.as_view({'get':'list', 'post':'create'})),
    path('api/to-do', ToDoTableViewSet.as_view({'get':'list', 'post':'create'})),
    path('api/main-to-do', MainToDoTableViewSet.as_view({'get':'list', 'post':'create'}))
]
