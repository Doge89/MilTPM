# Generated by Django 3.1.7 on 2021-07-13 18:28

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0040_auto_20210713_1031'),
    ]

    operations = [
        migrations.AlterField(
            model_name='andonhist',
            name='finishReg',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 13, 18, 28, 8, 653717), help_text='Fecha y hora exacta de finalizacion', verbose_name='Fin Tiempo Muerto'),
        ),
    ]
