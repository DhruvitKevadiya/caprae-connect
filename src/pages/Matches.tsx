import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProfileCard } from '@/components/common/ProfileCard';
import { ExpandedProfile } from '@/components/common/ExpandedProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Search, Filter, Users, TrendingUp } from 'lucide-react';
import { mockBuyers, mockSellers, industryOptions, budgetOptions } from '@/data/mockData';
import { getBuyers, getSellers, acceptBuyer, rejectBuyer, acceptSeller, rejectSeller, getAcceptedBuyers, getRejectedBuyers, getAcceptedSellers, getRejectedSellers } from '@/utils/localStorage';

const Matches = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [viewType, setViewType] = useState<'buyers' | 'sellers'>('buyers');
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get current data from localStorage
  const allBuyers = [...getBuyers(), ...mockBuyers];
  const allSellers = [...getSellers(), ...mockSellers];
  const acceptedBuyerIds = getAcceptedBuyers();
  const rejectedBuyerIds = getRejectedBuyers();
  const acceptedSellerIds = getAcceptedSellers();
  const rejectedSellerIds = getRejectedSellers();

  // Filter based on view type and search criteria
  const currentData = viewType === 'buyers' ? allBuyers : allSellers;
  const acceptedIds = viewType === 'buyers' ? acceptedBuyerIds : acceptedSellerIds;
  const rejectedIds = viewType === 'buyers' ? rejectedBuyerIds : rejectedSellerIds;

  const filteredProfiles = currentData.filter(profile => {
    // Don't show accepted or rejected profiles
    if (acceptedIds.includes(profile.id) || rejectedIds.includes(profile.id)) {
      return false;
    }

    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (viewType === 'buyers' 
                           ? (profile as any).industries?.some((industry: string) => 
                               industry.toLowerCase().includes(searchQuery.toLowerCase()))
                           : (profile as any).industry?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesIndustry = !selectedIndustry || selectedIndustry === 'all-industries' || 
                           (viewType === 'buyers' 
                             ? (profile as any).industries?.includes(selectedIndustry)
                             : (profile as any).industry === selectedIndustry);
    
    const matchesBudget = !selectedBudget || selectedBudget === 'all-budgets' || 
                         (viewType === 'buyers' ? (profile as any).budget === selectedBudget : true);
    
    return matchesSearch && matchesIndustry && matchesBudget;
  });

  const handleAccept = (profileId: string) => {
    const profile = currentData.find(p => p.id === profileId);
    
    if (viewType === 'buyers') {
      acceptBuyer(profileId);
    } else {
      acceptSeller(profileId);
    }
    
    setRefreshKey(prev => prev + 1);
    
    toast({
      title: 'Match Accepted!',
      description: `You've accepted a connection with ${profile?.name}. They will be notified.`,
    });
  };

  const handleReject = (profileId: string) => {
    const profile = currentData.find(p => p.id === profileId);
    
    if (viewType === 'buyers') {
      rejectBuyer(profileId);
    } else {
      rejectSeller(profileId);
    }
    
    setRefreshKey(prev => prev + 1);
    
    toast({
      title: 'Match Passed',
      description: `You've passed on ${profile?.name}. This action cannot be undone.`,
      variant: 'destructive',
    });
  };

  const handleViewProfile = (profileId: string) => {
    const profile = currentData.find(p => p.id === profileId);
    setSelectedProfile(profile);
    setIsProfileOpen(true);
  };

  const handleMessage = (profileId: string) => {
    const profile = currentData.find(p => p.id === profileId);
    toast({
      title: 'Message Sent',
      description: `Opening conversation with ${profile?.name}`,
    });
    // In a real app, navigate to messages
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('');
    setSelectedBudget('');
  };

  const hasActiveFilters = searchQuery || (selectedIndustry && selectedIndustry !== 'all-industries') || (selectedBudget && selectedBudget !== 'all-budgets');

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Matches</h1>
            <p className="text-neutral-600 mt-1">
              Connect with qualified {viewType === 'buyers' ? 'buyers' : 'sellers'} for your business
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewType === 'buyers' ? 'corporate' : 'outline'}
              onClick={() => setViewType('buyers')}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Buyers
            </Button>
            <Button
              variant={viewType === 'sellers' ? 'corporate' : 'outline'}
              onClick={() => setViewType('sellers')}
              className="flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Sellers
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-neutral-500" />
            <h3 className="font-semibold text-neutral-900">Filters</h3>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {[searchQuery, selectedIndustry, selectedBudget].filter(Boolean).length} active
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                placeholder="Search by name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Industry Filter */}
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-industries">All Industries</SelectItem>
                {industryOptions.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Budget Filter */}
            <Select value={selectedBudget} onValueChange={setSelectedBudget}>
              <SelectTrigger>
                <SelectValue placeholder="Budget Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-budgets">All Budgets</SelectItem>
                {budgetOptions.map((budget) => (
                  <SelectItem key={budget} value={budget}>
                    {budget}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-neutral-600">
              Showing {filteredProfiles.length} of {currentData.length} {viewType}
            </p>
          </div>

          {filteredProfiles.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
              <Users className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                No matches found
              </h3>
              <p className="text-neutral-600 mb-4">
                Try adjusting your filters or search criteria
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  type={viewType === 'buyers' ? 'buyer' : 'seller'}
                  profile={viewType === 'buyers' ? {
                    id: profile.id,
                    name: profile.name,
                    industries: (profile as any).industries,
                    budget: (profile as any).budget,
                    timeline: (profile as any).timeline,
                    location: profile.location
                  } : {
                    id: profile.id,
                    name: profile.name,
                    businessName: (profile as any).businessName,
                    industry: (profile as any).industry,
                    revenue: (profile as any).revenue,
                    askingPrice: (profile as any).askingPrice,
                    location: profile.location
                  }}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        {filteredProfiles.length > 0 && (
          <div className="bg-gradient-primary text-primary-foreground p-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">
              Ready to connect with more {viewType}?
            </h3>
            <p className="mb-4 opacity-90">
              Upgrade your plan to access premium matching features and advanced filters
            </p>
            <Button variant="secondary" size="lg">
              Upgrade Plan
            </Button>
          </div>
        )}

        {/* Expanded Profile Modal */}
        <ExpandedProfile
          profile={selectedProfile}
          type={viewType === 'buyers' ? 'buyer' : 'seller'}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          onAccept={handleAccept}
          onReject={handleReject}
          onMessage={handleMessage}
        />
      </div>
    </AppLayout>
  );
};

export default Matches;