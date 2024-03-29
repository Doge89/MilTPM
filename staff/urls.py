from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='users'),
    path('get/', views.get_all_staff),
    path('get/<linea>/', views.get_staff_line),
    path('get/history/<linea>/', views.History_Line),
    path('create/', views.create_user),
    path('getIn/<linea>/', views.manage_users),
    path('getIn/', views.manage_users),
    path('exits/<linea>/', views.manage_exit_users),
    path('exits/', views.manage_exit_users),
    path('filter/', views.QueryByFilter),
    path('in/micro/', views.manage_user_micro)
]

