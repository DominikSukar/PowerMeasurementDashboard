# Generated by Django 5.0.3 on 2024-03-24 22:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='powerstations',
            name='device',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.connecteddevices'),
        ),
        migrations.AlterUniqueTogether(
            name='connecteddevices',
            unique_together={('ip', 'port')},
        ),
    ]
