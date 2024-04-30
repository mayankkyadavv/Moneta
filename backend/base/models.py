from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    first_name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=30, blank=False)
    username = models.CharField(max_length=25, unique=True, help_text="Max Length is 25 characters!")
    password = models.CharField(max_length=100, blank=False)
    email = models.EmailField(unique=True)
    date_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"The logged in user is: {self.username}"


class Income(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    name = models.CharField(max_length=30)
    description = models.TextField(blank=True, default="")
    date = models.DateField(auto_now=False, auto_now_add=False)


    def __str__(self):
        return f"Income: {self.amount} for {self.name}!"
    
    
class Expense(models.Model):
    CATEGORIES = (("GR", "Groceries"), 
                    ("UT", "Utilities"), 
                    ("EN", "Entertainment"), 
                    ("HC", "Healthcare"), 
                    ("TR", "Transportation"),
                    ("OT", "Other"))
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    name = models.CharField(max_length=30)
    category = models.CharField(max_length=2, choices=CATEGORIES)
    date = models.DateField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return f"Expense: {self.amount} for {self.name}!"
    



