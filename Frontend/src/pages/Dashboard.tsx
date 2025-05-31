
import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import AgentSelector from "../components/ui/AgentSelector";
import ChatInterface from "../components/ui/ChatInterface";
import { Brain, Search, Sparkles, Zap, Bot, Bell, Calendar, FileText, List } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "../components/ui/use-toast";
import { Progress } from "../components/ui/progress";

const Dashboard: React.FC = () => {
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

  const handleQuickAction = (action: string) => {
    toast({
      title: "Quick Action",
      description: `${action} feature activated`,
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section with Dynamic Background */}
        <div className="mb-8 relative overflow-hidden rounded-xl p-8 bg-gradient-to-r from-assistant-primary via-assistant-secondary to-assistant-accent text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1567095751670-48bdbd4d8c3c')] mix-blend-overlay opacity-20"></div>
          
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/20 backdrop-blur-sm"
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Good {timeOfDay}, User!</h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Your AI command center is ready. What would you like to accomplish today?
            </p>
            
            {/* Status Cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Memory Usage</h3>
                  <Brain size={18} />
                </div>
                <Progress value={progress} className="h-2 mb-2" />
                <p className="text-sm opacity-80">{progress}% capacity used</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Upcoming Tasks</h3>
                  <Calendar size={18} />
                </div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm opacity-80">Due today</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Goal Progress</h3>
                  <List size={18} />
                </div>
                <p className="text-2xl font-bold">2/5</p>
                <p className="text-sm opacity-80">Weekly goals on track</p>
              </div>
            </div>
          </div>
          
          {/* Quick Actions with Animation */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button 
              onClick={() => handleQuickAction("Voice Assistant")}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Sparkles size={16} className="animate-pulse" />
              <span>Voice Assistant</span>
            </button>
            <button 
              onClick={() => handleQuickAction("Image Analysis")}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Search size={16} />
              <span>Image Analysis</span>
            </button>
            <button 
              onClick={() => handleQuickAction("AI Summary")}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <FileText size={16} />
              <span>AI Summary</span>
            </button>
            <button 
              onClick={() => handleQuickAction("Brain Sync")}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Brain size={16} />
              <span>Brain Sync</span>
            </button>
            <button 
              onClick={() => handleQuickAction("Notifications")}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Bell size={16} />
              <span>Notifications</span>
            </button>
          </div>
        </div>
        
        {/* Intelligence Hub with Animated Elements */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <div className="bg-gradient-to-r from-assistant-primary to-assistant-accent p-2 rounded-lg mr-3">
              <Zap size={20} className="text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-assistant-primary to-assistant-accent">
              Intelligence Hub
            </span>
          </h2>
          <p className="text-slate-500 mb-6">
            Select an AI agent to assist with different aspects of your life
          </p>
        
          <AgentSelector 
            selectedAgentId={selectedAgentId} 
            onAgentSelect={setSelectedAgentId} 
          />
        </div>
        
        {/* Chat Interface Card with Enhanced Visual Treatment */}
        <Card className="mb-12 overflow-hidden border-none shadow-xl bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-xl">
          <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <h2 className="font-bold flex items-center text-xl">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              <Bot size={20} className="mr-2 text-assistant-primary" />
              {getAgentName(selectedAgentId)}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">AI powered assistance, just for you</p>
          </div>
          <CardContent className="p-0 relative">
            <div className="absolute inset-0 overflow-hidden -z-10">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-assistant-primary/5"
                  style={{
                    width: `${Math.random() * 200 + 50}px`,
                    height: `${Math.random() * 200 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    filter: 'blur(40px)',
                  }}
                ></div>
              ))}
            </div>
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

export default Dashboard;
