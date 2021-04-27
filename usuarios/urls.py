from django.urls import path
from . import views

urlpatterns = [
    path('lineas/', views.get_lines),
]
