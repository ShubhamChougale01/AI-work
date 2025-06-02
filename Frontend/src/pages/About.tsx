import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/card';
import { Brain, Target, Users, Award, Globe, Rocket } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      bio: 'AI and Machine Learning expert with 15+ years of experience'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      bio: 'Former Tech Lead at major AI companies'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      bio: 'Product strategist focused on AI-driven solutions'
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-assistant-primary to-assistant-accent">
            About AI Assistant
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            We're on a mission to revolutionize personal and professional productivity through 
            intelligent AI assistance that adapts to your unique needs.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: 'Active Users', value: '10,000+' },
            { icon: Brain, label: 'AI Models', value: '25+' },
            { icon: Target, label: 'Tasks Completed', value: '1M+' },
            { icon: Award, label: 'Awards Won', value: '15+' }
          ].map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-assistant-primary/10 rounded-lg">
                  <stat.icon className="w-6 h-6 text-assistant-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Mission & Vision */}
        <Card className="mb-12 p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-assistant-primary/10 rounded-lg">
                  <Rocket className="w-6 h-6 text-assistant-primary" />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                To empower individuals and organizations with intelligent AI solutions that enhance 
                productivity, streamline workflows, and unlock human potential through seamless 
                integration of advanced artificial intelligence.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-assistant-primary/10 rounded-lg">
                  <Globe className="w-6 h-6 text-assistant-primary" />
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                To be the world's leading AI assistant platform, creating a future where intelligent 
                automation and human creativity work in perfect harmony to solve complex challenges 
                and drive innovation.
              </p>
            </div>
          </div>
        </Card>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6">
                <div className="text-center mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-assistant-primary text-sm mb-2">{member.role}</p>
                  <p className="text-sm text-slate-500">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default About;
