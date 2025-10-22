import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import { Property } from '@/types/api';
import { propertyService } from '@/services/property.service';

const SearchProperties = () => {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    search: '',
    page: 1,
    limit: 10
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await propertyService.searchProperties(searchParams);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  const handleSearch = (params: {
    location: string;
    priceRange: string;
    propertyType: string;
  }) => {
    setSearchParams(prev => ({
      ...prev,
      location: params.location,
      propertyType: params.propertyType,
      priceRange: params.priceRange,
      page: 1
    }));
  };

  const handlePropertyClick = (propertyId: string) => {
    router.push(`/properties/${propertyId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Properties</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
          {properties.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No properties found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchProperties;