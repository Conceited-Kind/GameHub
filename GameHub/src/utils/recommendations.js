import axios from 'axios';
import { auth } from '../firebase/config';

export const getRecommendations = async () => {
  try {
    console.log('getRecommendations: auth.currentUser:', auth.currentUser?.uid || 'null');
    if (!auth.currentUser) {
      console.log('getRecommendations: No user logged in, returning empty recommendations');
      return [];
    }
    const wishlistsUrl = `${import.meta.env.VITE_API_URL}/wishlists?userId=${auth.currentUser.uid}`;
    console.log('getRecommendations: Fetching wishlists from:', wishlistsUrl);
    const wishlistsResponse = await axios.get(wishlistsUrl);
    console.log('getRecommendations: Wishlists response:', wishlistsResponse.data);
    const wishlistedGameIds = wishlistsResponse.data.map(w => w.gameId);
    console.log('getRecommendations: Wishlisted game IDs:', wishlistedGameIds);
    if (wishlistedGameIds.length === 0) {
      console.log('getRecommendations: No wishlisted games found');
      return [];
    }
    console.log('getRecommendations: Fetching games from:', `${import.meta.env.VITE_API_URL}/games`);
    const gamesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/games`);
    console.log('getRecommendations: Games response:', gamesResponse.data);
    const games = gamesResponse.data;
    const wishlistedGames = games.filter(g => wishlistedGameIds.includes(g.id));
    console.log('getRecommendations: Wishlisted games:', wishlistedGames);
    const wishlistTags = wishlistedGames.flatMap(g => g.tags);
    console.log('getRecommendations: Wishlist tags:', wishlistTags);
    const uniqueTags = [...new Set(wishlistTags)];
    console.log('getRecommendations: Unique tags:', uniqueTags);
    const recommendedGames = games
      .filter(g => !wishlistedGameIds.includes(g.id))
      .filter(g => g.tags.some(tag => uniqueTags.includes(tag)))
      .slice(0, 3);
    console.log('getRecommendations: Recommended games:', recommendedGames);
    return recommendedGames;
  } catch (error) {
    console.error('getRecommendations: Error fetching recommendations:', error.message, error.response?.data);
    return [];
  }
};