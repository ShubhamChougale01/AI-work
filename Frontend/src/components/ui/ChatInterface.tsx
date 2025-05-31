
import React, { useState, useRef, useEffect } from "react";
import { Send, Brain, Lightbulb } from "lucide-react";
import VoiceInput from "./VoiceInput";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  thinking?: boolean;
}

interface ChatInterfaceProps {
  agentId: string;
  agentName: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ agentId, agentName }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `Hi there! I'm your ${agentName}. How can I help you today?`,
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim() || isProcessing) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);
    
    // Add thinking message
    const thinkingId = `thinking-${Date.now()}`;
    setMessages((prev) => [...prev, {
      id: thinkingId,
      content: "Analyzing data and preparing response...",
      sender: "assistant",
      timestamp: new Date(),
      thinking: true
    }]);
    
    // Simulate API call to backend
    setTimeout(() => {
      // Remove thinking message
      setMessages((prev) => prev.filter(msg => msg.id !== thinkingId));
      
      const botResponse: Message = {
        id: `assistant-${Date.now()}`,
        content: getRandomResponse(agentId, inputValue),
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleVoiceInput = (transcript: string) => {
    setInputValue(transcript);
    if (transcript) {
      handleSendMessage();
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
                message.thinking ? "opacity-70" : "",
                message.sender === "user" 
                  ? "chat-bubble-user" 
                  : "chat-bubble-assistant"
              )}
            >
              {message.sender === "assistant" && message.thinking ? (
                <div className="flex items-center">
                  <Brain size={18} className="mr-2 animate-pulse" />
                  <p>{message.content}</p>
                </div>
              ) : message.sender === "assistant" ? (
                <div>
                  <div className="flex items-start">
                    <div className="bg-assistant-primary text-white p-1.5 rounded-full mr-2">
                      <Brain size={14} />
                    </div>
                    <div>
                      <p>{message.content}</p>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p>{message.content}</p>
                  <div className="text-xs opacity-70 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isProcessing && !messages.some(m => m.thinking) && (
            <div className="chat-bubble-assistant flex items-center space-x-2">
              <div className="w-2 h-2 bg-assistant-primary rounded-full animate-pulse-slow"></div>
              <div className="w-2 h-2 bg-assistant-primary rounded-full animate-pulse-slow delay-150"></div>
              <div className="w-2 h-2 bg-assistant-primary rounded-full animate-pulse-slow delay-300"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto scrollbar-none">
        {['What can you help me with?', 'How does this work?', 'Save this information'].map((suggestion) => (
          <button 
            key={suggestion} 
            className="text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full whitespace-nowrap flex items-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            onClick={() => {
              setInputValue(suggestion);
              setTimeout(() => handleSendMessage(), 100);
            }}
          >
            <Lightbulb size={12} className="mr-1" />
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input form */}
      <form 
        onSubmit={handleSendMessage}
        className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900"
      >
        <div className="flex">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-3 pr-12 rounded-l-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-assistant-primary dark:bg-slate-800"
              disabled={isProcessing}
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-3 text-assistant-primary disabled:text-slate-400"
              disabled={!inputValue.trim() || isProcessing}
            >
              <Send size={20} />
            </button>
          </div>
          <VoiceInput onTranscript={handleVoiceInput} disabled={isProcessing} />
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
