from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='Andon'),
    path('start/', views.start_andon),
    path('startMic/', views._start_andon_micro),
    path('finish/', views.finish_andon),
    path('pause/', views._pause_andon),
    path('get/<linea>/', views._get_status)
]
