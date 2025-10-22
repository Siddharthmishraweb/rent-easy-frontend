import React from 'react';
import { motion } from 'framer-motion';
import { useRatings } from '@/hooks/useRatings';
import { ratingService, Rating } from '@/services/rating.service';
import Button from '@/components/shared/Button';
import { Card, CardBody } from '@/components/shared/Card';
import { Avatar } from '@/components/shared/Avatar';
import { Badge } from '@/components/shared/Badge';
import { Spinner } from '@/components/shared/Spinner';
import { useRouter } from 'next/router';
import { CreateReviewModal } from '@/components/reviews/CreateReviewModal';

const RatingsPage = () => {
  const router = useRouter();
  const { propertyId } = router.query;
  const { ratings, loading: isLoading, error } = useRatings(propertyId as string);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratings?.forEach((rating: { rating: number }) => {
      distribution[rating.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const averageRating = React.useMemo(() => {
    if (!ratings?.length) return 0;
    const total = ratings.reduce((acc: number, curr: { rating: number }) => acc + curr.rating, 0);
    return (total / ratings.length).toFixed(1);
  }, [ratings]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Ratings & Reviews</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Write a Review
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600">
          Error loading ratings. Please try again.
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Rating Summary */}
          <Card className="mb-8">
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">{averageRating}</div>
                  <div className="flex justify-center gap-1 text-yellow-400 mb-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        className={`w-6 h-6 ${
                          index < Math.round(Number(averageRating))
                            ? 'fill-current'
                            : 'fill-gray-300'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Based on {ratings?.length} reviews
                  </div>
                </div>

                <div className="space-y-2">
                  {Object.entries(getRatingDistribution())
                    .reverse()
                    .map(([rating, count]) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="w-12 text-sm">{rating} stars</div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{
                              width: `${
                                (count / (ratings?.length || 1)) * 100
                              }%`,
                            }}
                          />
                        </div>
                        <div className="w-12 text-sm text-right">
                          {count}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4">
            {ratings?.map((review: Rating) => (
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
                          {review.review}
                        </p>

                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          {ratings?.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Be the first to review this property!
              </p>
              <Button onClick={() => setIsModalOpen(true)}>
                Write a Review
              </Button>
            </div>
          )}
        </div>
      )}

      <CreateReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (rating: number, review: string) => {
          try {
            // Call the rating service to add the new review
            await ratingService.addRating(propertyId as string, { rating, review });
            setIsModalOpen(false);
            // Refresh the ratings
            router.reload();
          } catch (error) {
            console.error('Failed to submit review:', error);
          }
        }}
      />
    </div>
  );
};

export default RatingsPage;