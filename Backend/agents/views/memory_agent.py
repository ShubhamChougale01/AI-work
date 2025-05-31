from rest_framework.views import APIView
from rest_framework.response import Response
from agents.services.memory_service import handle_memory

class MemoryAgentView(APIView):
    def post(self, request):
        query = request.data.get('query')
        result = handle_memory(query)
        return Response({'response': result})
