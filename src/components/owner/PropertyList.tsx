import React from 'react';
import { useQuery } from 'react-query';
import { propertyService } from '../../services/property.service';
import type { Property } from '../../types/api';
import PropertyCard from '../shared/PropertyCard';
import { FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/router';

interface PropertyListProps {
  ownerId: string;
}

export default function PropertyList({ ownerId }: PropertyListProps) {
  const router = useRouter();
  const { data, isLoading } = useQuery(
    ['ownerProperties', ownerId],
    () => propertyService.getOwnerProperties(ownerId)
  );
  
  const properties = data?.data;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse bg-white rounded-lg h-96 shadow" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Properties</h2>
        <button
          onClick={() => router.push('/property/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Add Property
        </button>
      </div>

      {properties?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">No Properties Listed</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first property</p>
          <button
            onClick={() => router.push('/property/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors mx-auto"
          >
            <FiPlus className="w-5 h-5" />
            Add Your First Property
          </button>
        </div>
      )}
    </div>
  );
}