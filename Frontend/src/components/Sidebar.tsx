import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, UserCircle, Settings, Info, Phone, Menu, LogIn, UserPlus, Shield, FileText } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavItems = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/profile', label: 'Profile', icon: <UserCircle className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const secondaryNavItems = [
    { path: '/about', label: 'About', icon: <Info className="w-5 h-5" /> },
    { path: '/contact', label: 'Contact', icon: <Phone className="w-5 h-5" /> },
  ];

  const authNavItems = [
    { path: '/login', label: 'Login', icon: <LogIn className="w-5 h-5" /> },
    { path: '/signup', label: 'Sign Up', icon: <UserPlus className="w-5 h-5" /> },
  ];

  const legalNavItems = [
    { path: '/privacy', label: 'Privacy Policy', icon: <Shield className="w-5 h-5" /> },
    { path: '/terms', label: 'Terms of Service', icon: <FileText className="w-5 h-5" /> },
  ];

  const renderNavSection = (items: typeof mainNavItems, showDivider = true) => (
    <>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === item.path
              ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-medium'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
          }`}
        >
          {item.icon}
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}
      {showDivider && <div className="my-2 border-t border-slate-200 dark:border-slate-700" />}
    </>
  );

  return (
    <div className={`w-64 h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 fixed left-0 top-0 z-50 transition-shadow ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-start">
            <Menu className="w-6 h-6 text-slate-600 dark:text-slate-300" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {renderNavSection(mainNavItems)}
          {renderNavSection(secondaryNavItems)}
          {renderNavSection(authNavItems)}
          {renderNavSection(legalNavItems, false)}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 