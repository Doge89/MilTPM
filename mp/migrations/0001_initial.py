# Generated by Django 3.1.7 on 2021-03-31 14:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('usuarios', '0006_auto_20210331_1414'),
    ]

    operations = [
        migrations.CreateModel(
            name='mp',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('fecha', models.DateTimeField(help_text='Fecha de registro del MP', verbose_name='Fecha')),
                ('area', models.CharField(help_text='Area de la produccion', max_length=30, verbose_name='Area')),
                ('turno', models.CharField(help_text='Turno de la produccion', max_length=1, verbose_name='Turno')),
                ('tecnico', models.CharField(help_text='Tecnico encargado', max_length=50, verbose_name='Tecnico')),
                ('superMTTO', models.CharField(blank=True, default='', help_text='Supervisor de Mantenimiento', max_length=30, verbose_name='SuperMtto')),
                ('superPRDN', models.CharField(blank=True, default='', help_text='Supervisor de Produccion', max_length=30, verbose_name='SuperPrdn')),
                ('nombre', models.CharField(blank=True, default='', help_text='Nombre de quien reporto', max_length=30, verbose_name='Nombre')),
                ('hora', models.TimeField(help_text='Hora de reporte', verbose_name='Hora')),
                ('tipoMaquina', models.CharField(help_text='Maquina a la cual se detecto falla', max_length=50, verbose_name='TipoMaquina')),
                ('tagMaquina', models.CharField(blank=True, default='', help_text='Identificador de la maquina', max_length=15, verbose_name='TagMaquina')),
                ('descripcion', models.CharField(blank=True, default='', help_text='Descripcion de falla', max_length=500, verbose_name='Descripcion')),
                ('tipoFalla', models.CharField(help_text='Tipo de falla que se presento', max_length=30, verbose_name='TipoFalla')),
                ('afecta', models.BooleanField(help_text='Afecta o no a produccion', verbose_name='Afecta')),
                ('horaInicio', models.TimeField(help_text='Hora en que inicio el tiempo muerto', verbose_name='Hora Inicio')),
                ('horaFinal', models.TimeField(help_text='Hora en que finalizo el tiempo muerto', verbose_name='Hora Final')),
                ('reparacion', models.CharField(blank=True, default='', help_text='Reparacion empleada', max_length=500, verbose_name='Reparacion')),
                ('refacciones', models.CharField(blank=True, default='', help_text='Refacciones usadas', max_length=100, verbose_name='Refacciones')),
                ('causa', models.CharField(blank=True, default='', help_text='Causa probable del problema', max_length=1000, verbose_name='Causa')),
                ('tiempoMuerto', models.TimeField(help_text='Tiempo muerto empleado', verbose_name='Tiempo Muerto')),
                ('validado', models.CharField(blank=True, default='', help_text='Validado por', max_length=50, verbose_name='Validado')),
                ('linea', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='usuarios.linea')),
            ],
            options={
                'verbose_name': 'Mp',
                'verbose_name_plural': 'Mps',
                'db_table': 'mp',
                'managed': True,
            },
        ),
    ]