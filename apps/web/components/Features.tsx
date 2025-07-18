'use client'

import { motion } from 'framer-motion'
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  MapPinIcon, 
  ShieldCheckIcon,
  LightBulbIcon,
  ClockIcon 
} from '@heroicons/react/24/outline'

export default function Features() {
  const features = [
    {
      name: 'AI-Powered Deal Analysis',
      description: 'Claude 3 Haiku analyzes every property with investment strategy-specific insights, not just raw data.',
      icon: LightBulbIcon,
    },
    {
      name: 'ROI & Cash Flow Projections',
      description: 'Get detailed financial projections for flip, rental, BRRRR, and other investment strategies.',
      icon: ChartBarIcon,
    },
    {
      name: 'Instant Market Context',
      description: 'Understand local market conditions, comparable sales, and neighborhood trends in seconds.',
      icon: MapPinIcon,
    },
    {
      name: 'Risk Assessment',
      description: 'Identify potential red flags, market risks, and property condition factors before you invest.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Pay-As-You-Go Pricing',
      description: 'No subscription required. Pay just $5 per property analysis - perfect for casual investors.',
      icon: CurrencyDollarIcon,
    },
    {
      name: 'Lightning Fast Results',
      description: 'Get comprehensive property analysis in under 30 seconds. No waiting, no delays.',
      icon: ClockIcon,
    },
  ]

  return (
    <section id="features" className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-base font-semibold leading-7 text-primary-600"
          >
            Nationwide Coverage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            AI Insights That Actually Help You Invest
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Stop drowning in spreadsheets and raw data. Get actionable intelligence that tells you exactly why a property is a good deal and how to maximize your returns.
          </motion.p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* How it works section */}
        <div className="mt-24 sm:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              How It Works
            </h3>
            <p className="mt-4 text-lg text-gray-600">
              Get professional-grade analysis in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Enter Address',
                description: 'Type in any property address nationwide. Our system instantly pulls comprehensive data from multiple sources.',
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Claude 3 Haiku analyzes the property data, market conditions, and generates tailored investment insights.',
              },
              {
                step: '03',
                title: 'Get Results',
                description: 'Receive detailed analysis with ROI projections, risk factors, and actionable investment recommendations.',
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-lg font-bold text-lg mb-4">
                  {step.step}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
                
                {/* Connector line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-gray-200 -z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}