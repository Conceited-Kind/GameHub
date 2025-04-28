import { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import axios from "axios";
import { database } from "../firebase/config";
import ReviewForm from "../components/games/ReviewForm";
import ReviewItem from "../components/games/ReviewItem";

function Reviews() {
  const [games, setGames] = useState([]);
  const [reviews, setReviews] = useState({});
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/games`);
        if (!response.data.length) {
          setError("No games available.");
          return;
        }
        setGames(response.data);
        setSelectedGameId(response.data[0].id);
      } catch (err) {
        console.error("Error fetching games:", err);
        setError("Failed to load games. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const reviewsRef = ref(database, "reviews");
    const handleReviews = (snapshot) => {
      const data = snapshot.val();
      setReviews(data || {});
      console.log("Fetched reviews:", data);
    };

    const handleError = (err) => {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews.");
    };

    onValue(reviewsRef, handleReviews, handleError);
    fetchGames();
    return () => {
      off(reviewsRef, "value", handleReviews);
    };
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-xl text-primary">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-secondary">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary mb-6">Game Reviews</h1>
      <div className="mb-6">
        <label htmlFor="gameSelect" className="block text-sm font-medium text-text">
          Select Game
        </label>
        <select
          id="gameSelect"
          value={selectedGameId || ""}
          onChange={(e) => setSelectedGameId(Number(e.target.value))}
          className="w-full max-w-xs p-2 border rounded-md focus:ring-2 focus:ring-primary"
        >
          {games.map((game) => (
            <option key={game.id} value={game.id}>{game.title}</option>
          ))}
        </select>
      </div>

      {selectedGameId && (
        <>
          <h2 className="text-xl font-semibold text-primary mb-4">Write a Review</h2>
          <ReviewForm gameId={selectedGameId} />
          <h2 className="text-xl font-semibold text-primary mb-4 mt-8">
            Reviews for {games.find((g) => g.id === selectedGameId)?.title}
          </h2>
          <div className="space-y-4">
            {reviews[selectedGameId] ? (
              Object.entries(reviews[selectedGameId]).map(([reviewId, review]) => (
                <ReviewItem key={reviewId} review={{ id: reviewId, ...review }} gameId={selectedGameId} />
              ))
            ) : (
              <p className="text-lg text-gray-600">No reviews yet for this game.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Reviews;