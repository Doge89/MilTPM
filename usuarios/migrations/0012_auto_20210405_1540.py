# Generated by Django 3.1.7 on 2021-04-05 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0011_auto_20210405_1539'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='clave',
            field=models.CharField(default=None, max_length=50, unique=True),
        ),
    ]
