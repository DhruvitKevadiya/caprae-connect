import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { 
  User, 
  Bell, 
  Shield, 
  Mail, 
  Phone,
  MapPin,
  Building
} from 'lucide-react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    company: 'TechFlow Solutions',
    location: 'Austin, TX',
    bio: 'Experienced entrepreneur looking to sell my SaaS business after 5 successful years.'
  });

  const [notifications, setNotifications] = useState({
    emailMatches: true,
    emailMessages: true,
    emailUpdates: false,
    pushMatches: true,
    pushMessages: true,
    pushUpdates: false
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileSave = () => {
    // In a real app, this would save to backend
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been saved successfully.',
    });
  };

  const handleNotificationSave = () => {
    // In a real app, this would save to backend
    toast({
      title: 'Notification Preferences Updated',
      description: 'Your notification settings have been saved.',
    });
  };

  const handlePasswordChange = () => {
    if (password.new !== password.confirm) {
      toast({
        title: 'Password Mismatch',
        description: 'New passwords do not match.',
        variant: 'destructive'
      });
      return;
    }

    if (password.new.length < 8) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 8 characters long.',
        variant: 'destructive'
      });
      return;
    }

    // In a real app, this would save to backend
    toast({
      title: 'Password Changed',
      description: 'Your password has been updated successfully.',
    });
    
    setPassword({ current: '', new: '', confirm: '' });
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-600 mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <Input
                        id="company"
                        value={profile.company}
                        onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself and your business..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="corporate" onClick={handleProfileSave}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-4">Email Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Matches</p>
                          <p className="text-sm text-neutral-600">Get notified when you have new potential matches</p>
                        </div>
                        <Switch
                          checked={notifications.emailMatches}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, emailMatches: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Messages</p>
                          <p className="text-sm text-neutral-600">Get notified when you receive new messages</p>
                        </div>
                        <Switch
                          checked={notifications.emailMessages}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, emailMessages: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Platform Updates</p>
                          <p className="text-sm text-neutral-600">Get updates about new features and improvements</p>
                        </div>
                        <Switch
                          checked={notifications.emailUpdates}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, emailUpdates: checked }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-4">Push Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Matches</p>
                          <p className="text-sm text-neutral-600">Instant notifications for new matches</p>
                        </div>
                        <Switch
                          checked={notifications.pushMatches}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, pushMatches: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Messages</p>
                          <p className="text-sm text-neutral-600">Instant notifications for new messages</p>
                        </div>
                        <Switch
                          checked={notifications.pushMessages}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, pushMessages: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Platform Updates</p>
                          <p className="text-sm text-neutral-600">Notifications about platform updates</p>
                        </div>
                        <Switch
                          checked={notifications.pushUpdates}
                          onCheckedChange={(checked) => 
                            setNotifications(prev => ({ ...prev, pushUpdates: checked }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="corporate" onClick={handleNotificationSave}>
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={password.current}
                      onChange={(e) => setPassword(prev => ({ ...prev, current: e.target.value }))}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={password.new}
                      onChange={(e) => setPassword(prev => ({ ...prev, new: e.target.value }))}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={password.confirm}
                      onChange={(e) => setPassword(prev => ({ ...prev, confirm: e.target.value }))}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    variant="corporate" 
                    onClick={handlePasswordChange}
                    disabled={!password.current || !password.new || !password.confirm}
                  >
                    Change Password
                  </Button>
                </div>

                <div className="pt-6 border-t border-neutral-200">
                  <h4 className="font-semibold text-neutral-900 mb-4">Account Management</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Download Account Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                      Deactivate Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;