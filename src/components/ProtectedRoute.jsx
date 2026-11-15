import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Loading screen shown while Firebase verifies the persistent login session
function LoadingScreen() {
  return (
    <div className="auth-loading-screen" role="status" aria-live="polite">
      <div className="loading-spinner" />
      <p className="loading-text">Loading your habit dashboard...</p>
    </div>
  );
}

/**
 * ProtectedRoute - Restricts access to authenticated users only.
 * If user is not authenticated, redirects to /login.
 */
export function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // 1. While Firebase checks session on page reload, show loading indicator
  if (loading) {
    return <LoadingScreen />;
  }

  // 2. If no user is logged in, redirect to Login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 3. User is authenticated, render protected content
  return children;
}

/**
 * PublicRoute - For Login / Signup / ForgotPassword.
 * If user is already authenticated, redirects directly to Dashboard.
 */
export function PublicRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // If already logged in, redirect away from auth screens to dashboard
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
