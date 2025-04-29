import { useState, useEffect } from 'react';
import axios from 'axios';
import DealItem from '../components/games/DealItem';

function Deals() {
  const [deals, setDeals] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Deals: Fetching deals from:', `${import.meta.env.VITE_API_URL}/deals`);
        console.log('Deals: Fetching games from:', `${import.meta.env.VITE_API_URL}/games`);
        const [dealsResponse, gamesResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/deals`),
          axios.get(`${import.meta.env.VITE_API_URL}/games`),
        ]);
        console.log('Deals: Fetched deals:', dealsResponse.data);
        console.log('Deals: Fetched games:', gamesResponse.data);
        setDeals(dealsResponse.data);
        setGames(gamesResponse.data);
        setError(null);
      } catch (err) {
        console.error('Deals: Error fetching data:', err.message, err.response?.data);
        setError('Failed to load deals. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-xl text-primary animate-fade-in">Loading deals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-highlight">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-primary mb-6 animate-fade-in">Game Deals</h1>
      <div className="space-y-4">
        {deals.length === 0 && (
          <p className="text-center text-lg text-gray-600">No deals available right now.</p>
        )}
        {deals.map((deal) => {
          const game = games.find((g) => g.id === Number(deal.gameId) || String(g.id) === String(deal.gameId));
          if (!game) {
            console.warn(`Deals: No game found for deal with gameId: ${deal.gameId}`);
            return null;
          }
          return <DealItem key={deal.id} deal={{ ...deal, gameTitle: game.title }} />;
        })}
      </div>
    </div>
  );
}

export default Deals;