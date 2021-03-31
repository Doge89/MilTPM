# Generated by Django 3.1.7 on 2021-03-31 15:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0003_auto_20210331_0827'),
    ]

    operations = [
        migrations.CreateModel(
            name='AndonHist',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('registro', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de reporte')),
                ('estatus', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='hist', to='usuarios.andon')),
                ('linea', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='histLin', to='usuarios.linea')),
            ],
            options={
                'verbose_name': 'HistorialAndon',
                'verbose_name_plural': 'HistorialAndones',
                'db_table': 'AndonHist',
                'managed': True,
            },
        ),
    ]