from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='TPM'),
    path('get/', views._get_panel_inf),
    path('get/<linea>/',views._get_panel_inf),
    path('maquina/', views._get_act_machine),
    path('post/', views._post_tpm_inf),
    path('post/<linea>/', views._post_tpm_inf),
    path('modificar/cronograma/get/', views.cronograma),
    path('modificar/cronograma/get/<linea>/', views.cronograma),
    path('modificar/cronograma/delete/', views.cronograma_delete),
    path('modificar/usuarios/', views.usuarios),
    path('modificar/usuarios/del/', views._del_user),
    path('modificar/usuarios/modify/', views._modify_user),
    path('modificar/linea/', views._add_production_line),
    path('modificar/puerto/', views._select_com),
    path('historial/', views._machine_history),
    path('historial/maquina/', views._get_machine_card),
    path('historial/get/id/', views._get_machine_card_by_id),
    path('historial/modificar/', views._modify_card),

    path('get/line/<linea>/', views.__get_line_info),
    path('change/workers/', views._change_line_data)
    
]
