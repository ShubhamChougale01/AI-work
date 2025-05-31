
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, LogOut, Menu, Settings, User } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Settings", icon: Settings, path: "/settings" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile Header */}
      <div className="md:hidden bg-white dark:bg-slate-800 shadow-sm p-4 flex items-center justify-between">
        <button 
          onClick={toggleMobileSidebar}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">AI Assistant</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:z-0
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-assistant-primary">AI Assistant</h1>
        </div>
        
        <div className="px-4 py-2">
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg
                  ${location.pathname === item.path 
                    ? 'bg-assistant-primary text-white' 
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'}
                `}
              >
                <item.icon size={20} className="mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-200 dark:border-slate-700">
          <button 
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
            onClick={() => console.log("Logout")}
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 p-4 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
