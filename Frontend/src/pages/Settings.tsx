import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from '../components/ui/use-toast';
import { useTheme } from '../contexts/ThemeContext';
import {
  Moon,
  Sun,
  Bell,
  Shield,
  Globe,
  Keyboard,
  HardDrive,
  Trash2,
  Languages,
  Volume2,
  Wifi,
  Clock,
  Eye,
  BrainCircuit
} from 'lucide-react';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  // Theme Settings
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  const [themeColor, setThemeColor] = useState('blue');
  const [fontSize, setFontSize] = useState('medium');

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [desktopAlerts, setDesktopAlerts] = useState(true);

  // Privacy Settings
  const [dataCollection, setDataCollection] = useState(true);
  const [shareUsageData, setShareUsageData] = useState(false);
  const [activityVisible, setActivityVisible] = useState(true);

  // AI Settings
  const [aiPersonalization, setAiPersonalization] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [autoLearn, setAutoLearn] = useState(true);

  // Language and Region
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');

  // Effect to sync dark mode with theme context
  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  // Handle dark mode toggle
  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    setTheme(checked ? 'dark' : 'light');
  };

  const handleSave = () => {
    // Save all settings to backend/localStorage here
    localStorage.setItem('settings', JSON.stringify({
      themeColor,
      fontSize,
      emailNotifications,
      pushNotifications,
      soundEnabled,
      desktopAlerts,
      dataCollection,
      shareUsageData,
      activityVisible,
      aiPersonalization,
      aiSuggestions,
      autoLearn,
      language,
      timezone
    }));

    toast({
      title: "Settings Updated",
      description: "Your preferences have been saved successfully.",
    });
  };

  const handleReset = () => {
    // Reset all settings to defaults
    setIsDarkMode(false);
    setTheme('light');
    setThemeColor('blue');
    setFontSize('medium');
    setEmailNotifications(true);
    setPushNotifications(true);
    setSoundEnabled(true);
    setDesktopAlerts(true);
    setDataCollection(true);
    setShareUsageData(false);
    setActivityVisible(true);
    setAiPersonalization(true);
    setAiSuggestions(true);
    setAutoLearn(true);
    setLanguage('en');
    setTimezone('UTC');

    // Clear saved settings
    localStorage.removeItem('settings');

    toast({
      title: "Settings Reset",
      description: "All settings have been restored to defaults.",
    });
  };

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setThemeColor(settings.themeColor);
      setFontSize(settings.fontSize);
      setEmailNotifications(settings.emailNotifications);
      setPushNotifications(settings.pushNotifications);
      setSoundEnabled(settings.soundEnabled);
      setDesktopAlerts(settings.desktopAlerts);
      setDataCollection(settings.dataCollection);
      setShareUsageData(settings.shareUsageData);
      setActivityVisible(settings.activityVisible);
      setAiPersonalization(settings.aiPersonalization);
      setAiSuggestions(settings.aiSuggestions);
      setAutoLearn(settings.autoLearn);
      setLanguage(settings.language);
      setTimezone(settings.timezone);
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleReset}>Reset All</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>

        <Tabs defaultValue="appearance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="ai">AI & Learning</TabsTrigger>
            <TabsTrigger value="language">Language & Region</TabsTrigger>
          </TabsList>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-slate-500">Toggle between light and dark themes</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4" />
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={handleDarkModeToggle}
                    />
                    <Moon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Theme Color</Label>
                  <Select value={themeColor} onValueChange={setThemeColor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select value={fontSize} onValueChange={setFontSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-slate-500">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-slate-500">Get notified in your browser</p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Sound Effects</Label>
                    <p className="text-sm text-slate-500">Play sounds for notifications</p>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Desktop Alerts</Label>
                    <p className="text-sm text-slate-500">Show alerts on your desktop</p>
                  </div>
                  <Switch
                    checked={desktopAlerts}
                    onCheckedChange={setDesktopAlerts}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Data Collection</Label>
                    <p className="text-sm text-slate-500">Allow data collection to improve your experience</p>
                  </div>
                  <Switch
                    checked={dataCollection}
                    onCheckedChange={setDataCollection}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Share Usage Data</Label>
                    <p className="text-sm text-slate-500">Share anonymous usage data</p>
                  </div>
                  <Switch
                    checked={shareUsageData}
                    onCheckedChange={setShareUsageData}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Activity Visibility</Label>
                    <p className="text-sm text-slate-500">Make your activity visible to others</p>
                  </div>
                  <Switch
                    checked={activityVisible}
                    onCheckedChange={setActivityVisible}
                  />
                </div>

                <div className="pt-4 border-t">
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* AI Settings */}
          <TabsContent value="ai">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">AI Personalization</Label>
                    <p className="text-sm text-slate-500">Allow AI to learn from your interactions</p>
                  </div>
                  <Switch
                    checked={aiPersonalization}
                    onCheckedChange={setAiPersonalization}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Smart Suggestions</Label>
                    <p className="text-sm text-slate-500">Receive AI-powered suggestions</p>
                  </div>
                  <Switch
                    checked={aiSuggestions}
                    onCheckedChange={setAiSuggestions}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Automatic Learning</Label>
                    <p className="text-sm text-slate-500">AI automatically learns from your patterns</p>
                  </div>
                  <Switch
                    checked={autoLearn}
                    onCheckedChange={setAutoLearn}
                  />
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline">
                    <BrainCircuit className="w-4 h-4 mr-2" />
                    Retrain AI Model
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Language & Region Settings */}
          <TabsContent value="language">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="CST">Central Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings; 