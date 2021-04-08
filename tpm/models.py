from django.db import models
from usuarios.models import Usuarios, Linea
from django.utils.translation import ugettext_lazy as _
# Create your models here.

class Maquina(models.Model):
    Id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)

    class Meta:
        db_table = 'Maquinas'
        managed = True
        verbose_name = 'Maquina'
        verbose_name_plural = 'Maquinas'

    def __unicode__(self):
        return self.nombre

class Cronograma(models.Model):
    Id = models.AutoField(primary_key=True)
    maquina = models.ForeignKey(Maquina, on_delete=models.CASCADE, related_name='maquinaDia')
    dia = models.IntegerField(verbose_name=_('Dia'), help_text=_('Dia de la semana'))

    class Meta:
        db_table = 'Cronograma'
        managed = True
        verbose_name = 'Cronograma'
        verbose_name_plural = 'Cronogramas'

    def __unicode__(self):
        return "%s %s" % (self.maquina, self.dia)

class Tarjetas(models.Model):
    Id = models.AutoField(primary_key=True)
    maquina = models.ForeignKey(Maquina, on_delete=models.CASCADE, related_name='maquina')
    descripcion = models.CharField(max_length=1000, blank=True, default='', help_text=_('Descripcion de la falla'), verbose_name=_('Descripcion'))
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    area = models.CharField(max_length=35, blank=True, default='', help_text=_('Area encargada'), verbose_name=_('Area'))
    categoria = models.CharField(max_length=20, blank=True, default='', help_text=_('Categoria'), verbose_name=_('Categoria'))
    localizacion = models.ForeignKey(Linea, on_delete=models.CASCADE)
    propuesta = models.CharField(max_length=500, blank=True, default='', help_text=_('Propuesta realizada'), verbose_name=_('Propuesta'))
    implementada = models.CharField(max_length=500, blank=True, default='', help_text=_('Propuesta implementada'), verbose_name=_('PropuestaImplementada'))
    tipo = models.BooleanField(verbose_name=_('TipoTarjeta'), help_text=_('Tarjeta conforme o no'))
    fecha = models.DateTimeField(verbose_name=_('Fecha'), help_text=_('Fecha y hora de reporte'), auto_now_add=False)

    class Meta:
        db_table = 'Tarjetas'
        managed = True
        verbose_name = 'Tarjeta'
        verbose_name_plural = 'Tarjetas'

    def __unicode__(self):
        return "%s %s %s %s %s %s %s %s %s" % (self.descripcion, self.usuario, self.area, self.categoria, self.localizacion, self.propuesta, self.implementada, self.tipo, self.fecha)

    def __repr__(self):
        return self.__unicode__() 

class Actividades(models.Model):
    Id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100, blank=False, verbose_name=_('Nombre'), help_text=_('Actividad'))
    tipo = models.CharField(max_length=50, blank=False, verbose_name=_('Tipo'), help_text=_('Tipo de Actividad'))
    maquinas = models.ForeignKey(Maquina, on_delete=models.CASCADE, related_name='maqAct')
    status = models.BooleanField(verbose_name=_('Status'), help_text=_('OK OR BAD'), default=None)
    registro = models.DateTimeField(verbose_name=_('Registro'), help_text=_('Hora de reporte'), auto_now_add=False)

    class Meta:
        db_table = 'Actividades'
        managed = True
        verbose_name = 'Actividad'
        verbose_name_plural = 'Actividades'

    def __unicode__(self):
        return "%s %s %s %s %s" % (self.nombre, self.tipo, self.maquinas, self.status, self.registro)

    def __repr__(self):
        return self.__unicode__()

class sel_com(models.Model):
    Id = models.AutoField(primary_key=True)
    com = models.CharField(max_length=10, help_text=_('Puerto COM'), verbose_name=_('COM'), blank=True, default='')

    class Meta:
        db_table = 'sel_com'
        managed = True
        verbose_name = 'selCom'
        verbose_name_plural = 'selComs'

class com(models.Model):
    Id = models.AutoField(primary_key=True)
    com = models.ForeignKey(sel_com, on_delete=models.CASCADE, related_name='selCom')
    user = models.ForeignKey(Usuarios, on_delete=models.CASCADE, related_name='userCom')
    registro = models.DateTimeField(verbose_name=_('Fecha'), auto_now_add=False, help_text=_('Cambio de COM'))
    
    class Meta:
        db_table = 'comhist'
        managed = True
        verbose_name = 'Com'
        verbose_name_plural = 'Puertos'

    def __unicode__(self):
        return "%s %s" % (self.com, self.registro)

    def __repr__(self):
        return self.__unicode__()
