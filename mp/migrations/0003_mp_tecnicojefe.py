# Generated by Django 3.1.7 on 2021-04-01 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mp', '0002_auto_20210331_1740'),
    ]

    operations = [
        migrations.AddField(
            model_name='mp',
            name='tecnicoJefe',
            field=models.CharField(default='', help_text='Tecnico encargado', max_length=50, verbose_name='TecnicoJefe'),
        ),
    ]
