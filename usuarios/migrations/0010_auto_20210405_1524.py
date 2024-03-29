# Generated by Django 3.1.7 on 2021-04-05 15:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0009_auto_20210405_1521'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='clave',
            field=models.CharField(default='', max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='andon',
            name='linea',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='Estados', to='usuarios.linea'),
        ),
    ]
