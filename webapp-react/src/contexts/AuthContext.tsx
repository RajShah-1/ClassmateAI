// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { authInstance } from '../utils/firebase'; // Use the auth instance

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener for auth state changes
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setCurrentUser(user);
      setLoading(false);
      console.log("Auth State Changed, User:", user ? user.uid : 'null');
    });

    // Cleanup listener on unmount
    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await firebaseSignOut(authInstance);
    } catch (error) {
      console.error("Error signing out: ", error);
      // Handle logout error (e.g., show a message)
    }
  };

  const value = {
    currentUser,
    loading,
    logout,
  };

  // Don't render children until authentication state is determined
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};