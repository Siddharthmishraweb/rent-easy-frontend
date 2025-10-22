import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, HomeIcon } from '@heroicons/react/24/outline';
import { similarPropertiesService } from '@/services/similarProperties.service';
import { SimilarPropertyCard } from '@/components/property/SimilarPropertyCard';

interface SimilarPropertiesProps {
  propertyId: string;
  className?: string;
}

export const SimilarProperties: React.FC<SimilarPropertiesProps> = ({
  propertyId,
  className = '',
}) => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        console.log('Fetching similar properties for:', propertyId);
        setLoading(true);
        const response = await similarPropertiesService.getSimilarProperties(propertyId);
        console.log('Similar properties response:', response);
        setProperties(response.data.items || []);
      } catch (err) {
        setError('Failed to fetch similar properties');
        console.error('Error fetching similar properties:', err);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchSimilarProperties();
    } else {
      console.log('No propertyId provided to SimilarProperties component');
    }
  }, [propertyId]);

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h2 className="text-2xl font-semibold">Similar Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-lg h-[300px]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  if (!properties.length) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Similar Properties</h2>
        <Link
          href="/properties"
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          View All Properties
        </Link>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <SimilarPropertyCard property={property} />
            </motion.div>
          ))}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-white/20 dark:to-gray-900/20" />
      </div>
    </div>
  );
};