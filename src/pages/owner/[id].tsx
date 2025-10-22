import React from 'react';
import { motion } from 'framer-motion';
import useOwner from '@/hooks/useOwner';
import Button from '@/components/shared/Button';
import { Card, CardBody } from '@/components/shared/Card';
import { Avatar } from '@/components/shared/Avatar';
import { Badge } from '@/components/shared/Badge';
import { Spinner } from '@/components/shared/Spinner';
import { useRouter } from 'next/router';
import type { Property } from '@/types/property';
import type { Review } from '@/types/owner';

const OwnerPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: owner, isLoading, error } = useOwner(id as string);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600">
          Error loading owner details. Please try again.
        </div>
      ) : owner ? (
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Owner Profile Header */}
            <Card className="mb-8">
              <CardBody>
                <div className="flex items-start md:items-center flex-col md:flex-row gap-6">
                  <Avatar
                    src={owner.profilePicture}
                    alt={owner.name}
                    size="xl"

                  />
                  <div className="flex-1">
                    <h1 className="text-3xl font-semibold mb-2">{owner.name}</h1>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <Badge color="blue">
                        {owner.propertiesCount} Properties
                      </Badge>
                      <Badge color="green">
                        {owner.rating} ★ Rating
                      </Badge>
                      {owner.isVerified && (
                        <Badge color="yellow">Verified Owner</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {owner.description || 'No description available'}
                    </p>
                  </div>
                  <div>
                    <Button>Contact Owner</Button>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Properties Section */}
            <h2 className="text-2xl font-semibold mb-6">Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {owner.properties?.map((property: Property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => router.push(`/properties/${property.id}`)}
                  >
                    <CardBody>
                      <div className="flex gap-4">
                        <img
                          src={property.images[0]}
                          alt={property.propertyName}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            {property.propertyName}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                            {property.location.address}
                          </p>
                          <div className="flex gap-2">
                            <Badge color="green">
                              ₹{property.minAmount?.toLocaleString() ?? 'N/A'}/month
                            </Badge>
                            <Badge color="blue">
                              {property.propertyType}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Reviews Section */}
            <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
            <div className="space-y-4">
              {owner.reviews?.map((review: Review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card>
                    <CardBody>
                      <div className="flex items-start gap-4">
                        <Avatar
                          src={review.user.profilePicture}
                          alt={review.user.name}
                          size="md"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{review.user.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge color="yellow">
                              {review.rating} ★
                            </Badge>
                          </div>
                          <p className="mt-2 text-gray-700 dark:text-gray-300">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Owner Not Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The owner you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push('/properties')}>
            Browse Properties
          </Button>
        </div>
      )}
    </div>
  );
};

export default OwnerPage;