# Generated by Django 5.0.6 on 2024-09-06 09:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_city_name_alter_region_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='monument',
            name='name',
            field=models.CharField(max_length=1000),
        ),
    ]