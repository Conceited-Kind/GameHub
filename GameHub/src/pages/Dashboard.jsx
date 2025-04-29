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
        console.log('Dashboard: Fetching games from:', `${import.meta.env.VITE_API_URL}/games`);
        const gamesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/games`);
        const allGames = gamesResponse.data;
        console.log('Dashboard: Fetched games:', allGames);
        setGames(allGames);
        setFilteredGames(allGames);

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

        fetchRecommendations();

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
        console.error('Dashboard: Error fetching games:', err.message, err.response?.data);
        setError('Failed to load games. Please try again.');
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
    console.log('Dashboard: Filters reset');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary mb-6">GameHub Dashboard</h1>
      {error && (
        <p className="text-secondary mb-4 text-center" role="alert">
          {error}
        </p>
      )}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">Your Recommendations</h2>
        {loading ? (
          <p className="text-gray-600">Loading recommendations...</p>
        ) : recommendedGames.length > 0 ? (
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
        {loading ? (
          <p className="text-gray-600">Loading games...</p>
        ) : filteredGames.length > 0 ? (
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