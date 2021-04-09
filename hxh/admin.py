from django.contrib import admin
from .models import infoGeneral, infoProduccion
# Register your models here.

class generalAdm(admin.ModelAdmin):
    fields = ['faltas','linea','incidencias','consola','bajas','job','mod','entrenamiento']

class prodAdm(admin.ModelAdmin):
    fields = ['plan','actual','diferencia','tiempoMuerto','codigo','cantidad','descripcion','contramedida','comentarios','turno','info']

admin.site.register(infoGeneral, generalAdm)
admin.site.register(infoProduccion, prodAdm)