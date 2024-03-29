# Generated by Django 3.1.7 on 2021-04-08 11:00

from django.conf import settings
from django.db import migrations, models
from tpm.models import sel_com
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tpm', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actividades',
            name='maquinas',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='maqAct', to='tpm.maquina'),
        ),
        migrations.AlterField(
            model_name='cronograma',
            name='maquina',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='maquinaDia', to='tpm.maquina'),
        ),
        migrations.AlterField(
            model_name='tarjetas',
            name='maquina',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='maquina', to='tpm.maquina'),
        ),
        migrations.CreateModel(
            name='com',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('com', models.CharField(blank=True, default='', help_text='Puerto COM a usar', max_length=10, verbose_name='COM')),
                ('registro', models.DateTimeField(help_text='Cambio de COM', verbose_name='Fecha')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Com',
                'verbose_name_plural': 'Puertos',
                'db_table': 'com',
                'managed': True,
            },
        ),
    ]
