import { useState } from 'react';
import { FiSearch, FiMapPin, FiHome, FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';

import { PropertySearchParams } from '@/types/api';

interface SearchBarProps {
  onSearch: (params: Omit<PropertySearchParams, 'page' | 'limit'>) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValues, setSearchValues] = useState<Omit<PropertySearchParams, 'page' | 'limit'>>({
    city: '',
    propertyType: '',
    minAmount: undefined,
    maxAmount: undefined,
    features: []
  });

  const [isFocused, setIsFocused] = useState({
    city: false,
    price: false,
    propertyType: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setSearchValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
      
      <form onSubmit={handleSubmit} className="relative bg-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* City Input */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            className={`relative transition-all duration-300 ${
              isFocused.city ? 'shadow-lg shadow-blue-500/20' : ''
            }`}
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <FiMapPin className={`h-5 w-5 transition-colors duration-300 ${
                isFocused.city ? 'text-blue-500' : 'text-gray-400'
              }`} />
            </div>
            <input
              type="text"
              name="city"
              placeholder="Enter city..."
              value={searchValues.city}
              onChange={handleChange}
              onFocus={() => setIsFocused(prev => ({ ...prev, city: true }))}
              onBlur={() => setIsFocused(prev => ({ ...prev, city: false }))}
              className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
            />
          </motion.div>
          
          {/* Price Range */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            className={`relative transition-all duration-300 ${
              isFocused.price ? 'shadow-lg shadow-blue-500/20' : ''
            }`}
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <FiDollarSign className={`h-5 w-5 transition-colors duration-300 ${
                isFocused.price ? 'text-blue-500' : 'text-gray-400'
              }`} />
            </div>
            <select
              name="priceRange"
              onChange={(e) => {
                const [min, max] = e.target.value.split('-').map(Number);
                setSearchValues(prev => ({
                  ...prev,
                  minAmount: min,
                  maxAmount: max || undefined
                }));
              }}
              onFocus={() => setIsFocused(prev => ({ ...prev, price: true }))}
              onBlur={() => setIsFocused(prev => ({ ...prev, price: false }))}
              className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 appearance-none"
            >
              <option value="">Price Range</option>
              <option value="0-5000">₹0 - ₹5,000</option>
              <option value="5000-10000">₹5,000 - ₹10,000</option>
              <option value="10000-20000">₹10,000 - ₹20,000</option>
              <option value="20000-50000">₹20,000 - ₹50,000</option>
              <option value="50000-999999">₹50,000+</option>
            </select>
          </motion.div>
          
          {/* Property Type */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            className={`relative transition-all duration-300 ${
              isFocused.propertyType ? 'shadow-lg shadow-blue-500/20' : ''
            }`}
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <FiHome className={`h-5 w-5 transition-colors duration-300 ${
                isFocused.propertyType ? 'text-blue-500' : 'text-gray-400'
              }`} />
            </div>
            <select
              name="propertyType"
              value={searchValues.propertyType}
              onChange={handleChange}
              onFocus={() => setIsFocused(prev => ({ ...prev, propertyType: true }))}
              onBlur={() => setIsFocused(prev => ({ ...prev, propertyType: false }))}
              className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 appearance-none"
            >
              <option value="">Property Type</option>
              <option value="FLAT">Flat</option>
              <option value="INDEPENDENT_HOUSE">Independent House</option>
              <option value="VILLA">Villa</option>
              <option value="BUILDER_FLOOR">Builder Floor</option>
            </select>
          </motion.div>
        </div>
        
        {/* Search Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300"
          >
            <FiSearch className="w-5 h-5 mr-2" />
            Search Properties
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
}