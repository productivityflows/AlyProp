import axios, { AxiosResponse } from 'axios';
import { Property, PropertyComparable, PropertySearchParams, PropertySearchResponse } from '@/types/property';

const ESTATED_BASE_URL = 'https://api.estated.com/v4';

export class EstatedService {
  private apiKey: string;
  private client: any;

  constructor() {
    this.apiKey = process.env.ESTATED_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('ESTATED_API_KEY is required');
    }

    this.client = axios.create({
      baseURL: ESTATED_BASE_URL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  async getPropertyByAddress(address: string): Promise<Property | null> {
    try {
      const response = await this.client.get('/property', {
        params: {
          address: address,
        },
      });

      if (response.data && response.data.data) {
        return this.transformEstatedProperty(response.data.data);
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching property by address:', error);
      throw new Error('Failed to fetch property data');
    }
  }

  async getPropertyById(propertyId: string): Promise<Property | null> {
    try {
      const response = await this.client.get(`/property/${propertyId}`);
      
      if (response.data && response.data.data) {
        return this.transformEstatedProperty(response.data.data);
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching property by ID:', error);
      throw new Error('Failed to fetch property data');
    }
  }

  async searchProperties(params: PropertySearchParams): Promise<PropertySearchResponse> {
    try {
      const searchParams = this.buildSearchParams(params);
      
      const response = await this.client.get('/property/search', {
        params: searchParams,
      });

      const properties = response.data.data?.map((prop: any) => 
        this.transformEstatedProperty(prop)
      ) || [];

      return {
        properties,
        total: response.data.total || 0,
        page: params.page,
        totalPages: Math.ceil((response.data.total || 0) / params.limit),
        hasMore: (params.page * params.limit) < (response.data.total || 0),
      };
    } catch (error) {
      console.error('Error searching properties:', error);
      throw new Error('Failed to search properties');
    }
  }

  async getComparables(
    address: string, 
    radius: number = 0.5, 
    limit: number = 10
  ): Promise<PropertyComparable[]> {
    try {
      const response = await this.client.get('/property/comparables', {
        params: {
          address: address,
          radius: radius,
          limit: limit,
          sold_within_days: 365, // Last year
        },
      });

      return response.data.data?.map((comp: any) => 
        this.transformComparable(comp)
      ) || [];
    } catch (error) {
      console.error('Error fetching comparables:', error);
      throw new Error('Failed to fetch comparable properties');
    }
  }

  async getOwnershipHistory(propertyId: string): Promise<any[]> {
    try {
      const response = await this.client.get(`/property/${propertyId}/ownership`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching ownership history:', error);
      return [];
    }
  }

  async getMarketData(zipCode: string): Promise<any> {
    try {
      const response = await this.client.get('/market/statistics', {
        params: {
          zip_code: zipCode,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching market data:', error);
      return null;
    }
  }

  private transformEstatedProperty(data: any): Property {
    const property: Property = {
      id: data.id || `${data.address?.zip_code}-${Date.now()}`,
      address: {
        street: data.address?.street_address || '',
        city: data.address?.city || '',
        state: data.address?.state || '',
        zipCode: data.address?.zip_code || '',
        county: data.address?.county || '',
        fullAddress: `${data.address?.street_address || ''}, ${data.address?.city || ''}, ${data.address?.state || ''} ${data.address?.zip_code || ''}`,
      },
      coordinates: {
        latitude: data.coordinates?.latitude || 0,
        longitude: data.coordinates?.longitude || 0,
      },
      propertyDetails: {
        propertyType: this.mapPropertyType(data.property_type),
        bedrooms: data.structure?.bedrooms,
        bathrooms: data.structure?.bathrooms,
        squareFootage: data.structure?.total_sqft,
        lotSize: data.lot?.lot_sqft,
        yearBuilt: data.structure?.year_built,
        stories: data.structure?.stories,
        garage: data.structure?.garage_spaces > 0,
        pool: data.structure?.pool,
        fireplace: data.structure?.fireplace,
      },
      marketData: {
        listPrice: data.listing?.list_price,
        marketValue: data.valuation?.value || data.assessment?.market_value || 0,
        assessedValue: data.assessment?.assessed_value,
        lastSalePrice: data.sales_history?.[0]?.price,
        lastSaleDate: data.sales_history?.[0]?.date,
        pricePerSqFt: data.valuation?.price_per_sqft,
        daysOnMarket: data.listing?.days_on_market,
        propertyStatus: this.mapPropertyStatus(data.listing?.status),
      },
      ownershipInfo: {
        ownerName: data.owner?.names?.[0],
        ownerType: this.mapOwnerType(data.owner?.owner_type),
        ownerOccupied: data.owner?.owner_occupied,
        absenteeOwner: data.owner?.absentee_owner,
        yearPurchased: data.sales_history?.[0]?.date ? new Date(data.sales_history[0].date).getFullYear() : undefined,
        purchasePrice: data.sales_history?.[0]?.price,
      },
      financialData: {
        taxes: data.taxes?.annual_amount ? {
          annual: data.taxes.annual_amount,
          monthly: Math.round(data.taxes.annual_amount / 12),
        } : undefined,
      },
      comps: [],
      lastUpdated: new Date().toISOString(),
    };

    return property;
  }

  private transformComparable(data: any): PropertyComparable {
    return {
      id: data.id || `comp-${Date.now()}`,
      address: `${data.address?.street_address || ''}, ${data.address?.city || ''}`,
      distance: data.distance || 0,
      salePrice: data.price || 0,
      saleDate: data.date || '',
      squareFootage: data.sqft || 0,
      bedrooms: data.bedrooms || 0,
      bathrooms: data.bathrooms || 0,
      pricePerSqFt: data.price && data.sqft ? Math.round(data.price / data.sqft) : 0,
      adjustedPrice: data.adjusted_price || data.price || 0,
    };
  }

  private buildSearchParams(params: PropertySearchParams): any {
    const searchParams: any = {
      limit: params.limit,
      offset: (params.page - 1) * params.limit,
    };

    // Price range
    if (params.filters.priceRange.min > 0) {
      searchParams.min_price = params.filters.priceRange.min;
    }
    if (params.filters.priceRange.max > 0) {
      searchParams.max_price = params.filters.priceRange.max;
    }

    // Location
    if (params.filters.location.cities.length > 0) {
      searchParams.city = params.filters.location.cities.join(',');
    }
    if (params.filters.location.zipCodes.length > 0) {
      searchParams.zip_code = params.filters.location.zipCodes.join(',');
    }
    if (params.filters.location.counties.length > 0) {
      searchParams.county = params.filters.location.counties.join(',');
    }

    // Property details
    if (params.filters.bedrooms.min > 0) {
      searchParams.min_bedrooms = params.filters.bedrooms.min;
    }
    if (params.filters.bedrooms.max > 0) {
      searchParams.max_bedrooms = params.filters.bedrooms.max;
    }
    if (params.filters.bathrooms.min > 0) {
      searchParams.min_bathrooms = params.filters.bathrooms.min;
    }
    if (params.filters.bathrooms.max > 0) {
      searchParams.max_bathrooms = params.filters.bathrooms.max;
    }
    if (params.filters.squareFootage.min > 0) {
      searchParams.min_sqft = params.filters.squareFootage.min;
    }
    if (params.filters.squareFootage.max > 0) {
      searchParams.max_sqft = params.filters.squareFootage.max;
    }

    // Sorting
    searchParams.sort = this.mapSortField(params.sortBy);
    searchParams.order = params.sortOrder;

    return searchParams;
  }

  private mapPropertyType(type: string): Property['propertyDetails']['propertyType'] {
    const typeMap: { [key: string]: Property['propertyDetails']['propertyType'] } = {
      'single_family': 'single_family',
      'multi_family': 'multi_family',
      'condo': 'condo',
      'townhouse': 'townhouse',
      'commercial': 'commercial',
      'land': 'land',
    };
    return typeMap[type] || 'single_family';
  }

  private mapPropertyStatus(status: string): Property['marketData']['propertyStatus'] {
    const statusMap: { [key: string]: Property['marketData']['propertyStatus'] } = {
      'for_sale': 'for_sale',
      'sold': 'sold',
      'off_market': 'off_market',
      'pending': 'pending',
      'withdrawn': 'withdrawn',
    };
    return statusMap[status] || 'off_market';
  }

  private mapOwnerType(type: string): Property['ownershipInfo']['ownerType'] {
    const typeMap: { [key: string]: Property['ownershipInfo']['ownerType'] } = {
      'individual': 'individual',
      'corporate': 'corporate',
      'trust': 'trust',
      'government': 'government',
    };
    return typeMap[type] || 'unknown';
  }

  private mapSortField(field: string): string {
    const fieldMap: { [key: string]: string } = {
      'price': 'price',
      'pricePerSqFt': 'price_per_sqft',
      'marketValue': 'market_value',
      'lastSaleDate': 'last_sale_date',
      'daysOnMarket': 'days_on_market',
    };
    return fieldMap[field] || 'price';
  }
}

export const estatedService = new EstatedService();