import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface FormStepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const FormStepper: React.FC<FormStepperProps> = ({ 
  steps, 
  currentStep, 
  className = '' 
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-success text-white'
                      : isCurrent
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-2 text-center max-w-24">
                  <p
                    className={`text-sm font-medium ${
                      isCompleted || isCurrent
                        ? 'text-neutral-900'
                        : 'text-neutral-500'
                    }`}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-neutral-500 mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4 mb-8">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      isCompleted
                        ? 'bg-success'
                        : 'bg-neutral-200'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};