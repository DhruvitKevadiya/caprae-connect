import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, TrendingUp, Shield, MessageCircle, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Users,
      title: 'Smart Matching',
      description: 'AI-powered matching connects qualified buyers with suitable businesses'
    },
    {
      icon: Shield,
      title: 'Secure Process',
      description: 'NDA protection and confidential document sharing throughout the process'
    },
    {
      icon: MessageCircle,
      title: 'Direct Communication',
      description: 'Built-in messaging system for seamless buyer-seller communication'
    },
    {
      icon: BarChart3,
      title: 'Deal Management',
      description: 'Track acquisition stages from initial contact to deal closure'
    },
    {
      icon: TrendingUp,
      title: 'AI Analytics',
      description: 'Advanced document analysis and business valuation insights'
    },
    {
      icon: Building2,
      title: 'Professional Network',
      description: 'Access to verified buyers and sellers in the M&A marketplace'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-neutral-900">Caprae Capital</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/dashboard">View Demo</Link>
              </Button>
              <Button variant="corporate" asChild>
                <Link to="/onboarding/buyer">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-neutral-900 mb-6">
            The Future of 
            <span className="text-primary"> M&A Transactions</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
            Connect qualified buyers and sellers through our intelligent platform. 
            Streamline the entire acquisition process from matching to deal closure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="corporate" asChild>
              <Link to="/onboarding/buyer">I'm a Buyer</Link>
            </Button>
            <Button size="xl" variant="outline-corporate" asChild>
              <Link to="/onboarding/seller">I'm a Seller</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Everything You Need for M&A Success
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and features needed to facilitate 
              successful business acquisitions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-elevated transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">$2.4B+</div>
              <div className="text-primary-foreground/80">Transaction Volume</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Successful Deals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-foreground/80">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Ready to Start Your M&A Journey?
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            Join thousands of buyers and sellers who trust Caprae Capital 
            for their business transactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="corporate" asChild>
              <Link to="/onboarding/buyer">Start as Buyer</Link>
            </Button>
            <Button size="xl" variant="success" asChild>
              <Link to="/onboarding/seller">List Your Business</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="w-6 h-6" />
            <span className="text-lg font-semibold text-white">Caprae Capital</span>
          </div>
          <p className="text-neutral-400 mb-4">
            Connecting buyers and sellers in the M&A marketplace
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <Link to="/dashboard" className="hover:text-white transition-colors">
              Demo
            </Link>
            <span className="text-neutral-600">•</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-neutral-600">•</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
