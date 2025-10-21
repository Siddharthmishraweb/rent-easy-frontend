import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import toast from 'react-hot-toast';

interface RatingProps {
  propertyId: string;
  tenantId: string;
  existingRating?: number;
}

export default function PropertyRating({ propertyId, tenantId, existingRating }: RatingProps) {
  const [rating, setRating] = useState(existingRating || 0);
  const [review, setReview] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(`/api/properties/${propertyId}/reviews`, {
        rating,
        review,
        tenantId
      });
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-6 w-6 cursor-pointer ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className="w-full p-2 border rounded"
        rows={4}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Review
      </button>
    </div>
  );
}
