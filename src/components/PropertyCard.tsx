import Image from 'next/image';
import Link from 'next/link';
import { FiHome, FiStar, FiMapPin, FiMaximize2, FiDollarSign } from 'react-icons/fi';
import { Property } from '../types/api';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/property/${property.id}`}>
        <div className="group relative glass dark:glass-dark rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20 property-card border border-gray-200/50 dark:border-dark-700/50">
          {/* Image Container with Gradient Overlay */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={property.images[0]}
              alt={property.title}
              layout="fill"
              objectFit="cover"
              className="transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 transform"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-colors duration-300" />
            
            {/* Property Type Badge */}
            <motion.div 
              className="absolute top-4 left-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                {property.type}
              </span>
            </motion.div>

            {/* Status Badge */}
            {property.status !== 'AVAILABLE' && (
              <motion.div 
                className="absolute top-4 right-4"
                whileHover={{ scale: 1.05 }}
              >
                <span className="bg-gradient-to-r from-red-600 to-red-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  {property.status}
                </span>
              </motion.div>
            )}
          </div>
          
          {/* Content Container */}
          <div className="p-6 backdrop-blur-md">
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {property.propertyName}
            </h3>

            {/* Location */}
            <p className="text-gray-600 mb-4 flex items-center gap-2">
              <FiMapPin className="text-blue-500" />
              <span className="font-medium">
                {property.uniquePropertyCode}
              </span>
            </p>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center bg-yellow-400/10 px-3 py-1 rounded-full">
                <FiStar className="h-4 w-4 text-yellow-500" />
                <span className="ml-1 text-gray-700 font-medium">{property.rating?.toFixed(1) || 'No rating'}</span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <motion.div 
                className="flex items-center gap-2 bg-gray-50 dark:bg-dark-800/50 p-2 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <FiHome className="text-primary-500" />
                <span className="text-gray-700 dark:text-gray-300">{property.propertyType}</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 bg-gray-50 dark:bg-dark-800/50 p-2 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <FiMaximize2 className="text-primary-500" />
                <span className="text-gray-700 dark:text-gray-300">{property.size} sq ft</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 bg-gray-50 dark:bg-dark-800/50 p-2 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <FiDollarSign className="text-primary-500" />
                <span className="text-gray-700 dark:text-gray-300">₹{property.minAmount?.toLocaleString() || 'Contact'}/mo</span>
              </motion.div>
            </div>
            
            {/* Price Range */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200/50 dark:border-dark-700/50">
              <motion.div 
                className="flex flex-col"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-2xl font-bold gradient-text">
                  ₹{property.minAmount?.toLocaleString() || 'Contact'} 
                  {property.maxAmount && property.maxAmount !== property.minAmount && ` - ₹${property.maxAmount?.toLocaleString()}`}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">per month</span>
              </motion.div>
              <motion.div 
                className="text-sm bg-gray-50 dark:bg-dark-800/50 p-2 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-gray-500 dark:text-gray-400">BHK: </span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">{property.bhkType}</span>
              </motion.div>
            </div>

            {/* Features */}
            <div className="mt-4 flex flex-wrap gap-2">
              {property.features.slice(0, 3).map((feature, index) => (
                <motion.span
                  key={index}
                  className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium border border-primary-100 dark:border-primary-800"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {feature}
                </motion.span>
              ))}
              {property.features.length > 3 && (
                <motion.span
                  className="bg-gray-50 dark:bg-dark-800/50 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-sm font-medium border border-gray-100 dark:border-dark-700"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  +{property.features.length - 3} more
                </motion.span>
              )}
            </div>
            
            {/* Interactive overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 to-secondary-500/0 mix-blend-overlay group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-500 rounded-2xl pointer-events-none" />
          </div>

          {/* Hover Effect Gradient Border */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/0 via-blue-400/0 to-purple-500/0 group-hover:from-blue-600/20 group-hover:via-blue-400/20 group-hover:to-purple-500/20 rounded-2xl transition-all duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}
