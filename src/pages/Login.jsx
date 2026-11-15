import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { formatAuthError } from '../utils/authErrors';
import '../styles/auth.css';

// Login.jsx - User Sign In View (Phase 3 of Auth)
function Login({ onSwitchView }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Status & error states
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (!password) {
      setError('Please enter your password.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await login(email.trim(), password);
      // After login, navigate to dashboard
      if (navigate) {
        navigate('/');
      } else if (onSwitchView) {
        onSwitchView('dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(formatAuthError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToSignup = (e) => {
    if (onSwitchView) {
      e.preventDefault();
      onSwitchView('signup');
    }
  };

  const handleGoToForgot = (e) => {
    if (onSwitchView) {
      e.preventDefault();
      onSwitchView('forgot-password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header & Logo */}
        <div className="auth-header">
          <div className="auth-brand">
            <div className="brand-icon" aria-hidden="true">
              <CalendarCheck size={18} strokeWidth={2.5} />
            </div>
            <span className="brand-title">HabitFlow</span>
          </div>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Log in to track your habits and continue your streak</p>
        </div>

        {/* Error Message Banner */}
        {error && (
          <div className="auth-error-banner" role="alert">
            <AlertCircle size={16} strokeWidth={2.2} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              autoComplete="email"
              required
              autoFocus
            />
          </div>

          {/* Password with Show/Hide Toggle & Forgot Password Link */}
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="login-password" className="form-label">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="forgot-link"
                onClick={handleGoToForgot}
              >
                Forgot password?
              </Link>
            </div>
            <div className="password-input-wrapper">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={2} />
                ) : (
                  <Eye size={18} strokeWidth={2} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="auth-footer">
          <span>Don&apos;t have an account?</span>
          <Link
            to="/signup"
            className="auth-nav-link"
            onClick={handleGoToSignup}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
