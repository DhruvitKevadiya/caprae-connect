import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { FormStepper } from '@/components/common/FormStepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { 
  industryOptions, 
  budgetOptions, 
  timelineOptions, 
  acquisitionTypeOptions,
  BuyerProfile 
} from '@/data/mockData';

const steps = [
  { id: 'personal', title: 'Personal Info', description: 'Basic details' },
  { id: 'preferences', title: 'Investment Focus', description: 'Industry & budget' },
  { id: 'experience', title: 'Experience', description: 'Background info' },
  { id: 'review', title: 'Review', description: 'Confirm details' }
];

const BuyerOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<BuyerProfile>>({
    name: '',
    email: '',
    industries: [],
    budget: '',
    timeline: '',
    location: '',
    experience: '',
    acquisitionType: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Personal Info
        if (!formData.name?.trim()) newErrors.name = 'Name is required';
        if (!formData.email?.trim()) newErrors.email = 'Email is required';
        if (!formData.location?.trim()) newErrors.location = 'Location is required';
        break;
      case 1: // Investment Focus
        if (!formData.industries?.length) newErrors.industries = 'At least one industry is required';
        if (!formData.budget) newErrors.budget = 'Budget range is required';
        if (!formData.timeline) newErrors.timeline = 'Timeline is required';
        break;
      case 2: // Experience
        if (!formData.experience?.trim()) newErrors.experience = 'Experience level is required';
        if (!formData.acquisitionType?.length) newErrors.acquisitionType = 'At least one acquisition type is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Save to localStorage (in real app, would send to backend)
    const existingBuyers = JSON.parse(localStorage.getItem('buyers') || '[]');
    const newBuyer = {
      ...formData,
      id: Date.now().toString()
    };
    localStorage.setItem('buyers', JSON.stringify([...existingBuyers, newBuyer]));
    
    toast({
      title: 'Registration Complete!',
      description: 'Your buyer profile has been created successfully.',
    });
    
    navigate('/dashboard');
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Personal Info
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => updateFormData('name', e.target.value)}
                placeholder="Enter your full name"
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="Enter your email address"
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location || ''}
                onChange={(e) => updateFormData('location', e.target.value)}
                placeholder="City, State/Country"
                className={errors.location ? 'border-destructive' : ''}
              />
              {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
            </div>
          </div>
        );

      case 1: // Investment Focus
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Industries of Interest *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {industryOptions.map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      id={industry}
                      checked={formData.industries?.includes(industry) || false}
                      onCheckedChange={(checked) => {
                        const current = formData.industries || [];
                        if (checked) {
                          updateFormData('industries', [...current, industry]);
                        } else {
                          updateFormData('industries', current.filter(i => i !== industry));
                        }
                      }}
                    />
                    <Label htmlFor={industry} className="text-sm font-normal">
                      {industry}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.industries && <p className="text-sm text-destructive">{errors.industries}</p>}
            </div>

            <div className="space-y-2">
              <Label>Investment Budget *</Label>
              <Select value={formData.budget || ''} onValueChange={(value) => updateFormData('budget', value)}>
                <SelectTrigger className={errors.budget ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((budget) => (
                    <SelectItem key={budget} value={budget}>
                      {budget}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
            </div>

            <div className="space-y-2">
              <Label>Acquisition Timeline *</Label>
              <Select value={formData.timeline || ''} onValueChange={(value) => updateFormData('timeline', value)}>
                <SelectTrigger className={errors.timeline ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelineOptions.map((timeline) => (
                    <SelectItem key={timeline} value={timeline}>
                      {timeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.timeline && <p className="text-sm text-destructive">{errors.timeline}</p>}
            </div>
          </div>
        );

      case 2: // Experience
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="experience">Investment Experience *</Label>
              <Select value={formData.experience || ''} onValueChange={(value) => updateFormData('experience', value)}>
                <SelectTrigger className={errors.experience ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-time">First-time buyer</SelectItem>
                  <SelectItem value="1-3">1-3 acquisitions</SelectItem>
                  <SelectItem value="3-5">3-5 acquisitions</SelectItem>
                  <SelectItem value="5+">5+ acquisitions</SelectItem>
                  <SelectItem value="serial">Serial acquirer (10+)</SelectItem>
                </SelectContent>
              </Select>
              {errors.experience && <p className="text-sm text-destructive">{errors.experience}</p>}
            </div>

            <div className="space-y-3">
              <Label>Acquisition Types of Interest *</Label>
              <div className="grid grid-cols-2 gap-3">
                {acquisitionTypeOptions.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={formData.acquisitionType?.includes(type) || false}
                      onCheckedChange={(checked) => {
                        const current = formData.acquisitionType || [];
                        if (checked) {
                          updateFormData('acquisitionType', [...current, type]);
                        } else {
                          updateFormData('acquisitionType', current.filter(t => t !== type));
                        }
                      }}
                    />
                    <Label htmlFor={type} className="text-sm font-normal">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.acquisitionType && <p className="text-sm text-destructive">{errors.acquisitionType}</p>}
            </div>
          </div>
        );

      case 3: // Review
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-neutral-900">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {formData.name}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                  <p><span className="font-medium">Location:</span> {formData.location}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-neutral-900">Investment Focus</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Budget:</span> {formData.budget}</p>
                  <p><span className="font-medium">Timeline:</span> {formData.timeline}</p>
                  <p><span className="font-medium">Experience:</span> {formData.experience}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-neutral-900">Industries</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.industries?.map((industry) => (
                    <span key={industry} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-neutral-900">Acquisition Types</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.acquisitionType?.map((type) => (
                    <span key={type} className="px-2 py-1 bg-success/10 text-success text-xs rounded-md">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">Buyer Registration</h1>
          <p className="text-neutral-600 mt-2">
            Complete your profile to start finding acquisition opportunities
          </p>
        </div>

        {/* Stepper */}
        <FormStepper steps={steps} currentStep={currentStep} />

        {/* Form Content */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-neutral-200">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button
                variant="corporate"
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? 'Complete Registration' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default BuyerOnboarding;