import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { auth, database } from '../../firebase/config';

function ReviewForm({ gameId }) {
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked', { gameId, rating, content, user: auth.currentUser });
    if (!auth.currentUser) {
      setError('Please log in to submit a review.');
      console.log('No authenticated user');
      return;
    }
    if (!content.trim()) {
      setError('Review content cannot be empty.');
      console.log('Empty review content');
      return;
    }
    if (!gameId || isNaN(gameId) || gameId < 1 || gameId > 30) {
      setError('Invalid game selected.');
      console.log('Invalid gameId:', gameId);
      return;
    }

    try {
      const reviewsRef = ref(database, `reviews/${gameId}`);
      console.log('Pushing review to:', `reviews/${gameId}`);
      await push(reviewsRef, {
        rating: Number(rating),
        content,
        userId: auth.currentUser.uid,
        email: auth.currentUser.email,
        timestamp: Date.now(),
      });
      console.log('Review submitted successfully');
      setRating(1);
      setContent('');
      setError(null);
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error('Review submission error:', err.message, err.code);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-xl shadow-md animate-fade-in">
      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-text">
          Rating
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-text">
          Review
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your review..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          rows="4"
        />
      </div>
      {error && (
        <p className="text-highlight text-sm" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="w-full bg-primary text-white p-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
        disabled={!content.trim() || !auth.currentUser || !gameId}
      >
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;