import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Clock,
  FileText,
  MessageCircle
} from 'lucide-react';

const Analytics = () => {
  const metrics = [
    {
      title: 'Total Deal Value',
      value: '$12.4M',
      change: '+23%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Active Deals',
      value: '18',
      change: '+12%',
      trend: 'up',
      icon: Target
    },
    {
      title: 'Match Success Rate',
      value: '67%',
      change: '+8%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Avg. Close Time',
      value: '89 days',
      change: '-15%',
      trend: 'down',
      icon: Clock
    }
  ];

  const recentDeals = [
    { name: 'TechFlow Solutions', value: '$4.2M', stage: 'Due Diligence', progress: 75 },
    { name: 'MedAnalytics Pro', value: '$2.8M', stage: 'Negotiation', progress: 85 },
    { name: 'DataSync Plus', value: '$1.9M', stage: 'Valuation', progress: 45 },
    { name: 'CloudBase Systems', value: '$3.5M', stage: 'Documentation', progress: 65 }
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Analytics Dashboard</h1>
          <p className="text-neutral-600 mt-1">
            Track your M&A performance and deal metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-600">
                        {metric.title}
                      </p>
                      <p className="text-2xl font-bold text-neutral-900 mt-1">
                        {metric.value}
                      </p>
                      <p className={`text-sm mt-1 flex items-center gap-1 ${
                        metric.trend === 'up' ? 'text-success-green' : 'text-destructive'
                      }`}>
                        <TrendingUp className={`w-3 h-3 ${
                          metric.trend === 'down' ? 'rotate-180' : ''
                        }`} />
                        {metric.change} from last month
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                {recentDeals.map((deal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-neutral-900">{deal.name}</p>
                        <p className="text-sm text-neutral-600">{deal.stage} • {deal.value}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">{deal.progress}%</p>
                        <p className="text-xs text-neutral-500">Complete</p>
                      </div>
                    </div>
                    <Progress value={deal.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-success-green/10">
                    <Target className="w-4 h-4 text-success-green" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Deal Completed</p>
                    <p className="text-xs text-neutral-600">TechFlow Solutions closed for $4.2M</p>
                    <p className="text-xs text-neutral-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New Match</p>
                    <p className="text-xs text-neutral-600">Sarah Chen interested in MedAnalytics</p>
                    <p className="text-xs text-neutral-500 mt-1">4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-warning-amber/10">
                    <FileText className="w-4 h-4 text-warning-amber" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Document Uploaded</p>
                    <p className="text-xs text-neutral-600">Financial statements for Q3 review</p>
                    <p className="text-xs text-neutral-500 mt-1">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <Clock className="w-4 h-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Stage Update</p>
                    <p className="text-xs text-neutral-600">CloudBase moved to negotiation phase</p>
                    <p className="text-xs text-neutral-500 mt-1">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-success-green/10 to-success-green/5 rounded-lg">
                <TrendingUp className="w-8 h-8 text-success-green mx-auto mb-3" />
                <h3 className="font-semibold text-neutral-900 mb-2">Strong Q4 Performance</h3>
                <p className="text-sm text-neutral-600">
                  Deal closure rate improved by 23% this quarter with faster processing times.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-neutral-900 mb-2">Growing Network</h3>
                <p className="text-sm text-neutral-600">
                  15 new verified buyers joined this month, expanding your potential matches.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-warning-amber/10 to-warning-amber/5 rounded-lg">
                <DollarSign className="w-8 h-8 text-warning-amber mx-auto mb-3" />
                <h3 className="font-semibold text-neutral-900 mb-2">Revenue Growth</h3>
                <p className="text-sm text-neutral-600">
                  Total transaction value up 45% year-over-year with premium deals leading.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Analytics;