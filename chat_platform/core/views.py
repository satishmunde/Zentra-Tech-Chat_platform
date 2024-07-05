from rest_framework.response import Response
from rest_framework import viewsets, permissions,generics
from core.serializers import LoginSystemSerializer
from .models import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserSerializer  
from api.models import *  

User = get_user_model()
# Create your views here.
class LoginSystemViewSet(viewsets.ModelViewSet):
    queryset = LoginSystem.objects.all()
    serializer_class = LoginSystemSerializer
    lookup_field = 'pk'
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [SessionAuthentication]



class FilteredUserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        accepted_invitations = user.received_interests.filter(status='accepted')  # Using related name for efficiency
        accepted_users = [invitation.sender for invitation in accepted_invitations]
        return User.objects.exclude(id=user.id).exclude(id__in=accepted_users)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)