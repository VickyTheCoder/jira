# Generated by Django 5.1.1 on 2024-10-22 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team_members',
            name='id',
        ),
        migrations.AlterField(
            model_name='team_members',
            name='email',
            field=models.EmailField(max_length=254, primary_key=True, serialize=False),
        ),
    ]