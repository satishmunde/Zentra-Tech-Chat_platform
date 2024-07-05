from django.contrib.auth.models import AbstractUser
from django.db import models

class LoginSystem(AbstractUser):

    email = models.EmailField(unique=True)
    date_of_birth = models.DateField(blank=False,null=True)    
    phone_number = models.CharField(max_length=10, blank=False, null=True)
    profile = models.ImageField()
    profile_pictures = models.ImageField(upload_to='profile_pictures/',blank=True ,null=True)
