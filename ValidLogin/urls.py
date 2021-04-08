from django.urls import path
from . import views

urlpatterns = [
    path('', views.validation),
    path('logout/', views.loggout),
    path('token/', views._token_validation)
]
