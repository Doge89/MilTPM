# Generated by Django 3.1.7 on 2021-07-22 16:22

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0045_auto_20210720_1041'),
    ]

    operations = [
        migrations.AlterField(
            model_name='andonhist',
            name='finishReg',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 22, 16, 22, 53, 944513), help_text='Fecha y hora exacta de finalizacion', verbose_name='Fin Tiempo Muerto'),
        ),
        migrations.AlterField(
            model_name='andonhist',
            name='tiempoM',
            field=models.CharField(blank=True, default='00:00:00', help_text='Tiempo Muerto', max_length=50, verbose_name='Tiempo Muerto'),
        ),
    ]
