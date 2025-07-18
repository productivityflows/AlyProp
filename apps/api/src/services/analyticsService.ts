import { logger } from '../utils/logger';

interface AddressSearch {
  id?: number;
  address: string;
  strategy: string;
  timestamp: Date;
  userAgent?: string;
  ipHash?: string;
  dealScore?: number;
  purchased: boolean;
}

interface PopularArea {
  city: string;
  state: string;
  zipCode: string;
  searchCount: number;
  averageDealScore: number;
  strategies: { [key: string]: number };
}

export class AnalyticsService {
  private addressSearches: AddressSearch[] = []; // In production, use database

  // Track when a user searches for an address
  async trackAddressSearch(data: {
    address: string;
    strategy: string;
    userAgent?: string;
    ipAddress?: string;
  }) {
    try {
      const search: AddressSearch = {
        address: data.address,
        strategy: data.strategy,
        timestamp: new Date(),
        userAgent: data.userAgent,
        ipHash: data.ipAddress ? this.hashIP(data.ipAddress) : undefined,
        purchased: false
      };

      // In production, save to database
      this.addressSearches.push(search);
      
      logger.info(`Address search tracked: ${data.address} (${data.strategy})`);
    } catch (error) {
      logger.error('Failed to track address search:', error);
    }
  }

  // Track when a user purchases a report
  async trackReportPurchase(address: string, dealScore: number) {
    try {
      // Find and update the corresponding search
      const searchIndex = this.addressSearches.findIndex(
        search => search.address === address && !search.purchased
      );
      
      if (searchIndex !== -1) {
        this.addressSearches[searchIndex].purchased = true;
        this.addressSearches[searchIndex].dealScore = dealScore;
      }

      logger.info(`Report purchase tracked: ${address} (Score: ${dealScore})`);
    } catch (error) {
      logger.error('Failed to track report purchase:', error);
    }
  }

  // Get most popular addresses/areas
  async getPopularAddresses(limit: number = 20): Promise<AddressSearch[]> {
    try {
      // Group by address and count searches
      const addressCounts = this.addressSearches.reduce((acc, search) => {
        if (!acc[search.address]) {
          acc[search.address] = {
            ...search,
            searchCount: 0
          };
        }
        acc[search.address].searchCount++;
        return acc;
      }, {} as { [key: string]: AddressSearch & { searchCount: number } });

      // Sort by search count and return top addresses
      return Object.values(addressCounts)
        .sort((a, b) => b.searchCount - a.searchCount)
        .slice(0, limit);
    } catch (error) {
      logger.error('Failed to get popular addresses:', error);
      return [];
    }
  }

  // Get trending areas for subscription insights
  async getTrendingAreas(limit: number = 10): Promise<PopularArea[]> {
    try {
      // Parse addresses to extract city/state/zip information
      const areaCounts = this.addressSearches.reduce((acc, search) => {
        const { city, state, zipCode } = this.parseAddress(search.address);
        const areaKey = `${city}, ${state} ${zipCode}`;

        if (!acc[areaKey]) {
          acc[areaKey] = {
            city,
            state,
            zipCode,
            searchCount: 0,
            totalDealScore: 0,
            dealScoreCount: 0,
            averageDealScore: 0,
            strategies: {}
          };
        }

        acc[areaKey].searchCount++;
        
        if (search.dealScore) {
          acc[areaKey].totalDealScore += search.dealScore;
          acc[areaKey].dealScoreCount++;
        }

        if (!acc[areaKey].strategies[search.strategy]) {
          acc[areaKey].strategies[search.strategy] = 0;
        }
        acc[areaKey].strategies[search.strategy]++;

        return acc;
      }, {} as { [key: string]: any });

      // Calculate averages and sort
      const areas = Object.values(areaCounts).map((area: any) => ({
        ...area,
        averageDealScore: area.dealScoreCount > 0 
          ? Math.round((area.totalDealScore / area.dealScoreCount) * 10) / 10 
          : 0
      }));

      return areas
        .sort((a, b) => b.searchCount - a.searchCount)
        .slice(0, limit);
    } catch (error) {
      logger.error('Failed to get trending areas:', error);
      return [];
    }
  }

  // Get conversion analytics
  async getConversionStats() {
    try {
      const totalSearches = this.addressSearches.length;
      const totalPurchases = this.addressSearches.filter(s => s.purchased).length;
      const conversionRate = totalSearches > 0 ? (totalPurchases / totalSearches) * 100 : 0;

      // Strategy breakdown
      const strategyStats = this.addressSearches.reduce((acc, search) => {
        if (!acc[search.strategy]) {
          acc[search.strategy] = { total: 0, purchased: 0 };
        }
        acc[search.strategy].total++;
        if (search.purchased) {
          acc[search.strategy].purchased++;
        }
        return acc;
      }, {} as { [key: string]: { total: number; purchased: number } });

      // Deal score distribution for purchased reports
      const dealScores = this.addressSearches
        .filter(s => s.purchased && s.dealScore)
        .map(s => s.dealScore!);

      const averageDealScore = dealScores.length > 0
        ? dealScores.reduce((a, b) => a + b, 0) / dealScores.length
        : 0;

      return {
        totalSearches,
        totalPurchases,
        conversionRate: Math.round(conversionRate * 10) / 10,
        strategyStats,
        averageDealScore: Math.round(averageDealScore * 10) / 10,
        highValueReports: dealScores.filter(score => score >= 8).length
      };
    } catch (error) {
      logger.error('Failed to get conversion stats:', error);
      return null;
    }
  }

  // Generate insights for marketing/subscriptions
  async generateMarketingInsights() {
    try {
      const trendingAreas = await this.getTrendingAreas(5);
      const conversionStats = await this.getConversionStats();
      const popularAddresses = await this.getPopularAddresses(10);

      // Identify high-opportunity areas
      const hotspots = trendingAreas.filter(area => 
        area.searchCount >= 5 && area.averageDealScore >= 7.5
      );

      // Identify subscription candidates (frequent searchers)
      const frequentSearchers = this.getFrequentSearcherPatterns();

      return {
        hotspots,
        trendingAreas,
        conversionStats,
        popularAddresses: popularAddresses.slice(0, 5),
        subscriptionOpportunities: frequentSearchers.length,
        insights: [
          `${hotspots.length} high-opportunity markets identified`,
          `${conversionStats?.conversionRate}% search-to-purchase conversion rate`,
          `${conversionStats?.highValueReports} properties scored 8+ (premium deals)`,
          `Top strategy: ${this.getTopStrategy()}`
        ]
      };
    } catch (error) {
      logger.error('Failed to generate marketing insights:', error);
      return null;
    }
  }

  // Helper methods
  private hashIP(ip: string): string {
    // Simple hash for privacy - in production use proper crypto
    return Buffer.from(ip).toString('base64').substring(0, 8);
  }

  private parseAddress(address: string): { city: string; state: string; zipCode: string } {
    // Simple address parsing - in production use proper geocoding
    const parts = address.split(',');
    const lastPart = parts[parts.length - 1]?.trim() || '';
    const stateZip = lastPart.split(' ');
    
    return {
      city: parts[parts.length - 2]?.trim() || 'Unknown',
      state: stateZip[0] || 'Unknown',
      zipCode: stateZip[1] || 'Unknown'
    };
  }

  private getFrequentSearcherPatterns(): any[] {
    // Identify patterns that suggest subscription opportunities
    // This would be more sophisticated in production
    return [];
  }

  private getTopStrategy(): string {
    const strategyCounts = this.addressSearches.reduce((acc, search) => {
      acc[search.strategy] = (acc[search.strategy] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(strategyCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'rental';
  }
}