from django.db import models
from usuarios.models import Linea
from django.utils.translation import gettext_lazy as _
# Create your models here.

class mp(models.Model):
    Id = models.AutoField(primary_key=True)
    linea = models.ForeignKey(Linea, on_delete=models.CASCADE)
    fecha = models.DateField(verbose_name = _('Fecha'), auto_now=False, help_text = _('Fecha de registro del MP'))
    area = models.CharField(max_length= 30, verbose_name = _('Area'), help_text = _('Area de la produccion'), blank=False)
    turno = models.CharField(max_length=1, verbose_name = _('Turno'), help_text =_('Turno de la produccion'), blank=False)
    tecnico = models.CharField(max_length=50, verbose_name = _('Tecnico'), help_text = _('Tecnico encargado'), blank=False)
    tecnicoJefe = models.CharField(max_length=50, verbose_name = _('TecnicoJefe'), help_text = _('Tecnico encargado'), blank=False, default='')
    superMTTO = models.CharField(max_length=30, verbose_name = _('SuperMtto'), help_text = _('Supervisor de Mantenimiento'), blank=True, default='')
    superPRDN = models.CharField(max_length=30, verbose_name = _('SuperPrdn'), help_text = _('Supervisor de Produccion'), blank=True, default='')
    nombre = models.CharField(max_length=30, verbose_name = _('Nombre'), help_text = _('Nombre de quien reporto'), blank=True, default='')
    hora = models.TimeField(verbose_name = _('Hora'), help_text = _('Hora de reporte'), auto_now = False)
    tipoMaquina = models.CharField(max_length=50, verbose_name = _('TipoMaquina'), help_text = _('Maquina a la cual se detecto falla'), blank=False)
    tagMaquina = models.CharField(max_length=15, verbose_name = _('TagMaquina'), help_text=_('Identificador de la maquina'), blank=True, default='')
    descripcion = models.CharField(max_length=500, verbose_name = _('Descripcion'), help_text= _('Descripcion de falla'), blank=True, default='')
    tipoFalla = models.CharField(max_length=30, verbose_name = _('TipoFalla'), help_text=_('Tipo de falla que se presento'), blank=False)
    afecta = models.BooleanField(verbose_name=_('Afecta'), blank=False, help_text=_('Afecta o no a produccion'))
    horaInicio = models.TimeField(verbose_name=_('Hora Inicio'), auto_now = False, help_text=_('Hora en que inicio el tiempo muerto'))
    horaFinal = models.TimeField(verbose_name=_('Hora Final'), auto_now = False, help_text=_('Hora en que finalizo el tiempo muerto'))
    reparacion = models.CharField(max_length=500, verbose_name = _('Reparacion'), help_text=_('Reparacion empleada'), blank=True, default='')
    refacciones = models.CharField(max_length=100, verbose_name = _('Refacciones'), help_text=_('Refacciones usadas'), blank=True, default='')
    causa = models.CharField(max_length=1000, verbose_name = _('Causa'), help_text=_('Causa probable del problema'), blank=True, default='')
    tiempoMuerto = models.TimeField(verbose_name=_('Tiempo Muerto'), help_text=_('Tiempo muerto empleado'), auto_now=False)
    validado = models.CharField(max_length=50, verbose_name = _('Validado'), help_text=_('Validado por'), blank=True, default='')

    class Meta:
        db_table = 'mp'
        managed = True
        verbose_name = 'Mp'
        verbose_name_plural = 'Mps'

    def __unicode__(self):
        return " %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s %s" % (self.Id, self.linea, self.fecha, self.area, self.turno, self.tecnico, self.superMTTO, self.superPRDN, self.nombre, self.hora, self.tipoMaquina, self.tagMaquina, self.descripcion, self.tipoFalla, self.afecta, self.horaInicio, self.horaFinal, self.reparacion, self.refacciones, self.causa, self.tiempoMuerto, self.validado)

    def __repr__(self):
        return self.__unicode__()
