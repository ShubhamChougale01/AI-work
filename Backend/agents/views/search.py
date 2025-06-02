from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Q
from ..models import Memory, Goal, Reminder

class SearchView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            query = request.query_params.get('q', '')
            type_filter = request.query_params.get('type', 'all')  # all, memories, goals, reminders
            
            if not query:
                return Response({
                    'error': 'Search query is required'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            results = {
                'memories': [],
                'goals': [],
                'reminders': []
            }
            
            # Search memories
            if type_filter in ['all', 'memories']:
                memories = Memory.objects.filter(
                    Q(user=request.user) &
                    (Q(content__icontains=query) | Q(tags__contains=[query]))
                ).order_by('-created_at')
                
                results['memories'] = [{
                    'id': memory.id,
                    'content': memory.content,
                    'tags': memory.tags,
                    'created_at': memory.created_at
                } for memory in memories]
            
            # Search goals
            if type_filter in ['all', 'goals']:
                goals = Goal.objects.filter(
                    Q(user=request.user) &
                    (Q(title__icontains=query) | Q(description__icontains=query))
                ).order_by('-created_at')
                
                results['goals'] = [{
                    'id': goal.id,
                    'title': goal.title,
                    'description': goal.description,
                    'status': goal.status,
                    'deadline': goal.deadline
                } for goal in goals]
            
            # Search reminders
            if type_filter in ['all', 'reminders']:
                reminders = Reminder.objects.filter(
                    Q(user=request.user) &
                    (Q(title__icontains=query) | Q(description__icontains=query))
                ).order_by('reminder_time')
                
                results['reminders'] = [{
                    'id': reminder.id,
                    'title': reminder.title,
                    'description': reminder.description,
                    'reminder_time': reminder.reminder_time,
                    'is_completed': reminder.is_completed
                } for reminder in reminders]
            
            return Response(results)
            
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 