# Generated by Django 3.1.7 on 2021-04-05 16:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0026_auto_20210405_1628'),
    ]

    operations = [
        migrations.AlterField(
            model_name='andon',
            name='pause',
            field=models.DateTimeField(default=datetime.datetime.now(), help_text='Hora de pausa', verbose_name='Pause'),
        ),
    ]