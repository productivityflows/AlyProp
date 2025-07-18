export interface Property {
  id: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    county: string;
    fullAddress: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  propertyDetails: {
    propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial' | 'land';
    bedrooms?: number;
    bathrooms?: number;
    squareFootage?: number;
    lotSize?: number;
    yearBuilt?: number;
    stories?: number;
    garage?: boolean;
    pool?: boolean;
    fireplace?: boolean;
  };
  marketData: {
    listPrice?: number;
    marketValue: number;
    assessedValue?: number;
    lastSalePrice?: number;
    lastSaleDate?: string;
    pricePerSqFt?: number;
    daysOnMarket?: number;
    propertyStatus: 'for_sale' | 'sold' | 'off_market' | 'pending' | 'withdrawn';
  };
  ownershipInfo: {
    ownerName?: string;
    ownerType: 'individual' | 'corporate' | 'trust' | 'government' | 'unknown';
    ownerOccupied?: boolean;
    absenteeOwner?: boolean;
    yearPurchased?: number;
    purchasePrice?: number;
  };
  financialData: {
    taxes?: {
      annual: number;
      monthly: number;
    };
    insurance?: {
      annual: number;
      monthly: number;
    };
    hoa?: {
      monthly: number;
    };
  };
  comps: PropertyComparable[];
  rentalData?: RentalAnalysis;
  images?: string[];
  aiAnalysis?: AIPropertyAnalysis;
  dealScore?: DealScore;
  lastUpdated: string;
}

export interface PropertyComparable {
  id: string;
  address: string;
  distance: number; // in miles
  salePrice: number;
  saleDate: string;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  pricePerSqFt: number;
  adjustedPrice: number; // adjusted for differences
}

export interface RentalAnalysis {
  estimatedRent: {
    low: number;
    high: number;
    average: number;
  };
  rentComps: RentalComparable[];
  rentToValueRatio: number;
  capRate: number;
  cashFlow: {
    monthly: number;
    annual: number;
  };
  occupancyRate: number;
}

export interface RentalComparable {
  id: string;
  address: string;
  distance: number;
  rent: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  rentPerSqFt: number;
  dateOnMarket: string;
}

export interface AIPropertyAnalysis {
  summary: string;
  keyHighlights: string[];
  riskFactors: string[];
  investmentPotential: 'high' | 'medium' | 'low';
  bestStrategy: InvestmentStrategy[];
  comparableAnalysis: string;
  marketTrends: string;
  recommendations: string[];
  confidence: number; // 0-100
  generatedAt: string;
}

export interface DealScore {
  overall: number; // 0-100
  breakdown: {
    priceVsMarket: number;
    rentalPotential: number;
    location: number;
    condition: number;
    marketTrends: number;
  };
  explanation: string;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D+' | 'D' | 'F';
  dealType: 'excellent' | 'good' | 'fair' | 'poor' | 'avoid';
}

export interface InvestmentStrategy {
  type: 'buy_hold' | 'flip' | 'brrrr' | 'wholesale' | 'live_in_flip';
  name: string;
  description: string;
  estimatedProfit: number;
  timeframe: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cashRequired: number;
}

export interface PropertyFilters {
  priceRange: {
    min: number;
    max: number;
  };
  location: {
    cities: string[];
    counties: string[];
    zipCodes: string[];
    radius?: number; // miles from center point
    center?: {
      latitude: number;
      longitude: number;
    };
  };
  propertyType: Property['propertyDetails']['propertyType'][];
  bedrooms: {
    min: number;
    max: number;
  };
  bathrooms: {
    min: number;
    max: number;
  };
  squareFootage: {
    min: number;
    max: number;
  };
  yearBuilt: {
    min: number;
    max: number;
  };
  dealScore: {
    min: number;
  };
  investmentStrategy: InvestmentStrategy['type'][];
  ownerType: Property['ownershipInfo']['ownerType'][];
  absenteeOwner?: boolean;
  daysOnMarket: {
    max: number;
  };
}

export interface PropertySearchParams {
  filters: PropertyFilters;
  sortBy: 'dealScore' | 'price' | 'pricePerSqFt' | 'marketValue' | 'lastSaleDate' | 'daysOnMarket';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface PropertySearchResponse {
  properties: Property[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface WatchlistItem {
  id: string;
  propertyId: string;
  userId: string;
  name: string;
  notes?: string;
  alertSettings: {
    priceDropAlert: boolean;
    priceDropThreshold?: number; // percentage
    newCompsAlert: boolean;
    statusChangeAlert: boolean;
    dealScoreChangeAlert: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DealAlert {
  id: string;
  userId: string;
  name: string;
  criteria: PropertyFilters;
  frequency: 'immediate' | 'daily' | 'weekly';
  isActive: boolean;
  lastTriggered?: string;
  createdAt: string;
  updatedAt: string;
}