from django.db import models
from datetime import datetime
from usuarios.models import Linea
from django.utils.translation import ugettext_lazy as _
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
    no_personal = models.IntegerField(verbose_name=_("No. Personal"), blank=False, default=0, help_text=_("Numero de trabajadores en la linea"))

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
    operarios = models.IntegerField(verbose_name=_("Operarios"), blank=False, default=0, help_text=_("Numero de Operarios"))
    info = models.ForeignKey(infoGeneral, on_delete=models.CASCADE)

    class Meta:
        db_table = 'infoProduccion'
        managed = True
        verbose_name = 'infoProduccion'
        verbose_name_plural = 'InformacionDeProduccion'

    def __unicode__(self):
        return "{} {} {} {} {} {} {} {} {} {} {} {} {} {} {}\n".format(self.inicio, self.final, self.plan, self.actual, self.diferencia, self.tiempoMuerto, self.codigo, self.cantidad, self.descripcion, self.contramedida, self.comentarios, self.turno, self.fecha, self.info, self.operarios)

    def __repr__(self):
        return self.__unicode__()

class Staff(models.Model):
    Id = models.AutoField(primary_key=True)
    key = models.CharField(max_length = 32, verbose_name = _("Key"), blank =False , default = "", help_text=_("LLave unica de usuario"), db_index = True, unique = True)
    name = models.CharField(max_length=255, verbose_name=_("Nombre"), blank=False, default = "", help_text=_("Nombre del operador"))
    is_active = models.BooleanField(verbose_name=_("Trabaja?"), blank=False, default=True, help_text=_("El usuario sigue laborando?"))
    status = models.CharField(verbose_name=_("Estatus"), max_length=5, blank=False, default="OFF", help_text=_("Estatus del trabajador"))
    register = models.DateTimeField(verbose_name=_("Registro"), auto_now_add=False, help_text = _("Fecha de inicio laboral"), default = datetime.now())
    linea = models.ForeignKey(to = Linea, on_delete=models.SET_NULL, related_name="StaffUser", related_query_name="StaffUser", default = None, null=True)

    class Meta:
        db_table = "Staff"
        managed = True,
        verbose_name = "Staff"
        verbose_name_plural = "Miebros de la planta"

    def __unicode__(self):
        return "%s %s %s %s %s" % (self.key, self.name, self.is_active, self.register, self.status)

    def __repr__(self):
        return self.__unicode__()

class SignUp(models.Model):
    Id = models.AutoField(primary_key=True)
    user = models.ForeignKey(to=Staff, on_delete=models.PROTECT, related_name="StaffMemberIn", related_query_name="MemberIn", verbose_name=_("Usuario"), help_text=_("Usuario correspondiente"))
    linea = models.ForeignKey(to=Linea, on_delete=models.PROTECT, related_name="StaffLineIn", related_query_name="LineOperation", verbose_name=_("Linea"), help_text=_("Linea de trabajo"))
    fecha = models.DateField(verbose_name=_("Dia"), auto_now_add=False, blank =False, default = datetime.date(datetime.now()), help_text=_("Fecha actual"))
    hora = models.TimeField(verbose_name=_("Hora"), auto_now_add=False, blank = False, help_text=_("Hora de entrada"))

    class Meta:
        db_table = 'Entradas_Staff'
        managed = True
        verbose_name = 'Registro'
        verbose_name_plural = 'Registros'

    def __unicode__(self):
        return "%s %s %s %s" % (self.user, self.linea, self.fecha, self.hora)

    def __repr__(self):
        return self.__unicode__()

class Loggout(models.Model):
    Id = models.AutoField(primary_key=True)
    user = models.ForeignKey(to=Staff, on_delete=models.PROTECT, related_name="StaffMemberOff", related_query_name="MemberOf", verbose_name=_("Usuario"), help_text=_("Usuario correspondiente"))
    linea = models.ForeignKey(to=Linea, on_delete=models.PROTECT, related_name="StaffLineOff", related_query_name="LineOperationOff", verbose_name=_("Linea"), help_text=_("Linea de trabajo"))
    fecha = models.DateField(verbose_name=_("Dia"), auto_now_add=False, blank =False, default = datetime.date(datetime.now()), help_text=_("Fecha actual"))
    hora = models.TimeField(verbose_name=_("Hora"), auto_now_add=False, blank = False, help_text=_("Hora de entrada"))

    class Meta:
        db_table = 'Salidas_Staff'
        managed = True
        verbose_name = 'Salida'
        verbose_name_plural = 'Salidas'

    def __unicode__(self):
        return "%s %s %s %s" % (self.user, self.linea, self.fecha, self.hora)

    def __repr__(self):
        return self.__unicode__()

class History(models.Model):
    Id = models.AutoField(primary_key=True)
    user = models.ForeignKey(to=Staff, on_delete=models.RESTRICT, related_name="UserResume", related_query_name="ResumeUser")
    linea = models.ForeignKey(to=Linea, on_delete=models.PROTECT, related_name="LineResume", related_query_name="ResumeLine")
    status = models.CharField(verbose_name=_("Estatus"), max_length = 5, help_text=_("Estatus del registro"), default = "")
    registro = models.DateTimeField(verbose_name=_("Hora"), auto_now_add=False, help_text = _("Hora del registro"), default = datetime.now())

    class Meta:
        db_table = 'historial_move'
        managed = True
        verbose_name = 'Hisotrial'
        verbose_name_plural = 'Records'

    def __unicode__(self):
        return "%s %s %s %s" % (self.user, self.linea, self.status, self.registro)

    def __repr__(self):
        return self.__unicode__()