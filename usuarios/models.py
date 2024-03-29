import jwt
from django.db import models
from datetime import datetime, timedelta
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.
class UsuariosManager(BaseUserManager):

    def create_user(self, username, email, password=None, linea = None, clave = None, user_type = None, dep = None):

        if username is None:
            raise TypeError("Los usuarios deben tener un nombre de Usuario")

        user = self.model(username = username, email = self.normalize_email(email), linea = linea, clave = clave, user_type = user_type, dep = dep)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password, linea, clave, user_type, dep):
        #print(clave)
        if password is None:
            raise TypeError("Superusuarios deben tener una contrasena")

        if linea is None:
            raise TypeError("Superusuarios deben de tener una linea")

        if clave is None:
            raise TypeError("Superusuarios deben de tener una clave")

        user = self.create_user(username, email, password, linea, clave, user_type, dep)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        if user_type == 'production':
            lineaProd = Linea.objects.create(Id = None, linea = linea, usuario = user)

        return user


class Usuarios(AbstractBaseUser, PermissionsMixin):

    username = models.CharField(db_index=True, max_length=200, unique=True)

    email = models.EmailField(db_index=True, blank=True, unique=True)

    linea = models.CharField(max_length=50, unique=False, blank=True, default='')

    clave = models.CharField(max_length=50, blank=False, default=None, unique=True)

    user_type = models.CharField(max_length=50, blank=False, default=None)

    dep = models.CharField(max_length=50, blank=True, default = None)

    is_active = models.BooleanField(default=True)

    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_At = models.DateTimeField(auto_now=True)

    USERNAME_FIELD='username'

    REQUIRED_FIELDS = ['email','linea', 'clave', 'user_type', 'dep']

    objects = UsuariosManager()

    def __unicode__(self):
        return "%s %s %s %s %s %s" % (self.id, self.username, self.email, self.linea, self.user_type, self.dep)

    def __repr__(self):
        return self.__unicode__()

    @property
    def token(self):
        return self._generate_jwt_token()

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    def _generate_jwt_token(self):

        dt = datetime.now() + timedelta(days=1)

        token = jwt.encode({

            'id': self.pk,
            'exp': int(dt.strftime('%s'))

        }, settings.SECRET_KEY, algorithm='HS256')
    
        return token.decode('utf-8')

    def __del__(self):
        del self

class Linea(models.Model):
    Id = models.AutoField(primary_key=True)
    linea = models.CharField(max_length=50, blank=False, help_text=_('Linea de Produccion'), verbose_name=_('Linea'))
    usuario = models.OneToOneField(Usuarios, on_delete=models.CASCADE, related_name='usuario', related_query_name='production')
    personal = models.IntegerField(verbose_name=_("Personal"), blank=False, default=0, help_text=_("Numero de personal en la linea"))
    class Meta:
        db_table = 'Linea'
        managed = True
        verbose_name = 'Linea'
        verbose_name_plural = 'Lineas'
    
    def __unicode__(self):
        return "%s %s" % (self.linea, self.usuario)

class LineaStaff(models.Model):
    Id = models.AutoField(primary_key = True)
    turno = models.CharField(max_length=20, verbose_name=_("Turno"), help_text=_("Turno de produccion"), blank=False, default="")
    staff = models.IntegerField(verbose_name=_("Trabajadores"), blank=False, default=0, help_text=_("Número de trabajadores en el turno"))
    linea = models.ForeignKey(Linea, on_delete=models.CASCADE, related_name="staff", related_query_name="LineStaff")

    class Meta:
        db_table = "LineaStaff"
        managed = True
        verbose_name = "Staff"
        verbose_name_plural = "Lines Staff"

    def __unicode__(self):
        return "%s %s %s" % (self.turno, self.staff, self.linea)

    def __repr__(self):
        return self.__unicode__()
class Andon(models.Model):
    Id = models.AutoField(primary_key=True)
    estatus = models.CharField(max_length=20, blank=True, default='', help_text=_('Estatus'), verbose_name=_('Estado'))
    linea = models.ForeignKey(Linea, on_delete=models.CASCADE, related_name='Estados', default=None)
    registro = models.DateTimeField(verbose_name = _('Registro'), auto_now_add=False, help_text=_('Inicio del andon'), default=None)
    pause = models.CharField(verbose_name = _('Pause'), help_text=_('Hora de pausa'), max_length=1500, default='', blank=True)
    active = models.BooleanField(verbose_name=_('Active'), help_text=_('Esta pausado?'), default=True)
    class Meta:
        db_table = 'Andon'
        managed = True
        verbose_name = 'Andon'
        verbose_name_plural = 'Estados'

    def __str__(self):
        return "%s %s " % (self.estatus, self.linea)

    def __repr__(self):
        return self.__str__()

class AndonHist(models.Model):
    Id = models.AutoField(primary_key=True)
    estatus = models.CharField(max_length=15, blank=False, help_text=_('Estado inicial de la linea en ese momento'), verbose_name=_('Estatus'))
    linea = models.ForeignKey(Linea, on_delete=models.CASCADE, related_name='histLin', default=None)
    registro = models.DateTimeField(verbose_name=_('Fecha y hora de reporte'), auto_now_add=False)
    finishDep = models.CharField(max_length=50, verbose_name=_("Razon de la falla"), help_text=_("Razon de la falla"), blank = False, default = '')
    tiempoM = models.CharField(max_length=50, verbose_name=_("Tiempo Muerto"), blank = True, default = '00:00:00', help_text=_("Tiempo Muerto"))
    finishReg = models.DateTimeField(verbose_name=_("Fin Tiempo Muerto"), auto_now_add=False, help_text=_("Fecha y hora exacta de finalizacion"), default=datetime.now())

    class Meta:
        db_table = 'AndonHist'
        managed = True
        verbose_name ='HistorialAndon'
        verbose_name_plural ='HistorialAndones'

    def __unicode__(self):
        return "%s %s %s" % (self.estatus, self.registro, self.tiempoM)

    def __repr__(self):
        return self.__unicode__()