import { db } from './config';
import { ref, set, get, child, onValue } from "firebase/database";

export const saveUserPreferences = (userId, preferences) => {
  return set(ref(db, `users/${userId}/preferences`), {
    favoriteGenres: preferences.favoriteGenres || [],
    platforms: preferences.platforms || ["PC"],
    maxPrice: preferences.maxPrice || 60,
    lastUpdated: Date.now()
  });
};

export const getGameData = async (gameId) => {
  const snapshot = await get(child(ref(db), `games/${gameId}`));
  return snapshot.exists() ? snapshot.val() : null;
};