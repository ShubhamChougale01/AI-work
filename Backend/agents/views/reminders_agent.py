from rest_framework.views import APIView
from rest_framework.response import Response
from agents.services.reminder_service import handle_reminder

class ReminderAgentView(APIView):
    def post(self, request):
        query = request.data.get('query')
        result = handle_reminder(query)
        return Response({'response': result})
