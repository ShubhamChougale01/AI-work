import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from .models import UserProfile

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        """
        Called when the WebSocket is handshaking as part of initial connection.
        """
        # Get the user from the scope (set by authentication)
        user = self.scope["user"]
        
        if user.is_anonymous:
            # Reject the connection
            await self.close()
            return
        
        # Add the user to their personal notification group
        self.user_group = f"user_{user.id}"
        await self.channel_layer.group_add(
            self.user_group,
            self.channel_name
        )
        
        # Accept the connection
        await self.accept()
        
        # Send initial connection message
        await self.send(text_data=json.dumps({
            'type': 'connection_established',
            'message': 'Connected to notification service'
        }))

    async def disconnect(self, close_code):
        """
        Called when the WebSocket closes for any reason.
        """
        # Remove from the notification group
        if hasattr(self, 'user_group'):
            await self.channel_layer.group_discard(
                self.user_group,
                self.channel_name
            )

    async def receive(self, text_data):
        """
        Called when we get a text frame from the client.
        """
        try:
            data = json.loads(text_data)
            message_type = data.get('type')
            
            if message_type == 'toggle_notifications':
                # Toggle notification settings
                enabled = data.get('enabled', True)
                await self.toggle_notifications(enabled)
                
                await self.send(text_data=json.dumps({
                    'type': 'notification_settings_updated',
                    'enabled': enabled
                }))
            
        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({
                'type': 'error',
                'message': 'Invalid message format'
            }))

    async def send_notification(self, event):
        """
        Called when a notification needs to be sent to the client.
        """
        # Send the notification to the WebSocket
        await self.send(text_data=json.dumps(event['message']))

    @database_sync_to_async
    def toggle_notifications(self, enabled: bool):
        """
        Toggle notification settings for the user.
        """
        user = self.scope["user"]
        profile, _ = UserProfile.objects.get_or_create(user=user)
        profile.notification_enabled = enabled
        profile.save()
        return enabled 