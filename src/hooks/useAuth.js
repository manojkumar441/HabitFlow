import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

/**
 * useAuth - Custom hook to consume AuthContext cleanly
 * @returns {{
 *   currentUser: import('firebase/auth').User | null,
 *   loading: boolean,
 *   isFirebaseConfigured: boolean,
 *   signup: Function,
 *   login: Function,
 *   logout: Function,
 *   resetPassword: Function
 * }}
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined || context === null) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }

  return context;
}

export default useAuth;
