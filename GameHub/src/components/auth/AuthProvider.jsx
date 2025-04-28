import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth state listener');
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        console.log('Auth state changed:', user ? user.email : 'No user');
        setCurrentUser(user);
        setLoading(false);
      },
      (error) => {
        console.error('Auth state error:', error);
        setLoading(false);
      }
    );

    return () => {
      console.log('Cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;