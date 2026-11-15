import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';
import { AuthContext } from './authContext';

/**
 * AuthProvider - Manages authentication state and session persistence
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize loading to true only if auth service is available to monitor
  const [loading, setLoading] = useState(() => Boolean(auth));

  /**
   * Register a new user with name, email, and password
   */
  const signup = async (name, email, password) => {
    if (!auth) {
      throw new Error('Firebase is not configured. Please add your credentials to .env.');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (name && name.trim()) {
      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });
      // Ensure local state reflects the display name immediately
      setCurrentUser({
        ...userCredential.user,
        displayName: name.trim(),
      });
    }

    return userCredential;
  };

  /**
   * Sign in an existing user with email and password
   */
  const login = (email, password) => {
    if (!auth) {
      throw new Error('Firebase is not configured. Please add your credentials to .env.');
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * Sign out the currently authenticated user
   */
  const logout = () => {
    if (!auth) return Promise.resolve();
    return signOut(auth);
  };

  /**
   * Send a password reset email
   */
  const resetPassword = (email) => {
    if (!auth) {
      throw new Error('Firebase is not configured. Please add your credentials to .env.');
    }
    return sendPasswordResetEmail(auth, email);
  };

  /**
   * Monitor Firebase Auth state changes
   * Preserves session across page refreshes
   */
  useEffect(() => {
    if (!auth) return;

    // onAuthStateChanged fires asynchronously when Firebase restores session
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    isFirebaseConfigured,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
