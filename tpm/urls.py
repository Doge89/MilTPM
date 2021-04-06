from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='TPM'),
    path('get/', views._get_panel_inf),
    path('maquina/', views._get_act_machine),
    path('post/', views._post_tpm_inf),
    path('modificar/cronograma/get/', views.cronograma),
    path('modificar/cronograma/delete/', views.cronograma_delete),
    path('modificar/usuarios/', views.usuarios),
    path('modificar/usuarios/del/', views._del_user),
    path('modificar/usuarios/modify/', views._modify_user),
    path('historial/', views._machine_history),
    path('historial/maquina/', views._get_machine_card),
    path('historial/get/id/', views._get_machine_card_by_id),
    path('historial/modificar/', views._modify_card)
]
