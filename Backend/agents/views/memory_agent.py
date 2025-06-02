from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from agents.services.memory_service import handle_memory
from agents.models import ChatMessage

class MemoryAgentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            query = request.data.get('query')
            if not query:
                return Response(
                    {'error': 'Query is required'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            result = handle_memory(query, request.user)
            return Response({'response': result})
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get(self, request):
        try:
            messages = ChatMessage.objects.filter(
                user=request.user,
                agent_type='memory'
            ).order_by('created_at')

            return Response({
                'messages': [
                    {
                        'content': msg.content,
                        'is_user_message': msg.is_user_message,
                        'timestamp': msg.created_at
                    } for msg in messages
                ]
            })
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
