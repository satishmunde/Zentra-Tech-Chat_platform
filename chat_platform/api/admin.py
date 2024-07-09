from django.contrib import admin
from .models import Interest, Message


class InterestAdmin(admin.ModelAdmin):
    list_display = ['id','sender', 'recipient', 'message', 'status']  
    search_fields = ['sender', 'recipient', 'message']
    list_filter = ['status']

class MessageAdmin(admin.ModelAdmin):
    list_display = ['id','sender', 'recipient', 'content', 'timestamp']
    search_fields = ['sender', 'recipient', 'content']


admin.site.register(Interest, InterestAdmin)
admin.site.register(Message, MessageAdmin)

