from ..models import Goal, ChatMessage
from django.contrib.auth.models import User
from datetime import datetime
import re

def parse_deadline(text: str) -> datetime | None:
    """Extract deadline date from text using simple patterns."""
    # Add more sophisticated date parsing as needed
    try:
        # Try to find a date in format YYYY-MM-DD
        match = re.search(r'\d{4}-\d{2}-\d{2}', text)
        if match:
            return datetime.strptime(match.group(), '%Y-%m-%d')
        return None
    except:
        return None

def handle_goal(query: str, user: User) -> str:
    """
    Handle goal-related queries from users.
    Manages goals including creation, updates, and status checks.
    """
    # Store the user's message
    ChatMessage.objects.create(
        user=user,
        content=query,
        agent_type='goal',
        is_user_message=True
    )
    
    query_lower = query.lower()
    
    # Handle new goal creation
    if any(keyword in query_lower for keyword in ['create goal', 'new goal', 'add goal', 'set goal']):
        # Extract goal details
        title = query.split(' goal ', 1)[1] if ' goal ' in query else query
        deadline = parse_deadline(query)
        
        goal = Goal.objects.create(
            user=user,
            title=title,
            description=title,  # Can be updated later with more details
            deadline=deadline,
            status='pending'
        )
        
        response = f"I've created a new goal: '{title}'"
        if deadline:
            response += f" with deadline: {deadline.strftime('%Y-%m-%d')}"
    
    # Handle goal completion
    elif any(keyword in query_lower for keyword in ['complete goal', 'finished goal', 'done with goal']):
        title_keywords = query.lower().split(' goal ')[1] if ' goal ' in query else ''
        goals = Goal.objects.filter(user=user, title__icontains=title_keywords, status='pending')
        
        if goals.exists():
            goal = goals.first()
            goal.status = 'completed'
            goal.save()
            response = f"Congratulations! I've marked the goal '{goal.title}' as completed."
        else:
            response = "I couldn't find a matching pending goal. Please be more specific."
    
    # Handle goal listing/status
    elif any(keyword in query_lower for keyword in ['list goals', 'show goals', 'my goals', 'check goals']):
        goals = Goal.objects.filter(user=user).exclude(status='completed').order_by('deadline')
        
        if goals.exists():
            goal_list = []
            for goal in goals:
                status_text = f"({goal.status})"
                deadline_text = f", due {goal.deadline.strftime('%Y-%m-%d')}" if goal.deadline else ""
                goal_list.append(f"- {goal.title} {status_text}{deadline_text}")
            
            response = "Here are your active goals:\n" + "\n".join(goal_list)
        else:
            response = "You don't have any active goals. Would you like to create one?"
    
    else:
        response = ("I can help you manage your goals. Try:\n"
                   "- 'create goal [title]' to add a new goal\n"
                   "- 'list goals' to see your goals\n"
                   "- 'complete goal [title]' to mark a goal as done")
    
    # Store the agent's response
    ChatMessage.objects.create(
        user=user,
        content=response,
        agent_type='goal',
        is_user_message=False
    )
    
    return response
