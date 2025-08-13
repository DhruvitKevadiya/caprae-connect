import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Clock, Building } from 'lucide-react';

interface ProfileCardProps {
  type: 'buyer' | 'seller';
  profile: {
    id: string;
    name: string;
    industry?: string;
    industries?: string[];
    budget?: string;
    revenue?: string;
    askingPrice?: string;
    timeline?: string;
    location: string;
    avatar?: string;
    businessName?: string;
  };
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onViewProfile?: (id: string) => void;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  type,
  profile,
  onAccept,
  onReject,
  onViewProfile,
  className = ''
}) => {
  const displayIndustries = type === 'buyer' ? profile.industries : [profile.industry];
  
  return (
    <Card className={`hover:shadow-elevated transition-all duration-300 ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-lg">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">{profile.name}</h3>
              {profile.businessName && (
                <p className="text-sm text-neutral-600">{profile.businessName}</p>
              )}
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {type === 'buyer' ? 'Buyer' : 'Seller'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Industries */}
        {displayIndustries && displayIndustries.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 text-neutral-500" />
              <span className="text-sm font-medium text-neutral-700">
                {type === 'buyer' ? 'Interested in' : 'Industry'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {displayIndustries.slice(0, 3).map((industry, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {industry}
                </Badge>
              ))}
              {displayIndustries.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{displayIndustries.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Financial Info */}
        <div className="space-y-2">
          {profile.budget && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-600">Budget: {profile.budget}</span>
            </div>
          )}
          {profile.revenue && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-600">Revenue: {profile.revenue}</span>
            </div>
          )}
          {profile.askingPrice && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-600">Asking: {profile.askingPrice}</span>
            </div>
          )}
        </div>

        {/* Timeline & Location */}
        <div className="space-y-2">
          {profile.timeline && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-600">Timeline: {profile.timeline}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neutral-500" />
            <span className="text-sm text-neutral-600">{profile.location}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 space-y-2">
        <Button 
          variant="corporate" 
          className="w-full" 
          onClick={() => onViewProfile?.(profile.id)}
        >
          View Profile
        </Button>
        
        {(onAccept || onReject) && (
          <div className="flex gap-2 w-full">
            {onReject && (
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => onReject(profile.id)}
              >
                Pass
              </Button>
            )}
            {onAccept && (
              <Button 
                variant="success" 
                className="flex-1" 
                onClick={() => onAccept(profile.id)}
              >
                Accept
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};