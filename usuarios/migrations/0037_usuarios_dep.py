# Generated by Django 3.1.7 on 2021-07-02 08:10

from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0036_auto_20210629_1655'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='dep',
            field=models.CharField(default=None, max_length=50),
        ),
    ]
