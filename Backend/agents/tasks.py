from celery import shared_task
from django.utils import timezone
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Reminder, UserProfile
import json

@shared_task
def check_reminders():
    """
    Check for due reminders and send notifications through WebSocket.
    """
    now = timezone.now()
    
    # Get reminders that are due but not completed
    due_reminders = Reminder.objects.filter(
        reminder_time__lte=now,
        is_completed=False
    ).select_related('user')
    
    channel_layer = get_channel_layer()
    
    for reminder in due_reminders:
        # Check if user has notifications enabled
        try:
            user_profile = UserProfile.objects.get(user=reminder.user)
            if not user_profile.notification_enabled:
                continue
        except UserProfile.DoesNotExist:
            continue
        
        # Prepare notification data
        notification_data = {
            'type': 'reminder_notification',
            'reminder_id': reminder.id,
            'title': reminder.title,
            'description': reminder.description,
            'reminder_time': reminder.reminder_time.isoformat()
        }
        
        # Send notification through WebSocket
        async_to_sync(channel_layer.group_send)(
            f"user_{reminder.user.id}",
            {
                'type': 'send_notification',
                'message': notification_data
            }
        )

@shared_task
def send_reminder_notification(user_id: int, reminder_id: int):
    """
    Send a specific reminder notification to a user.
    """
    try:
        reminder = Reminder.objects.get(id=reminder_id, user_id=user_id)
        user_profile = UserProfile.objects.get(user_id=user_id)
        
        if not user_profile.notification_enabled:
            return
        
        channel_layer = get_channel_layer()
        notification_data = {
            'type': 'reminder_notification',
            'reminder_id': reminder.id,
            'title': reminder.title,
            'description': reminder.description,
            'reminder_time': reminder.reminder_time.isoformat()
        }
        
        async_to_sync(channel_layer.group_send)(
            f"user_{user_id}",
            {
                'type': 'send_notification',
                'message': notification_data
            }
        )
    except (Reminder.DoesNotExist, UserProfile.DoesNotExist):
        pass 