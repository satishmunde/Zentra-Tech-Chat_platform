# users/views.py
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import  Interest, Message
from .serializers import  InterestSerializer, MessageSerializer  #,UserSerializer
from django.contrib.auth import get_user_model


class InterestViewSet(viewsets.ModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        interest = self.get_object()
        interest.status = 'accepted'
        interest.save()
        return Response(self.get_serializer(interest).data)

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        interest = self.get_object()
        interest.status = 'rejected'
        interest.save()
        return Response(self.get_serializer(interest).data)

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
