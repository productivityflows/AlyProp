import Anthropic from '@anthropic-ai/sdk';
import axios from 'axios';
import { logger } from '../utils/logger';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface PropertyData {
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  lotSize: number;
  propertyType: string;
  marketData?: any;
}

interface AnalysisRequest {
  address: string;
  strategy: 'rental' | 'flip' | 'brrrr' | 'wholesale';
}

export class PropertyAnalysisService {
  async analyzeProperty(request: AnalysisRequest) {
    try {
      // 1. Fetch property data from Estated API
      const propertyData = await this.fetchPropertyData(request.address);
      
      // 2. Get market comparables
      const marketData = await this.fetchMarketData(request.address);
      
      // 3. Perform AI analysis
      const aiInsights = await this.performAIAnalysis(propertyData, marketData, request.strategy);
      
      // 4. Calculate financial metrics
      const financials = this.calculateFinancials(propertyData, request.strategy);
      
      return {
        success: true,
        data: {
          address: request.address,
          strategy: request.strategy,
          basicInfo: propertyData,
          financials,
          aiInsights,
          marketData,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      logger.error('Property analysis failed:', error);
      throw new Error('Failed to analyze property');
    }
  }

  private async fetchPropertyData(address: string): Promise<PropertyData> {
    try {
      // Mock implementation - replace with actual Estated API call
      if (process.env.ESTATED_API_KEY) {
        const response = await axios.get(`https://api.estated.com/v4/property`, {
          params: { address },
          headers: {
            'Authorization': `Bearer ${process.env.ESTATED_API_KEY}`
          }
        });
        return this.normalizePropertyData(response.data);
      }
      
      // Mock data for development
      return {
        address,
        price: Math.floor(Math.random() * 500000) + 200000,
        bedrooms: Math.floor(Math.random() * 4) + 2,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        sqft: Math.floor(Math.random() * 1000) + 1500,
        yearBuilt: Math.floor(Math.random() * 30) + 1990,
        lotSize: Math.random() * 0.5 + 0.1,
        propertyType: 'Single Family'
      };
    } catch (error) {
      logger.error('Failed to fetch property data:', error);
      throw new Error('Property data unavailable');
    }
  }

  private async fetchMarketData(address: string) {
    // Mock market data - replace with actual market data API
    return {
      medianPrice: 295000,
      priceAppreciation: 4.2,
      daysOnMarket: 28,
      comparables: [
        { address: '456 Oak St', price: 275000, sqft: 1800, pricePerSqft: 153 },
        { address: '789 Pine Ave', price: 310000, sqft: 1950, pricePerSqft: 159 },
        { address: '321 Elm Dr', price: 268000, sqft: 1750, pricePerSqft: 153 }
      ]
    };
  }

  private async performAIAnalysis(propertyData: PropertyData, marketData: any, strategy: string) {
    const prompt = this.buildAnalysisPrompt(propertyData, marketData, strategy);
    
    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      return this.parseAIResponse(response.content[0].text);
    } catch (error) {
      logger.error('AI analysis failed:', error);
      
      // Fallback analysis
      return {
        dealScore: 7.5,
        summary: 'This property shows good investment potential based on the available data and market conditions.',
        strengths: [
          'Property is in good condition',
          'Market shows steady appreciation',
          'Good rental demand in area'
        ],
        risks: [
          'Market conditions may change',
          'Property may need maintenance',
          'Local regulations should be verified'
        ],
        recommendations: [
          'Conduct thorough property inspection',
          'Verify rental comps in the area',
          'Consider negotiating price'
        ]
      };
    }
  }

  private buildAnalysisPrompt(propertyData: PropertyData, marketData: any, strategy: string): string {
    return `
You are a real estate investment expert analyzing a property for ${strategy} investment strategy.

Property Details:
- Address: ${propertyData.address}
- Price: $${propertyData.price.toLocaleString()}
- Bedrooms: ${propertyData.bedrooms}
- Bathrooms: ${propertyData.bathrooms}
- Square Feet: ${propertyData.sqft}
- Year Built: ${propertyData.yearBuilt}
- Lot Size: ${propertyData.lotSize} acres
- Property Type: ${propertyData.propertyType}

Market Context:
- Median Price: $${marketData.medianPrice.toLocaleString()}
- Price Appreciation: ${marketData.priceAppreciation}%
- Average Days on Market: ${marketData.daysOnMarket}

Investment Strategy: ${strategy.toUpperCase()}

Please provide a comprehensive analysis in JSON format with:
1. dealScore (1-10): Overall investment potential
2. summary: 2-3 sentence overview of the investment opportunity
3. strengths: Array of 3-4 positive factors
4. risks: Array of 3-4 potential risks or concerns
5. recommendations: Array of 3-4 specific actionable recommendations

Focus on ${strategy}-specific insights and be specific about financial opportunities and risks.
`;
  }

  private parseAIResponse(text: string) {
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      logger.warn('Failed to parse AI response as JSON:', error);
    }

    // Fallback parsing
    return {
      dealScore: 7.5,
      summary: text.split('\n')[0] || 'Analysis completed successfully.',
      strengths: ['Good investment opportunity', 'Favorable market conditions'],
      risks: ['Market volatility', 'Property condition unknown'],
      recommendations: ['Conduct due diligence', 'Verify financial projections']
    };
  }

  private calculateFinancials(propertyData: PropertyData, strategy: string) {
    const price = propertyData.price;
    const estimatedRent = this.estimateMonthlyRent(propertyData);
    const monthlyExpenses = this.estimateMonthlyExpenses(propertyData, estimatedRent);
    
    const cashFlow = estimatedRent - monthlyExpenses;
    const capRate = ((estimatedRent * 12 - monthlyExpenses * 12) / price) * 100;
    const cashOnCashReturn = strategy === 'rental' ? (cashFlow * 12 / (price * 0.25)) * 100 : 0;
    
    return {
      estimatedRentRange: {
        min: Math.floor(estimatedRent * 0.9),
        max: Math.floor(estimatedRent * 1.1)
      },
      cashFlow: Math.floor(cashFlow),
      capRate: Math.round(capRate * 10) / 10,
      cashOnCashReturn: Math.round(cashOnCashReturn * 10) / 10,
      roi: Math.round((capRate + 3) * 10) / 10, // Simplified ROI calculation
      monthlyExpenses: Math.floor(monthlyExpenses)
    };
  }

  private estimateMonthlyRent(propertyData: PropertyData): number {
    // Simplified rent estimation - replace with actual rental comps
    const baseRent = propertyData.sqft * 1.5; // $1.5 per sqft
    const bedroomBonus = propertyData.bedrooms * 200;
    return Math.floor(baseRent + bedroomBonus);
  }

  private estimateMonthlyExpenses(propertyData: PropertyData, rent: number): number {
    // Property taxes (estimated 1.2% annually)
    const propertyTaxes = (propertyData.price * 0.012) / 12;
    
    // Insurance (estimated 0.5% annually)
    const insurance = (propertyData.price * 0.005) / 12;
    
    // Maintenance (5% of rent)
    const maintenance = rent * 0.05;
    
    // Property management (10% of rent)
    const management = rent * 0.10;
    
    // Vacancy allowance (5% of rent)
    const vacancy = rent * 0.05;
    
    return Math.floor(propertyTaxes + insurance + maintenance + management + vacancy);
  }

  private normalizePropertyData(apiData: any): PropertyData {
    // Normalize data from Estated API response
    return {
      address: apiData.address || '',
      price: apiData.estimated_value || apiData.market_value || 0,
      bedrooms: apiData.bedrooms || 0,
      bathrooms: apiData.bathrooms || 0,
      sqft: apiData.sqft || 0,
      yearBuilt: apiData.year_built || 0,
      lotSize: apiData.lot_size || 0,
      propertyType: apiData.property_type || 'Unknown'
    };
  }
}