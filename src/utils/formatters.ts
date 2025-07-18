import numeral from 'numeral';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null) return 'N/A';
  return numeral(amount).format('$0,0');
};

export const formatCurrencyCompact = (amount: number | undefined): string => {
  if (amount === undefined || amount === null) return 'N/A';
  
  if (amount >= 1000000) {
    return numeral(amount).format('$0.0a').toUpperCase();
  } else if (amount >= 1000) {
    return numeral(amount).format('$0a').toUpperCase();
  } else {
    return numeral(amount).format('$0,0');
  }
};

export const formatNumber = (num: number | undefined): string => {
  if (num === undefined || num === null) return 'N/A';
  return numeral(num).format('0,0');
};

export const formatPercentage = (num: number | undefined, decimals: number = 1): string => {
  if (num === undefined || num === null) return 'N/A';
  return numeral(num).format(`0.${'0'.repeat(decimals)}%`);
};

export const formatSquareFootage = (sqft: number | undefined): string => {
  if (sqft === undefined || sqft === null) return 'N/A';
  return `${formatNumber(sqft)} sq ft`;
};

export const formatLotSize = (lotSqft: number | undefined): string => {
  if (lotSqft === undefined || lotSqft === null) return 'N/A';
  
  // Convert to acres if large enough
  if (lotSqft >= 43560) {
    const acres = lotSqft / 43560;
    return `${numeral(acres).format('0.0')} acres`;
  }
  
  return `${formatNumber(lotSqft)} sq ft`;
};

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatDateShort = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, 'MM/dd/yy');
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatTimeAgo = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatAddress = (address: {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}): string => {
  const parts = [
    address.street,
    address.city,
    address.state && address.zipCode ? `${address.state} ${address.zipCode}` : address.state || address.zipCode
  ].filter(Boolean);
  
  return parts.join(', ') || 'Address unavailable';
};

export const formatPropertyType = (type: string): string => {
  const typeMap: { [key: string]: string } = {
    'single_family': 'Single Family',
    'multi_family': 'Multi-Family',
    'condo': 'Condominium',
    'townhouse': 'Townhouse',
    'commercial': 'Commercial',
    'land': 'Land',
  };
  
  return typeMap[type] || type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const formatOwnerType = (type: string): string => {
  const typeMap: { [key: string]: string } = {
    'individual': 'Individual',
    'corporate': 'Corporate',
    'trust': 'Trust',
    'government': 'Government',
    'unknown': 'Unknown',
  };
  
  return typeMap[type] || type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const formatBedsBaths = (beds?: number, baths?: number): string => {
  const bedsStr = beds ? `${beds} bed${beds !== 1 ? 's' : ''}` : '';
  const bathsStr = baths ? `${baths} bath${baths !== 1 ? 's' : ''}` : '';
  
  if (bedsStr && bathsStr) {
    return `${bedsStr}, ${bathsStr}`;
  } else if (bedsStr) {
    return bedsStr;
  } else if (bathsStr) {
    return bathsStr;
  }
  
  return 'N/A';
};

export const formatDealGrade = (grade: string): { text: string; color: string } => {
  const gradeColors: { [key: string]: string } = {
    'A+': 'text-green-600',
    'A': 'text-green-500',
    'B+': 'text-lime-500',
    'B': 'text-yellow-500',
    'C+': 'text-orange-400',
    'C': 'text-orange-500',
    'D+': 'text-red-400',
    'D': 'text-red-500',
    'F': 'text-red-600',
  };
  
  return {
    text: grade,
    color: gradeColors[grade] || 'text-gray-500',
  };
};

export const formatDealType = (type: string): { text: string; color: string } => {
  const typeMap: { [key: string]: { text: string; color: string } } = {
    'excellent': { text: 'Excellent Deal', color: 'text-green-600' },
    'good': { text: 'Good Deal', color: 'text-green-500' },
    'fair': { text: 'Fair Deal', color: 'text-yellow-500' },
    'poor': { text: 'Poor Deal', color: 'text-orange-500' },
    'avoid': { text: 'Avoid', color: 'text-red-500' },
  };
  
  return typeMap[type] || { text: type, color: 'text-gray-500' };
};

export const formatInvestmentStrategy = (type: string): string => {
  const strategyMap: { [key: string]: string } = {
    'buy_hold': 'Buy & Hold',
    'flip': 'Fix & Flip',
    'brrrr': 'BRRRR',
    'wholesale': 'Wholesale',
    'live_in_flip': 'Live-in Flip',
  };
  
  return strategyMap[type] || type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const formatDistance = (miles: number): string => {
  if (miles < 1) {
    return `${(miles * 5280).toFixed(0)} ft`;
  }
  return `${miles.toFixed(1)} mi`;
};

export const formatCapRate = (capRate: number): string => {
  return formatPercentage(capRate, 1);
};

export const formatRentRatio = (ratio: number): string => {
  return formatPercentage(ratio, 2);
};

export const formatCashFlow = (cashFlow: number): string => {
  const color = cashFlow >= 0 ? 'text-green-600' : 'text-red-600';
  return formatCurrency(cashFlow);
};

export const formatPropertyStatus = (status: string): { text: string; color: string } => {
  const statusMap: { [key: string]: { text: string; color: string } } = {
    'for_sale': { text: 'For Sale', color: 'text-green-600' },
    'sold': { text: 'Sold', color: 'text-blue-600' },
    'off_market': { text: 'Off Market', color: 'text-gray-600' },
    'pending': { text: 'Pending', color: 'text-yellow-600' },
    'withdrawn': { text: 'Withdrawn', color: 'text-red-600' },
  };
  
  return statusMap[status] || { text: status, color: 'text-gray-500' };
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
};

export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  if (bytes === 0) return '0 Bytes';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};