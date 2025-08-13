import { z } from 'zod';

// Buyer validation schemas
export const buyerPersonalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  location: z.string().min(2, 'Location is required').max(100, 'Location must be less than 100 characters'),
});

export const buyerInvestmentFocusSchema = z.object({
  industries: z.array(z.string()).min(1, 'Please select at least one industry'),
  budget: z.string().min(1, 'Budget range is required'),
  timeline: z.string().min(1, 'Timeline is required'),
});

export const buyerExperienceSchema = z.object({
  experience: z.string().min(1, 'Experience level is required'),
  acquisitionType: z.array(z.string()).min(1, 'Please select at least one acquisition type'),
});

export const buyerCompleteSchema = buyerPersonalInfoSchema
  .merge(buyerInvestmentFocusSchema)
  .merge(buyerExperienceSchema);

// Seller validation schemas
export const sellerPersonalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
});

export const sellerBusinessInfoSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters').max(100, 'Business name must be less than 100 characters'),
  industry: z.string().min(1, 'Industry is required'),
  location: z.string().min(2, 'Location is required').max(100, 'Location must be less than 100 characters'),
  founded: z.string().regex(/^\d{4}$/, 'Please enter a valid 4-digit year').refine(
    (year) => {
      const currentYear = new Date().getFullYear();
      const foundedYear = parseInt(year);
      return foundedYear >= 1800 && foundedYear <= currentYear;
    },
    'Founded year must be between 1800 and current year'
  ),
  employees: z.string().min(1, 'Employee count is required'),
});

export const sellerFinancialInfoSchema = z.object({
  revenue: z.string().min(1, 'Revenue is required'),
  askingPrice: z.string().min(1, 'Asking price is required'),
});

export const sellerCompleteSchema = sellerPersonalInfoSchema
  .merge(sellerBusinessInfoSchema)
  .merge(sellerFinancialInfoSchema);

export type BuyerPersonalInfo = z.infer<typeof buyerPersonalInfoSchema>;
export type BuyerInvestmentFocus = z.infer<typeof buyerInvestmentFocusSchema>;
export type BuyerExperience = z.infer<typeof buyerExperienceSchema>;
export type BuyerComplete = z.infer<typeof buyerCompleteSchema>;

export type SellerPersonalInfo = z.infer<typeof sellerPersonalInfoSchema>;
export type SellerBusinessInfo = z.infer<typeof sellerBusinessInfoSchema>;
export type SellerFinancialInfo = z.infer<typeof sellerFinancialInfoSchema>;
export type SellerComplete = z.infer<typeof sellerCompleteSchema>;