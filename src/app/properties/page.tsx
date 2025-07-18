'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  MapIcon, 
  ViewColumnsIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import PropertyCard from '@/components/PropertyCard'
import { Property, PropertyFilters } from '@/types/property'
import { formatCurrency } from '@/utils/formatters'

// Mock data for development - replace with API calls
const mockProperties: Property[] = [
  {
    id: '1',
    address: {
      street: '123 Main St',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      county: 'Travis',
      fullAddress: '123 Main St, Austin, TX 78701'
    },
    coordinates: { latitude: 30.2672, longitude: -97.7431 },
    propertyDetails: {
      propertyType: 'single_family',
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 1850,
      yearBuilt: 1995,
      garage: true,
      pool: false,
      fireplace: true
    },
    marketData: {
      marketValue: 450000,
      listPrice: 425000,
      lastSalePrice: 380000,
      lastSaleDate: '2023-01-15',
      pricePerSqFt: 230,
      daysOnMarket: 12,
      propertyStatus: 'for_sale'
    },
    ownershipInfo: {
      ownerType: 'individual',
      absenteeOwner: true,
      yearPurchased: 2020,
      purchasePrice: 380000
    },
    financialData: {
      taxes: { annual: 8500, monthly: 708 }
    },
    comps: [],
    dealScore: {
      overall: 78,
      breakdown: {
        priceVsMarket: 18,
        rentalPotential: 20,
        location: 16,
        condition: 12,
        marketTrends: 12
      },
      explanation: 'Good deal with strong rental potential in growing market.',
      grade: 'B+',
      dealType: 'good'
    },
    aiAnalysis: {
      summary: 'This property presents a solid investment opportunity with below-market pricing and strong rental demand in Austin.',
      keyHighlights: ['Below market value', 'High rental demand area', 'Growing neighborhood'],
      riskFactors: ['Age of property', 'Potential maintenance needs'],
      investmentPotential: 'high',
      bestStrategy: [{
        type: 'buy_hold',
        name: 'Buy & Hold',
        description: 'Long-term rental investment',
        estimatedProfit: 45000,
        timeframe: '5 years',
        difficulty: 'easy',
        cashRequired: 85000
      }],
      comparableAnalysis: 'Property is priced 6% below comparable sales',
      marketTrends: 'Austin market showing 8% annual appreciation',
      recommendations: ['Consider immediate purchase', 'Estimate $200 monthly repairs'],
      confidence: 85,
      generatedAt: new Date().toISOString()
    },
    rentalData: {
      estimatedRent: { low: 2200, high: 2600, average: 2400 },
      rentComps: [],
      rentToValueRatio: 0.0064,
      capRate: 0.068,
      cashFlow: { monthly: 400, annual: 4800 },
      occupancyRate: 0.95
    },
    lastUpdated: new Date().toISOString()
  }
  // Add more mock properties as needed...
]

interface SearchFilters {
  search: string
  minPrice: string
  maxPrice: string
  propertyTypes: string[]
  minBedrooms: string
  maxBedrooms: string
  cities: string[]
  counties: string[]
  minDealScore: string
  strategies: string[]
  sortBy: string
  view: 'grid' | 'map'
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(mockProperties)
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties)
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  
  const [filters, setFilters] = useState<SearchFilters>({
    search: '',
    minPrice: '',
    maxPrice: '',
    propertyTypes: [],
    minBedrooms: '',
    maxBedrooms: '',
    cities: [],
    counties: [],
    minDealScore: '',
    strategies: [],
    sortBy: 'dealScore',
    view: 'grid'
  })

  // Filter properties based on current filters
  useEffect(() => {
    let filtered = [...properties]

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(property => 
        property.address.fullAddress.toLowerCase().includes(searchTerm) ||
        property.address.city.toLowerCase().includes(searchTerm) ||
        property.address.zipCode.includes(searchTerm)
      )
    }

    // Price filters
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice)
      filtered = filtered.filter(property => 
        (property.marketData.listPrice || property.marketData.marketValue) >= minPrice
      )
    }
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice)
      filtered = filtered.filter(property => 
        (property.marketData.listPrice || property.marketData.marketValue) <= maxPrice
      )
    }

    // Property type filter
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property => 
        filters.propertyTypes.includes(property.propertyDetails.propertyType)
      )
    }

    // Bedrooms filter
    if (filters.minBedrooms) {
      const minBedrooms = parseInt(filters.minBedrooms)
      filtered = filtered.filter(property => 
        property.propertyDetails.bedrooms && property.propertyDetails.bedrooms >= minBedrooms
      )
    }

    // Deal score filter
    if (filters.minDealScore) {
      const minScore = parseInt(filters.minDealScore)
      filtered = filtered.filter(property => 
        property.dealScore && property.dealScore.overall >= minScore
      )
    }

    // Sort properties
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'dealScore':
          return (b.dealScore?.overall || 0) - (a.dealScore?.overall || 0)
        case 'price':
          return (a.marketData.listPrice || a.marketData.marketValue) - 
                 (b.marketData.listPrice || b.marketData.marketValue)
        case 'priceDesc':
          return (b.marketData.listPrice || b.marketData.marketValue) - 
                 (a.marketData.listPrice || a.marketData.marketValue)
        default:
          return 0
      }
    })

    setFilteredProperties(filtered)
  }, [properties, filters])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId)
      } else {
        newFavorites.add(propertyId)
      }
      return newFavorites
    })
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      minPrice: '',
      maxPrice: '',
      propertyTypes: [],
      minBedrooms: '',
      maxBedrooms: '',
      cities: [],
      counties: [],
      minDealScore: '',
      strategies: [],
      sortBy: 'dealScore',
      view: filters.view
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
              <p className="text-gray-600">
                Found {filteredProperties.length} properties
                {filters.search && ` matching "${filters.search}"`}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleFilterChange('view', 'grid')}
                  className={`p-2 rounded-md ${
                    filters.view === 'grid' 
                      ? 'bg-white shadow-sm text-gray-900' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ViewColumnsIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleFilterChange('view', 'map')}
                  className={`p-2 rounded-md ${
                    filters.view === 'map' 
                      ? 'bg-white shadow-sm text-gray-900' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MapIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <FunnelIcon className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="w-80 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Location
                    </label>
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        placeholder="City, address, or ZIP code"
                        className="form-input pl-10"
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        placeholder="Min price"
                        className="form-input"
                      />
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        placeholder="Max price"
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <div className="space-y-2">
                      {['single_family', 'multi_family', 'condo', 'townhouse'].map(type => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.propertyTypes.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleFilterChange('propertyTypes', [...filters.propertyTypes, type])
                              } else {
                                handleFilterChange('propertyTypes', filters.propertyTypes.filter(t => t !== type))
                              }
                            }}
                            className="form-checkbox"
                          />
                          <span className="ml-2 text-sm text-gray-700 capitalize">
                            {type.replace('_', ' ')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms
                    </label>
                    <select
                      value={filters.minBedrooms}
                      onChange={(e) => handleFilterChange('minBedrooms', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>

                  {/* Deal Score */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Deal Score
                    </label>
                    <select
                      value={filters.minDealScore}
                      onChange={(e) => handleFilterChange('minDealScore', e.target.value)}
                      className="form-select"
                    >
                      <option value="">Any Score</option>
                      <option value="70">70+ (Good Deals)</option>
                      <option value="80">80+ (Great Deals)</option>
                      <option value="90">90+ (Excellent Deals)</option>
                    </select>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="form-select"
                    >
                      <option value="dealScore">Deal Score (High to Low)</option>
                      <option value="price">Price (Low to High)</option>
                      <option value="priceDesc">Price (High to Low)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            {filters.view === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onFavorite={handleFavorite}
                    isFavorited={favorites.has(property.id)}
                  />
                ))}
              </div>
            ) : (
              /* Map View */
              <div className="bg-white rounded-lg shadow-sm h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Map View</h3>
                  <p className="text-gray-500">Interactive map coming soon</p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}