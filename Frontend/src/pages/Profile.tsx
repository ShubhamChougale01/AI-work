import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { toast } from '../components/ui/use-toast';
import { UserCircle, Mail, Phone, MapPin, Building, Globe, Camera } from 'lucide-react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    company: 'Tech Corp',
    website: 'www.johndoe.com',
    bio: 'AI enthusiast and technology professional with a passion for innovation.',
    avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4'
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Profile</h1>

        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-1.5 bg-assistant-primary text-white rounded-full hover:bg-assistant-secondary transition-colors">
                  <Camera size={16} />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {isEditing ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="max-w-xs"
                      />
                    ) : (
                      profileData.name
                    )}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400">{profileData.bio}</p>
                </div>
                <Button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  variant={isEditing ? "default" : "outline"}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Mail size={16} />
                  {isEditing ? (
                    <Input
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  ) : (
                    profileData.email
                  )}
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Phone size={16} />
                  {isEditing ? (
                    <Input
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  ) : (
                    profileData.phone
                  )}
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <MapPin size={16} />
                  {isEditing ? (
                    <Input
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  ) : (
                    profileData.location
                  )}
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Building size={16} />
                  {isEditing ? (
                    <Input
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    />
                  ) : (
                    profileData.company
                  )}
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Globe size={16} />
                  {isEditing ? (
                    <Input
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    />
                  ) : (
                    profileData.website
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Activity Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: "Updated profile picture", time: "2 hours ago" },
              { action: "Added new goal", time: "1 day ago" },
              { action: "Completed task", time: "2 days ago" },
              { action: "Set new reminder", time: "3 days ago" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700 last:border-0">
                <span className="text-slate-600 dark:text-slate-300">{activity.action}</span>
                <span className="text-sm text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile; 