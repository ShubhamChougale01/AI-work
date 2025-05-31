
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Shield, Star, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-sm dark:bg-slate-900 dark:border-b dark:border-slate-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-xl font-bold text-assistant-primary">AI Assistant</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="text-assistant-primary font-medium">About</Link>
            <Link to="/contact" className="text-slate-600 hover:text-assistant-primary">Contact</Link>
            <Link to="/login" className="text-slate-600 hover:text-assistant-primary">Login</Link>
            <Link to="/register">
              <Button className="bg-assistant-primary hover:bg-assistant-primary/90">Sign up</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About AI Assistant</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              We're on a mission to help people remember everything, achieve their goals, and never miss what's important.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                AI Assistant was born from a simple observation: people are overwhelmed with information, tasks, and responsibilities.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                We created an AI that helps you remember everything, track your goals, and manage your schedule - all in one place.
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                Today, thousands of people rely on AI Assistant to stay organized, focused, and prepared for whatever comes their way.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Team working together" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm dark:bg-slate-800 text-center">
              <div className="p-3 bg-assistant-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Brain className="text-assistant-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-slate-600 dark:text-slate-300">
                We're constantly pushing the boundaries of what AI can do to help people in their daily lives.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm dark:bg-slate-800 text-center">
              <div className="p-3 bg-assistant-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Shield className="text-assistant-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Privacy</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Your data is yours. We're committed to keeping your information secure and private.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm dark:bg-slate-800 text-center">
              <div className="p-3 bg-assistant-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="text-assistant-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-slate-600 dark:text-slate-300">
                We believe everyone should have access to tools that make their lives easier and more productive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-assistant-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join our community and experience the power of your personal AI assistant.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-assistant-primary hover:bg-slate-100">
              Sign up for free
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
            <div className="flex space-x-6">
              <Link to="/about" className="text-assistant-primary font-medium dark:text-assistant-primary">About Us</Link>
              <Link to="/contact" className="text-slate-600 hover:text-assistant-primary dark:text-slate-400">Contact</Link>
              <a href="#" className="text-slate-600 hover:text-assistant-primary dark:text-slate-400">Privacy Policy</a>
              <a href="#" className="text-slate-600 hover:text-assistant-primary dark:text-slate-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
