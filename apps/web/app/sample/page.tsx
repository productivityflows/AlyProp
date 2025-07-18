'use client'

import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { motion } from 'framer-motion'

const sampleReports = [
  {
    id: '3bed-queens-flip-potential',
    title: '3-Bedroom Queens Property - Fix & Flip Analysis',
    address: '123 Oak Street, Queens, NY 11375',
    strategy: 'Fix & Flip',
    dealScore: 8.2,
    price: '$485,000',
    estimatedProfit: '$75,000',
    description: 'Strong flip potential in appreciating Queens neighborhood with recent comparable sales showing excellent ARV.'
  },
  {
    id: 'absentee-owner-brooklyn',
    title: 'Absentee Owner Property - Brooklyn Investment',
    address: '456 Pine Avenue, Brooklyn, NY 11234',
    strategy: 'Wholesale',
    dealScore: 7.8,
    price: '$625,000',
    estimatedProfit: '$45,000',
    description: 'Motivated seller opportunity with strong investor interest in emerging Brooklyn area.'
  },
  {
    id: 'rental-cashflow-manhattan',
    title: 'Manhattan Rental - Cash Flow Analysis',
    address: '789 Broadway, Manhattan, NY 10003',
    strategy: 'Buy & Hold Rental',
    dealScore: 9.1,
    price: '$850,000',
    estimatedProfit: '$2,100/month',
    description: 'Premium Manhattan location with strong rental demand and excellent cash flow potential.'
  },
  {
    id: 'brrrr-strategy-bronx',
    title: 'BRRRR Strategy - Bronx Opportunity',
    address: '321 Grand Concourse, Bronx, NY 10451',
    strategy: 'BRRRR',
    dealScore: 8.5,
    price: '$320,000',
    estimatedProfit: 'Infinite ROI',
    description: 'Perfect BRRRR candidate with forced appreciation potential and strong rental market.'
  }
]

export default function SampleReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Sample Property Analysis Reports
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              See real examples of our AI-powered property investment analysis in action
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sampleReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {report.strategy}
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">{report.dealScore}/10</div>
                      <p className="text-xs text-gray-500">AI Score</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {report.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3">{report.address}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600">List Price</p>
                      <p className="text-lg font-semibold text-gray-900">{report.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Est. Profit</p>
                      <p className="text-lg font-semibold text-success-600">{report.estimatedProfit}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6">
                    {report.description}
                  </p>
                  
                  <Link
                    href={`/sample/${report.id}`}
                    className="w-full btn-primary text-center block"
                  >
                    View Full Analysis
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get Your Own Property Analysis
              </h2>
              <p className="text-gray-600 mb-6">
                See how your property stacks up with our AI-powered investment analysis
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/search" className="btn-primary">
                  Analyze Any Property - $5
                </Link>
                <Link href="/waitlist" className="btn-secondary">
                  Join Pro Waitlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}