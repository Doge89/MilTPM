from django.urls import path
from . import views

urlpatterns = [

    path('', views.index, name='HXH'),
    path('get/', views.get),
    path('post/', views.post),
    path('historial/', views.historial, name='Historial'),
    path('historial/get/', views.historial_get)

]
