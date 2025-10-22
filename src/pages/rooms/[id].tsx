import React from 'react';
import { motion } from 'framer-motion';
import { useRoom } from '@/hooks/useRoom';
import Button from '@/components/shared/Button';
import { Card, CardBody } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ImageCarousel } from '@/components/shared/ImageCarousel';
import { PropertyFeatures } from '@/components/property/PropertyFeatures';
import { BookingForm } from '@/components/room/BookingForm';

const RoomDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { room, loading: isLoading, error } = useRoom(id as string);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600">
          Error loading room details. Please try again.
        </div>
      ) : room ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Room Images and Details */}
            <div className="lg:col-span-2">
              <ImageCarousel images={room.images} />
              
              <Card className="mt-6">
                <CardBody>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-3xl font-semibold mb-2">{room.name}</h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        {room.description}
                      </p>
                    </div>
                    <Badge color="green" size="lg">
                      ₹{room.rent.toLocaleString()}/month
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Room Type</div>
                      <div className="font-semibold">{room.roomType}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Floor Area</div>
                      <div className="font-semibold">{room.area} sq.ft</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Furnishing</div>
                      <div className="font-semibold">{room.furnishing}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Max Occupancy</div>
                      <div className="font-semibold">{room.maxOccupancy} persons</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Security Deposit</div>
                      <div className="font-semibold">₹{room.securityDeposit.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Availability</div>
                      <div className="font-semibold">
                        <Badge color={room.isAvailable ? 'green' : 'red'}>
                          {room.isAvailable ? 'Available' : 'Occupied'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Amenities */}
              <Card className="mt-6">
                <CardBody>
                  <h2 className="text-2xl font-semibold mb-4">Room Features</h2>
                  <PropertyFeatures features={room.features} />
                </CardBody>
              </Card>

              {/* Rules and Policies */}
              <Card className="mt-6">
                <CardBody>
                  <h2 className="text-2xl font-semibold mb-4">Rules & Policies</h2>
                  <ul className="space-y-2">
                    {room.amenities?.map((amenity: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{amenity}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <BookingForm room={room} />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Room Not Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The room you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push('/properties')}>
            Browse Properties
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoomDetailPage;