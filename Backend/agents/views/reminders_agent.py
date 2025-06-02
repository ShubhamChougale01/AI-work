from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from agents.services.reminder_service import handle_reminder
from agents.models import ChatMessage, Reminder
from django.utils import timezone
from datetime import timedelta

class ReminderAgentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            query = request.data.get('query')
            if not query:
                return Response(
                    {'error': 'Query is required'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            result = handle_reminder(query, request.user)
            return Response({'response': result})
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get(self, request):
        try:
            # Get both chat history and reminders
            messages = ChatMessage.objects.filter(
                user=request.user,
                agent_type='reminder'
            ).order_by('created_at')

            # Get upcoming and recent past reminders
            now = timezone.now()
            reminders = Reminder.objects.filter(
                user=request.user,
                reminder_time__gte=now - timedelta(days=7)  # Include last week's reminders
            ).order_by('reminder_time')

            return Response({
                'messages': [
                    {
                        'content': msg.content,
                        'is_user_message': msg.is_user_message,
                        'timestamp': msg.created_at
                    } for msg in messages
                ],
                'reminders': [
                    {
                        'id': reminder.id,
                        'title': reminder.title,
                        'description': reminder.description,
                        'reminder_time': reminder.reminder_time,
                        'is_completed': reminder.is_completed,
                        'created_at': reminder.created_at
                    } for reminder in reminders
                ]
            })
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
