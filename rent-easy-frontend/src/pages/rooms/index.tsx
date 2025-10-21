import { useState } from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { FiFilter, FiHome, FiUser, FiDollarSign, FiMaximize } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { Room } from '@/types/property';
import { roomService } from '@/services/room.service';

// Animation variants
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

export default function RoomListingPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    minRent: '',
    maxRent: '',
    type: '',
    furnishing: '',
    availability: ''
  });

  const { data: rooms, isLoading, error } = useQuery<Room[]>(
    ['rooms', filters],
    () => roomService.getRooms(filters),
    {
      keepPreviousData: true
    }
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Head>
        <title>Available Rooms | RentEasy</title>
        <meta name="description" content="Browse available rooms for rent" />
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
                  Min Rent
                </label>
                <input
                  type="number"
                  name="minRent"
                  value={filters.minRent}
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
                  name="maxRent"
                  value={filters.maxRent}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-700"
                  placeholder="Max ₹"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Room Type
                </label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-700"
                >
                  <option value="">All Types</option>
                  <option value="SINGLE">Single Room</option>
                  <option value="DOUBLE">Double Room</option>
                  <option value="STUDIO">Studio</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Furnishing
                </label>
                <select
                  name="furnishing"
                  value={filters.furnishing}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-700"
                >
                  <option value="">Any</option>
                  <option value="FURNISHED">Furnished</option>
                  <option value="SEMI_FURNISHED">Semi-Furnished</option>
                  <option value="UNFURNISHED">Unfurnished</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Availability
                </label>
                <select
                  name="availability"
                  value={filters.availability}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-700"
                >
                  <option value="">All</option>
                  <option value="AVAILABLE">Available Now</option>
                  <option value="OCCUPIED">Occupied</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Rooms Grid */}
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
              Error loading rooms. Please try again later.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {rooms?.map((room) => (
              <motion.div
                key={room.id}
                variants={itemVariants}
                onClick={() => router.push(`/rooms/${room.id}`)}
                className="bg-white dark:bg-dark-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={room.images[0] || '/placeholder-room.jpg'}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        room.status === 'AVAILABLE'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {room.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FiHome className="mr-1" />
                      {room.type}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FiMaximize className="mr-1" />
                      {room.area} sq.ft
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FiUser className="mr-1" />
                      Max {room.maxOccupancy}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <span className="capitalize">
                        {room.furnishing.replace('_', ' ').toLowerCase()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-primary-600 dark:text-primary-400 font-semibold">
                      <FiDollarSign className="inline mr-1" />
                      ₹{room.rent.toLocaleString()}/month
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Deposit: ₹{room.securityDeposit.toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {rooms?.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="mb-4">
                  <FiHome className="w-12 h-12 mx-auto text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Rooms Found</h3>
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
}