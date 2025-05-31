from django.urls import path
from .views.memory_agent import MemoryAgentView
from .views.goal_tracking_agent import GoalTrackingAgentView
from .views.reminders_agent import ReminderAgentView

urlpatterns = [    
    path('memory/', MemoryAgentView.as_view(), name='memory-agent'),
    path('goals/', GoalTrackingAgentView.as_view(), name='goal-agent'),
    path('reminders/', ReminderAgentView.as_view(), name='reminder-agent'),
]
