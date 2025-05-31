
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, CalendarClock, ListChecks, MessageSquare, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "Your AI-powered life companion";

  // Text typing animation effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Animation sequence for demo screens
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background video-like animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-assistant-primary/30 via-assistant-secondary/20 to-assistant-accent/30 animate-pulse-slow"></div>
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-assistant-primary/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-assistant-secondary/10 rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4 animate-pulse"></div>
      </div>

      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm dark:bg-slate-900/80 dark:border-b dark:border-slate-800 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-assistant-primary flex items-center">
              <Sparkles className="mr-2 text-assistant-accent" size={18} />
              AI Assistant
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="text-slate-600 hover:text-assistant-primary transition-colors">About</Link>
            <Link to="/contact" className="text-slate-600 hover:text-assistant-primary transition-colors">Contact</Link>
            <Link to="/login" className="text-slate-600 hover:text-assistant-primary transition-colors">Login</Link>
            <Link to="/register">
              <Button className="bg-assistant-primary hover:bg-assistant-primary/90">Sign up</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section with Animation */}
      <section className="flex-grow flex items-center py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-assistant-primary to-assistant-secondary">
                  {typedText}
                </span>
                <span className="animate-pulse">|</span>
              </h1>
              <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">
                The intelligent companion that remembers everything for you, tracks your goals, 
                and keeps you on schedule — all powered by advanced AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-to-r from-assistant-primary to-assistant-secondary hover:opacity-90 text-white w-full sm:w-auto group transition-all">
                    Get Started
                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 dark:border-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 w-full sm:w-auto">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-[400px]">
                {/* Animated chat demo that changes based on animationStep */}
                <div className={`glass-panel p-6 w-full max-w-md rounded-2xl shadow-lg absolute transition-all duration-700 transform ${animationStep === 0 ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-95 rotate-3"}`}>
                  <div className="flex justify-end mb-6">
                    <div className="chat-bubble-user">
                      <p>Remember my doctor's appointment next Thursday at 3pm?</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="chat-bubble-assistant">
                      <p>I've added your doctor's appointment to your calendar for Thursday, June 20th at 3:00 PM. Would you like me to set a reminder for this?</p>
                    </div>
                  </div>
                  <div className="flex items-center border rounded-lg p-3 bg-white/80">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="flex-grow focus:outline-none bg-transparent"
                      disabled
                    />
                    <MessageSquare size={20} className="text-assistant-primary ml-2" />
                  </div>
                </div>

                <div className={`glass-panel p-6 w-full max-w-md rounded-2xl shadow-lg absolute transition-all duration-700 transform ${animationStep === 1 ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-95 rotate-3"}`}>
                  <div className="flex justify-end mb-6">
                    <div className="chat-bubble-user">
                      <p>I want to track my fitness goal: run 10km per week</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="chat-bubble-assistant">
                      <p>Great! I've created a new fitness goal for you: run 10km per week. I'll track your progress and send you regular updates. Would you like to set specific days for your runs?</p>
                    </div>
                  </div>
                  <div className="flex items-center border rounded-lg p-3 bg-white/80">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="flex-grow focus:outline-none bg-transparent"
                      disabled
                    />
                    <MessageSquare size={20} className="text-assistant-primary ml-2" />
                  </div>
                </div>

                <div className={`glass-panel p-6 w-full max-w-md rounded-2xl shadow-lg absolute transition-all duration-700 transform ${animationStep === 2 ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-95 rotate-3"}`}>
                  <div className="flex justify-end mb-6">
                    <div className="chat-bubble-user">
                      <p>What was the name of that restaurant I liked in Chicago?</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="chat-bubble-assistant">
                      <p>Based on your previous conversations, you mentioned really enjoying "The Purple Pig" on Michigan Avenue during your trip to Chicago last summer. You specifically liked their small plates and wine selection.</p>
                    </div>
                  </div>
                  <div className="flex items-center border rounded-lg p-3 bg-white/80">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="flex-grow focus:outline-none bg-transparent"
                      disabled
                    />
                    <MessageSquare size={20} className="text-assistant-primary ml-2" />
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-assistant-accent/5 rounded-full blur-xl"></div>
                <div className="absolute -top-5 -left-5 w-20 h-20 bg-assistant-primary/10 rounded-full blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Animations */}
      <section className="py-16 bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/50 to-white/5 dark:from-slate-900/50 dark:to-slate-800/5 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-assistant-primary to-assistant-secondary">Your All-in-One AI Assistant</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Save time and stay organized with an AI that remembers everything for you
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-3 bg-assistant-primary/10 rounded-full w-fit mb-4">
                <Brain className="text-assistant-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Memory Agent</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Store and retrieve any information. Never forget important details again.
              </p>
              <Link to="/register" className="text-assistant-primary flex items-center font-medium hover:underline">
                Try it now <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="glass-panel p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-3 bg-assistant-primary/10 rounded-full w-fit mb-4">
                <ListChecks className="text-assistant-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Goal Tracking</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Set goals, track your progress, and get personalized recommendations.
              </p>
              <Link to="/register" className="text-assistant-primary flex items-center font-medium hover:underline">
                Try it now <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="glass-panel p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-3 bg-assistant-primary/10 rounded-full w-fit mb-4">
                <CalendarClock className="text-assistant-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reminders</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Manage appointments, deadlines, and important events with smart reminders.
              </p>
              <Link to="/register" className="text-assistant-primary flex items-center font-medium hover:underline">
                Try it now <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Animation */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-assistant-primary/10 to-assistant-secondary/10 -z-10"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-assistant-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-assistant-primary/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-assistant-primary to-assistant-secondary">Ready to get started?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already saving time and staying organized with our AI Assistant.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-gradient-to-r from-assistant-primary to-assistant-secondary hover:opacity-90 text-white group">
              Sign up for free
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} AI Assistant. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link to="/about" className="text-slate-600 hover:text-assistant-primary dark:text-slate-400 transition-colors">About Us</Link>
              <Link to="/contact" className="text-slate-600 hover:text-assistant-primary dark:text-slate-400 transition-colors">Contact</Link>
              <a href="#" className="text-slate-600 hover:text-assistant-primary dark:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-600 hover:text-assistant-primary dark:text-slate-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
