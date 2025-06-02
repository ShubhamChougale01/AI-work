import React, { useState, useRef, useEffect } from "react";
import { Send, Brain, Lightbulb } from "lucide-react";
import VoiceInput from "./VoiceInput";
import { cn } from "@/lib/utils";
import { apiService } from '../../services/api';
import { toast } from "./use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: string;
}

interface ChatResponse {
  message: string;
  error?: string;
}

interface ChatInterfaceProps {
  agentId: string;
  agentName: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ agentId, agentName }) => {
  const getWelcomeMessage = (agentId: string): string => {
    switch (agentId) {
      case 'memory':
        return "Welcome! I'm your Memory Agent, ready to help you store and recall any information you need. What would you like to remember?";
      case 'goals':
        return "Hi! I'm your Goal Tracking Agent. I'll help you set, track, and achieve your personal and professional goals. What would you like to accomplish?";
      case 'reminders':
        return "Hello! I'm your Reminders Agent, here to make sure you never miss important tasks or events. What can I help you schedule?";
      default:
        return `Hi there! I'm your ${agentName}. How can I help you today?`;
    }
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset messages when agent changes
  useEffect(() => {
    setMessages([{
      id: "welcome",
      content: getWelcomeMessage(agentId),
      sender: "agent",
      timestamp: new Date().toISOString(),
    }]);
  }, [agentId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      setIsLoading(true);
      // Add user message to chat
      const userMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage,
        sender: "user",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      
      // Get token from your auth state/storage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Send message to backend based on agent type
      let endpoint = '';
      switch (agentId) {
        case 'memory':
          endpoint = '/memory/';
          break;
        case 'goals':
          endpoint = '/goals/';
          break;
        case 'reminders':
          endpoint = '/reminders/';
          break;
        default:
          endpoint = '/memory/';
      }

      const response = await apiService.sendMessage<ChatResponse>(
        inputMessage,
        endpoint,
        token
      );

      if (response.error) {
        throw new Error(response.error);
      }

      // Add agent response to chat
      const agentMessage: Message = {
        id: Date.now().toString(),
        content: response.message,
        sender: "agent",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      
      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I encountered an error. Please try again.",
        sender: "agent",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = (transcript: string) => {
    setInputMessage(transcript);
    if (transcript) {
      sendMessage();
    }
  };

  // Helper function to generate random responses based on agent
  const getRandomResponse = (agentId: string, query: string): string => {
    const responses: Record<string, string[]> = {
      memory: [
        "I've stored that information in your memory bank.",
        "I'll remember that for you.",
        "Got it! I've saved this to your personal knowledge base.",
        "I've made a note of that in your memory store.",
      ],
      goals: [
        "I've updated your goal progress.",
        "You're making great progress on your goals!",
        "I'll track that goal for you.",
        "Let me help you break down this goal into manageable steps.",
      ],
      reminders: [
        "I've set a reminder for you.",
        "I'll remind you about that.",
        "Your reminder has been scheduled.",
        "I'll make sure to notify you when it's time.",
      ],
    };
    
    const agentResponses = responses[agentId] || responses.memory;
    return agentResponses[Math.floor(Math.random() * agentResponses.length)];
  };

  return (
    <div className="flex flex-col h-[600px] overflow-hidden">
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-transparent to-slate-50/30 dark:to-slate-800/30">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "p-4 rounded-lg",
                message.sender === "user" 
                  ? "bg-assistant-primary text-white ml-12" 
                  : "bg-slate-100 dark:bg-slate-800 mr-12"
              )}
            >
              {message.sender === "agent" && (
                <div className="flex items-start">
                  <div className="bg-assistant-primary text-white p-1.5 rounded-full mr-2">
                    <Brain size={14} />
                  </div>
                  <div>
                    <p>{message.content}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              )}
              {message.sender === "user" && (
                <div>
                  <p>{message.content}</p>
                  <div className="text-xs opacity-70 mt-1 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg mr-12">
              <div className="w-2 h-2 bg-assistant-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-assistant-primary rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-assistant-primary rounded-full animate-pulse delay-300"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto scrollbar-none">
        {[
          'What can you help me with?', 
          'How does this work?', 
          'Tell me about my recent activities'
        ].map((suggestion) => (
          <button 
            key={suggestion} 
            className="text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full whitespace-nowrap flex items-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            onClick={() => {
              setInputMessage(suggestion);
              setTimeout(() => sendMessage(), 100);
            }}
          >
            <Lightbulb size={12} className="mr-1" />
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input form */}
      <form 
        onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
        className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900"
      >
        <div className="flex">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-3 pr-12 rounded-l-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-assistant-primary dark:bg-slate-800"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-3 text-assistant-primary disabled:text-slate-400"
              disabled={!inputMessage.trim() || isLoading}
            >
              {isLoading ? 'Sending...' : <Send size={20} />}
            </button>
          </div>
          <VoiceInput onTranscript={handleVoiceInput} disabled={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
