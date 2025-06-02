import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, LogOut, Menu, Settings, User, X, Info, Mail, LayoutDashboard, Brain, UserCircle, Phone } from "lucide-react";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/profile', label: 'Profile', icon: <UserCircle className="w-5 h-5" /> },
    { path: '/about', label: 'About', icon: <Info className="w-5 h-5" /> },
    { path: '/contact', label: 'Contact', icon: <Phone className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refresh_token');
    
    // Show success notification
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 fixed left-0 top-0 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="w-8 h-8 text-assistant-primary" />
            <span className="text-xl font-bold text-assistant-primary">AI Assistant</span>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-assistant-primary text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64 w-full">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
