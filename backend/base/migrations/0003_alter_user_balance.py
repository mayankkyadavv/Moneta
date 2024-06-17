# Generated by Django 5.0.2 on 2024-06-16 22:53

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0002_alter_user_date_time_alter_user_first_name_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="balance",
            field=models.DecimalField(
                blank=True, decimal_places=2, default=0, max_digits=10
            ),
        ),
    ]