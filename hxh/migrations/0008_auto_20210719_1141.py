# Generated by Django 3.1.7 on 2021-07-19 11:41

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0043_auto_20210719_1141'),
        ('hxh', '0007_auto_20210719_1100'),
    ]

    operations = [
        migrations.AddField(
            model_name='staff',
            name='linea',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='StaffUser', related_query_name='StaffUser', to='usuarios.linea'),
        ),
        migrations.AlterField(
            model_name='staff',
            name='register',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 19, 11, 41, 58, 323445), help_text='Fecha de inicio laboral', verbose_name='Registro'),
        ),
    ]
