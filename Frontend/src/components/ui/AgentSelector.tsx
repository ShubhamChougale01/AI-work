import React from "react";
import { Brain, CalendarClock, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface AgentSelectorProps {
  selectedAgentId: string;
  onAgentSelect: (agentId: string) => void;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({ 
  selectedAgentId, 
  onAgentSelect 
}) => {
  const agents: Agent[] = [
    {
      id: "memory",
      name: "Memory Agent",
      description: "Your personal knowledge vault - I store, organize, and help you recall information effortlessly",
      icon: Brain,
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: "goals",
      name: "Goal Tracking Agent",
      description: "Your achievement partner - I help break down, track, and celebrate your goal milestones",
      icon: ListChecks,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "reminders",
      name: "Reminders Agent",
      description: "Your time guardian - I ensure you stay on top of schedules, tasks, and important events",
      icon: CalendarClock,
      color: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className={cn(
            "relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border",
            selectedAgentId === agent.id 
              ? "border-assistant-primary/50 shadow-lg shadow-assistant-primary/10 scale-[1.02]" 
              : "border-slate-200 dark:border-slate-800 hover:border-assistant-primary/30"
          )}
          onClick={() => onAgentSelect(agent.id)}
        >
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-10",
            agent.color
          )}></div>
          
          <div className="relative p-6 z-10 backdrop-blur-sm">
            <div className="flex items-center mb-3">
              <div className={cn(
                "p-2.5 rounded-lg bg-gradient-to-br text-white",
                agent.color
              )}>
                <agent.icon size={20} />
              </div>
              <h3 className="ml-3 font-semibold">{agent.name}</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">{agent.description}</p>
            
            {/* Status indicator */}
            {selectedAgentId === agent.id && (
              <div className="absolute top-3 right-3 flex items-center text-xs font-medium text-assistant-primary">
                <div className="w-1.5 h-1.5 rounded-full bg-assistant-primary mr-1.5 animate-pulse"></div>
                Active
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgentSelector;
