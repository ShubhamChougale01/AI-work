import os
from celery import Celery
from celery.schedules import crontab

# Set the default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Backend.settings')

# Create the Celery app
app = Celery('Backend')

# Load task modules from all registered Django app configs.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Configure Celery Beat schedule
app.conf.beat_schedule = {
    'check-reminders': {
        'task': 'agents.tasks.check_reminders',
        'schedule': crontab(minute='*/1'),  # Run every minute
    },
}

# Auto-discover tasks in all installed apps
app.autodiscover_tasks() 