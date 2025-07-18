'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Property } from '@/types/property'
import { 
  formatCurrency, 
  formatSquareFootage, 
  formatBedsBaths, 
  formatDealGrade,
  formatDealType,
  formatPropertyType,
  formatTimeAgo,
  formatAddress
} from '@/utils/formatters'
import { 
  HeartIcon, 
  MapPinIcon, 
  BuildingOfficeIcon,
  ClockIcon,
  ChartBarIcon,
  SparklesIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface PropertyCardProps {
  property: Property
  onFavorite?: (propertyId: string) => void
  isFavorited?: boolean
  showAIInsights?: boolean
}

export default function PropertyCard({ 
  property, 
  onFavorite, 
  isFavorited = false,
  showAIInsights = true 
}: PropertyCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onFavorite?.(property.id)
  }

  const getDealScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    if (score >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getPropertyImage = () => {
    if (property.images && property.images.length > 0 && !imageError) {
      return property.images[0]
    }
    return `https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop&auto=format`
  }

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 ${
        isHovered ? 'shadow-xl transform -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Property Image */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={getPropertyImage()}
          alt={formatAddress(property.address)}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
        
        {/* Deal Score Badge */}
        {property.dealScore && (
          <div className="absolute top-3 left-3">
            <div className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getDealScoreColor(property.dealScore.overall)}`}>
              {property.dealScore.overall}/100
            </div>
          </div>
        )}

        {/* Deal Grade Badge */}
        {property.dealScore && (
          <div className="absolute top-3 right-3">
            <div className={`px-2 py-1 rounded text-white text-xs font-bold bg-gray-800 bg-opacity-80`}>
              Grade {property.dealScore.grade}
            </div>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute bottom-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
        >
          {isFavorited ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Property Details */}
      <div className="p-5">
        {/* Address and Price */}
        <div className="mb-3">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
              {formatAddress(property.address)}
            </h3>
            <div className="text-right ml-2">
              <div className="text-xl font-bold text-gray-900">
                {formatCurrency(property.marketData.listPrice || property.marketData.marketValue)}
              </div>
              {property.marketData.pricePerSqFt && (
                <div className="text-sm text-gray-500">
                  ${property.marketData.pricePerSqFt}/sq ft
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Property Info */}
        <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-4 w-4 mr-1" />
            {formatPropertyType(property.propertyDetails.propertyType)}
          </div>
          {(property.propertyDetails.bedrooms || property.propertyDetails.bathrooms) && (
            <div>
              {formatBedsBaths(property.propertyDetails.bedrooms, property.propertyDetails.bathrooms)}
            </div>
          )}
          {property.propertyDetails.squareFootage && (
            <div>
              {formatSquareFootage(property.propertyDetails.squareFootage)}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPinIcon className="h-4 w-4 mr-1" />
          {property.address.city}, {property.address.state}
        </div>

        {/* Deal Type */}
        {property.dealScore && (
          <div className="mb-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              property.dealScore.dealType === 'excellent' ? 'bg-green-100 text-green-800' :
              property.dealScore.dealType === 'good' ? 'bg-blue-100 text-blue-800' :
              property.dealScore.dealType === 'fair' ? 'bg-yellow-100 text-yellow-800' :
              property.dealScore.dealType === 'poor' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {formatDealType(property.dealScore.dealType).text}
            </span>
          </div>
        )}

        {/* AI Insights Preview */}
        {showAIInsights && property.aiAnalysis && (
          <div className="mb-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-2">
              <SparklesIcon className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-sm font-medium text-blue-900">AI Insight</span>
            </div>
            <p className="text-xs text-blue-800 line-clamp-2">
              {property.aiAnalysis.summary}
            </p>
          </div>
        )}

        {/* Key Metrics */}
        {property.rentalData && (
          <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-gray-500">Est. Rent</div>
              <div className="font-semibold">
                {formatCurrency(property.rentalData.estimatedRent.average)}/mo
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-gray-500">Cap Rate</div>
              <div className="font-semibold">
                {(property.rentalData.capRate * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        )}

        {/* Investment Strategies */}
        {property.aiAnalysis?.bestStrategy && property.aiAnalysis.bestStrategy.length > 0 && (
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">Best For:</div>
            <div className="flex flex-wrap gap-1">
              {property.aiAnalysis.bestStrategy.slice(0, 2).map((strategy, index) => (
                <span 
                  key={index}
                  className={`px-2 py-1 text-xs rounded-full border strategy-${strategy.type}`}
                >
                  {strategy.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Last Updated */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center">
            <ClockIcon className="h-3 w-3 mr-1" />
            Updated {formatTimeAgo(property.lastUpdated)}
          </div>
          
          <Link
            href={`/properties/${property.id}`}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <EyeIcon className="h-3 w-3 mr-1" />
            View Details
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 pb-4">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/properties/${property.id}`}
            className="btn-primary text-center text-sm py-2"
          >
            Analyze Deal
          </Link>
          <button
            onClick={handleFavorite}
            className={`btn-secondary text-sm py-2 ${
              isFavorited ? 'bg-red-50 text-red-700 border-red-200' : ''
            }`}
          >
            {isFavorited ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}