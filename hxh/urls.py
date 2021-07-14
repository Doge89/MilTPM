from django.urls import path
from . import views

urlpatterns = [

    path('', views.index, name='HXH'),
    path('get/', views.get),
    path('get/all/', views._get_all_hxh),
    path('get/<linea>/', views.get),
    path('get/act/', views._get_actual),
    path('get/act/<linea>/', views._get_actual),
    path('post/', views.post),
    path('post/pz/<linea>/', views._actual_pieces),
    path('historial/', views.historial, name='Historial'),
    path('historial/get/', views.historial_get),

    path('all/lines/', views._get_all_lines),
    path('get/status/<linea>/', views._get_status_line)

]
