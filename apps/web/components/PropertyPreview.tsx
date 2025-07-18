'use client'

import { motion } from 'framer-motion'
import { 
  ChartBarIcon, 
  HomeIcon, 
  CurrencyDollarIcon, 
  LockClosedIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

interface PropertyPreviewProps {
  basicInfo: any
  onPurchase: () => void
}

export default function PropertyPreview({ basicInfo, onPurchase }: PropertyPreviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Header with property info */}
      <div className="card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{basicInfo.address}</h2>
            <p className="text-gray-600">Investment Analysis Preview</p>
          </div>
          <div className="mt-4 md:mt-0 text-center">
            <div className="text-3xl font-bold text-primary-600 blur-sm">8.5/10</div>
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

      {/* Blurred Financial Preview */}
      <div className="card relative">
        <div className="flex items-center mb-6">
          <CurrencyDollarIcon className="w-6 h-6 text-primary-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Financial Analysis</h3>
          <LockClosedIcon className="w-5 h-5 text-gray-400 ml-2" />
        </div>
        
        <div className="blur-sm pointer-events-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success-600">$2,150</div>
              <p className="text-sm text-gray-600">Monthly Cash Flow</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">7.8%</div>
              <p className="text-sm text-gray-600">Cap Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">14.2%</div>
              <p className="text-sm text-gray-600">Cash-on-Cash Return</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">18.5%</div>
              <p className="text-sm text-gray-600">Total ROI</p>
            </div>
          </div>
        </div>

        {/* Unlock overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-center">
            <LockClosedIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Unlock Complete Financial Analysis
            </h4>
            <p className="text-gray-600 mb-4 max-w-md">
              Get detailed cash flow projections, ROI calculations, and investment metrics
            </p>
          </div>
        </div>
      </div>

      {/* Blurred AI Insights Preview */}
      <div className="card relative">
        <div className="flex items-center mb-6">
          <ChartBarIcon className="w-6 h-6 text-primary-600 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">AI Investment Analysis</h3>
          <LockClosedIcon className="w-5 h-5 text-gray-400 ml-2" />
        </div>
        
        <div className="blur-sm pointer-events-none">
          <div className="mb-6 p-4 bg-primary-50 rounded-lg">
            <p className="text-gray-900">
              This property presents an excellent investment opportunity with strong cash flow potential 
              and favorable market conditions in an appreciating neighborhood...
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Strengths</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">• Strong rental demand in area</li>
                <li className="text-sm text-gray-600">• Below market purchase price</li>
                <li className="text-sm text-gray-600">• Recent property improvements</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Risks</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">• Potential market volatility</li>
                <li className="text-sm text-gray-600">• Maintenance considerations</li>
                <li className="text-sm text-gray-600">• Local regulations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">• Conduct thorough inspection</li>
                <li className="text-sm text-gray-600">• Verify rental comps</li>
                <li className="text-sm text-gray-600">• Negotiate purchase price</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Unlock overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-center">
            <EyeIcon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Unlock Expert AI Analysis
            </h4>
            <p className="text-gray-600 mb-4 max-w-md">
              Get detailed investment insights, risk assessment, and actionable recommendations
            </p>
          </div>
        </div>
      </div>

      {/* Purchase CTA */}
      <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">
            Get Complete Property Analysis
          </h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Unlock detailed financial projections, AI-powered insights, market analysis, 
            and investment recommendations for just $5
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
            <div className="bg-primary-500 bg-opacity-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">✅ What You'll Get:</h4>
              <ul className="text-sm space-y-1">
                <li>• Complete financial analysis</li>
                <li>• AI investment insights</li>
                <li>• Risk assessment</li>
                <li>• Market comparables</li>
              </ul>
            </div>
            <div className="bg-primary-500 bg-opacity-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🎯 Perfect For:</h4>
              <ul className="text-sm space-y-1">
                <li>• Real estate investors</li>
                <li>• House flippers</li>
                <li>• Rental property buyers</li>
                <li>• Wholesalers</li>
              </ul>
            </div>
            <div className="bg-primary-500 bg-opacity-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">⚡ Instant Access:</h4>
              <ul className="text-sm space-y-1">
                <li>• 30-second purchase</li>
                <li>• No subscription required</li>
                <li>• Download PDF report</li>
                <li>• Money-back guarantee</li>
              </ul>
            </div>
          </div>

          <button 
            onClick={onPurchase}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors inline-flex items-center"
          >
            <LockClosedIcon className="w-5 h-5 mr-2" />
            Unlock Full Report - $5
          </button>
          
          <p className="text-primary-200 text-sm mt-4">
            Secure payment • Instant access • 30-day money-back guarantee
          </p>
        </div>
      </div>
    </motion.div>
  )
}