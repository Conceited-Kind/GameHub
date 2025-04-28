import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { auth, database } from '../../firebase/config';

function ReviewItem({ review, gameId }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!auth.currentUser) {
      setError('Please log in to delete your review.');
      console.log('No authenticated user');
      return;
    }
    if (auth.currentUser.uid !== review.userId) {
      setError('You can only delete your own reviews.');
      console.log('Unauthorized delete attempt');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const reviewRef = ref(database, `reviews/${gameId}/${review.id}`);
      console.log('Deleting review:', review.id, 'for game:', gameId);
      await remove(reviewRef);
      console.log('Review deleted successfully');
    } catch (err) {
      setError('Failed to delete review. Please try again.');
      console.error('Delete review error:', err.message, err.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600">By: {review.email}</p>
          <p className="text-gray-600">Rating: {review.rating}/5</p>
          <p className="mt-2">{review.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            {new Date(review.timestamp).toLocaleString()}
          </p>
        </div>
        {auth.currentUser && auth.currentUser.uid === review.userId && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}

export default ReviewItem;