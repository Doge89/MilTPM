from django.contrib import admin
from .models import Usuarios
# Register your models here.

class UsuariosAdm(admin.ModelAdmin):
    fields = ['username','password','linea']

admin.site.register(Usuarios, UsuariosAdm)
