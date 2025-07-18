'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { MagnifyingGlassIcon, CreditCardIcon, SparklesIcon } from '@heroicons/react/24/outline'

interface PropertySearchProps {
  initialAddress: string
  onPropertyData: (data: any) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export default function PropertySearch({ 
  initialAddress, 
  onPropertyData, 
  isLoading, 
  setIsLoading 
}: PropertySearchProps) {
  const [address, setAddress] = useState(initialAddress)
  const [investmentStrategy, setInvestmentStrategy] = useState('rental')

  const strategies = [
    { id: 'rental', name: 'Buy & Hold Rental', description: 'Long-term rental income analysis' },
    { id: 'flip', name: 'Fix & Flip', description: 'Renovation and resale analysis' },
    { id: 'brrrr', name: 'BRRRR Strategy', description: 'Buy, rehab, rent, refinance, repeat' },
    { id: 'wholesale', name: 'Wholesale', description: 'Quick assignment opportunities' },
  ]

  const handleAnalyze = async () => {
    if (!address.trim()) {
      toast.error('Please enter a property address')
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call to your backend
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock property data - replace with actual API integration
      const mockData = {
        address: address,
        strategy: investmentStrategy,
        basicInfo: {
          price: 285000,
          bedrooms: 3,
          bathrooms: 2,
          sqft: 1850,
          yearBuilt: 1995,
          lotSize: 0.25,
          propertyType: 'Single Family'
        },
        financials: {
          estimatedRentRange: { min: 2200, max: 2800 },
          cashFlow: 425,
          capRate: 6.8,
          cashOnCashReturn: 12.4,
          roi: 15.2,
          monthlyExpenses: 1875
        },
        aiInsights: {
          dealScore: 8.2,
          summary: 'This property shows strong rental potential with above-market cash flow. The neighborhood is experiencing steady appreciation with good rental demand.',
          strengths: [
            'Strong rental market with 95% occupancy rates',
            'Recent neighborhood improvements and development',
            'Property condition appears good based on listing photos',
            'Cash flow positive from day one'
          ],
          risks: [
            'Roof may need replacement within 5-7 years',
            'Local property taxes trending upward',
            'Some deferred maintenance visible'
          ],
          recommendations: [
            'Negotiate price down to $275k for better margins',
            'Budget $15k for immediate improvements',
            'Consider professional property management',
            'Verify rental comps with local agents'
          ]
        },
        marketData: {
          medianPrice: 295000,
          priceAppreciation: 4.2,
          daysOnMarket: 28,
          comparables: [
            { address: '456 Oak St', price: 275000, sqft: 1800, pricePerSqft: 153 },
            { address: '789 Pine Ave', price: 310000, sqft: 1950, pricePerSqft: 159 },
            { address: '321 Elm Dr', price: 268000, sqft: 1750, pricePerSqft: 153 }
          ]
        }
      }
      
      onPropertyData(mockData)
      toast.success('Analysis complete!')
      
    } catch (error) {
      toast.error('Failed to analyze property. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mb-12"
    >
      <div className="card">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Analysis</h2>
          <p className="text-gray-600">Enter any property address to get AI-powered investment insights</p>
        </div>

        {/* Address Input */}
        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Property Address
          </label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main Street, Anytown, State 12345"
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Investment Strategy Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Investment Strategy
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className={`
                  relative rounded-lg border p-4 cursor-pointer transition-colors
                  ${investmentStrategy === strategy.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-gray-400'
                  }
                `}
                onClick={() => setInvestmentStrategy(strategy.id)}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="strategy"
                    value={strategy.id}
                    checked={investmentStrategy === strategy.id}
                    onChange={() => setInvestmentStrategy(strategy.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <div className="ml-3">
                    <label className="text-sm font-medium text-gray-900 cursor-pointer">
                      {strategy.name}
                    </label>
                    <p className="text-xs text-gray-500">{strategy.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <div className="text-center">
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Analyzing Property...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5 mr-2" />
                Analyze Property - $5.00
              </>
            )}
          </button>
        </div>

        {/* Features highlight */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <SparklesIcon className="w-8 h-8 text-primary-600 mb-2" />
              <h3 className="font-medium text-gray-900">AI Analysis</h3>
              <p className="text-sm text-gray-600">Claude 3 Haiku powered insights</p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCardIcon className="w-8 h-8 text-primary-600 mb-2" />
              <h3 className="font-medium text-gray-900">Secure Payment</h3>
              <p className="text-sm text-gray-600">One-time $5 payment</p>
            </div>
            <div className="flex flex-col items-center">
              <MagnifyingGlassIcon className="w-8 h-8 text-primary-600 mb-2" />
              <h3 className="font-medium text-gray-900">Instant Results</h3>
              <p className="text-sm text-gray-600">Analysis in under 30 seconds</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}