'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { CheckIcon, StarIcon } from '@heroicons/react/24/outline'

interface PostPurchaseSubscriptionProps {
  propertyAddress: string
  dealScore: number
}

export default function PostPurchaseSubscription({ propertyAddress, dealScore }: PostPurchaseSubscriptionProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    
    try {
      // Submit waitlist signup
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: '',
          investmentType: 'Post-Purchase Subscriber',
          source: 'post-purchase',
          propertyAddress,
          dealScore
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast.success('Successfully joined the Pro waitlist!')
      } else {
        toast.error('Failed to join waitlist')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-success-500 to-success-600 rounded-xl p-6 text-white text-center"
      >
        <CheckIcon className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">You're In! 🎉</h3>
        <p className="text-success-100">
          Thanks for joining our Pro waitlist. You'll get early access and exclusive launch pricing!
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white"
    >
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <h3 className="text-2xl font-bold mb-2">
          Want Unlimited Reports?
        </h3>
        <p className="text-purple-100 mb-4">
          Join our Pro waitlist for unlimited searches, deal alerts, and advanced portfolio tracking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
          <h4 className="font-semibold mb-2">Unlimited Searches</h4>
          <p className="text-sm text-purple-100">
            Analyze any property nationwide without per-report fees
          </p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
          <h4 className="font-semibold mb-2">Deal Alerts</h4>
          <p className="text-sm text-purple-100">
            Get notified of high-scoring properties in your target areas
          </p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
          <h4 className="font-semibold mb-2">Portfolio Tools</h4>
          <p className="text-sm text-purple-100">
            Track performance, compare deals, and manage your investments
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for early access"
            required
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 rounded-lg border border-purple-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={isSubmitting || !email}
            className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Joining...' : 'Join Waitlist'}
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <p className="text-purple-200 text-sm">
          🎁 Waitlist members get <strong>50% off</strong> launch pricing + exclusive bonus features
        </p>
      </div>
    </motion.div>
  )
}