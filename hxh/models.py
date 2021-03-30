from django.db import models
from django.utils.translation import ugettext_lazy as _
from usuarios.models import Linea
# Create your models here.

class infoGeneral(models.Model):
    Id = models.AutoField(primary_key=True, help_text=_('Identificador unico'), verbose_name=_('ID'))
    faltas = models.CharField(help_text=_('No. de Personal Faltante'), max_length=2, blank=True, default='', verbose_name=_('Faltas'))
    linea = models.ForeignKey(Linea, on_delete=models.CASCADE)
    incidencias = models.CharField(max_length=2, blank=True, help_text=_('No. de Incidencias'), verbose_name=_('Incidencias'), default='')
    consola = models.CharField(max_length=20, blank=False, help_text=_('No. de Consola'), verbose_name=_('Consola'))
    bajas = models.CharField(max_length=2, blank=True, help_text=_('No. de Bajas'), verbose_name=_('Bajas'), default='')
    job = models.CharField(max_length=15, blank=False, help_text=_('No. de Job'), verbose_name=_('Job'))
    mod = models.CharField(max_length=15, blank=False, help_text=_('No. de modelo'), verbose_name=_('Modelo'))
    entrenamiento = models.CharField(max_length=2, blank=True, help_text=_('Personal en Entrenamiento'), verbose_name=_('Entrenamiento'), default='')

    class Meta:
        db_table = 'infoGeneral'
        managed = True
        verbose_name = 'InfoGeneral'
        verbose_name_plural = 'EstadosGenerales'

    def __str__(self):
        return "%s %s %s %s %s %s %s %s" % (self.faltas, self.linea, self.incidencias, self.consola, self.bajas, self.job, self.mod, self.entrenamiento)

    def __repr__(self):
        return self.__str__()

class infoProduccion(models.Model):
    Id = models.AutoField(primary_key=True)
    inicio = models.TimeField(help_text=_('Inicio de Produccion'), verbose_name=_('Inicio'), auto_now=False)
    final = models.TimeField(help_text=_('Final de Produccion'), verbose_name=_('Final'), auto_now=False)
    plan = models.IntegerField(verbose_name=_('Plan'), help_text=_('Plan deseado de produccion'))
    actual = models.IntegerField(verbose_name=_('Actual'), help_text=_('Actual de la produccion'))
    diferencia = models.IntegerField(verbose_name=_('Diferencia'), help_text=_('Diferencia de la produccion'))
    tiempoMuerto = models.CharField(max_length=1000, blank=True, default='', help_text=_('Tiempo muerto '), verbose_name=_('Tiempo muerto'))
    codigo = models.CharField(max_length=100, blank=True, default='', help_text=_('Codigo de Scrap'), verbose_name=_('Codigo'))
    cantidad = models.CharField(max_length=100, blank=True, default='', help_text=_('Cantidad de Scrap'), verbose_name=_('Cantidad'))
    descripcion = models.CharField(max_length=1000, blank=True, default='', help_text=_('Descripcion de falla'), verbose_name=_('Descripcion'))
    contramedida = models.CharField(max_length=1000, blank=True, default='', help_text=_('Contramedida de la falla'), verbose_name=_('Contramedida'))
    comentarios = models.CharField(max_length=1000, blank=True, default='', help_text=_('Comentarios adicionar'), verbose_name=_('Comentarios'))
    turno = models.CharField(max_length=3, blank=True, default='', help_text=_('Turno'), verbose_name=_('Turno'))
    fecha = models.DateField(auto_now_add=False, verbose_name=_('Fecha'), help_text=_('Fecha'))
    info = models.ForeignKey(infoGeneral, on_delete=models.CASCADE)

    class Meta:
        db_table = 'infoProduccion'
        managed = True
        verbose_name = 'infoProduccion'
        verbose_name_plural = 'InformacionDeProduccion'

    def __unicode__(self):
        return "{} {} {} {} {} {} {} {} {} {} {} {} {} {}\n".format(self.inicio, self.final, self.plan, self.actual, self.diferencia, self.tiempoMuerto, self.codigo, self.cantidad, self.descripcion, self.contramedida, self.comentarios, self.turno, self.fecha, self.info)

    def __repr__(self):
        return self.__unicode__()