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
  MapPinIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'
import PostPurchaseSubscription from './PostPurchaseSubscription'
import { downloadPDF, shareReport } from '../utils/pdfGenerator'
import { toast } from 'react-hot-toast'

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

        {/* Enhanced AI Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Valuation Assessment */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Valuation Assessment</h4>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                aiInsights.valuationAssessment === 'undervalued' ? 'bg-success-100 text-success-800' :
                aiInsights.valuationAssessment === 'overvalued' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {aiInsights.valuationAssessment || 'Market Value'}
              </span>
            </div>
          </div>

          {/* Financing Likelihood */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Financing Options</h4>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                aiInsights.financingLikelihood === 'fha-eligible' ? 'bg-success-100 text-success-800' :
                aiInsights.financingLikelihood === 'cash-required' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {aiInsights.financingLikelihood || 'Conventional Only'}
              </span>
            </div>
          </div>
        </div>

        {/* Top Red Flag Alert */}
        {aiInsights.topRedFlag && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-red-900 mb-1">⚠️ Top Red Flag</h4>
                <p className="text-red-700 text-sm">{aiInsights.topRedFlag}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Strengths */}
          <div>
            <div className="flex items-center mb-3">
              <ShieldCheckIcon className="w-5 h-5 text-success-600 mr-2" />
              <h4 className="font-medium text-gray-900">Strengths</h4>
            </div>
            <ul className="space-y-2">
              {aiInsights.strengths?.map((strength: string, index: number) => (
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
              {aiInsights.risks?.map((risk: string, index: number) => (
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
              <h4 className="font-medium text-gray-900">Next Steps</h4>
            </div>
            <ul className="space-y-2">
              {aiInsights.recommendations?.map((rec: string, index: number) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Exit Strategy */}
        {aiInsights.exitStrategy && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">🎯 Recommended Exit Strategy</h4>
            <p className="text-blue-700 text-sm">{aiInsights.exitStrategy}</p>
          </div>
        )}
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

      {/* Cold Outreach Script */}
      {(propertyData.strategy === 'wholesale' || propertyData.strategy === 'flip') && (
        <div className="card">
          <div className="flex items-center mb-6">
            <CurrencyDollarIcon className="w-6 h-6 text-primary-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">📝 Suggested Owner Outreach</h3>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-3">AI-generated message template:</p>
            <div className="bg-white p-4 rounded border border-gray-200">
              <p className="text-gray-900 text-sm leading-relaxed">
                Hi, I'm a local real estate investor and I noticed your property at {propertyData.address}. 
                {aiInsights.dealScore >= 7 ? 
                  " I'm very interested in making a fair cash offer that could close quickly with no contingencies." :
                  " I work with investors who might be interested in purchasing your property for cash."
                }
                {propertyData.strategy === 'wholesale' ? 
                  " I can connect you with serious buyers who close fast. Would you be open to a quick conversation about your property goals?" :
                  " I buy properties in any condition and can close in as little as 2 weeks. Are you considering selling?"
                }
              </p>
            </div>
            <div className="mt-3 flex space-x-2">
              <button className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded hover:bg-primary-200">
                Copy Message
              </button>
              <button className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200">
                Generate Alternative
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="card bg-primary-50 border-primary-200">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-primary-900 mb-4">Ready to Take Action?</h3>
          <p className="text-primary-700 mb-6">
            Based on this analysis, this property shows {aiInsights.dealScore >= 7 ? 'strong' : 'moderate'} investment potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                downloadPDF(propertyData);
                toast.success('Report downloaded successfully!');
              }}
              className="btn-primary inline-flex items-center"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              📊 Export Full Report (PDF)
            </button>
            <button 
              onClick={() => {
                shareReport(propertyData);
              }}
              className="btn-secondary inline-flex items-center"
            >
              <ShareIcon className="w-5 h-5 mr-2" />
              Share Report
            </button>
            <button className="btn-secondary">
              📈 Buy Comps Report (+$5)
            </button>
            <button 
              onClick={() => window.location.href = '/search'}
              className="btn-secondary"
            >
              🔍 Analyze Another Property
            </button>
          </div>
        </div>
      </div>

      {/* Post-Purchase Subscription CTA */}
      <PostPurchaseSubscription 
        propertyAddress={propertyData.address}
        dealScore={aiInsights.dealScore}
      />
    </motion.div>
  )
}