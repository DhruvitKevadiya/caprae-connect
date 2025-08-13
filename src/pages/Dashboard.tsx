import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  MessageCircle, 
  FileText, 
  DollarSign,
  Target,
  Clock,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    {
      title: 'Active Matches',
      value: '12',
      change: '+3 this week',
      icon: Users,
      color: 'text-corporate-blue'
    },
    {
      title: 'Messages',
      value: '28',
      change: '5 unread',
      icon: MessageCircle,
      color: 'text-success'
    },
    {
      title: 'Deals in Progress',
      value: '4',
      change: '2 in negotiation',
      icon: Target,
      color: 'text-warning'
    },
    {
      title: 'Pipeline Value',
      value: '$45M',
      change: '+$12M this month',
      icon: DollarSign,
      color: 'text-corporate-blue'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'match',
      title: 'New buyer match',
      description: 'Sarah Chen expressed interest in TechFlow Solutions',
      time: '2 hours ago',
      icon: Users
    },
    {
      id: '2',
      type: 'message',
      title: 'New message',
      description: 'Michael Rodriguez sent a message about valuation',
      time: '4 hours ago',
      icon: MessageCircle
    },
    {
      id: '3',
      type: 'document',
      title: 'Document uploaded',
      description: 'Financial statements added to deal room',
      time: '1 day ago',
      icon: FileText
    },
    {
      id: '4',
      type: 'stage',
      title: 'Stage advancement',
      description: 'MedAnalytics Pro moved to negotiation phase',
      time: '2 days ago',
      icon: TrendingUp
    }
  ];

  const activeDealsByStage = [
    { stage: 'NDA', count: 8, percentage: 40 },
    { stage: 'Due Diligence', count: 6, percentage: 30 },
    { stage: 'Valuation', count: 4, percentage: 20 },
    { stage: 'Negotiation', count: 2, percentage: 10 }
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
            <p className="text-neutral-600 mt-1">
              Welcome back! Here's what's happening with your deals.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline-corporate" asChild>
              <Link to="/onboarding/buyer">Add Buyer</Link>
            </Button>
            <Button variant="corporate" asChild>
              <Link to="/onboarding/seller">List Business</Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-neutral-900 mt-1">
                        {stat.value}
                      </p>
                      <p className="text-sm text-neutral-500 mt-1">
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-neutral-100 ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-neutral-600 truncate">
                          {activity.description}
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Deal Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Deal Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDealsByStage.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-neutral-700">
                        {item.stage}
                      </span>
                      <span className="text-sm text-neutral-600">
                        {item.count} deals
                      </span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
                
                <div className="pt-4 border-t border-neutral-200">
                  <Button variant="corporate" className="w-full" asChild>
                    <Link to="/acquisition-process">View All Deals</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex-col gap-2" asChild>
                <Link to="/matches">
                  <Users className="w-6 h-6" />
                  <span>Browse Matches</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2" asChild>
                <Link to="/messages">
                  <MessageCircle className="w-6 h-6" />
                  <span>Send Message</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2" asChild>
                <Link to="/acquisition-process">
                  <FileText className="w-6 h-6" />
                  <span>Upload Documents</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col gap-2" asChild>
                <Link to="/settings">
                  <BarChart3 className="w-6 h-6" />
                  <span>View Reports</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;