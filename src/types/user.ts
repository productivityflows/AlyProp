export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phoneNumber?: string;
  preferences: UserPreferences;
  subscription: SubscriptionPlan;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface UserPreferences {
  investmentStrategies: Array<'buy_hold' | 'flip' | 'brrrr' | 'wholesale' | 'live_in_flip'>;
  targetMarkets: {
    cities: string[];
    counties: string[];
    zipCodes: string[];
  };
  budgetRange: {
    min: number;
    max: number;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    dealAlerts: boolean;
    marketUpdates: boolean;
    priceDrops: boolean;
  };
  dashboard: {
    defaultView: 'map' | 'list' | 'grid';
    propertiesPerPage: number;
    defaultSort: string;
  };
}

export interface SubscriptionPlan {
  id: string;
  name: 'free' | 'basic' | 'professional' | 'enterprise';
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: SubscriptionFeatures;
  limits: SubscriptionLimits;
  isActive: boolean;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface SubscriptionFeatures {
  aiAnalysis: boolean;
  unlimitedProperties: boolean;
  advancedFilters: boolean;
  dealAlerts: boolean;
  exportData: boolean;
  apiAccess: boolean;
  prioritySupport: boolean;
  customReports: boolean;
}

export interface SubscriptionLimits {
  propertiesPerDay: number;
  dealAlertsCount: number;
  watchlistItems: number;
  exportCount: number;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}