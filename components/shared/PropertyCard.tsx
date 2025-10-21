import { Property } from '../../types/api';
import { formatCurrency } from '@/utils/lib';
import { FiMapPin, FiHome, FiDroplet, FiMaximize2 } from 'react-icons/fi';
import { useRouter } from 'next/router';

interface PropertyCardProps {
  property: Property;
  onClick?: () => void;
  showActions?: boolean;
}

export default function PropertyCard({ property, onClick, showActions = true }: PropertyCardProps) {
  const router = useRouter();
  return (
    <div 
      className="bg-white dark:bg-dark-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-dark-700 hover:shadow-md transition-all duration-200"
      onClick={onClick}
    >
      <div className="relative aspect-video">
        <img 
          src={property.images[0] || '/images/placeholder.jpg'} 
          alt={property.propertyName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-white dark:bg-dark-800 text-primary-600 dark:text-primary-400">
          {property.available ? 'Available' : 'Not Available'}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {property.propertyName}
        </h3>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
          <FiMapPin className="mr-1" />
          <span className="line-clamp-1">
            {property.location.address}, {property.location.city}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
          <div className="flex space-x-4">
            <span className="flex items-center">
              <FiHome className="mr-1" /> {property.bhkType}
            </span>
            <span className="flex items-center">
              <FiMaximize2 className="mr-1" /> {property.size} sq.ft
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{formatCurrency(property.minAmount || 0)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
          </div>
          
          {showActions && (
            <button 
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/properties/${property.uniquePropertyCode}`);
              }}
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}