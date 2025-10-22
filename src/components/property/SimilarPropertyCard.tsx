import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { MapPinIcon, HomeIcon } from '@heroicons/react/24/outline';

interface SimilarPropertyCardProps {
  property: any;
  className?: string;
}

export const SimilarPropertyCard: React.FC<SimilarPropertyCardProps> = ({
  property,
  className = '',
}) => {
  return (
    <Link href={`/properties/${property._id}`}>
      <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
        <div className="relative h-48">
          <Image
            src={property.images[0] || '/placeholder-property.jpg'}
            alt={property.propertyName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold truncate">{property.propertyName}</h3>
              {property.rating > 0 && (
                <div className="flex items-center bg-white/90 px-2 py-1 rounded-full">
                  <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{property.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center text-gray-600 mb-2">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <p className="text-sm truncate">
              {property.propertyType}, {property.bhkType}
            </p>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-gray-600">
              <HomeIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.size} sq.ft</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {property.furnishing}
            </span>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t">
            <div className="text-primary-600 font-semibold">
              ₹{property.minAmount?.toLocaleString() || 'Price on Request'}
              <span className="text-sm text-gray-500 font-normal">/month</span>
            </div>
            <div className="text-sm text-white bg-primary-600 px-3 py-1 rounded-full">
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};