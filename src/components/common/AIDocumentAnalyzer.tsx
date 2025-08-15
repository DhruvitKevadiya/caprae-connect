import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Download,
  Eye
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AnalysisResult {
  summary: string;
  riskLevel: 'low' | 'medium' | 'high';
  keyFindings: string[];
  recommendations: string[];
  redFlags: string[];
  score: number;
}

export const AIDocumentAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const simulateAnalysis = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate AI analysis progress
    const progressSteps = [
      { step: 20, message: "Extracting document content..." },
      { step: 40, message: "Analyzing financial data..." },
      { step: 60, message: "Identifying risk factors..." },
      { step: 80, message: "Generating insights..." },
      { step: 100, message: "Analysis complete!" }
    ];

    for (const { step, message } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisProgress(step);
      toast({
        title: "AI Analysis Progress",
        description: message,
      });
    }

    // Mock analysis result
    const mockResult: AnalysisResult = {
      summary: "This financial statement shows a healthy technology company with strong revenue growth and improving margins. The company demonstrates solid fundamentals with minimal debt and strong cash flow generation.",
      riskLevel: 'low',
      keyFindings: [
        "Revenue growth of 45% year-over-year",
        "EBITDA margin improved from 18% to 28%",
        "Cash flow positive for 18 consecutive months",
        "Customer retention rate of 94%",
        "Diverse revenue streams across 3 verticals"
      ],
      recommendations: [
        "Consider due diligence on customer concentration risk",
        "Verify recurring revenue sustainability",
        "Assess competitive positioning in core markets",
        "Review technology infrastructure scalability"
      ],
      redFlags: [
        "Single largest customer represents 22% of revenue",
        "Pending litigation disclosed in footnotes"
      ],
      score: 82
    };

    setAnalysisResult(mockResult);
    setIsAnalyzing(false);

    toast({
      title: "Analysis Complete",
      description: "AI analysis has been completed successfully.",
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-success-green';
      case 'medium': return 'text-warning-amber';
      case 'high': return 'text-destructive';
      default: return 'text-neutral-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success-green';
    if (score >= 60) return 'text-warning-amber';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Document Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
            <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-4" />
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <p className="text-lg font-medium text-neutral-700 mb-2">
                Upload Financial Documents
              </p>
              <p className="text-sm text-neutral-500 mb-4">
                Drag and drop or click to select files (PDF, DOC, XLS)
              </p>
              <Button variant="outline" type="button">
                Select Files
              </Button>
            </label>
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-neutral-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button 
                onClick={simulateAnalysis}
                disabled={isAnalyzing}
                variant="corporate"
              >
                {isAnalyzing ? 'Analyzing...' : 'Start AI Analysis'}
              </Button>
            </div>
          )}

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analysis Progress</span>
                <span>{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-green" />
                  Analysis Summary
                </span>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-neutral-600">Risk Level</p>
                    <Badge className={getRiskColor(analysisResult.riskLevel)}>
                      {analysisResult.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-600">Overall Score</p>
                    <p className={`text-2xl font-bold ${getScoreColor(analysisResult.score)}`}>
                      {analysisResult.score}/100
                    </p>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700 leading-relaxed">
                {analysisResult.summary}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Findings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success-green" />
                  Key Findings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisResult.keyFindings.map((finding, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{finding}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Red Flags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning-amber" />
                  Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisResult.redFlags.map((flag, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning-amber mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{flag}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-primary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysisResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Button variant="corporate" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Share with Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};