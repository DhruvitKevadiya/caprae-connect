import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  FileText, 
  DollarSign,
  MessageCircle,
  AlertTriangle,
  Calendar,
  Target,
  TrendingUp
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DealStage {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming' | 'blocked';
  completedAt?: string;
  estimatedDuration: string;
  requirements: string[];
  blockers?: string[];
}

const mockDealStages: DealStage[] = [
  {
    id: '1',
    title: 'Initial Match',
    description: 'Buyer and seller have been matched based on criteria',
    status: 'completed',
    completedAt: '2024-01-15',
    estimatedDuration: '1 day',
    requirements: ['Profile matching', 'Initial interest confirmation']
  },
  {
    id: '2',
    title: 'NDA Execution',
    description: 'Non-disclosure agreement signed by both parties',
    status: 'completed',
    completedAt: '2024-01-18',
    estimatedDuration: '2-3 days',
    requirements: ['Legal review', 'Digital signatures', 'Document storage']
  },
  {
    id: '3',
    title: 'Information Exchange',
    description: 'Preliminary business information and financials shared',
    status: 'current',
    estimatedDuration: '1-2 weeks',
    requirements: ['Financial statements', 'Business overview', 'Market analysis'],
    blockers: ['Pending Q3 financial statements']
  },
  {
    id: '4',
    title: 'Initial Valuation',
    description: 'Preliminary valuation and offer terms discussion',
    status: 'upcoming',
    estimatedDuration: '1 week',
    requirements: ['Financial analysis', 'Comparable transactions', 'Market multiples']
  },
  {
    id: '5',
    title: 'Due Diligence',
    description: 'Comprehensive business, financial, and legal review',
    status: 'upcoming',
    estimatedDuration: '4-6 weeks',
    requirements: ['Data room setup', 'Legal review', 'Financial audit', 'Technical assessment']
  },
  {
    id: '6',
    title: 'Final Negotiation',
    description: 'Terms negotiation and purchase agreement drafting',
    status: 'upcoming',
    estimatedDuration: '2-3 weeks',
    requirements: ['Legal counsel', 'Term sheet finalization', 'Purchase agreement']
  },
  {
    id: '7',
    title: 'Closing',
    description: 'Final signatures, fund transfer, and ownership transfer',
    status: 'upcoming',
    estimatedDuration: '1 week',
    requirements: ['Final documentation', 'Fund verification', 'Regulatory approvals']
  }
];

export const DealFlowManager: React.FC = () => {
  const [stages, setStages] = useState<DealStage[]>(mockDealStages);
  
  const getCurrentStageIndex = () => {
    return stages.findIndex(stage => stage.status === 'current');
  };

  const getCompletionPercentage = () => {
    const completedStages = stages.filter(stage => stage.status === 'completed').length;
    return Math.round((completedStages / stages.length) * 100);
  };

  const handleAdvanceStage = () => {
    const currentIndex = getCurrentStageIndex();
    if (currentIndex < stages.length - 1) {
      const newStages = [...stages];
      newStages[currentIndex].status = 'completed';
      newStages[currentIndex].completedAt = new Date().toISOString().split('T')[0];
      newStages[currentIndex + 1].status = 'current';
      
      setStages(newStages);
      
      toast({
        title: 'Stage Advanced!',
        description: `Moved to ${newStages[currentIndex + 1].title}`,
      });
    }
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success-green" />;
      case 'current':
        return <Clock className="w-5 h-5 text-warning-amber" />;
      case 'blocked':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-neutral-300" />;
    }
  };

  const currentStageIndex = getCurrentStageIndex();
  const completionPercentage = getCompletionPercentage();

  return (
    <div className="space-y-6">
      {/* Deal Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Deal Progress Overview
            </span>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {completionPercentage}% Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={completionPercentage} className="h-3" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-success-green/10 to-success-green/5 rounded-lg border border-success-green/20">
              <TrendingUp className="w-8 h-8 text-success-green mx-auto mb-2" />
              <p className="text-sm text-neutral-600">Estimated Value</p>
              <p className="text-2xl font-bold text-success-green">$4.2M</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-neutral-600">Time to Close</p>
              <p className="text-2xl font-bold text-primary">8-12 weeks</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-warning-amber/10 to-warning-amber/5 rounded-lg border border-warning-amber/20">
              <Users className="w-8 h-8 text-warning-amber mx-auto mb-2" />
              <p className="text-sm text-neutral-600">Parties Involved</p>
              <p className="text-2xl font-bold text-warning-amber">6 people</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stage Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Deal Stages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {stages.map((stage, index) => (
              <div 
                key={stage.id} 
                className={`relative flex gap-4 p-4 rounded-lg border transition-all ${
                  stage.status === 'current' 
                    ? 'bg-primary/5 border-primary/20 shadow-md' 
                    : stage.status === 'completed'
                    ? 'bg-success-green/5 border-success-green/20'
                    : stage.status === 'blocked'
                    ? 'bg-destructive/5 border-destructive/20'
                    : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                {/* Timeline line */}
                {index < stages.length - 1 && (
                  <div className="absolute left-7 top-14 w-0.5 h-16 bg-neutral-200"></div>
                )}
                
                {/* Stage Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getStageIcon(stage.status)}
                </div>

                {/* Stage Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-2">
                        {stage.description}
                      </p>
                    </div>
                    <div className="text-right text-sm text-neutral-500 ml-4">
                      <p>Est. {stage.estimatedDuration}</p>
                      {stage.completedAt && (
                        <p className="text-success-green">
                          Completed {stage.completedAt}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-3">
                    <p className="text-sm font-medium text-neutral-700 mb-2">Requirements:</p>
                    <div className="flex flex-wrap gap-1">
                      {stage.requirements.map((req, reqIndex) => (
                        <Badge key={reqIndex} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Blockers */}
                  {stage.blockers && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-destructive mb-2">Blockers:</p>
                      <div className="flex flex-wrap gap-1">
                        {stage.blockers.map((blocker, blockerIndex) => (
                          <Badge key={blockerIndex} variant="destructive" className="text-xs">
                            {blocker}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {stage.status === 'current' && (
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        variant="corporate"
                        onClick={handleAdvanceStage}
                        disabled={stage.blockers && stage.blockers.length > 0}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message Team
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        View Documents
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Deal Management Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <FileText className="w-6 h-6" />
              <span>Upload Documents</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <MessageCircle className="w-6 h-6" />
              <span>Team Chat</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <DollarSign className="w-6 h-6" />
              <span>Financial Analysis</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Calendar className="w-6 h-6" />
              <span>Schedule Meeting</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};