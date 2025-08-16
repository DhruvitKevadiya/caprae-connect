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

export const removeBuyer = (buyerId: string): void => {
  const existingBuyers = getBuyers();
  const updatedBuyers = existingBuyers.filter(buyer => buyer.id !== buyerId);
  saveToLocalStorage('buyers', updatedBuyers);
};

export const updateBuyer = (buyerId: string, updates: Partial<BuyerProfile>): void => {
  const existingBuyers = getBuyers();
  const updatedBuyers = existingBuyers.map(buyer => 
    buyer.id === buyerId ? { ...buyer, ...updates } : buyer
  );
  saveToLocalStorage('buyers', updatedBuyers);
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

export const removeSeller = (sellerId: string): void => {
  const existingSellers = getSellers();
  const updatedSellers = existingSellers.filter(seller => seller.id !== sellerId);
  saveToLocalStorage('sellers', updatedSellers);
};

export const updateSeller = (sellerId: string, updates: Partial<SellerProfile>): void => {
  const existingSellers = getSellers();
  const updatedSellers = existingSellers.map(seller => 
    seller.id === sellerId ? { ...seller, ...updates } : seller
  );
  saveToLocalStorage('sellers', updatedSellers);
};

// Accepted/Rejected lists
export const getAcceptedBuyers = (): string[] => {
  return getFromLocalStorage<string[]>('acceptedBuyers', []);
};

export const getRejectedBuyers = (): string[] => {
  return getFromLocalStorage<string[]>('rejectedBuyers', []);
};

export const acceptBuyer = (buyerId: string): void => {
  const accepted = getAcceptedBuyers();
  const rejected = getRejectedBuyers();
  
  if (!accepted.includes(buyerId)) {
    saveToLocalStorage('acceptedBuyers', [...accepted, buyerId]);
  }
  
  // Remove from rejected if it was there
  if (rejected.includes(buyerId)) {
    saveToLocalStorage('rejectedBuyers', rejected.filter(id => id !== buyerId));
  }
};

export const rejectBuyer = (buyerId: string): void => {
  const accepted = getAcceptedBuyers();
  const rejected = getRejectedBuyers();
  
  if (!rejected.includes(buyerId)) {
    saveToLocalStorage('rejectedBuyers', [...rejected, buyerId]);
  }
  
  // Remove from accepted if it was there
  if (accepted.includes(buyerId)) {
    saveToLocalStorage('acceptedBuyers', accepted.filter(id => id !== buyerId));
  }
};

export const getAcceptedSellers = (): string[] => {
  return getFromLocalStorage<string[]>('acceptedSellers', []);
};

export const getRejectedSellers = (): string[] => {
  return getFromLocalStorage<string[]>('rejectedSellers', []);
};

export const acceptSeller = (sellerId: string): void => {
  const accepted = getAcceptedSellers();
  const rejected = getRejectedSellers();
  
  if (!accepted.includes(sellerId)) {
    saveToLocalStorage('acceptedSellers', [...accepted, sellerId]);
  }
  
  // Remove from rejected if it was there
  if (rejected.includes(sellerId)) {
    saveToLocalStorage('rejectedSellers', rejected.filter(id => id !== sellerId));
  }
};

export const rejectSeller = (sellerId: string): void => {
  const accepted = getAcceptedSellers();
  const rejected = getRejectedSellers();
  
  if (!rejected.includes(sellerId)) {
    saveToLocalStorage('rejectedSellers', [...rejected, sellerId]);
  }
  
  // Remove from accepted if it was there
  if (accepted.includes(sellerId)) {
    saveToLocalStorage('acceptedSellers', accepted.filter(id => id !== sellerId));
  }
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