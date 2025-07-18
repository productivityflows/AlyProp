import axios from 'axios';
import { Property, AIPropertyAnalysis, DealScore, InvestmentStrategy, RentalAnalysis } from '@/types/property';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export class ClaudeService {
  private apiKey: string;
  private client: any;

  constructor() {
    this.apiKey = process.env.CLAUDE_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('CLAUDE_API_KEY is required');
    }

    this.client = axios.create({
      baseURL: 'https://api.anthropic.com/v1',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      timeout: 60000,
    });
  }

  async analyzeProperty(property: Property, marketData?: any): Promise<AIPropertyAnalysis> {
    try {
      const prompt = this.buildPropertyAnalysisPrompt(property, marketData);
      
      const response = await this.client.post('/messages', {
        model: 'claude-3-haiku-20240307',
        max_tokens: 2000,
        temperature: 0.3,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const analysisText = response.data.content[0].text;
      return this.parsePropertyAnalysis(analysisText, property);
    } catch (error) {
      console.error('Error analyzing property with Claude:', error);
      throw new Error('Failed to analyze property');
    }
  }

  async calculateDealScore(property: Property, marketData?: any): Promise<DealScore> {
    try {
      const prompt = this.buildDealScoringPrompt(property, marketData);
      
      const response = await this.client.post('/messages', {
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        temperature: 0.2,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const scoreText = response.data.content[0].text;
      return this.parseDealScore(scoreText);
    } catch (error) {
      console.error('Error calculating deal score with Claude:', error);
      throw new Error('Failed to calculate deal score');
    }
  }

  async estimateRental(property: Property): Promise<RentalAnalysis> {
    try {
      const prompt = this.buildRentalAnalysisPrompt(property);
      
      const response = await this.client.post('/messages', {
        model: 'claude-3-haiku-20240307',
        max_tokens: 1500,
        temperature: 0.3,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const rentalText = response.data.content[0].text;
      return this.parseRentalAnalysis(rentalText, property);
    } catch (error) {
      console.error('Error estimating rental with Claude:', error);
      throw new Error('Failed to estimate rental potential');
    }
  }

  async generateInvestmentStrategies(property: Property): Promise<InvestmentStrategy[]> {
    try {
      const prompt = this.buildInvestmentStrategyPrompt(property);
      
      const response = await this.client.post('/messages', {
        model: 'claude-3-haiku-20240307',
        max_tokens: 1500,
        temperature: 0.4,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const strategiesText = response.data.content[0].text;
      return this.parseInvestmentStrategies(strategiesText);
    } catch (error) {
      console.error('Error generating investment strategies with Claude:', error);
      throw new Error('Failed to generate investment strategies');
    }
  }

  async chatAssistant(message: string, context?: any): Promise<string> {
    try {
      const prompt = this.buildChatPrompt(message, context);
      
      const response = await this.client.post('/messages', {
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        temperature: 0.5,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      return response.data.content[0].text;
    } catch (error) {
      console.error('Error with chat assistant:', error);
      throw new Error('Failed to get assistant response');
    }
  }

  private buildPropertyAnalysisPrompt(property: Property, marketData?: any): string {
    return `You are an expert real estate investment analyst. Analyze this property and provide comprehensive insights for investors.

Property Details:
- Address: ${property.address.fullAddress}
- Type: ${property.propertyDetails.propertyType}
- Size: ${property.propertyDetails.squareFootage || 'N/A'} sq ft
- Bedrooms: ${property.propertyDetails.bedrooms || 'N/A'}
- Bathrooms: ${property.propertyDetails.bathrooms || 'N/A'}
- Year Built: ${property.propertyDetails.yearBuilt || 'N/A'}
- Market Value: $${property.marketData.marketValue?.toLocaleString() || 'N/A'}
- List Price: $${property.marketData.listPrice?.toLocaleString() || 'N/A'}
- Last Sale: $${property.marketData.lastSalePrice?.toLocaleString() || 'N/A'} on ${property.marketData.lastSaleDate || 'N/A'}
- Owner Type: ${property.ownershipInfo.ownerType}
- Absentee Owner: ${property.ownershipInfo.absenteeOwner ? 'Yes' : 'No'}
- Annual Taxes: $${property.financialData.taxes?.annual?.toLocaleString() || 'N/A'}

Market Context:
${marketData ? JSON.stringify(marketData, null, 2) : 'Limited market data available'}

Comparable Properties:
${property.comps.length > 0 ? property.comps.map(comp => 
  `- ${comp.address}: $${comp.salePrice.toLocaleString()} (${comp.pricePerSqFt}/sq ft) - ${comp.distance} miles away`
).join('\n') : 'No comparable data available'}

Please provide your analysis in the following JSON format:
{
  "summary": "Brief 2-3 sentence summary of the investment opportunity",
  "keyHighlights": ["highlight 1", "highlight 2", "highlight 3"],
  "riskFactors": ["risk 1", "risk 2", "risk 3"],
  "investmentPotential": "high|medium|low",
  "comparableAnalysis": "Analysis of how this property compares to recent sales",
  "marketTrends": "Current market trends affecting this property",
  "recommendations": ["recommendation 1", "recommendation 2"],
  "confidence": 85
}`;
  }

  private buildDealScoringPrompt(property: Property, marketData?: any): string {
    return `You are a real estate deal scoring expert. Score this property deal on a scale of 0-100 based on investment potential.

Property Data:
- Market Value: $${property.marketData.marketValue?.toLocaleString()}
- List Price: $${property.marketData.listPrice?.toLocaleString()}
- Price per Sq Ft: $${property.marketData.pricePerSqFt || 'N/A'}
- Days on Market: ${property.marketData.daysOnMarket || 'N/A'}
- Property Type: ${property.propertyDetails.propertyType}
- Location: ${property.address.city}, ${property.address.state}
- Owner Type: ${property.ownershipInfo.ownerType}
- Absentee Owner: ${property.ownershipInfo.absenteeOwner}

Scoring Criteria:
1. Price vs Market Value (25 points)
2. Rental Potential (25 points)
3. Location Quality (20 points)
4. Property Condition/Age (15 points)
5. Market Trends (15 points)

Provide your response in this JSON format:
{
  "overall": 85,
  "breakdown": {
    "priceVsMarket": 20,
    "rentalPotential": 22,
    "location": 18,
    "condition": 12,
    "marketTrends": 13
  },
  "explanation": "Detailed explanation of the score",
  "grade": "A",
  "dealType": "good"
}

Grades: A+ (90-100), A (80-89), B+ (75-79), B (70-74), C+ (65-69), C (60-64), D+ (55-59), D (50-54), F (<50)
Deal Types: excellent (90+), good (70-89), fair (50-69), poor (30-49), avoid (<30)`;
  }

  private buildRentalAnalysisPrompt(property: Property): string {
    return `Estimate rental potential for this property based on location, size, and market conditions.

Property Details:
- Address: ${property.address.fullAddress}
- Type: ${property.propertyDetails.propertyType}
- Bedrooms: ${property.propertyDetails.bedrooms || 'N/A'}
- Bathrooms: ${property.propertyDetails.bathrooms || 'N/A'}
- Square Footage: ${property.propertyDetails.squareFootage || 'N/A'}
- Market Value: $${property.marketData.marketValue?.toLocaleString()}

Provide rental analysis in this JSON format:
{
  "estimatedRent": {
    "low": 1200,
    "high": 1600,
    "average": 1400
  },
  "rentToValueRatio": 0.012,
  "capRate": 0.08,
  "cashFlow": {
    "monthly": 200,
    "annual": 2400
  },
  "occupancyRate": 0.95
}`;
  }

  private buildInvestmentStrategyPrompt(property: Property): string {
    return `Generate 2-3 investment strategies for this property based on its characteristics.

Property Profile:
- Type: ${property.propertyDetails.propertyType}
- Market Value: $${property.marketData.marketValue?.toLocaleString()}
- List Price: $${property.marketData.listPrice?.toLocaleString()}
- Condition: ${property.propertyDetails.yearBuilt ? `Built in ${property.propertyDetails.yearBuilt}` : 'Unknown'}
- Location: ${property.address.city}, ${property.address.state}

Return strategies in this JSON format:
[
  {
    "type": "buy_hold",
    "name": "Buy & Hold Rental",
    "description": "Purchase and rent out for long-term cash flow",
    "estimatedProfit": 50000,
    "timeframe": "5-10 years",
    "difficulty": "easy",
    "cashRequired": 60000
  }
]

Strategy types: buy_hold, flip, brrrr, wholesale, live_in_flip
Difficulty levels: easy, medium, hard`;
  }

  private buildChatPrompt(message: string, context?: any): string {
    return `You are AlyProp AI, an expert real estate investment assistant. Help users with property investment questions, deal analysis, and market insights.

User Question: ${message}

${context ? `Context: ${JSON.stringify(context, null, 2)}` : ''}

Provide helpful, actionable advice focused on real estate investment strategies, deal analysis, and market insights. Keep responses concise but informative.`;
  }

  private parsePropertyAnalysis(text: string, property: Property): AIPropertyAnalysis {
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          summary: parsed.summary || 'Analysis generated by AI',
          keyHighlights: parsed.keyHighlights || [],
          riskFactors: parsed.riskFactors || [],
          investmentPotential: parsed.investmentPotential || 'medium',
          bestStrategy: [], // Will be populated separately
          comparableAnalysis: parsed.comparableAnalysis || '',
          marketTrends: parsed.marketTrends || '',
          recommendations: parsed.recommendations || [],
          confidence: parsed.confidence || 75,
          generatedAt: new Date().toISOString(),
        };
      }
    } catch (error) {
      console.error('Error parsing AI analysis:', error);
    }

    // Fallback analysis
    return {
      summary: 'Property analysis completed. Review the details for investment insights.',
      keyHighlights: ['Property located in active market', 'Potential for appreciation'],
      riskFactors: ['Market volatility', 'Property condition unknown'],
      investmentPotential: 'medium',
      bestStrategy: [],
      comparableAnalysis: 'Comparable analysis requires more market data.',
      marketTrends: 'Market trends analysis in progress.',
      recommendations: ['Consider professional inspection', 'Review local rental rates'],
      confidence: 60,
      generatedAt: new Date().toISOString(),
    };
  }

  private parseDealScore(text: string): DealScore {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          overall: parsed.overall || 50,
          breakdown: parsed.breakdown || {
            priceVsMarket: 10,
            rentalPotential: 10,
            location: 10,
            condition: 10,
            marketTrends: 10,
          },
          explanation: parsed.explanation || 'Deal score calculated based on available data.',
          grade: parsed.grade || 'C',
          dealType: parsed.dealType || 'fair',
        };
      }
    } catch (error) {
      console.error('Error parsing deal score:', error);
    }

    // Fallback score
    return {
      overall: 50,
      breakdown: {
        priceVsMarket: 10,
        rentalPotential: 10,
        location: 10,
        condition: 10,
        marketTrends: 10,
      },
      explanation: 'Limited data available for comprehensive scoring.',
      grade: 'C',
      dealType: 'fair',
    };
  }

  private parseRentalAnalysis(text: string, property: Property): RentalAnalysis {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          estimatedRent: parsed.estimatedRent || { low: 1000, high: 1500, average: 1250 },
          rentComps: [],
          rentToValueRatio: parsed.rentToValueRatio || 0.01,
          capRate: parsed.capRate || 0.06,
          cashFlow: parsed.cashFlow || { monthly: 100, annual: 1200 },
          occupancyRate: parsed.occupancyRate || 0.92,
        };
      }
    } catch (error) {
      console.error('Error parsing rental analysis:', error);
    }

    // Fallback analysis
    const estimatedRent = Math.max(800, (property.marketData.marketValue || 100000) * 0.01);
    return {
      estimatedRent: {
        low: estimatedRent * 0.85,
        high: estimatedRent * 1.15,
        average: estimatedRent,
      },
      rentComps: [],
      rentToValueRatio: estimatedRent / (property.marketData.marketValue || 100000),
      capRate: 0.06,
      cashFlow: {
        monthly: Math.max(0, estimatedRent - (property.financialData.taxes?.monthly || 0) - 300),
        annual: Math.max(0, (estimatedRent - (property.financialData.taxes?.monthly || 0) - 300) * 12),
      },
      occupancyRate: 0.92,
    };
  }

  private parseInvestmentStrategies(text: string): InvestmentStrategy[] {
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Error parsing investment strategies:', error);
    }

    // Fallback strategies
    return [
      {
        type: 'buy_hold',
        name: 'Buy & Hold Rental',
        description: 'Purchase property for long-term rental income and appreciation.',
        estimatedProfit: 30000,
        timeframe: '5-10 years',
        difficulty: 'easy',
        cashRequired: 50000,
      },
      {
        type: 'flip',
        name: 'Fix & Flip',
        description: 'Renovate and resell for quick profit.',
        estimatedProfit: 25000,
        timeframe: '6-12 months',
        difficulty: 'medium',
        cashRequired: 80000,
      },
    ];
  }
}

export const claudeService = new ClaudeService();