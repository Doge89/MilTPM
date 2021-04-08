from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='layout'),
    path('status/', views._get_status),
]
