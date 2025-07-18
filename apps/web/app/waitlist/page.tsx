'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    investmentType: '',
    experience: '',
    interests: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const investmentTypes = [
    'Buy & Hold Rental',
    'Fix & Flip',
    'BRRRR Strategy',
    'Wholesale',
    'Real Estate Agent/Broker',
    'Other'
  ]

  const experienceLevels = [
    'Beginner (0-2 properties)',
    'Intermediate (3-10 properties)',
    'Advanced (10+ properties)',
    'Professional/Institutional'
  ]

  const interests = [
    'Unlimited property searches',
    'Real-time deal alerts',
    'Portfolio management tools',
    'Market analytics dashboard',
    'API access for automation',
    'Bulk export features',
    'Custom deal criteria',
    'Advanced AI insights'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleInterestChange = (interest: string) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest]
    
    setFormData({
      ...formData,
      interests: updatedInterests
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.name) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSubmitted(true)
      toast.success('🎉 Successfully joined the waitlist!')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card"
            >
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckIcon className="w-8 h-8 text-success-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to the PropertyAI Pro Waitlist!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thanks for joining! You'll be among the first to know when we launch our Pro subscription 
                with unlimited searches and advanced features.
              </p>
              
              <div className="bg-primary-50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-primary-900 mb-4">What happens next?</h2>
                <div className="space-y-3 text-left">
                  <div className="flex items-start">
                    <span className="text-primary-600 mr-3">1.</span>
                    <span className="text-primary-700">We'll send you updates on our launch progress</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primary-600 mr-3">2.</span>
                    <span className="text-primary-700">You'll get early access before the public launch</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primary-600 mr-3">3.</span>
                    <span className="text-primary-700">Exclusive launch discount for waitlist members</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/search" className="btn-primary">
                  Try $5 Property Analysis
                </a>
                <a href="/" className="btn-secondary">
                  Back to Homepage
                </a>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
              Join the Pro Waitlist
            </h1>
            <p className="text-lg text-gray-600">
              Be the first to access unlimited AI property analysis, deal alerts, and advanced portfolio tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Investment Type */}
              <div>
                <label htmlFor="investmentType" className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Investment Strategy
                </label>
                <select
                  id="investmentType"
                  name="investmentType"
                  value={formData.investmentType}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Select your strategy</option>
                  {investmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Select your experience level</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Feature Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Which Pro features interest you most? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {interests.map(interest => (
                    <div key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor={interest} className="ml-3 text-sm text-gray-700">
                        {interest}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3 inline-block"></div>
                      Joining Waitlist...
                    </>
                  ) : (
                    'Join Pro Waitlist'
                  )}
                </button>
              </div>

              {/* Benefits Reminder */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  Waitlist Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary-600 font-bold">1st</span>
                    </div>
                    <h4 className="font-medium text-gray-900">Early Access</h4>
                    <p className="text-sm text-gray-600">Get access before public launch</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary-600 font-bold">%</span>
                    </div>
                    <h4 className="font-medium text-gray-900">Launch Discount</h4>
                    <p className="text-sm text-gray-600">Exclusive pricing for early adopters</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary-600 font-bold">★</span>
                    </div>
                    <h4 className="font-medium text-gray-900">VIP Updates</h4>
                    <p className="text-sm text-gray-600">Behind-the-scenes development updates</p>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}