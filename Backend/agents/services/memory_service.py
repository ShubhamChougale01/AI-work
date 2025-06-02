from ..models import Memory, ChatMessage
from django.contrib.auth.models import User

def handle_memory(query: str, user: User) -> str:
    """
    Handle memory-related queries from users.
    Stores new memories or retrieves existing ones based on the query.
    """
    # Store the user's message
    ChatMessage.objects.create(
        user=user,
        content=query,
        agent_type='memory',
        is_user_message=True
    )
    
    # Simple keyword-based handling
    query_lower = query.lower()
    
    # Handle memory storage
    if any(keyword in query_lower for keyword in ['remember', 'store', 'save', 'keep']):
        # Extract the actual content to remember (everything after "remember" or similar keywords)
        content = query.split(' ', 1)[1] if ' ' in query else query
        
        # Store the memory
        memory = Memory.objects.create(
            user=user,
            content=content,
            tags=['auto-generated']  # You could add more sophisticated tagging
        )
        
        response = f"I've stored that memory for you: '{content}'"
    
    # Handle memory retrieval
    elif any(keyword in query_lower for keyword in ['recall', 'what', 'tell me', 'find']):
        # Search in existing memories
        memories = Memory.objects.filter(user=user).order_by('-created_at')
        
        if memories.exists():
            # For now, just return the most recent memories
            recent_memories = memories[:5]
            memory_list = "\n".join([f"- {memory.content}" for memory in recent_memories])
            response = f"Here are your recent memories:\n{memory_list}"
        else:
            response = "I don't have any memories stored for you yet."
    
    else:
        response = "I can help you store and recall memories. Try saying 'remember' followed by what you want to store, or 'recall' to see your memories."
    
    # Store the agent's response
    ChatMessage.objects.create(
        user=user,
        content=response,
        agent_type='memory',
        is_user_message=False
    )
    
    return response
