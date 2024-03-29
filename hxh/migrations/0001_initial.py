# Generated by Django 3.1.7 on 2021-03-29 22:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='infoGeneral',
            fields=[
                ('Id', models.AutoField(help_text='Identificador unico', primary_key=True, serialize=False, verbose_name='ID')),
                ('faltas', models.CharField(blank=True, default='', help_text='No. de Personal Faltante', max_length=2, verbose_name='Faltas')),
                ('linea', models.CharField(help_text='Linea de produccion', max_length=50, verbose_name='Linea')),
                ('incidencias', models.CharField(blank=True, default='', help_text='No. de Incidencias', max_length=2, verbose_name='Incidencias')),
                ('consola', models.CharField(help_text='No. de Consola', max_length=20, verbose_name='Consola')),
                ('bajas', models.CharField(blank=True, default='', help_text='No. de Bajas', max_length=2, verbose_name='Bajas')),
                ('job', models.CharField(help_text='No. de Job', max_length=15, verbose_name='Job')),
                ('mod', models.CharField(help_text='No. de modelo', max_length=15, verbose_name='Modelo')),
                ('entrenamiento', models.CharField(blank=True, default='', help_text='Personal en Entrenamiento', max_length=2, verbose_name='Entrenamiento')),
            ],
            options={
                'verbose_name': 'InfoGeneral',
                'verbose_name_plural': 'EstadosGenerales',
                'db_table': 'infoGeneral',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='infoProduccion',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('inicio', models.TimeField(help_text='Inicio de Produccion', verbose_name='Inicio')),
                ('final', models.TimeField(help_text='Final de Produccion', verbose_name='Final')),
                ('plan', models.IntegerField(help_text='Plan deseado de produccion', verbose_name='Plan')),
                ('actual', models.IntegerField(help_text='Actual de la produccion', verbose_name='Actual')),
                ('diferencia', models.IntegerField(help_text='Diferencia de la produccion', verbose_name='Diferencia')),
                ('tiempoMuerto', models.CharField(blank=True, default='', help_text='Tiempo muerto ', max_length=1000, verbose_name='Tiempo muerto')),
                ('codigo', models.CharField(blank=True, default='', help_text='Codigo de Scrap', max_length=100, verbose_name='Codigo')),
                ('cantidad', models.CharField(blank=True, default='', help_text='Cantidad de Scrap', max_length=100, verbose_name='Cantidad')),
                ('descripcion', models.CharField(blank=True, default='', help_text='Descripcion de falla', max_length=1000, verbose_name='Descripcion')),
                ('contramedida', models.CharField(blank=True, default='', help_text='Contramedida de la falla', max_length=1000, verbose_name='Contramedida')),
                ('comentarios', models.CharField(blank=True, default='', help_text='Comentarios adicionar', max_length=1000, verbose_name='Comentarios')),
                ('turno', models.CharField(blank=True, default='', help_text='Turno', max_length=3, verbose_name='Turno')),
                ('fecha', models.DateTimeField(auto_now_add=True, help_text='Fecha', verbose_name='Fecha')),
                ('info', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='hxh.infogeneral')),
            ],
            options={
                'verbose_name': 'infoProduccion',
                'verbose_name_plural': 'InformacionDeProduccion',
                'db_table': 'infoProduccion',
                'managed': True,
            },
        ),
    ]
