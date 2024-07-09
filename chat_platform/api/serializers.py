# users/serializers.py
from rest_framework import serializers
from .models import Interest, Message
from django.conf import settings


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ['id', 'sender', 'recipient', 'message', 'status']
   

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(source='sender.username', read_only=True)
    recipient = serializers.CharField(source='recipient.username', read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'recipient', 'content', 'timestamp']
