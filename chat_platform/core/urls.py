# urls.py

from django.urls import path
from .views import FilteredUserListView

urlpatterns = [
    path('', FilteredUserListView.as_view(), name='filtered-users'),
]
