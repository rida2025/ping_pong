# Generated by Django 4.2.16 on 2024-10-15 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0002_player_status_game'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='exp_game',
            field=models.IntegerField(default=100),
        ),
    ]
