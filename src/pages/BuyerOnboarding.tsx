import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FieldProps } from 'formik';
import { AppLayout } from '@/components/layout/AppLayout';
import { FormStepper } from '@/components/common/FormStepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { 
  industryOptions, 
  budgetOptions, 
  timelineOptions, 
  acquisitionTypeOptions,
} from '@/data/mockData';
import { 
  buyerPersonalInfoSchema, 
  buyerInvestmentFocusSchema, 
  buyerExperienceSchema,
  buyerCompleteSchema,
  type BuyerComplete 
} from '@/schemas/validationSchemas';
import { saveBuyer } from '@/utils/localStorage';

const steps = [
  { id: 'personal', title: 'Personal Info', description: 'Basic details' },
  { id: 'preferences', title: 'Investment Focus', description: 'Industry & budget' },
  { id: 'experience', title: 'Experience', description: 'Background info' },
  { id: 'review', title: 'Review', description: 'Confirm details' }
];

const BuyerOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BuyerComplete>({
    name: '',
    email: '',
    location: '',
    industries: [],
    budget: '',
    timeline: '',
    experience: '',
    acquisitionType: []
  });

  const initialValues: BuyerComplete = formData;

  const getSchemaForStep = (step: number) => {
    switch (step) {
      case 0: return buyerPersonalInfoSchema;
      case 1: return buyerInvestmentFocusSchema;
      case 2: return buyerExperienceSchema;
      default: return buyerCompleteSchema;
    }
  };

  const validateFormik = (values: BuyerComplete) => {
    try {
      getSchemaForStep(currentStep).parse(values);
      return {};
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {};
      if (error.issues) {
        error.issues.forEach((issue: any) => {
          if (issue.path && issue.path.length > 0) {
            fieldErrors[issue.path[0]] = issue.message;
          }
        });
      }
      return fieldErrors;
    }
  };

  const handleSubmit = (values: BuyerComplete) => {
    try {
      buyerCompleteSchema.parse(values);
      const savedBuyer = saveBuyer(values);
      
      toast({
        title: 'Registration Complete!',
        description: 'Your buyer profile has been created successfully.',
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error saving your profile. Please try again.',
        variant: 'destructive'
      });
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

        <Formik
          initialValues={initialValues}
          validate={validateFormik}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, setFieldValue, setFieldError, setTouched }) => {
            const handleNext = async () => {
              try {
                getSchemaForStep(currentStep).parse(values);
                
                // Save current step data
                setFormData({ ...formData, ...values });
                
                if (currentStep < steps.length - 1) {
                  setCurrentStep(currentStep + 1);
                } else {
                  handleSubmit(values);
                }
              } catch (error: any) {
                // Mark all fields as touched to show validation errors
                const touchedFields: Record<string, boolean> = {};
                if (error.issues) {
                  error.issues.forEach((issue: any) => {
                    if (issue.path && issue.path.length > 0) {
                      touchedFields[issue.path[0]] = true;
                      setFieldError(issue.path[0], issue.message);
                    }
                  });
                  setTouched(touchedFields);
                }
              }
            };

            const handleBack = () => {
              if (currentStep > 0) {
                setCurrentStep(currentStep - 1);
              }
            };

            const renderStepContent = () => {
              switch (currentStep) {
                case 0: // Personal Info
                  return (
                    <div className="space-y-6">
                      <Field name="name">
                        {({ field, meta }: FieldProps) => (
                          <div className="space-y-2">
                            <Label htmlFor="name">
                              Full Name <span className="required-asterisk">*</span>
                            </Label>
                            <Input
                              {...field}
                              id="name"
                              placeholder="Enter your full name"
                              className={meta.error && meta.touched ? 'border-destructive' : ''}
                            />
                            {meta.error && meta.touched && (
                              <p className="text-sm text-destructive">{meta.error}</p>
                            )}
                          </div>
                        )}
                      </Field>

                      <Field name="email">
                        {({ field, meta }: FieldProps) => (
                          <div className="space-y-2">
                            <Label htmlFor="email">
                              Email Address <span className="required-asterisk">*</span>
                            </Label>
                            <Input
                              {...field}
                              id="email"
                              type="email"
                              placeholder="Enter your email address"
                              className={meta.error && meta.touched ? 'border-destructive' : ''}
                            />
                            {meta.error && meta.touched && (
                              <p className="text-sm text-destructive">{meta.error}</p>
                            )}
                          </div>
                        )}
                      </Field>

                      <Field name="location">
                        {({ field, meta }: FieldProps) => (
                          <div className="space-y-2">
                            <Label htmlFor="location">
                              Location <span className="required-asterisk">*</span>
                            </Label>
                            <Input
                              {...field}
                              id="location"
                              placeholder="City, State/Country"
                              className={meta.error && meta.touched ? 'border-destructive' : ''}
                            />
                            {meta.error && meta.touched && (
                              <p className="text-sm text-destructive">{meta.error}</p>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                  );

                case 1: // Investment Focus
                  return (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label>
                          Industries of Interest <span className="required-asterisk">*</span>
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {industryOptions.map((industry) => (
                            <div key={industry} className="flex items-center space-x-2">
                              <Checkbox
                                id={industry}
                                checked={values.industries.includes(industry)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFieldValue('industries', [...values.industries, industry]);
                                  } else {
                                    setFieldValue('industries', values.industries.filter(i => i !== industry));
                                  }
                                }}
                              />
                              <Label htmlFor={industry} className="text-sm font-normal">
                                {industry}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {errors.industries && touched.industries && (
                          <p className="text-sm text-destructive">{errors.industries}</p>
                        )}
                      </div>

                      <Field name="budget">
                        {({ field }: FieldProps) => (
                          <div className="space-y-2">
                            <Label>
                              Investment Budget <span className="required-asterisk">*</span>
                            </Label>
                            <Select 
                              value={field.value} 
                              onValueChange={(value) => setFieldValue('budget', value)}
                            >
                              <SelectTrigger className={errors.budget && touched.budget ? 'border-destructive' : ''}>
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
                            {errors.budget && touched.budget && (
                              <p className="text-sm text-destructive">{errors.budget}</p>
                            )}
                          </div>
                        )}
                      </Field>

                      <Field name="timeline">
                        {({ field }: FieldProps) => (
                          <div className="space-y-2">
                            <Label>
                              Acquisition Timeline <span className="required-asterisk">*</span>
                            </Label>
                            <Select 
                              value={field.value} 
                              onValueChange={(value) => setFieldValue('timeline', value)}
                            >
                              <SelectTrigger className={errors.timeline && touched.timeline ? 'border-destructive' : ''}>
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
                            {errors.timeline && touched.timeline && (
                              <p className="text-sm text-destructive">{errors.timeline}</p>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                  );

                case 2: // Experience
                  return (
                    <div className="space-y-6">
                      <Field name="experience">
                        {({ field }: FieldProps) => (
                          <div className="space-y-2">
                            <Label>
                              Investment Experience <span className="required-asterisk">*</span>
                            </Label>
                            <Select 
                              value={field.value} 
                              onValueChange={(value) => setFieldValue('experience', value)}
                            >
                              <SelectTrigger className={errors.experience && touched.experience ? 'border-destructive' : ''}>
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
                            {errors.experience && touched.experience && (
                              <p className="text-sm text-destructive">{errors.experience}</p>
                            )}
                          </div>
                        )}
                      </Field>

                      <div className="space-y-3">
                        <Label>
                          Acquisition Types of Interest <span className="required-asterisk">*</span>
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          {acquisitionTypeOptions.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox
                                id={type}
                                checked={values.acquisitionType.includes(type)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFieldValue('acquisitionType', [...values.acquisitionType, type]);
                                  } else {
                                    setFieldValue('acquisitionType', values.acquisitionType.filter(t => t !== type));
                                  }
                                }}
                              />
                              <Label htmlFor={type} className="text-sm font-normal">
                                {type}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {errors.acquisitionType && touched.acquisitionType && (
                          <p className="text-sm text-destructive">{errors.acquisitionType}</p>
                        )}
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
                            <p><span className="font-medium">Name:</span> {values.name}</p>
                            <p><span className="font-medium">Email:</span> {values.email}</p>
                            <p><span className="font-medium">Location:</span> {values.location}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-neutral-900">Investment Focus</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Budget:</span> {values.budget}</p>
                            <p><span className="font-medium">Timeline:</span> {values.timeline}</p>
                            <p><span className="font-medium">Experience:</span> {values.experience}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-neutral-900">Industries</h4>
                          <div className="flex flex-wrap gap-2">
                            {values.industries?.map((industry) => (
                              <span key={industry} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                                {industry}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-neutral-900">Acquisition Types</h4>
                          <div className="flex flex-wrap gap-2">
                            {values.acquisitionType?.map((type) => (
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
              <Form>
                <Card className="shadow-elevated">
                  <CardHeader>
                    <CardTitle>{steps[currentStep].title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {renderStepContent()}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6 border-t border-neutral-200">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        variant="corporate"
                        onClick={handleNext}
                      >
                        {currentStep === steps.length - 1 ? 'Complete Registration' : 'Next'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Form>
            );
          }}
        </Formik>
      </div>
    </AppLayout>
  );
};

export default BuyerOnboarding;