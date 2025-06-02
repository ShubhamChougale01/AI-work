from ..models import Reminder, ChatMessage
from django.contrib.auth.models import User
from datetime import datetime, timedelta
import re
from django.utils import timezone

def parse_reminder_time(text: str) -> datetime | None:
    """Extract reminder time from text using simple patterns."""
    try:
        # First try to find a specific date and time
        match = re.search(r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}', text)
        if match:
            return datetime.strptime(match.group(), '%Y-%m-%d %H:%M')
        
        # Try to find relative time patterns
        now = timezone.now()
        
        # Handle "in X minutes/hours/days"
        match = re.search(r'in (\d+) (minute|hour|day)s?', text.lower())
        if match:
            amount = int(match.group(1))
            unit = match.group(2)
            
            if unit == 'minute':
                return now + timedelta(minutes=amount)
            elif unit == 'hour':
                return now + timedelta(hours=amount)
            elif unit == 'day':
                return now + timedelta(days=amount)
        
        # Handle "tomorrow at HH:MM"
        match = re.search(r'tomorrow at (\d{1,2}):(\d{2})', text.lower())
        if match:
            hour = int(match.group(1))
            minute = int(match.group(2))
            tomorrow = now + timedelta(days=1)
            return tomorrow.replace(hour=hour, minute=minute)
        
        return None
    except:
        return None

def handle_reminder(query: str, user: User) -> str:
    """
    Handle reminder-related queries from users.
    Manages reminders including creation, updates, and status checks.
    """
    # Store the user's message
    ChatMessage.objects.create(
        user=user,
        content=query,
        agent_type='reminder',
        is_user_message=True
    )
    
    query_lower = query.lower()
    
    # Handle new reminder creation
    if any(keyword in query_lower for keyword in ['remind me', 'set reminder', 'create reminder']):
        reminder_time = parse_reminder_time(query)
        if not reminder_time:
            response = ("I couldn't understand when to set the reminder. Please specify a time like:\n"
                       "- 'in 30 minutes'\n"
                       "- 'tomorrow at 14:30'\n"
                       "- '2024-03-15 10:00'")
        else:
            # Extract title/description
            title = query.split(' to ', 1)[1] if ' to ' in query else query
            
            reminder = Reminder.objects.create(
                user=user,
                title=title,
                description=title,
                reminder_time=reminder_time
            )
            
            response = f"I'll remind you to '{title}' at {reminder_time.strftime('%Y-%m-%d %H:%M')}"
    
    # Handle reminder completion
    elif any(keyword in query_lower for keyword in ['complete reminder', 'finished reminder', 'done with reminder']):
        # Find the most relevant incomplete reminder
        reminders = Reminder.objects.filter(
            user=user,
            is_completed=False
        ).order_by('reminder_time')
        
        if reminders.exists():
            reminder = reminders.first()
            reminder.is_completed = True
            reminder.save()
            response = f"I've marked the reminder '{reminder.title}' as completed."
        else:
            response = "You don't have any active reminders."
    
    # Handle reminder listing
    elif any(keyword in query_lower for keyword in ['list reminders', 'show reminders', 'my reminders', 'check reminders']):
        reminders = Reminder.objects.filter(
            user=user,
            is_completed=False,
            reminder_time__gte=timezone.now()
        ).order_by('reminder_time')
        
        if reminders.exists():
            reminder_list = []
            for reminder in reminders:
                time_str = reminder.reminder_time.strftime('%Y-%m-%d %H:%M')
                reminder_list.append(f"- {reminder.title} (at {time_str})")
            
            response = "Here are your upcoming reminders:\n" + "\n".join(reminder_list)
        else:
            response = "You don't have any upcoming reminders. Would you like to set one?"
    
    else:
        response = ("I can help you manage your reminders. Try:\n"
                   "- 'remind me to [task] in 30 minutes'\n"
                   "- 'remind me to [task] tomorrow at 14:30'\n"
                   "- 'list reminders' to see your reminders")
    
    # Store the agent's response
    ChatMessage.objects.create(
        user=user,
        content=response,
        agent_type='reminder',
        is_user_message=False
    )
    
    return response
