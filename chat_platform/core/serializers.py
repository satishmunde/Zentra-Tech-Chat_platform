from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer 
from djoser.serializers import UserSerializer as BaseUserSerializer
# from django.contrib.auth import get_user_model

from rest_framework import serializers
from .models import LoginSystem
class LoginSystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginSystem
        fields = ['id', 'username','first_name', 'email','date_of_birth', 'phone_number','profile_pictures']


class UserCreateSerializer(BaseUserCreateSerializer):
    
    class Meta(BaseUserCreateSerializer.Meta):
        ref_name = "UserCreate"  
        fields = ['id','username', 'first_name','last_name', 'email', 'date_of_birth', 'phone_number','profile_pictures','password']


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        ref_name = "BaseUser"  
        fields = ['id','username', 'first_name','last_name', 'email', 'date_of_birth', 'phone_number','profile_pictures']
