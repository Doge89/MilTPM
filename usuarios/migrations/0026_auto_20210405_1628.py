# Generated by Django 3.1.7 on 2021-04-05
from datetime import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0025_andon_pause'),
    ]

    operations = [
        migrations.AlterField(
            model_name='andon',
            name='pause',
            field=models.DateTimeField(default=datetime.now(), help_text='Hora de pausa', verbose_name='Pause'),
        ),
    ]