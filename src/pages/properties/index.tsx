import React, { useState } from 'react';
import PropertyCard from '@/components/shared/PropertyCard';
import { useQuery } from 'react-query';
import { propertyService } from '@/services/property.service';
import { Property } from '@/types/property';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiFilter, FiMapPin, FiDollarSign, FiHome } from 'react-icons/fi';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Properties = () => {
  const [filters, setFilters] = useState({
    city: '',
    propertyType: '',
    minAmount: '',
    maxAmount: '',
    bhkType: ''
  });

  const { data: response, isLoading, error } = useQuery(['properties', filters], 
    () => propertyService.searchProperties(filters)
  );

  const properties = response?.data || [];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Head>
        <title>Available Properties | RentEasy</title>
        <meta name="description" content="Browse available properties for rent" />
      </Head>

      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Filters Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-4">
            <div className="flex items-center gap-2 mb-4">
              <FiFilter className="text-primary-600" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City
                </label>
                <select
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-700"
                >
                  <option value="">All Cities</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-700"
                >
                  <option value="">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="house">House</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Min Rent
                </label>
                <input
                  type="number"
                  name="minAmount"
                  value={filters.minAmount}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-700"
                  placeholder="Min ₹"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Max Rent
                </label>
                <input
                  type="number"
                  name="maxAmount"
                  value={filters.maxAmount}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-700"
                  placeholder="Max ₹"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  BHK Type
                </label>
                <select
                  name="bhkType"
                  value={filters.bhkType}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-700"
                >
                  <option value="">All BHK Types</option>
                  <option value="1BHK">1 BHK</option>
                  <option value="2BHK">2 BHK</option>
                  <option value="3BHK">3 BHK</option>
                  <option value="4BHK">4 BHK</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-dark-800 rounded-lg shadow-md animate-pulse"
              >
                <div className="h-48 bg-gray-200 dark:bg-dark-700 rounded-t-lg" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">
              Error loading properties. Please try again later.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {properties.map((property: Property) => (
              <motion.div key={property.id} variants={itemVariants}>
                <PropertyCard property={property} />
              </motion.div>
            ))}

            {properties.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="mb-4">
                  <FiHome className="w-12 h-12 mx-auto text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Properties;