import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FieldProps } from 'formik';
import { AppLayout } from '@/components/layout/AppLayout';
import { FormStepper } from '@/components/common/FormStepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { industryOptions } from '@/data/mockData';
import { 
  sellerPersonalInfoSchema, 
  sellerBusinessInfoSchema, 
  sellerFinancialInfoSchema,
  sellerCompleteSchema,
  type SellerComplete 
} from '@/schemas/validationSchemas';
import { saveSeller } from '@/utils/localStorage';

const steps = [
  { id: 'personal', title: 'Owner Info', description: 'Personal details' },
  { id: 'business', title: 'Business Info', description: 'Company details' },
  { id: 'financials', title: 'Financials', description: 'Revenue & valuation' },
  { id: 'review', title: 'Review', description: 'Confirm details' }
];

const SellerOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SellerComplete>({
    name: '',
    email: '',
    businessName: '',
    industry: '',
    location: '',
    founded: '',
    employees: '',
    revenue: '',
    askingPrice: ''
  });

  const initialValues: SellerComplete = formData;

  const getSchemaForStep = (step: number) => {
    switch (step) {
      case 0: return sellerPersonalInfoSchema;
      case 1: return sellerBusinessInfoSchema;
      case 2: return sellerFinancialInfoSchema;
      default: return sellerCompleteSchema;
    }
  };

  const validateFormik = (values: SellerComplete) => {
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

  const handleSubmit = (values: SellerComplete) => {
    try {
      sellerCompleteSchema.parse(values);
      const savedSeller = saveSeller(values);
      
      toast({
        title: 'Business Listed Successfully!',
        description: 'Your business is now visible to potential buyers.',
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error listing your business. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">List Your Business</h1>
          <p className="text-neutral-600 mt-2">
            Complete your business profile to connect with qualified buyers
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
                    </div>
                  );

                case 1: // Business Info
                  return (
                    <div className="space-y-6">
                      <Field name="businessName">
                        {({ field }: FieldProps) => (
                          <div className="space-y-2">
                            <Label htmlFor="businessName">
                              Business Name <span className="required-asterisk">*</span>
                            </Label>
                            <Input
                              {...field}
                              id="businessName"
                              placeholder="Enter your business name"
                              className={errors.businessName && touched.businessName ? 'border-destructive' : ''}
                            />
                            {errors.businessName && touched.businessName && (
                              <p className="text-sm text-destructive">{errors.businessName}</p>
                            )}
                          </div>
                        )}
                      </Field>

                      <Field name="industry">
                        {({ field }: FieldProps) => (
                          <div className="space-y-2">
                            <Label>
                              Industry <span className="required-asterisk">*</span>
                            </Label>
                            <Select 
                              value={field.value} 
                              onValueChange={(value) => setFieldValue('industry', value)}
                            >
                              <SelectTrigger className={errors.industry && touched.industry ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                              <SelectContent>
                                {industryOptions.map((industry) => (
                                  <SelectItem key={industry} value={industry}>
                                    {industry}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.industry && touched.industry && (
                              <p className="text-sm text-destructive">{errors.industry}</p>
                            )}
                          </div>
                        )}
                      </Field>

                      <Field name="location">
                        {({ field }: FieldProps) => (
                          <div className="space-y-2">
                            <Label htmlFor="location">
                              Location <span className="required-asterisk">*</span>
                            </Label>
                            <Input
                              {...field}
                              id="location"
                              placeholder="City, State/Country"
                              className={errors.location && touched.location ? 'border-destructive' : ''}
                            />
                            {errors.location && touched.location && (
                              <p className="text-sm text-destructive">{errors.location}</p>
                            )}
                          </div>
                        )}
                      </Field>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field name="founded">
                          {({ field }: FieldProps) => (
                            <div className="space-y-2">
                              <Label htmlFor="founded">
                                Year Founded <span className="required-asterisk">*</span>
                              </Label>
                              <Input
                                {...field}
                                id="founded"
                                placeholder="e.g., 2019"
                                className={errors.founded && touched.founded ? 'border-destructive' : ''}
                              />
                              {errors.founded && touched.founded && (
                                <p className="text-sm text-destructive">{errors.founded}</p>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="employees">
                          {({ field }: FieldProps) => (
                            <div className="space-y-2">
                              <Label>
                                Number of Employees <span className="required-asterisk">*</span>
                              </Label>
                              <Select 
                                value={field.value} 
                                onValueChange={(value) => setFieldValue('employees', value)}
                              >
                                <SelectTrigger className={errors.employees && touched.employees ? 'border-destructive' : ''}>
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1-10">1-10</SelectItem>
                                  <SelectItem value="11-25">11-25</SelectItem>
                                  <SelectItem value="26-50">26-50</SelectItem>
                                  <SelectItem value="51-100">51-100</SelectItem>
                                  <SelectItem value="101-250">101-250</SelectItem>
                                  <SelectItem value="250+">250+</SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.employees && touched.employees && (
                                <p className="text-sm text-destructive">{errors.employees}</p>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </div>
                  );

                case 2: // Financials
                  return (
                    <div className="space-y-6">
                      <Field name="revenue">
                        {({ field }: FieldProps) => (
                          <div className="space-y-2">
                            <Label htmlFor="revenue">
                              Annual Revenue <span className="required-asterisk">*</span>
                            </Label>
                            <Input
                              {...field}
                              id="revenue"
                              placeholder="e.g., $2.5M ARR"
                              className={errors.revenue && touched.revenue ? 'border-destructive' : ''}
                            />
                            {errors.revenue && touched.revenue && (
                              <p className="text-sm text-destructive">{errors.revenue}</p>
                            )}
                          </div>
                        )}
                      </Field>

                      <Field name="askingPrice">
                        {({ field }: FieldProps) => (
                          <div className="space-y-2">
                            <Label htmlFor="askingPrice">
                              Asking Price <span className="required-asterisk">*</span>
                            </Label>
                            <Input
                              {...field}
                              id="askingPrice"
                              placeholder="e.g., $12M"
                              className={errors.askingPrice && touched.askingPrice ? 'border-destructive' : ''}
                            />
                            {errors.askingPrice && touched.askingPrice && (
                              <p className="text-sm text-destructive">{errors.askingPrice}</p>
                            )}
                          </div>
                        )}
                      </Field>

                      <div className="p-4 bg-neutral-50 rounded-lg">
                        <h4 className="font-medium text-neutral-900 mb-2">Next Steps</h4>
                        <ul className="text-sm text-neutral-600 space-y-1">
                          <li>• Financial documents will be requested during due diligence</li>
                          <li>• A confidential information memorandum (CIM) will be prepared</li>
                          <li>• Interested buyers will sign NDAs before accessing detailed information</li>
                        </ul>
                      </div>
                    </div>
                  );

                case 3: // Review
                  return (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-neutral-900">Owner Information</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Name:</span> {values.name}</p>
                            <p><span className="font-medium">Email:</span> {values.email}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-neutral-900">Business Details</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Business Name:</span> {values.businessName}</p>
                            <p><span className="font-medium">Industry:</span> {values.industry}</p>
                            <p><span className="font-medium">Location:</span> {values.location}</p>
                            <p><span className="font-medium">Founded:</span> {values.founded}</p>
                            <p><span className="font-medium">Employees:</span> {values.employees}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-neutral-900">Financial Information</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Annual Revenue:</span> {values.revenue}</p>
                            <p><span className="font-medium">Asking Price:</span> {values.askingPrice}</p>
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
                        {currentStep === steps.length - 1 ? 'List Business' : 'Next'}
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

export default SellerOnboarding;