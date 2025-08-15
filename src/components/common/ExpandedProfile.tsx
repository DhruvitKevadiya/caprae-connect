import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Building2, 
  Users, 
  TrendingUp,
  CheckCircle,
  Clock,
  MessageCircle,
  FileText,
  Star
} from 'lucide-react';

interface ExpandedProfileProps {
  profile: any;
  type: 'buyer' | 'seller';
  isOpen: boolean;
  onClose: () => void;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onMessage?: (id: string) => void;
}

export const ExpandedProfile: React.FC<ExpandedProfileProps> = ({
  profile,
  type,
  isOpen,
  onClose,
  onAccept,
  onReject,
  onMessage
}) => {
  if (!profile) return null;

  const verificationBadges = [
    { label: 'Identity Verified', icon: CheckCircle, verified: true },
    { label: 'Financial Verified', icon: DollarSign, verified: true },
    { label: 'Reference Checked', icon: Star, verified: type === 'seller' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">
                {profile.name?.charAt(0)}
              </span>
            </div>
            {profile.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success-green" />
                Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {verificationBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <Badge 
                      key={badge.label}
                      variant={badge.verified ? "default" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      <Icon className="w-3 h-3" />
                      {badge.label}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {type === 'buyer' ? (
                <>
                  {/* Investment Focus */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Investment Focus
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Target Industries</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.industries?.map((industry: string) => (
                            <Badge key={industry} variant="outline">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-1">Budget Range</h4>
                          <p className="text-neutral-600">{profile.budget}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Timeline</h4>
                          <p className="text-neutral-600">{profile.timeline}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Experience */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Experience & Background
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-1">Experience Level</h4>
                        <p className="text-neutral-600">{profile.experience}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Acquisition Type</h4>
                        <p className="text-neutral-600">{profile.acquisitionType}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Previous Acquisitions</h4>
                        <div className="space-y-2">
                          <div className="p-3 bg-neutral-50 rounded-lg">
                            <p className="font-medium">TechFlow Solutions</p>
                            <p className="text-sm text-neutral-600">SaaS Platform • $2.5M • 2023</p>
                          </div>
                          <div className="p-3 bg-neutral-50 rounded-lg">
                            <p className="font-medium">DataSync Pro</p>
                            <p className="text-sm text-neutral-600">Analytics Tool • $1.8M • 2022</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  {/* Business Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Business Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-1">Business Name</h4>
                          <p className="text-neutral-600">{profile.businessName}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Industry</h4>
                          <Badge variant="outline">{profile.industry}</Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Founded</h4>
                          <p className="text-neutral-600">{profile.founded}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Employees</h4>
                          <p className="text-neutral-600">{profile.employees}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Financials */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Financial Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-1">Annual Revenue</h4>
                          <p className="text-neutral-600 font-medium">{profile.revenue}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Asking Price</h4>
                          <p className="text-neutral-600 font-medium">{profile.askingPrice}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Key Metrics</h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-3 bg-neutral-50 rounded-lg">
                            <p className="text-2xl font-bold text-primary">3.2x</p>
                            <p className="text-sm text-neutral-600">Revenue Multiple</p>
                          </div>
                          <div className="p-3 bg-neutral-50 rounded-lg">
                            <p className="text-2xl font-bold text-success-green">28%</p>
                            <p className="text-sm text-neutral-600">EBITDA Margin</p>
                          </div>
                          <div className="p-3 bg-neutral-50 rounded-lg">
                            <p className="text-2xl font-bold text-corporate-blue">142%</p>
                            <p className="text-sm text-neutral-600">Growth Rate</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm">{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm">Member since 2023</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm">Last active: 2 hours ago</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Profile Views</span>
                    <span className="text-sm font-medium">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Active Conversations</span>
                    <span className="text-sm font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Response Rate</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Avg. Response Time</span>
                    <span className="text-sm font-medium">2.3 hours</span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  variant="corporate" 
                  className="w-full"
                  onClick={() => onAccept?.(profile.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept Match
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onMessage?.(profile.id)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Request Documents
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => onReject?.(profile.id)}
                >
                  Pass
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};