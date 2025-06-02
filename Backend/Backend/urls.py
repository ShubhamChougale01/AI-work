from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

# Create schema view for API documentation
schema_view = get_schema_view(
    openapi.Info(
        title="AI Assistant API",
        default_version='v1',
        description="API documentation for AI Assistant with memory, goals, and reminders functionality",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@aiassistant.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# Debug print to verify imports
print("Agents URLs imported:", include('agents.urls'))

urlpatterns = [
    path('admin/', admin.site.urls),
    # Include agents URLs under /api/ prefix
    path('api/', include('agents.urls', namespace='api')),  # Added namespace
    
    # Swagger/OpenAPI documentation
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Debug print to verify URL patterns
print("Main URL patterns:", urlpatterns) 