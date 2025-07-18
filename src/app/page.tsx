'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon, 
  ChartBarIcon, 
  MapIcon, 
  CpuChipIcon,
  BuildingOfficeIcon,
  TrendingUpIcon,
  SparklesIcon,
  ArrowRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'AI-Powered Deal Scoring',
    description: 'Claude 3 Haiku analyzes properties and provides comprehensive deal scores with detailed explanations.',
    icon: CpuChipIcon,
    color: 'bg-blue-500',
  },
  {
    name: 'Comprehensive Property Data',
    description: 'Access detailed property information, ownership data, and market analytics powered by Estated API.',
    icon: ChartBarIcon,
    color: 'bg-green-500',
  },
  {
    name: 'Interactive Map Search',
    description: 'Discover properties on an interactive map with advanced filtering and location-based insights.',
    icon: MapIcon,
    color: 'bg-purple-500',
  },
  {
    name: 'Investment Strategy Recommendations',
    description: 'Get personalized investment strategies including buy & hold, flip, BRRRR, and wholesale analysis.',
    icon: TrendingUpIcon,
    color: 'bg-orange-500',
  },
  {
    name: 'Real-Time Market Analysis',
    description: 'Stay updated with current market trends, comparable sales, and rental analysis.',
    icon: BuildingOfficeIcon,
    color: 'bg-indigo-500',
  },
  {
    name: 'Smart Deal Alerts',
    description: 'Set up automated alerts for properties matching your investment criteria and budget.',
    icon: SparklesIcon,
    color: 'bg-pink-500',
  },
]

const testimonials = [
  {
    content: "AlyProp's AI analysis helped me identify a property with 15% below market value. The deal score was spot on!",
    author: "Sarah M.",
    role: "Real Estate Investor",
    rating: 5,
  },
  {
    content: "The comprehensive data and AI insights save me hours of research. I've closed 3 deals this month using AlyProp.",
    author: "Mike R.",
    role: "Property Flipper",
    rating: 5,
  },
  {
    content: "Best investment tool I've used. The rental analysis feature is incredibly accurate for my market.",
    author: "Jennifer L.",
    role: "Buy & Hold Investor",
    rating: 5,
  },
]

export default function HomePage() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email subscription
    console.log('Subscribe:', email)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <BuildingOfficeIcon className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">AlyProp</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/properties" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Properties
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Pricing
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-indigo-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                >
                  <span className="block xl:inline">Find Profitable</span>{' '}
                  <span className="block gradient-text xl:inline">Real Estate Deals</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                >
                  Powered by AI and comprehensive property data, AlyProp helps investors identify undervalued properties 
                  with clear ROI potential. Get AI-generated deal scores, market analysis, and investment strategies.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                >
                  <div className="rounded-md shadow">
                    <Link
                      href="/properties"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                    >
                      Start Finding Deals
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/demo"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                    >
                      <PlayIcon className="mr-2 h-5 w-5" />
                      Watch Demo
                    </Link>
                  </div>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-br from-primary-400 to-indigo-600 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <div className="text-white text-center">
              <BuildingOfficeIcon className="h-24 w-24 mx-auto mb-4 opacity-80" />
              <p className="text-lg font-medium">AI-Powered Property Analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to find profitable deals
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Comprehensive tools and AI-powered insights to help you make smarter real estate investment decisions.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white" style={{ backgroundColor: feature.color.replace('bg-', '') }}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by investors nationwide
            </h2>
            <p className="mt-3 text-xl text-primary-200 sm:mt-4">
              Join thousands of successful real estate investors using AlyProp
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-primary-200">Properties Analyzed</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">50K+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-primary-200">Active Investors</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">2,500+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-primary-200">Deals Closed</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">1,200+</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">What investors are saying</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to find your next deal?</span>
            <span className="block text-primary-600">Start analyzing properties today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Get started for free
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/properties"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
              >
                Browse properties
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center">
                <BuildingOfficeIcon className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold text-white">AlyProp</span>
              </div>
              <p className="text-gray-300 text-base">
                AI-powered real estate deal finder helping investors discover profitable opportunities with comprehensive market data and intelligent analysis.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Platform</h3>
                  <ul className="mt-4 space-y-4">
                    <li><Link href="/properties" className="text-base text-gray-300 hover:text-white">Properties</Link></li>
                    <li><Link href="/analytics" className="text-base text-gray-300 hover:text-white">Analytics</Link></li>
                    <li><Link href="/watchlist" className="text-base text-gray-300 hover:text-white">Watchlist</Link></li>
                    <li><Link href="/alerts" className="text-base text-gray-300 hover:text-white">Deal Alerts</Link></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                  <ul className="mt-4 space-y-4">
                    <li><Link href="/help" className="text-base text-gray-300 hover:text-white">Help Center</Link></li>
                    <li><Link href="/docs" className="text-base text-gray-300 hover:text-white">API Docs</Link></li>
                    <li><Link href="/contact" className="text-base text-gray-300 hover:text-white">Contact</Link></li>
                    <li><Link href="/status" className="text-base text-gray-300 hover:text-white">Status</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2024 AlyProp. All rights reserved. Powered by Estated & Claude AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}