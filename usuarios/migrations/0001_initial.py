# Generated by Django 3.1.7 on 2021-03-29 19:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(db_index=True, max_length=200, unique=True)),
                ('email', models.EmailField(blank=True, db_index=True, max_length=254, unique=True)),
                ('linea', models.CharField(max_length=50, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_At', models.DateTimeField(auto_now=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Linea',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('linea', models.CharField(help_text='Linea de Produccion', max_length=50, verbose_name='Linea')),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='usuario', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Linea',
                'verbose_name_plural': 'Lineas',
                'db_table': 'Linea',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Andon',
            fields=[
                ('Id', models.AutoField(primary_key=True, serialize=False)),
                ('estatus', models.CharField(blank=True, default='', help_text='Estatus', max_length=20, verbose_name='Estado')),
                ('linea', models.ManyToManyField(related_name='Estados', related_query_name='Andon', to='usuarios.Linea')),
            ],
            options={
                'verbose_name': 'Andon',
                'verbose_name_plural': 'Estados',
                'db_table': 'Amdpm',
                'managed': True,
            },
        ),
    ]
