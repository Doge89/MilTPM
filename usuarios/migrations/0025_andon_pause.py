# Generated by Django 3.1.7 on 2021-04-05 16:25

from django.db import migrations, models
from datetime import datetime

class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0024_remove_andon_pause'),
    ]

    operations = [
        migrations.AddField(
            model_name='andon',
            name='pause',
            field=models.DateTimeField(default=datetime.now(), help_text='Hora de pausa', verbose_name='Pause'),
            preserve_default=False,
        ),
    ]
