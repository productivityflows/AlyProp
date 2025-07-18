'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MagnifyingGlassIcon, SparklesIcon, TrendingUpIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  const [address, setAddress] = useState('')

  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full px-6 py-2 text-sm font-medium bg-primary-100 text-primary-700 mb-8"
          >
            <SparklesIcon className="w-4 h-4 mr-2" />
            AI-Powered Real Estate Intelligence
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl"
          >
            Get Deep AI Insights on{' '}
            <span className="text-primary-600">Any Property</span>{' '}
            Nationwide
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto"
          >
            Stop guessing with raw data. Get AI-powered deal analysis, ROI calculations, 
            market context, and investment strategies tailored to your goals. Just $5 per search.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
          >
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter property address (e.g., 123 Main St, Anytown, USA)"
                className="w-full pl-10 pr-4 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <Link
              href={`/search?address=${encodeURIComponent(address)}`}
              className="btn-primary text-base px-8 py-4 whitespace-nowrap"
            >
              Analyze Property - $5
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500"
          >
            <div className="flex items-center">
              <TrendingUpIcon className="w-4 h-4 mr-2 text-success-500" />
              Nationwide Coverage
            </div>
            <div className="flex items-center">
              <SparklesIcon className="w-4 h-4 mr-2 text-primary-500" />
              AI-Powered Analysis
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2 text-green-500">💳</span>
              Pay-As-You-Go
            </div>
          </motion.div>

          {/* Example results preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="card text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Deal Analysis</h3>
              <p className="text-sm text-gray-600">ROI projections, cash flow analysis, and investment strategy recommendations</p>
            </div>
            <div className="card text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Market Context</h3>
              <p className="text-sm text-gray-600">Local comparables, price trends, and neighborhood insights</p>
            </div>
            <div className="card text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Risk Assessment</h3>
              <p className="text-sm text-gray-600">Property condition factors, market risks, and exit strategies</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}