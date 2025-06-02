from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from agents.services.goal_service import handle_goal
from agents.models import ChatMessage, Goal

class GoalTrackingAgentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            query = request.data.get('query')
            if not query:
                return Response(
                    {'error': 'Query is required'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            result = handle_goal(query, request.user)
            return Response({'response': result})
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get(self, request):
        try:
            # Get both chat history and goals
            messages = ChatMessage.objects.filter(
                user=request.user,
                agent_type='goal'
            ).order_by('created_at')

            goals = Goal.objects.filter(
                user=request.user
            ).order_by('-created_at')

            return Response({
                'messages': [
                    {
                        'content': msg.content,
                        'is_user_message': msg.is_user_message,
                        'timestamp': msg.created_at
                    } for msg in messages
                ],
                'goals': [
                    {
                        'id': goal.id,
                        'title': goal.title,
                        'description': goal.description,
                        'status': goal.status,
                        'deadline': goal.deadline,
                        'created_at': goal.created_at
                    } for goal in goals
                ]
            })
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
