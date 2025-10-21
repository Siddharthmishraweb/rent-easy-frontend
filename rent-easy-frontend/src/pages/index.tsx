import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import PropertyCard from '../components/shared/PropertyCard';
import SearchBar from '@/components/shared/SearchBar';
import RegisterBanner from '@/components/shared/RegisterBanner';
import { propertyService } from '../services/property.service';
import { Property, PaginatedResponse, PropertySearchParams } from '../types/api';
import { FiHome, FiMapPin, FiStar, FiUserCheck } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

type SearchParams = Omit<PropertySearchParams, 'page' | 'limit'>;

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const { data: properties, isLoading, error } = useQuery(
    ['properties', searchParams],
    () => propertyService.searchProperties({
      ...searchParams,
      page: 1,
      limit: 10
    }),
    {
      onError: () => {
        toast.error('Failed to load properties');
      }
    }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>RentEasy - Find Your Perfect Rental</title>
        <meta name="description" content="Find your perfect rental property with RentEasy. Browse apartments, houses, and rooms with verified listings and secure payments." />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 h-[600px] overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 bg-grid bg-grid-pattern opacity-[0.05]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute w-48 h-48 bg-primary-400/20 rounded-full blur-3xl animate-float top-1/4 left-1/4" />
          <div className="absolute w-72 h-72 bg-secondary-400/20 rounded-full blur-3xl animate-float-delayed top-1/2 right-1/4" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Find Your Perfect Home
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-12 max-w-2xl text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Discover thousands of rental properties with verified listings, secure payments, and hassle-free rental agreements.
          </motion.p>
          <motion.div 
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="glass dark:glass-dark backdrop-blur-xl p-6 rounded-2xl">
              <SearchBar onSearch={setSearchParams} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-dark-900 dark:to-dark-800">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 font-display gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why Choose RentEasy?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="glass dark:glass-dark p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full" />
                  <FiHome className="w-12 h-12 text-primary-500 relative z-10" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Verified Listings</h3>
              <p className="text-gray-600 dark:text-gray-300">All properties are verified by our team for your peace of mind.</p>
            </motion.div>

            <motion.div 
              className="glass dark:glass-dark p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full" />
                  <FiMapPin className="w-12 h-12 text-primary-500 relative z-10" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Prime Locations</h3>
              <p className="text-gray-600 dark:text-gray-300">Find properties in the most sought-after neighborhoods.</p>
            </motion.div>

            <motion.div 
              className="glass dark:glass-dark p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full" />
                  <FiStar className="w-12 h-12 text-primary-500 relative z-10" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Quality Assured</h3>
              <p className="text-gray-600 dark:text-gray-300">Every property meets our high standards of quality.</p>
            </motion.div>

            <motion.div 
              className="glass dark:glass-dark p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full" />
                  <FiUserCheck className="w-12 h-12 text-primary-500 relative z-10" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Secure Payments</h3>
              <p className="text-gray-600 dark:text-gray-300">Safe and secure rent payments through our platform.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Property Listings */}
      <main className="container mx-auto px-4 py-16">
        <motion.h2 
          className="text-4xl font-bold mb-12 font-display gradient-text text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Featured Properties
        </motion.h2>
        
        {error ? (
          <motion.div 
            className="text-center p-8 glass dark:glass-dark rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-red-500 dark:text-red-400 text-lg">
              Failed to load properties. Please try again later.
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [...Array(6)].map((_, index) => (
                <motion.div 
                  key={index} 
                  className="glass dark:glass-dark rounded-xl h-96"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="animate-pulse">
                    <div className="h-48 bg-gray-200 dark:bg-dark-700 rounded-t-xl" />
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-3/4 mb-4" />
                      <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/2 mb-4" />
                      <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-2/3" />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : properties?.data?.length ? (
              properties.data.map((property: Property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-full text-center p-8 glass dark:glass-dark rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-gray-500 dark:text-gray-400 text-lg">
                  No properties found matching your criteria
                </div>
              </motion.div>
            )}
          </div>
        )}
      </main>

      {/* CTA Section */}
      {!isAuthenticated && <RegisterBanner />}
    </div>
  );
}
