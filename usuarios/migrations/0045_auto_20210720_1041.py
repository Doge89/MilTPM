# Generated by Django 3.1.7 on 2021-07-20 10:41

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0044_auto_20210719_1819'),
    ]

    operations = [
        migrations.AlterField(
            model_name='andonhist',
            name='finishReg',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 20, 10, 41, 24, 588362), help_text='Fecha y hora exacta de finalizacion', verbose_name='Fin Tiempo Muerto'),
        ),
    ]
