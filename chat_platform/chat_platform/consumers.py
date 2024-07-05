# chat/consumers.py

from channels.generic.websocket import AsyncWebsocketConsumer
import json

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
        print(text_data)
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender = text_data_json['sender']
        recipient = text_data_json['recipient']

        # Send message to recipient
        await self.send_message(message, sender, recipient)

    async def send_message(self, message, sender, recipient):
        # Format the message data
        message_data = {
            'sender': sender,
            'message': message
        }

        # Send message to recipient's group
        recipient_room_group_name = f'chat_{recipient}'
        await self.channel_layer.group_send(
            recipient_room_group_name,
            {
                'type': 'chat.message',
                'message_data': message_data
            }
        )

    async def chat_message(self, event):
        message_data = event['message_data']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message_data['message'],
            'sender': message_data['sender']
        }))
