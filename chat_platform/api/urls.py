# interest_app/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InterestViewSet, MessageViewSet

router = DefaultRouter()
router.register(r'interests', InterestViewSet)
router.register(r'messages', MessageViewSet)

urlpatterns = [
    path('/', include(router.urls)),

]
