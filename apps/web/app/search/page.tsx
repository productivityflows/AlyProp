'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '../../components/Header'
import PropertySearch from '../../components/PropertySearch'
import PropertyResults from '../../components/PropertyResults'
import Footer from '../../components/Footer'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialAddress = searchParams.get('address') || ''
  
  const [propertyData, setPropertyData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              AI Property Analysis
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Get comprehensive investment insights for any property nationwide
            </p>
          </div>

          <PropertySearch 
            initialAddress={initialAddress}
            onPropertyData={setPropertyData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />

          {propertyData && (
            <PropertyResults 
              propertyData={propertyData}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}