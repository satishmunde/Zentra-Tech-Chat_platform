# urls.py

from django.urls import path
from .views import FilteredUserListView,FriendRequestListView,MemberListView

urlpatterns = [
    path('', FilteredUserListView.as_view(), name='filtered-users'),
    path('members/', MemberListView.as_view(), name='connected-users'),
    path('friendrequest/', FriendRequestListView.as_view(), name='friendrequest-users'),
]
