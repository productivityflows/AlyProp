'use client'

import { notFound } from 'next/navigation'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import PropertyResults from '../../../components/PropertyResults'

const sampleData = {
  '3bed-queens-flip-potential': {
    address: '123 Oak Street, Queens, NY 11375',
    strategy: 'flip',
    basicInfo: {
      address: '123 Oak Street, Queens, NY 11375',
      price: 485000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1850,
      yearBuilt: 1995,
      lotSize: 0.15,
      propertyType: 'Single Family'
    },
    financials: {
      estimatedRentRange: { min: 2400, max: 2800 },
      cashFlow: 350,
      capRate: 7.2,
      cashOnCashReturn: 12.8,
      roi: 15.4,
      monthlyExpenses: 2100
    },
    aiInsights: {
      dealScore: 8.2,
      summary: 'Strong fix & flip opportunity in appreciating Queens market with excellent comparable sales showing $650K+ ARV potential.',
      strengths: [
        'Recent comps show $650K+ after-repair value',
        'Only needs cosmetic updates - $45K renovation budget',
        'Growing neighborhood with 8.2% annual appreciation',
        'Strong contractor network available in area'
      ],
      risks: [
        'Market could cool if interest rates rise further',
        'Renovation timeline could extend in winter months',
        'Competition from other flippers in area',
        'Permit delays possible for kitchen renovation'
      ],
      recommendations: [
        'Lock in contractor quotes before purchase',
        'Budget extra 10% for unforeseen issues',
        'Fast-track permits to minimize holding costs',
        'Consider pre-marketing before completion'
      ],
      valuationAssessment: 'undervalued',
      financingLikelihood: 'conventional-only',
      topRedFlag: 'Property has been on market 65+ days - investigate seller motivation',
      marketPosition: 'better',
      exitStrategy: '4-month flip timeline with $75K+ profit potential targeting spring market'
    },
    marketData: {
      medianPrice: 520000,
      priceAppreciation: 8.2,
      daysOnMarket: 32,
      comparables: [
        { address: '127 Oak Street (Renovated)', price: 675000, sqft: 1900, pricePerSqft: 355 },
        { address: '119 Pine Avenue (Updated)', price: 650000, sqft: 1820, pricePerSqft: 357 },
        { address: '134 Maple Drive (Flip)', price: 640000, sqft: 1780, pricePerSqft: 360 }
      ]
    }
  },
  'absentee-owner-brooklyn': {
    address: '456 Pine Avenue, Brooklyn, NY 11234',
    strategy: 'wholesale',
    basicInfo: {
      address: '456 Pine Avenue, Brooklyn, NY 11234',
      price: 625000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2100,
      yearBuilt: 1987,
      lotSize: 0.22,
      propertyType: 'Single Family'
    },
    financials: {
      estimatedRentRange: { min: 3200, max: 3600 },
      cashFlow: 800,
      capRate: 6.8,
      cashOnCashReturn: 11.2,
      roi: 13.5,
      monthlyExpenses: 2750
    },
    aiInsights: {
      dealScore: 7.8,
      summary: 'Wholesale opportunity with motivated absentee owner and strong investor interest in emerging Brooklyn corridor.',
      strengths: [
        'Owner lives out-of-state, highly motivated',
        'Property management neglect creates opportunity',
        'Strong rental market with waitlists',
        'Investor network actively seeking this area'
      ],
      risks: [
        'Deferred maintenance could exceed estimates',
        'Tenant may have rights requiring compensation',
        'Market gentrification could price out tenants',
        'Limited comparable wholesale transactions'
      ],
      recommendations: [
        'Verify actual owner motivation and timeline',
        'Inspect thoroughly for hidden issues',
        'Pre-qualify serious investor buyers',
        'Structure quick close with inspection period'
      ],
      valuationAssessment: 'market',
      financingLikelihood: 'cash-required',
      topRedFlag: 'Current tenant situation unclear - verify rent rolls and lease terms',
      marketPosition: 'average',
      exitStrategy: 'Wholesale to investor within 30 days for $45K assignment fee'
    },
    marketData: {
      medianPrice: 680000,
      priceAppreciation: 5.7,
      daysOnMarket: 28,
      comparables: [
        { address: '451 Pine Avenue', price: 640000, sqft: 2050, pricePerSqft: 312 },
        { address: '462 Oak Street', price: 615000, sqft: 2080, pricePerSqft: 296 },
        { address: '447 Elm Drive', price: 670000, sqft: 2200, pricePerSqft: 305 }
      ]
    }
  }
  // Add more sample data as needed
}

interface PageProps {
  params: { id: string }
}

export default function SampleReportPage({ params }: PageProps) {
  const reportData = sampleData[params.id as keyof typeof sampleData]
  
  if (!reportData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sample Property Analysis Report
            </h1>
            <p className="text-gray-600">
              This is a demonstration of our AI-powered property analysis
            </p>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg inline-block">
              <p className="text-blue-800 text-sm">
                📊 Sample Report - Get your own analysis for any property starting at $5
              </p>
            </div>
          </div>
        </div>

        <PropertyResults 
          propertyData={reportData}
          isLoading={false}
        />

        {/* CTA after sample report */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-12">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Get Your Own Property Analysis
            </h2>
            <p className="text-primary-100 mb-6">
              Analyze any property nationwide with our AI-powered investment insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/search" 
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Analyze Any Property - $5
              </a>
              <a 
                href="/waitlist" 
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors"
              >
                Join Pro Waitlist
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Generate static params for better SEO
export function generateStaticParams() {
  return Object.keys(sampleData).map((id) => ({
    id: id,
  }))
}

// Add metadata for SEO
export function generateMetadata({ params }: PageProps) {
  const reportData = sampleData[params.id as keyof typeof sampleData]
  
  if (!reportData) {
    return {
      title: 'Sample Report Not Found',
    }
  }

  return {
    title: `${reportData.basicInfo.address} - Investment Analysis | Property AI`,
    description: `${reportData.aiInsights.summary} See detailed AI analysis including deal score ${reportData.aiInsights.dealScore}/10, financial projections, and investment recommendations.`,
    keywords: `real estate investment, ${reportData.strategy} strategy, ${reportData.basicInfo.address}, property analysis, ROI calculator`,
  }
}