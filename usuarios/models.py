import jwt
from django.db import models
from datetime import datetime, timedelta
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.

class UsuariosManager(BaseUserManager):

    def create_user(self, username, email, password=None, linea = None):

        if username is None:
            raise TypeError("Los usuarios deben tener un nombre de Usuario")

        user = self.model(username = username, email = self.normalize_email(email), linea = linea)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password, linea):

        if password is None:
            raise TypeError("Superusuarios deben tener una contrasena")

        if linea is None:
            raise TypeError("Superusuarios deben de tener una linea")

        user = self.create_user(username, email, password, linea)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        lineaProd = Linea.objects.create(Id = None, linea = linea, usuario = user)

        return user


class Usuarios(AbstractBaseUser, PermissionsMixin):

    username = models.CharField(db_index=True, max_length=200, unique=True)

    email = models.EmailField(db_index=True, blank=True, unique=True)

    linea = models.CharField(max_length=50, unique=True, blank=False)

    is_active = models.BooleanField(default=True)

    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_At = models.DateTimeField(auto_now=True)

    USERNAME_FIELD='username'

    REQUIRED_FIELDS = ['email', 'linea']

    objects = UsuariosManager()

    def __str__(self):
        return self.password

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

class Linea(models.Model):
    Id = models.AutoField(primary_key=True)
    linea = models.CharField(max_length=50, blank=False, help_text=_('Linea de Produccion'), verbose_name=_('Linea'))
    usuario = models.OneToOneField(Usuarios, on_delete=models.CASCADE, related_name='usuario')

    class Meta:
        db_table = 'Linea'
        managed = True
        verbose_name = 'Linea'
        verbose_name_plural = 'Lineas'
    
    def __str__(self):
        return self.linea

class Andon(models.Model):
    Id = models.AutoField(primary_key=True)
    estatus = models.CharField(max_length=20, blank=True, default='', help_text=_('Estatus'), verbose_name=_('Estado'))
    linea = models.ManyToManyField(Linea, related_query_name='Andon', related_name='Estados')

    class Meta:
        db_table = 'Andon'
        managed = True
        verbose_name = 'Andon'
        verbose_name_plural = 'Estados'

    def __str__(self):
        return "{} {} \n".format(self.estatus, self.linea)

    def __repr__(self):
        return self.__str__()