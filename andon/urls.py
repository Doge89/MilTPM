from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='Andon'),
    path('start/', views.start_andon),
    path('finish/', views.finish_andon),
]
