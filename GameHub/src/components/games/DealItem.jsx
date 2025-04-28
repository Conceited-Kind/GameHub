import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../firebase/config';

function DealItem({ deal }) {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      if (!auth.currentUser) return;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/wishlists`, {
          params: { userId: auth.currentUser.uid, gameId: deal.gameId },
        });
        if (response.data.length > 0) {
          setWishlisted(true);
        }
      } catch (error) {
        console.error('Error checking wishlist:', error.message);
      }
    };
    checkWishlist();
  }, [deal.gameId]);

  const handleWishlist = async () => {
    if (!auth.currentUser) {
      console.log('Please log in to add to wishlist');
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/wishlists`, {
        params: { userId: auth.currentUser.uid, gameId: deal.gameId },
      });
      if (response.data.length > 0) {
        setWishlisted(true);
        return;
      }
      await axios.post(`${import.meta.env.VITE_API_URL}/wishlists`, {
        gameId: deal.gameId,
        userId: auth.currentUser.uid,
      });
      setWishlisted(true);
      console.log('Added to wishlist:', deal.gameId);
    } catch (error) {
      console.error('Error adding to wishlist:', error.message);
    }
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{deal.gameTitle}</h3>
      <p className="text-gray-600">Store: {deal.store}</p>
      <p className="text-gray-600">Price: ${deal.price.toFixed(2)}</p>
      <p className="text-gray-600">Discount: {deal.discount}%</p>
      <button
        onClick={handleWishlist}
        className={`mt-2 px-4 py-2 rounded-md ${
          wishlisted ? 'bg-gray-400' : 'bg-primary hover:bg-blue-700'
        } text-white transition`}
        disabled={wishlisted}
        aria-label={wishlisted ? 'Game already wishlisted' : 'Add to wishlist'}
      >
        {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
      </button>
    </div>
  );
}

export default DealItem;