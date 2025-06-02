import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import AgentSelector from "../components/ui/AgentSelector";
import ChatInterface from "../components/ui/ChatInterface";
import { Brain, Search, Sparkles, Zap, Bot, Bell, Calendar, FileText, List } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "../components/ui/use-toast";
import { Progress } from "../components/ui/progress";

const Landing: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState("memory");
  const [progress, setProgress] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState("");
  
  // Simulate progress loading animation
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Set greeting based on time of day
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setTimeOfDay("morning");
    else if (hours < 18) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");
  }, []);

  const getAgentName = (id: string): string => {
    switch (id) {
      case "memory": return "Memory Agent";
      case "goals": return "Goal Tracking Agent";
      case "reminders": return "Reminders Agent";
      default: return "AI Assistant";
    }
  };

  const getAgentDescription = (id: string): string => {
    switch (id) {
      case "memory":
        return "Your personal knowledge vault - I store, organize, and help you recall information effortlessly";
      case "goals":
        return "Your achievement partner - I help break down, track, and celebrate your goal milestones";
      case "reminders":
        return "Your time guardian - I ensure you stay on top of schedules, tasks, and important events";
      default:
        return "AI powered assistance, just for you";
    }
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: "Quick Action",
      description: `${action} feature activated`,
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-6 relative overflow-hidden rounded-xl bg-gradient-to-r from-assistant-primary via-assistant-secondary to-assistant-accent text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1567095751670-48bdbd4d8c3c')] mix-blend-overlay opacity-20"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="px-6 pt-5 pb-3">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Good {timeOfDay}!</h1>
              <p className="text-sm md:text-base opacity-90">
                Your AI command center is ready. What would you like to accomplish today?
              </p>
            </div>

            {/* Status Cards */}
            <div className="px-6 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-medium text-sm">Memory Usage</h3>
                  <Brain size={16} />
                </div>
                <Progress value={progress} className="h-1.5 mb-1.5" />
                <p className="text-xs opacity-80">{progress}% capacity used</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-medium text-sm">Upcoming Tasks</h3>
                  <Calendar size={16} />
                </div>
                <p className="text-xl font-bold mb-0.5">3</p>
                <p className="text-xs opacity-80">Due today</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-medium text-sm">Goal Progress</h3>
                  <List size={16} />
                </div>
                <p className="text-xl font-bold mb-0.5">2/5</p>
                <p className="text-xs opacity-80">Weekly goals on track</p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="px-6 pb-5 flex flex-wrap gap-2 border-t border-white/10 pt-3">
              {[
                { icon: Sparkles, label: "Voice Assistant" },
                { icon: Search, label: "Image Analysis" },
                { icon: FileText, label: "AI Summary" },
                { icon: Brain, label: "Brain Sync" },
                { icon: Bell, label: "Notifications" }
              ].map((action) => (
                <button 
                  key={action.label}
                  onClick={() => handleQuickAction(action.label)}
                  className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-2.5 py-1.5 rounded-lg text-xs backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <action.icon size={14} className="animate-pulse" />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Intelligence Hub */}
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-bold mb-3 flex items-center">
            <div className="bg-gradient-to-r from-assistant-primary to-assistant-accent p-1.5 rounded-lg mr-2">
              <Zap size={18} className="text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-assistant-primary to-assistant-accent">
              Intelligence Hub
            </span>
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Select an AI agent to assist with different aspects of your life
          </p>
        
          <AgentSelector 
            selectedAgentId={selectedAgentId} 
            onAgentSelect={setSelectedAgentId} 
          />
        </div>

        {/* Chat Interface */}
        <Card className="mb-6 overflow-hidden border-none shadow-xl bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-xl">
          <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <h2 className="font-bold flex items-center text-base">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              <Bot size={18} className="mr-2 text-assistant-primary" />
              {getAgentName(selectedAgentId)}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {getAgentDescription(selectedAgentId)}
            </p>
          </div>
          <CardContent className="p-0">
            <ChatInterface 
              agentId={selectedAgentId} 
              agentName={getAgentName(selectedAgentId)} 
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Landing; 