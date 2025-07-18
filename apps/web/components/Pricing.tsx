'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function Pricing() {
  const plans = [
    {
      name: 'Pay-As-You-Go',
      price: '$5',
      period: 'per search',
      description: 'Perfect for casual investors and trying our service',
      features: [
        'Full AI property analysis',
        'ROI calculations & projections',
        'Market context & comparables',
        'Risk assessment',
        'Investment strategy recommendations',
        'Instant results',
      ],
      cta: 'Try Now',
      href: '/search',
      popular: false,
    },
    {
      name: 'Pro Subscription',
      price: '$39.99',
      period: 'per month',
      description: 'For serious investors and professionals',
      features: [
        'Unlimited AI property searches',
        'Real-time deal alerts',
        'Portfolio management tools',
        'Advanced market analytics',
        'Export to Excel/CSV',
        'Priority support',
        'API access',
        'Custom deal criteria',
      ],
      cta: 'Join Waitlist',
      href: '/waitlist',
      popular: true,
      badge: 'Coming Soon',
    },
  ]

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-base font-semibold leading-7 text-primary-600"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            Start Free, Scale When Ready
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            No subscriptions required to get started. Pay only for what you use, 
            then upgrade to unlimited access when you're ready to scale.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`
                relative rounded-3xl p-8 ring-1 ring-gray-900/10 sm:mx-8 sm:p-10
                ${plan.popular 
                  ? 'bg-primary-600 text-white lg:z-10 lg:rounded-b-none' 
                  : 'bg-white text-gray-900 lg:rounded-r-none'
                }
              `}
            >
              {plan.badge && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32">
                  <div className="rounded-full bg-gradient-to-r from-orange-400 to-pink-400 px-4 py-1 text-sm font-medium text-white text-center">
                    {plan.badge}
                  </div>
                </div>
              )}
              
              <h3 className={`text-base font-semibold leading-7 ${plan.popular ? 'text-primary-200' : 'text-primary-600'}`}>
                {plan.name}
              </h3>
              <p className={`mt-4 flex items-baseline gap-x-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                <span className={`text-sm font-semibold leading-6 ${plan.popular ? 'text-primary-200' : 'text-gray-600'}`}>
                  {plan.period}
                </span>
              </p>
              <p className={`mt-6 text-base leading-7 ${plan.popular ? 'text-primary-200' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon 
                      className={`h-6 w-5 flex-none ${plan.popular ? 'text-primary-200' : 'text-primary-600'}`}
                      aria-hidden="true" 
                    />
                    <span className={plan.popular ? 'text-white' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Link
                href={plan.href}
                className={`
                  mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                  ${plan.popular
                    ? 'bg-white text-primary-600 hover:bg-primary-50 focus-visible:outline-white'
                    : 'bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline-primary-600'
                  }
                `}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Value proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center rounded-full bg-primary-50 px-6 py-3 text-sm font-medium text-primary-700">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Why choose pay-as-you-go? No risk, instant value, perfect for testing deals
          </div>
        </motion.div>
      </div>
    </section>
  )
}