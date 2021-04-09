from django.contrib import admin
from .models import  mp
# Register your models here.
class mpAdm(admin.ModelAdmin):
    fields = ['linea','area','turno','tecnico','tecnicoJefe','superMTTO','superPRDN','nombre','hora','tipoMaquina','tagMaquina','descripcion','tipoFalla','afecta','horaInicio','horaFinal','reparacion','refacciones','causa','validado']

admin.site.register(mp, mpAdm)