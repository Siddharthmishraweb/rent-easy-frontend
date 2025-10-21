import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { propertyService } from '@/services/property.service';
import { useAuth } from '@/contexts/AuthContext';
import Head from 'next/head';
import Image from 'next/image';
import { PropertyResponse } from '@/types/property';
import { FiMapPin, FiHome, FiUser, FiDollarSign, FiShield, FiStar, FiPhone, FiMail } from 'react-icons/fi';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function PropertyDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: response, isLoading, error } = useQuery(
    ['property', id],
    () => propertyService.getPropertyById(id as string),
    {
      enabled: !!id,
      onError: () => {
        toast.error('Failed to load property details');
      }
    }
  );

  const property = response?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">Failed to load property details</p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{property.title} | RentEasy</title>
        <meta name="description" content={property.description} />
      </Head>

      {/* Property Images */}
      <div className="relative h-[500px] bg-gray-900">
        <Image
          src={property?.images?.length ? property.images[selectedImage] : '/placeholder-property.jpg'}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto flex gap-4 overflow-x-auto">
            {property.images?.map((image: string, index: number) => (
              <button
                key={index}
                className={`relative w-24 h-24 flex-shrink-0 border-2 rounded-lg overflow-hidden 
                  ${selectedImage === index ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || '/placeholder-property.jpg'}
                  alt={`${property.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            )) || null}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{property.propertyName}</h1>
                  <div className="flex items-center mt-2 text-gray-600">
                    <FiMapPin className="mr-2" />
                    <p>{property.location ? 
                      `${property.location.address}, ${property.location.city}, ${property.location.state}` :
                      'Address not available'
                    }</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">₹{property.minAmount?.toLocaleString()}/month</p>
                  <p className="text-sm text-gray-600">
                    {property.maxAmount && property.maxAmount !== property.minAmount ? 
                      `₹${property.minAmount?.toLocaleString()} - ₹${property.maxAmount?.toLocaleString()}/month` :
                      `₹${property.minAmount?.toLocaleString()}/month`
                    }
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <FiHome className="mr-2 text-gray-600" />
                    <span className="text-gray-700">{property.propertyType}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features?.map((amenity: string) => (
                    <div key={amenity} className="flex items-center">
                      <FiCheck className="mr-2 text-green-500" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rooms Section */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.rooms?.map((room: Room) => (
                    <div
                      key={room.id}
                      onClick={() => router.push(`/rooms/${room.id}`)}
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-48">
                        <Image
                          src={room.images?.[0] || '/placeholder-room.jpg'}
                          alt={room.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            room.status === 'AVAILABLE' ? 
                            'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {room.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">{room.type}</span>
                          <span className="text-xl font-bold text-blue-600">₹{room.rent.toLocaleString()}/month</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <FiHome className="mr-1" />
                            {room.area} sq.ft
                          </div>
                          <div className="flex items-center">
                            <FiUser className="mr-1" />
                            {room.maxOccupancy} max
                          </div>
                          <div className="flex items-center">
                            <FiShield className="mr-1" />
                            ₹{room.securityDeposit.toLocaleString()} deposit
                          </div>
                          <div className="flex items-center">
                            <span className="capitalize">{room.furnishing}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {(!property.rooms || property.rooms.length === 0) && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No rooms available at this property</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              {property.reviews.length > 0 ? (
                <div className="space-y-6">
                  {property?.reviews?.map((review: any) => (
                    <div key={review._id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <Image
                              src={review.user.profilePicture || '/default-avatar.png'}
                              alt={review.user.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold">{review.user.name}</h3>
                            <p className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FiStar className="text-yellow-500 mr-1" />
                          <span className="font-semibold">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No reviews yet</p>
              )}
            </div>
          </div>

          {/* Right Column - Contact and Actions */}
          <div className="space-y-6">
            {/* Owner Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Property Owner</h2>
              <div className="flex items-center mb-4">
                <Image
                  src={property.owner.profilePicture || '/default-avatar.png'}
                  alt={property.owner.name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{property.owner.name}</h3>
                  <p className="text-sm text-gray-600">Joined {new Date(property.owner.createdAt).getFullYear()}</p>
                </div>
              </div>
              {user && user.role === 'TENANT' && (
                <div className="space-y-3">
                  <button 
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                    onClick={() => router.push(`/agreements/new?propertyId=${property.id}`)}
                  >
                    <FiShield />
                    Request to Rent
                  </button>
                  <a 
                    href={`tel:${property.owner.phone}`}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    <FiPhone />
                    Call Owner
                  </a>
                  <a 
                    href={`mailto:${property.owner.email}`}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    <FiMail />
                    Email Owner
                  </a>
                </div>
              )}
            </div>

            {/* Property Status */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Property Status</h2>
              <div className={`text-lg font-semibold ${
                property.status === 'AVAILABLE' ? 'text-green-600' : 'text-red-600'
              }`}>
                {property.status}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface FiCheckProps {
  className?: string;
}

const FiCheck: React.FC<FiCheckProps> = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);