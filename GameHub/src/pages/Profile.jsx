import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase/config';
import { signOut } from '../firebase/auth';
import GameCard from '../components/games/GameCard';

function Profile() {
  const [userGames, setUserGames] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log('Profile: User ID:', user?.uid || 'null');
      if (!user) {
        console.log('Profile: Redirecting to /auth');
        navigate('/auth');
        return;
      }

      try {
        const wishlistUrl = `${import.meta.env.VITE_API_URL}/wishlists?userId=${user.uid}`;
        console.log('Profile: Fetching wishlists from:', wishlistUrl);
        const wishlistResponse = await axios.get(wishlistUrl);
        console.log('Profile: Wishlist response:', wishlistResponse.data);
        const wishlistedGameIds = wishlistResponse.data.map(w => w.gameId);
        console.log('Profile: Wishlisted game IDs:', wishlistedGameIds);
        console.log('Profile: Fetching games from:', `${import.meta.env.VITE_API_URL}/games`);
        const gamesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/games`);
        console.log('Profile: Games response:', gamesResponse.data);
        const wishlistedGames = gamesResponse.data.filter(game => wishlistedGameIds.includes(game.id));
        console.log('Profile: Wishlisted games:', wishlistedGames);
        setUserGames(wishlistedGames);
      } catch (err) {
        console.error('Profile: Error fetching wishlist:', err.message, err.response?.data);
        setError('Failed to load your wishlist.');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Profile: Sign out error:', error.message);
      setError('Failed to sign out. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-6">Your Profile</h2>
        {error && (
          <p className="text-secondary mb-4 text-center" role="alert">
            {error}
          </p>
        )}
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary">
          <h3 className="text-xl font-semibold text-gray-700">
            Welcome, {auth.currentUser?.email || 'User'}
          </h3>
          <button
            onClick={handleSignOut}
            className="mt-4 bg-secondary text-white p-2 rounded hover:bg-red-700 transition"
            aria-label="Sign out"
          >
            Sign Out
          </button>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Wishlist</h3>
          {userGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No games in your wishlist.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;