from rest_framework.response import Response
from rest_framework import viewsets, permissions,generics
from api.serializers import InterestSerializer
from core.serializers import LoginSystemSerializer
from .models import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserSerializer  
from api.models import *  
from django.db.models import Q

User = get_user_model()
# Create your views here.
class LoginSystemViewSet(viewsets.ModelViewSet):
    queryset = LoginSystem.objects.all()
    serializer_class = LoginSystemSerializer
    lookup_field = 'pk'

class FilteredUserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        related_invitations = Interest.objects.filter(
            Q(recipient=user) | Q(sender=user), 
            status__in=['accepted', 'pending']
        )

        related_users = set()
        for invitation in related_invitations:
            if invitation.sender != user:
                related_users.add(invitation.sender.id)
            if invitation.recipient != user:
                related_users.add(invitation.recipient.id)

        return User.objects.exclude(id__in=related_users).exclude(id=user.id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

class MemberListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        accepted_invitations = Interest.objects.filter(Q(recipient=user, status='accepted') | Q(sender=user, status='accepted'))
        
        accepted_users = set()
        for invitation in accepted_invitations:
            if invitation.sender != user:
                accepted_users.add(invitation.sender.id)
            if invitation.recipient != user:
                accepted_users.add(invitation.recipient.id)

        return User.objects.filter(id__in=accepted_users)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

class FriendRequestListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        print(f"Current user: {user}")

        pending_requests = Interest.objects.filter(recipient=user, status='pending')

        pending_users = [request.sender.id for request in pending_requests]
        print(f"Pending friend requests: {pending_requests}")
        for request in pending_requests:
            print(f"Request details: {vars(request)}")
        
        return {
            'users': User.objects.filter(id__in=pending_users),
            'pending_requests': pending_requests
        }

    def list(self, request, *args, **kwargs):
        data = self.get_queryset()

       
        users_serializer = self.get_serializer(data['users'], many=True)
        users_data = users_serializer.data

        interests_serializer = InterestSerializer(data['pending_requests'], many=True)
        interests_data = interests_serializer.data
        combined_data = []
        for user_data in users_data:
           
            for interest_data in interests_data:
                if interest_data['sender'] == user_data['id']:

                    user_data['request_id'] = interest_data['id']

            combined_data.append(user_data)
        return Response(combined_data)
