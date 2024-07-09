# users/views.py
from rest_framework import viewsets, permissions, status,generics
from rest_framework.response import Response

from .models import  Interest, Message
from .serializers import  InterestSerializer, MessageSerializer  #,UserSerializer
from django.contrib.auth import get_user_model
from django.db.models import Q



class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    # permission_classes = [IsAuthenticated]  # Ensure the view is protected

    def list(self, request, *args, **kwargs):
        sender = request.user  # Get the sender from the token
        member = self.request.query_params.get('memberId')
        
        if not member:
            return Response({'error': 'Member ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        messages = Message.objects.filter(
            Q(recipient__username=member, sender=sender) | Q(recipient=sender, sender__username=member)
        )
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)
   

    
    def create(self, request, *args, **kwargs):
        # Ensure the sender is the logged-in user
        sender = request.user

        recipient_username = request.data.get('recipient_id') 
      
        sender_instance = sender.id  # This assumes sender is already an instance of User
        recipient_instance = get_user_model().objects.get(username=recipient_username)

        validated_data = request.data.copy()
        print(validated_data)
        validated_data['sender'] = sender_instance
        validated_data['recipient'] = recipient_instance.id
        print(validated_data)
        message = Message.objects.create(sender=sender, recipient=recipient_instance, content = validated_data['content'])


        return Response(status=status.HTTP_201_CREATED)


User = get_user_model()
class CreateInterestView(generics.CreateAPIView):
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        sender = self.request.user
        recipient = User.objects.get(username=self.request.data.get('recipient'))
        message = self.request.data.get('message')
        status = 'pending'
        serializer.save(sender=sender, recipient=recipient, message=message, status=status)
        

class UpdateInterestView(generics.UpdateAPIView):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        return Interest.objects.filter(recipient=user_id)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()
        
