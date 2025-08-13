import { BuyerProfile, SellerProfile } from '@/data/mockData';

// Generic localStorage utilities
export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
};

// Buyer-specific utilities
export const getBuyers = (): BuyerProfile[] => {
  return getFromLocalStorage<BuyerProfile[]>('buyers', []);
};

export const saveBuyer = (buyer: Omit<BuyerProfile, 'id'>): BuyerProfile => {
  const existingBuyers = getBuyers();
  const newBuyer: BuyerProfile = {
    ...buyer,
    id: Date.now().toString()
  };
  const updatedBuyers = [...existingBuyers, newBuyer];
  saveToLocalStorage('buyers', updatedBuyers);
  return newBuyer;
};

// Seller-specific utilities
export const getSellers = (): SellerProfile[] => {
  return getFromLocalStorage<SellerProfile[]>('sellers', []);
};

export const saveSeller = (seller: Omit<SellerProfile, 'id'>): SellerProfile => {
  const existingSellers = getSellers();
  const newSeller: SellerProfile = {
    ...seller,
    id: Date.now().toString()
  };
  const updatedSellers = [...existingSellers, newSeller];
  saveToLocalStorage('sellers', updatedSellers);
  return newSeller;
};

// Initialize localStorage with mock data if empty
export const initializeLocalStorage = () => {
  const buyers = getBuyers();
  const sellers = getSellers();
  
  if (buyers.length === 0) {
    // Add default buyers if none exist
    const defaultBuyers: BuyerProfile[] = [
      {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah.chen@email.com',
        industries: ['Technology', 'SaaS'],
        budget: '$5M - $15M',
        timeline: '6-12 months',
        location: 'San Francisco, CA',
        experience: '3-5',
        acquisitionType: ['Asset Purchase', 'Strategic Partnership']
      },
      {
        id: '2',
        name: 'Michael Rodriguez',
        email: 'michael.rodriguez@email.com',
        industries: ['E-commerce', 'Retail'],
        budget: '$1M - $5M',
        timeline: '3-6 months',
        location: 'Austin, TX',
        experience: '1-3',
        acquisitionType: ['Asset Purchase']
      }
    ];
    saveToLocalStorage('buyers', defaultBuyers);
  }
  
  if (sellers.length === 0) {
    // Add default sellers if none exist
    const defaultSellers: SellerProfile[] = [
      {
        id: '1',
        name: 'David Thompson',
        email: 'david@techstartup.com',
        businessName: 'TechFlow Analytics',
        industry: 'Technology',
        revenue: '$2.5M ARR',
        askingPrice: '$12M',
        location: 'Seattle, WA',
        founded: '2019',
        employees: '11-25'
      }
    ];
    saveToLocalStorage('sellers', defaultSellers);
  }
};