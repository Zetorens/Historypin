# Generated by Django 5.0.6 on 2024-09-06 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_monument_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='monument',
            name='address',
            field=models.CharField(max_length=1000),
        ),
        migrations.AlterField(
            model_name='monument',
            name='name',
            field=models.CharField(max_length=500),
        ),
    ]