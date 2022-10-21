# Generated by Django 4.0.1 on 2022-10-09 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exercise', '0002_alter_exercise_weight'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bench',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('weight', models.DecimalField(decimal_places=2, max_digits=6)),
                ('reps', models.IntegerField()),
                ('sets', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Deadlift',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('weight', models.DecimalField(decimal_places=2, max_digits=6)),
                ('reps', models.IntegerField()),
                ('sets', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Squat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('weight', models.DecimalField(decimal_places=2, max_digits=6)),
                ('reps', models.IntegerField()),
                ('sets', models.IntegerField()),
            ],
        ),
    ]
