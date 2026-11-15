import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { formatAuthError } from '../utils/authErrors';
import '../styles/auth.css';

// Signup.jsx - User Registration View (Phase 3 of Auth)
function Signup({ onSwitchView }) {
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & error states
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Client-side input validation
  const validateForm = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError('Please enter your full name.');
      return false;
    }

    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return false;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address (e.g., name@example.com).');
      return false;
    }

    if (!password) {
      setError('Please enter a password.');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter carefully.');
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
      await signup(name, email.trim(), password);
      // After signup, navigate to dashboard
      if (navigate) {
        navigate('/');
      } else if (onSwitchView) {
        onSwitchView('dashboard');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(formatAuthError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToLogin = (e) => {
    if (onSwitchView) {
      e.preventDefault();
      onSwitchView('login');
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
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Start building positive habits and tracking your daily streaks</p>
        </div>

        {/* Error Message Banner */}
        {error && (
          <div className="auth-error-banner" role="alert">
            <AlertCircle size={16} strokeWidth={2.2} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="signup-name" className="form-label">
              Full Name <span className="required-star">*</span>
            </label>
            <input
              id="signup-name"
              type="text"
              className="form-input"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              autoComplete="name"
              required
            />
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="signup-email" className="form-label">
              Email Address <span className="required-star">*</span>
            </label>
            <input
              id="signup-email"
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
            />
          </div>

          {/* Password with Show/Hide Toggle */}
          <div className="form-group">
            <label htmlFor="signup-password" className="form-label">
              Password <span className="required-star">*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                autoComplete="new-password"
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

          {/* Confirm Password with Show/Hide Toggle */}
          <div className="form-group">
            <label htmlFor="signup-confirm-password" className="form-label">
              Confirm Password <span className="required-star">*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError('');
                }}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                title={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
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
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link
            to="/login"
            className="auth-nav-link"
            onClick={handleGoToLogin}
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
