import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase/config';
import GameCard from '../components/games/GameCard';
import GameFilters from '../components/games/GameFilters';
import { getRecommendations } from '../utils/recommendations';

function Dashboard() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all games
        const gamesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/games`);
        const allGames = gamesResponse.data;
        setGames(allGames);
        setFilteredGames(allGames);

        // Fetch recommendations 
        const fetchRecommendations = async () => {
          let attempts = 0;
          const maxAttempts = 5;
          while (attempts < maxAttempts) {
            if (auth.currentUser) {
              console.log('Dashboard: User ID:', auth.currentUser.uid);
              const recommended = await getRecommendations();
              console.log('Dashboard: Recommended games:', recommended);
              setRecommendedGames(recommended);
              break;
            }
            console.log('Dashboard: Waiting for auth, attempt:', attempts + 1);
            await new Promise(resolve => setTimeout(resolve, 1000));
            attempts++;
          }
          if (attempts === maxAttempts) {
            console.log('Dashboard: No user after retries, setting empty recommendations');
            setRecommendedGames([]);
          }
        };

        // Start fetching recommendations
        fetchRecommendations();

        // Detect auth changes
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          console.log('Dashboard: Auth state changed, User ID:', user?.uid || 'null');
          if (user) {
            const recommended = await getRecommendations();
            setRecommendedGames(recommended);
          } else {
            setRecommendedGames([]);
          }
        });

        return () => unsubscribe();
      } catch (err) {
        setError('Failed to load games.');
        console.error('Dashboard error:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...games];
    if (genre) {
      result = result.filter((game) => game.genre.toLowerCase() === genre.toLowerCase());
    }
    if (platform) {
      result = result.filter((game) => game.platform.toLowerCase() === platform.toLowerCase());
    }
    if (sort) {
      result.sort((a, b) => {
        if (sort === 'price') return a.price - b.price;
        if (sort === 'rating') return b.rating - a.rating;
        return 0;
      });
    }
    setFilteredGames(result);
  }, [genre, platform, sort, games]);

  const handleReset = () => {
    setGenre('');
    setPlatform('');
    setSort('');
    setFilteredGames([...games]);
    console.log('Filters reset');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary mb-6">GameHub Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Your Recommendations</h2>
        {recommendedGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            {auth.currentUser
              ? 'Add games to your wishlist to see recommendations.'
              : 'Log in to see personalized recommendations.'}
          </p>
        )}
      </div>
      <GameFilters
        genre={genre}
        setGenre={setGenre}
        platform={platform}
        setPlatform={setPlatform}
        sort={sort}
        setSort={setSort}
        handleReset={handleReset}
      />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">All Games</h2>
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No games match your filters.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;