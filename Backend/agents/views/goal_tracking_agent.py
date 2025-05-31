from rest_framework.views import APIView
from rest_framework.response import Response
from agents.services.goal_service import handle_goal

class GoalTrackingAgentView(APIView):
    def post(self, request):
        query = request.data.get('query')
        result = handle_goal(query)
        return Response({'response': result})
