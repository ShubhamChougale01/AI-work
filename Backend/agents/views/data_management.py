from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.http import HttpResponse
from ..models import Memory, Goal, Reminder, ChatMessage
import json
from datetime import datetime
import csv
import io

class DataExportView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            format_type = request.query_params.get('format', 'json')
            data_type = request.query_params.get('type', 'all')
            
            # Prepare data based on type
            data = {}
            
            if data_type in ['all', 'memories']:
                memories = Memory.objects.filter(user=request.user)
                data['memories'] = [{
                    'content': memory.content,
                    'tags': memory.tags,
                    'created_at': memory.created_at.isoformat(),
                    'updated_at': memory.updated_at.isoformat()
                } for memory in memories]
            
            if data_type in ['all', 'goals']:
                goals = Goal.objects.filter(user=request.user)
                data['goals'] = [{
                    'title': goal.title,
                    'description': goal.description,
                    'status': goal.status,
                    'deadline': goal.deadline.isoformat() if goal.deadline else None,
                    'created_at': goal.created_at.isoformat()
                } for goal in goals]
            
            if data_type in ['all', 'reminders']:
                reminders = Reminder.objects.filter(user=request.user)
                data['reminders'] = [{
                    'title': reminder.title,
                    'description': reminder.description,
                    'reminder_time': reminder.reminder_time.isoformat(),
                    'is_completed': reminder.is_completed,
                    'created_at': reminder.created_at.isoformat()
                } for reminder in reminders]
            
            if data_type in ['all', 'chat_history']:
                messages = ChatMessage.objects.filter(user=request.user)
                data['chat_history'] = [{
                    'content': msg.content,
                    'agent_type': msg.agent_type,
                    'is_user_message': msg.is_user_message,
                    'created_at': msg.created_at.isoformat()
                } for msg in messages]
            
            # Export based on format
            if format_type == 'json':
                response = HttpResponse(
                    json.dumps(data, indent=2),
                    content_type='application/json'
                )
                response['Content-Disposition'] = f'attachment; filename=data_export_{datetime.now().strftime("%Y%m%d")}.json'
                return response
            
            elif format_type == 'csv':
                output = io.StringIO()
                writer = csv.writer(output)
                
                # Write headers and data for each type
                for data_key, items in data.items():
                    if not items:
                        continue
                        
                    writer.writerow([f"--- {data_key.upper()} ---"])
                    headers = items[0].keys()
                    writer.writerow(headers)
                    
                    for item in items:
                        writer.writerow([str(item[header]) for header in headers])
                    writer.writerow([])  # Empty row between sections
                
                response = HttpResponse(output.getvalue(), content_type='text/csv')
                response['Content-Disposition'] = f'attachment; filename=data_export_{datetime.now().strftime("%Y%m%d")}.csv'
                return response
            
            else:
                return Response({
                    'error': 'Unsupported format type'
                }, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DataImportView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            if not request.FILES.get('file'):
                return Response({
                    'error': 'No file provided'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            file = request.FILES['file']
            content = file.read().decode('utf-8')
            
            try:
                data = json.loads(content)
            except json.JSONDecodeError:
                return Response({
                    'error': 'Invalid JSON format'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Import memories
            if 'memories' in data:
                for memory_data in data['memories']:
                    Memory.objects.create(
                        user=request.user,
                        content=memory_data['content'],
                        tags=memory_data.get('tags', [])
                    )
            
            # Import goals
            if 'goals' in data:
                for goal_data in data['goals']:
                    deadline = datetime.fromisoformat(goal_data['deadline']) if goal_data.get('deadline') else None
                    Goal.objects.create(
                        user=request.user,
                        title=goal_data['title'],
                        description=goal_data['description'],
                        status=goal_data.get('status', 'pending'),
                        deadline=deadline
                    )
            
            # Import reminders
            if 'reminders' in data:
                for reminder_data in data['reminders']:
                    Reminder.objects.create(
                        user=request.user,
                        title=reminder_data['title'],
                        description=reminder_data['description'],
                        reminder_time=datetime.fromisoformat(reminder_data['reminder_time']),
                        is_completed=reminder_data.get('is_completed', False)
                    )
            
            return Response({
                'message': 'Data imported successfully',
                'imported_counts': {
                    'memories': len(data.get('memories', [])),
                    'goals': len(data.get('goals', [])),
                    'reminders': len(data.get('reminders', []))
                }
            })
            
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 