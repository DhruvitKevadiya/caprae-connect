// Mock data for the Caprae Capital demo

export interface BuyerProfile {
  id: string;
  name: string;
  email: string;
  industries: string[];
  budget: string;
  timeline: string;
  location: string;
  experience: string;
  acquisitionType: string[];
}

export interface SellerProfile {
  id: string;
  name: string;
  email: string;
  businessName: string;
  industry: string;
  revenue: string;
  askingPrice: string;
  location: string;
  founded: string;
  employees: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'sent' | 'received';
}

export interface AcquisitionStage {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  completedAt?: Date;
}

export const mockBuyers: BuyerProfile[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    industries: ['Technology', 'SaaS', 'E-commerce'],
    budget: '$2M - $5M',
    timeline: '6-12 months',
    location: 'San Francisco, CA',
    experience: '5+ years',
    acquisitionType: ['Strategic', 'Add-on']
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    email: 'michael.r@investment.com',
    industries: ['Healthcare', 'Biotech'],
    budget: '$10M - $25M',
    timeline: '3-6 months',
    location: 'Boston, MA',
    experience: '10+ years',
    acquisitionType: ['Platform', 'Carve-out']
  },
  {
    id: '3',
    name: 'Emma Thompson',
    email: 'emma.thompson@equity.com',
    industries: ['Manufacturing', 'Industrial'],
    budget: '$5M - $15M',
    timeline: '12+ months',
    location: 'Chicago, IL',
    experience: '8+ years',
    acquisitionType: ['Strategic', 'Turnaround']
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@ventures.com',
    industries: ['FinTech', 'Technology'],
    budget: '$1M - $3M',
    timeline: '3-6 months',
    location: 'New York, NY',
    experience: '3+ years',
    acquisitionType: ['Growth', 'Strategic']
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa.wang@capital.com',
    industries: ['Consumer Goods', 'Retail'],
    budget: '$8M - $20M',
    timeline: '6-12 months',
    location: 'Los Angeles, CA',
    experience: '12+ years',
    acquisitionType: ['Platform', 'Roll-up']
  }
];

export const mockSellers: SellerProfile[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@techstartup.com',
    businessName: 'TechFlow Solutions',
    industry: 'Technology',
    revenue: '$2.5M ARR',
    askingPrice: '$12M',
    location: 'Austin, TX',
    founded: '2019',
    employees: '25-50'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria@healthtech.com',
    businessName: 'MedAnalytics Pro',
    industry: 'Healthcare',
    revenue: '$5.2M ARR',
    askingPrice: '$28M',
    location: 'Seattle, WA',
    founded: '2017',
    employees: '50-100'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    content: 'Hi, I reviewed your business profile and I\'m very interested in learning more about TechFlow Solutions.',
    timestamp: new Date('2024-01-15T10:30:00'),
    type: 'received'
  },
  {
    id: '2',
    senderId: 'current',
    content: 'Thank you for your interest! I\'d be happy to discuss our business further. Would you like to schedule a call?',
    timestamp: new Date('2024-01-15T11:15:00'),
    type: 'sent'
  },
  {
    id: '3',
    senderId: '1',
    content: 'Absolutely! I\'m available this week for an initial discussion. What time works best for you?',
    timestamp: new Date('2024-01-15T14:20:00'),
    type: 'received'
  },
  {
    id: '4',
    senderId: 'current',
    content: 'How about Thursday at 2 PM PST? I can send you a calendar invite.',
    timestamp: new Date('2024-01-15T15:45:00'),
    type: 'sent'
  }
];

export const mockAcquisitionStages: AcquisitionStage[] = [
  {
    id: '1',
    title: 'NDA Signed',
    description: 'Non-disclosure agreement executed',
    status: 'completed',
    completedAt: new Date('2024-01-10')
  },
  {
    id: '2',
    title: 'Document Review',
    description: 'Financial and legal document analysis',
    status: 'completed',
    completedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    title: 'Valuation',
    description: 'Business valuation and analysis',
    status: 'current'
  },
  {
    id: '4',
    title: 'Negotiation',
    description: 'Terms and conditions negotiation',
    status: 'upcoming'
  },
  {
    id: '5',
    title: 'Deal Close',
    description: 'Final documentation and closure',
    status: 'upcoming'
  }
];

export const industryOptions = [
  'Technology',
  'SaaS',
  'E-commerce',
  'Healthcare',
  'Biotech',
  'Manufacturing',
  'Industrial',
  'FinTech',
  'Consumer Goods',
  'Retail',
  'Real Estate',
  'Energy',
  'Transportation',
  'Media',
  'Education',
  'Food & Beverage'
];

export const budgetOptions = [
  'Under $1M',
  '$1M - $3M',
  '$3M - $5M',
  '$5M - $10M',
  '$10M - $25M',
  '$25M - $50M',
  'Over $50M'
];

export const timelineOptions = [
  'Immediate (0-3 months)',
  '3-6 months',
  '6-12 months',
  '12+ months',
  'No specific timeline'
];

export const acquisitionTypeOptions = [
  'Strategic',
  'Platform',
  'Add-on',
  'Carve-out',
  'Growth',
  'Turnaround',
  'Roll-up'
];