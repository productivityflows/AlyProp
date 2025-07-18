'use client'

import { motion } from 'framer-motion'
import { 
  ChartBarIcon, 
  HomeIcon, 
  CurrencyDollarIcon, 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  TrendingUpIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

interface PropertyResultsProps {
  propertyData: any
  isLoading: boolean
}

export default function PropertyResults({ propertyData, isLoading }: PropertyResultsProps) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="card text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Analyzing property with AI...</p>
          <p className="text-sm text-gray-500 mt-2">This usually takes 15-30 seconds</p>
        </div>
      </motion.div>
    )
  }

  if (!propertyData) return null

  const { basicInfo, financials, aiInsights, marketData } = propertyData

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercent = (percent: number) => {
    return `${percent.toFixed(1)}%`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Header with address and deal score */}
      <div className="card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{propertyData.address}</h2>
            <p className="text-gray-600">Investment Strategy: {propertyData.strategy}</p>
          </div>
          <div className="mt-4 md:mt-0 text-center">
            <div className="text-3xl font-bold text-primary-600">{aiInsights.dealScore}/10</div>
            <p className="text-sm text-gray-600">AI Deal Score</p>
          </div>
        </div>
      </div>

      {/* Basic Property Info */}
      <div className="card">
        <div className="flex items-center mb-6">
          <HomeIcon className="w-6 h-6 text-primary-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Property Details</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(basicInfo.price)}</div>
            <p className="text-sm text-gray-600">List Price</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{basicInfo.bedrooms}/{basicInfo.bathrooms}</div>
            <p className="text-sm text-gray-600">Bed / Bath</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{basicInfo.sqft.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Square Feet</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{basicInfo.yearBuilt}</div>
            <p className="text-sm text-gray-600">Year Built</p>
          </div>
        </div>
      </div>

      {/* Financial Analysis */}
      <div className="card">
        <div className="flex items-center mb-6">
          <CurrencyDollarIcon className="w-6 h-6 text-primary-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Financial Analysis</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">{formatCurrency(financials.cashFlow)}</div>
            <p className="text-sm text-gray-600">Monthly Cash Flow</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{formatPercent(financials.capRate)}</div>
            <p className="text-sm text-gray-600">Cap Rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{formatPercent(financials.cashOnCashReturn)}</div>
            <p className="text-sm text-gray-600">Cash-on-Cash Return</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{formatPercent(financials.roi)}</div>
            <p className="text-sm text-gray-600">Total ROI</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Estimated Rent Range</h4>
              <p className="text-lg">{formatCurrency(financials.estimatedRentRange.min)} - {formatCurrency(financials.estimatedRentRange.max)}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Monthly Expenses</h4>
              <p className="text-lg">{formatCurrency(financials.monthlyExpenses)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="card">
        <div className="flex items-center mb-6">
          <LightBulbIcon className="w-6 h-6 text-primary-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">AI Investment Analysis</h3>
        </div>
        
        <div className="mb-6 p-4 bg-primary-50 rounded-lg">
          <p className="text-gray-900">{aiInsights.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Strengths */}
          <div>
            <div className="flex items-center mb-3">
              <ShieldCheckIcon className="w-5 h-5 text-success-600 mr-2" />
              <h4 className="font-medium text-gray-900">Strengths</h4>
            </div>
            <ul className="space-y-2">
              {aiInsights.strengths.map((strength: string, index: number) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="w-2 h-2 bg-success-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Risks */}
          <div>
            <div className="flex items-center mb-3">
              <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-2" />
              <h4 className="font-medium text-gray-900">Risks</h4>
            </div>
            <ul className="space-y-2">
              {aiInsights.risks.map((risk: string, index: number) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div>
            <div className="flex items-center mb-3">
              <TrendingUpIcon className="w-5 h-5 text-primary-600 mr-2" />
              <h4 className="font-medium text-gray-900">Recommendations</h4>
            </div>
            <ul className="space-y-2">
              {aiInsights.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Market Data */}
      <div className="card">
        <div className="flex items-center mb-6">
          <MapPinIcon className="w-6 h-6 text-primary-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Market Context</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(marketData.medianPrice)}</div>
            <p className="text-sm text-gray-600">Median Price</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">+{formatPercent(marketData.priceAppreciation)}</div>
            <p className="text-sm text-gray-600">YoY Appreciation</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{marketData.daysOnMarket}</div>
            <p className="text-sm text-gray-600">Avg Days on Market</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-4">Recent Comparable Sales</h4>
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sq Ft
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price/Sq Ft
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marketData.comparables.map((comp: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comp.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(comp.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comp.sqft.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${comp.pricePerSqft}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="card bg-primary-50 border-primary-200">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">Ready to Take Action?</h3>
          <p className="text-primary-700 mb-6">
            Based on this analysis, this property shows {aiInsights.dealScore >= 7 ? 'strong' : 'moderate'} investment potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Export Full Report
            </button>
            <button className="btn-secondary">
              Analyze Another Property
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}