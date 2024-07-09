from django.conf import settings
from django.db import models


from django.contrib.auth.models import AbstractUser

class Interest(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='sent_interests', on_delete=models.CASCADE)
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='received_interests', on_delete=models.CASCADE)
    message = models.TextField()
    status = models.CharField(max_length=10, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')])

class Message(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='sent_messages', on_delete=models.CASCADE)
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

