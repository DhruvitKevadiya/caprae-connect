import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { 
  CheckCircle, 
  Clock, 
  Upload, 
  FileText, 
  Bot, 
  BarChart3,
  TrendingUp,
  DollarSign,
  Calendar
} from 'lucide-react';
import { mockAcquisitionStages } from '@/data/mockData';

const AcquisitionProcess = () => {
  const [stages, setStages] = useState(mockAcquisitionStages);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleAdvanceStage = () => {
    const currentStageIndex = stages.findIndex(stage => stage.status === 'current');
    if (currentStageIndex < stages.length - 1) {
      const newStages = [...stages];
      newStages[currentStageIndex].status = 'completed';
      newStages[currentStageIndex].completedAt = new Date();
      newStages[currentStageIndex + 1].status = 'current';
      setStages(newStages);
      
      toast({
        title: 'Stage Advanced!',
        description: `Moved to ${newStages[currentStageIndex + 1].title}`,
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAIAnalysis = () => {
    if (!selectedFile) return;
    
    // Simulate AI analysis
    toast({
      title: 'AI Analysis Started',
      description: 'Analyzing document... This may take a moment.',
    });

    setTimeout(() => {
      setAnalysisResult(`
📊 Financial Summary:
• Revenue Growth: +23% YoY
• Profit Margin: 18.5%
• Customer Retention: 94%
• Market Position: Strong

🎯 Key Insights:
• Strong recurring revenue model
• Diversified customer base
• Growth potential in international markets
• Well-positioned for acquisition

⚠️ Risk Factors:
• Dependency on key customers (15%)
• Competitive market environment
• Technology infrastructure needs updating

💰 Valuation Range: $8M - $12M
📈 Recommendation: PROCEED with due diligence
      `);
      
      toast({
        title: 'Analysis Complete!',
        description: 'AI has analyzed the document and generated insights.',
      });
    }, 3000);
  };

  const completedStages = stages.filter(stage => stage.status === 'completed').length;
  const progressPercentage = (completedStages / stages.length) * 100;

  const mockDocuments = [
    { name: 'Financial Statements Q1-Q3 2024.pdf', uploaded: '2024-01-15', type: 'Financial' },
    { name: 'Tax Returns 2023.pdf', uploaded: '2024-01-18', type: 'Tax' },
    { name: 'Customer Contracts Summary.xlsx', uploaded: '2024-01-20', type: 'Legal' },
    { name: 'Employee Handbook.pdf', uploaded: '2024-01-22', type: 'HR' }
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Acquisition Process</h1>
            <p className="text-neutral-600 mt-1">
              Track your deal progress and manage documents
            </p>
          </div>
          <Button variant="corporate" onClick={handleAdvanceStage}>
            Advance Stage
          </Button>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Deal Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-neutral-600">{completedStages} of {stages.length} stages</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="font-semibold text-success">On Track</p>
                  <p className="text-sm text-neutral-600">Timeline: 45 days</p>
                </div>
                <div className="text-center p-4 bg-corporate-blue/10 rounded-lg">
                  <DollarSign className="w-8 h-8 text-corporate-blue mx-auto mb-2" />
                  <p className="font-semibold text-corporate-blue">$12M</p>
                  <p className="text-sm text-neutral-600">Target Valuation</p>
                </div>
                <div className="text-center p-4 bg-warning/10 rounded-lg">
                  <Calendar className="w-8 h-8 text-warning mx-auto mb-2" />
                  <p className="font-semibold text-warning">Mar 15</p>
                  <p className="text-sm text-neutral-600">Target Close</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stage Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Acquisition Stages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stages.map((stage, index) => (
                <div key={stage.id} className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${
                    stage.status === 'completed'
                      ? 'bg-success text-white'
                      : stage.status === 'current'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}>
                    {stage.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-neutral-900">{stage.title}</h3>
                      <Badge 
                        variant={
                          stage.status === 'completed' 
                            ? 'default' 
                            : stage.status === 'current'
                            ? 'secondary'
                            : 'outline'
                        }
                        className={
                          stage.status === 'completed'
                            ? 'bg-success text-white'
                            : stage.status === 'current'
                            ? 'bg-primary text-primary-foreground'
                            : ''
                        }
                      >
                        {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-neutral-600 text-sm">{stage.description}</p>
                    {stage.completedAt && (
                      <p className="text-xs text-neutral-500 mt-1">
                        Completed on {stage.completedAt.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Document Management & AI Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                    <div>
                      <p className="font-medium text-neutral-900">{doc.name}</p>
                      <p className="text-sm text-neutral-600">
                        {doc.type} • Uploaded {new Date(doc.uploaded).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
                
                <div className="pt-4 border-t border-neutral-200">
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis Tool */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                AI Document Analyzer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.xlsx,.xls,.doc,.docx"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-neutral-600">
                      {selectedFile ? selectedFile.name : 'Drop files here or click to upload'}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      PDF, Excel, Word documents
                    </p>
                  </label>
                </div>

                <Button 
                  variant="corporate" 
                  onClick={handleAIAnalysis}
                  disabled={!selectedFile}
                  className="w-full"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Analyze with AI
                </Button>

                {analysisResult && (
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Analysis Results:</h4>
                    <pre className="text-sm text-neutral-700 whitespace-pre-wrap">
                      {analysisResult}
                    </pre>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AcquisitionProcess;