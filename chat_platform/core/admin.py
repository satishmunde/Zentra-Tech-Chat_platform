from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib import admin
from core.models import *

@admin.register(LoginSystem)
class LoginSystemAdmin(BaseUserAdmin):

    add_fieldsets = (
        (None, {
 
            'fields': ('username',  'email', 'phone_number' ,'date_of_birth','profile_pictures','password', 'confirm_password')}
        ),
    )
    list_display = ('username', 'date_of_birth','email', 'first_name', 'last_name')
    search_fields = ('username', 'email','date_of_birth' ,'first_name', 'last_name')
    ordering = ('username',)    