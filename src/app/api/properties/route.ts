import { NextRequest, NextResponse } from 'next/server'
import { estatedService } from '@/lib/estated'
import { claudeService } from '@/lib/claude'
import { PropertySearchParams } from '@/types/property'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse search parameters
    const params: PropertySearchParams = {
      filters: {
        priceRange: {
          min: parseInt(searchParams.get('minPrice') || '0'),
          max: parseInt(searchParams.get('maxPrice') || '0'),
        },
        location: {
          cities: searchParams.get('cities')?.split(',').filter(Boolean) || [],
          counties: searchParams.get('counties')?.split(',').filter(Boolean) || [],
          zipCodes: searchParams.get('zipCodes')?.split(',').filter(Boolean) || [],
        },
        propertyType: (searchParams.get('propertyTypes')?.split(',') as any) || [],
        bedrooms: {
          min: parseInt(searchParams.get('minBedrooms') || '0'),
          max: parseInt(searchParams.get('maxBedrooms') || '0'),
        },
        bathrooms: {
          min: parseInt(searchParams.get('minBathrooms') || '0'),
          max: parseInt(searchParams.get('maxBathrooms') || '0'),
        },
        squareFootage: {
          min: parseInt(searchParams.get('minSquareFootage') || '0'),
          max: parseInt(searchParams.get('maxSquareFootage') || '0'),
        },
        yearBuilt: {
          min: parseInt(searchParams.get('minYearBuilt') || '0'),
          max: parseInt(searchParams.get('maxYearBuilt') || '0'),
        },
        dealScore: {
          min: parseInt(searchParams.get('minDealScore') || '0'),
        },
        investmentStrategy: (searchParams.get('strategies')?.split(',') as any) || [],
        ownerType: (searchParams.get('ownerTypes')?.split(',') as any) || [],
        absenteeOwner: searchParams.get('absenteeOwner') === 'true',
        daysOnMarket: {
          max: parseInt(searchParams.get('maxDaysOnMarket') || '0'),
        },
      },
      sortBy: (searchParams.get('sortBy') as any) || 'dealScore',
      sortOrder: (searchParams.get('sortOrder') as any) || 'desc',
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
    }

    // Search properties using Estated API
    const searchResult = await estatedService.searchProperties(params)

    // For properties that don't have AI analysis, generate it
    const propertiesWithAI = await Promise.all(
      searchResult.properties.map(async (property) => {
        if (!property.dealScore) {
          try {
            // Get deal score from Claude AI
            const dealScore = await claudeService.calculateDealScore(property)
            property.dealScore = dealScore
          } catch (error) {
            console.error('Error generating deal score:', error)
            // Provide fallback score
            property.dealScore = {
              overall: 50,
              breakdown: {
                priceVsMarket: 10,
                rentalPotential: 10,
                location: 10,
                condition: 10,
                marketTrends: 10,
              },
              explanation: 'Deal score could not be calculated at this time.',
              grade: 'C',
              dealType: 'fair',
            }
          }
        }

        if (!property.aiAnalysis) {
          try {
            // Get AI analysis from Claude
            const aiAnalysis = await claudeService.analyzeProperty(property)
            property.aiAnalysis = aiAnalysis
          } catch (error) {
            console.error('Error generating AI analysis:', error)
            // Continue without AI analysis for now
          }
        }

        return property
      })
    )

    return NextResponse.json({
      ...searchResult,
      properties: propertiesWithAI,
    })

  } catch (error) {
    console.error('Error in properties API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address } = body

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      )
    }

    // Get property data from Estated
    const property = await estatedService.getPropertyByAddress(address)

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    // Get comparables
    const comps = await estatedService.getComparables(address)
    property.comps = comps

    // Generate AI analysis and deal score
    try {
      const [dealScore, aiAnalysis, rentalAnalysis, strategies] = await Promise.all([
        claudeService.calculateDealScore(property),
        claudeService.analyzeProperty(property),
        claudeService.estimateRental(property),
        claudeService.generateInvestmentStrategies(property),
      ])

      property.dealScore = dealScore
      property.aiAnalysis = aiAnalysis
      property.rentalData = rentalAnalysis
      property.aiAnalysis.bestStrategy = strategies

    } catch (error) {
      console.error('Error generating AI insights:', error)
      // Continue with basic property data
    }

    return NextResponse.json(property)

  } catch (error) {
    console.error('Error in property creation API:', error)
    return NextResponse.json(
      { error: 'Failed to analyze property' },
      { status: 500 }
    )
  }
}