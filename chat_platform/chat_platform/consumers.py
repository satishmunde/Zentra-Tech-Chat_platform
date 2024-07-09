# chat/consumers.py

import datetime
from channels.generic.websocket import AsyncWebsocketConsumer
import json
# from api.models import content

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        content = text_data_json['content']
        sender = text_data_json['sender']
        recipient = text_data_json['recipient']


        # Send content to recipient
        await self.send_content(content, sender, recipient)

    async def send_content(self, content, sender, recipient):
        print('print send content called')
        
         # Format the content data
        content_data = {
            'sender': sender,
            'content': content
        }
        

        recipient_room_group_name = f'chat_{recipient}'
        await self.channel_layer.group_send(
            recipient_room_group_name,
            {
                'type': 'chat_content',
                'content_data': content_data
            }
        )

    async def chat_content(self, event):
        content_data = event['content_data']
        # Send content to WebSocket
        await self.send(text_data=json.dumps({
            'content': content_data['content'],
            'sender': content_data['sender'],
            'timestamp':datetime.now(),
        }))
