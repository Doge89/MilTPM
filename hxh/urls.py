from django.urls import path
from . import views

urlpatterns = [

    path('', views.index, name='HXH'),
    path('get/', views.get),
    path('get/<linea>/', views.get),
    path('get/act/', views._get_actual),
    path('post/', views.post),
    path('post/pz/<linea>/', views._actual_pieces),
    path('historial/', views.historial, name='Historial'),
    path('historial/get/', views.historial_get)

]
