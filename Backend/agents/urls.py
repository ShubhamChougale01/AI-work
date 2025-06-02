from django.urls import path
from .views.memory_agent import MemoryAgentView
from .views.goal_tracking_agent import GoalTrackingAgentView
from .views.reminders_agent import ReminderAgentView
from .views.auth import LoginView, RegisterView, RequestPasswordResetView, ResetPasswordView
from .views.search import SearchView
from .views.data_management import DataExportView, DataImportView
from rest_framework_simplejwt.views import TokenRefreshView

# Debug print to verify imports
print("RegisterView imported:", RegisterView)

app_name = 'api'  # Added to match namespace in main urls.py

urlpatterns = [    
    # Auth endpoints - these will be prefixed with /api/ from the main urls.py
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/password/reset/', RequestPasswordResetView.as_view(), name='password_reset'),
    path('auth/password/reset/confirm/', ResetPasswordView.as_view(), name='password_reset_confirm'),
    
    # Agent endpoints
    path('memory/', MemoryAgentView.as_view(), name='memory-agent'),
    path('goals/', GoalTrackingAgentView.as_view(), name='goal-agent'),
    path('reminders/', ReminderAgentView.as_view(), name='reminder-agent'),
    
    # Search endpoint
    path('search/', SearchView.as_view(), name='search'),
    
    # Data management endpoints
    path('data/export/', DataExportView.as_view(), name='data-export'),
    path('data/import/', DataImportView.as_view(), name='data-import'),
]

# Debug print to verify URL patterns
print("URL patterns:", urlpatterns)
