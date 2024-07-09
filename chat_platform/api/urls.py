# interest_app/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  MessageViewSet,CreateInterestView ,UpdateInterestView


router = DefaultRouter()
router.register(r'messages', MessageViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('interests/', CreateInterestView.as_view(), name='interest-create'),
    path('updateinterests/<int:pk>', UpdateInterestView.as_view(), name='interest-updte'),


]
