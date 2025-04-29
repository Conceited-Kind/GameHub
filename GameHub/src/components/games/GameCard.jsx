import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../firebase/config';

function GameCard({ game }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      if (auth.currentUser) {
        try {
          const wishlistUrl = `${import.meta.env.VITE_API_URL}/wishlists?userId=${auth.currentUser.uid}&gameId=${game.id}`;
          console.log('GameCard: Checking wishlist:', wishlistUrl);
          const response = await axios.get(wishlistUrl);
          console.log('GameCard: Wishlist response:', response.data);
          setIsWishlisted(response.data.length > 0);
        } catch (error) {
          console.error('GameCard: Error checking wishlist:', error.message, error.response?.data);
        }
      }
    };
    checkWishlist();
  }, [game.id]);

  const handleAddToWishlist = async () => {
    if (!auth.currentUser) {
      console.log('GameCard: User not logged in, cannot add to wishlist');
      return;
    }
    try {
      const wishlistItem = {
        id: `w${Date.now()}`,
        gameId: game.id,
        userId: auth.currentUser.uid,
      };
      console.log('GameCard: Adding to wishlist:', `${import.meta.env.VITE_API_URL}/wishlists`, wishlistItem);
      await axios.post(`${import.meta.env.VITE_API_URL}/wishlists`, wishlistItem);
      console.log(`GameCard: Added ${game.title} to wishlist`);
      setIsWishlisted(true);
    } catch (error) {
      console.error('GameCard: Error adding to wishlist:', error.message, error.response?.data);
    }
  };

  const handleRemove = async () => {
    try {
      const wishlistUrl = `${import.meta.env.VITE_API_URL}/wishlists?userId=${auth.currentUser.uid}&gameId=${game.id}`;
      console.log('GameCard: Fetching wishlist to remove:', wishlistUrl);
      const response = await axios.get(wishlistUrl);
      const wishlistId = response.data[0]?.id;
      if (wishlistId) {
        console.log('GameCard: Removing from wishlist:', `${import.meta.env.VITE_API_URL}/wishlists/${wishlistId}`);
        await axios.delete(`${import.meta.env.VITE_API_URL}/wishlists/${wishlistId}`);
        console.log(`GameCard: Removed ${game.title} from wishlist`);
        setIsWishlisted(false);
      }
    } catch (error) {
      console.error('GameCard: Error removing from wishlist:', error.message, error.response?.data);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-md p-4 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 animate-fade-in">
      <div className="relative">
        <img
          src={game.image}
          alt={`${game.title} cover`}
          className="w-full h-48 object-cover rounded-lg mb-4"
          loading="lazy"
          onError={() => console.log(`GameCard: Failed to load image for ${game.title}`)}
        />
        <span className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
          {game.rating}/5
        </span>
      </div>
      <h3 className="text-lg font-bold text-primary truncate">{game.title}</h3>
      <p className="text-sm text-gray-600">Genre: {game.genre}</p>
      <p className="text-sm text-gray-600">Platform: {game.platform}</p>
      <p className="text-sm text-gray-600">
        Price: {game.price === 0 ? 'Free' : `$${game.price.toFixed(2)}`}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {game.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      {auth.currentUser && (
        <div className="mt-2">
          {isWishlisted ? (
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              aria-label={`Remove ${game.title} from wishlist`}
            >
              Remove from Wishlist
            </button>
          ) : (
            <button
              onClick={handleAddToWishlist}
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
              aria-label={`Add ${game.title} to wishlist`}
            >
              Add to Wishlist
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default GameCard;