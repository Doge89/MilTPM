from django.urls import path
from . import views

urlpatterns = [

    path('', views.index, name='MP'),
    path('post/', views.post_mp),
    path('historial/', views.historial, name='historial'),
    path('historial/get/', views._get_mp)

]
