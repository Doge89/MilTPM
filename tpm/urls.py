from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='TPM'),
    path('get/', views._get_panel_inf),
    path('post/', views._post_tpm_inf),
    path('modificar/cronograma/get/', views.cronograma),
    path('modificar/cronograma/delete/', views.cronograma_delete)
]
