'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Real Estate Investor',
      location: 'Austin, TX',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b641?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: 'PropertyAI Pro helped me identify a duplex that I missed in my initial analysis. The AI caught rental income potential I overlooked and predicted a 15% higher ROI. Worth every penny of the $5!',
      rating: 5,
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Fix & Flip Investor',
      location: 'Phoenix, AZ',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: 'The risk assessment feature saved me from a costly mistake. The AI identified foundation issues and market saturation that I completely missed. This tool pays for itself with just one avoided bad deal.',
      rating: 5,
    },
    {
      name: 'Jennifer Wu',
      role: 'BRRRR Investor',
      location: 'Denver, CO',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content: 'I analyze 20+ properties per week. PropertyAI Pro gives me instant insights that would take hours to research manually. The BRRRR analysis is spot-on and helps me move fast in competitive markets.',
      rating: 5,
    },
  ]

  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-lg font-semibold leading-8 tracking-tight text-primary-600"
          >
            Investor Success Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Real Results from Real Investors
          </motion.p>
        </div>
        
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="pt-8 sm:inline-block sm:w-full sm:px-4"
              >
                <figure className="rounded-2xl bg-white p-8 text-sm leading-6 shadow-lg">
                  <blockquote className="text-gray-900">
                    <p>"{testimonial.content}"</p>
                  </blockquote>
                  
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img 
                      className="h-10 w-10 rounded-full bg-gray-50" 
                      src={testimonial.image} 
                      alt={testimonial.name}
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.role}</div>
                      <div className="text-gray-500 text-xs">{testimonial.location}</div>
                    </div>
                  </figcaption>
                  
                  <div className="mt-4 flex gap-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                </figure>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center"
        >
          {[
            { label: 'Properties Analyzed', value: '50,000+' },
            { label: 'Average ROI Increase', value: '23%' },
            { label: 'Bad Deals Avoided', value: '1,200+' },
            { label: 'Customer Satisfaction', value: '98%' },
          ].map((stat, index) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-primary-600 sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}