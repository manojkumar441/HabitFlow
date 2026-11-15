import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { formatAuthError } from '../utils/authErrors';
import '../styles/auth.css';

// ForgotPassword.jsx - Password Reset Request View (Phase 3 of Auth)
function ForgotPassword({ onSwitchView }) {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please enter your account email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      await resetPassword(trimmedEmail);
      setSuccessMessage(
        'Password reset link has been sent! Check your inbox (and spam folder) for instructions.'
      );
    } catch (err) {
      console.error('Password reset error:', err);
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
          <h1 className="auth-title">Reset Password</h1>
          <p className="auth-subtitle">
            Enter your email and we&apos;ll send you a link to reset your password
          </p>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="auth-success-banner" role="status" style={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle2 size={16} strokeWidth={2.2} style={{ marginRight: '6px', flexShrink: 0 }} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Alert Banner */}
        {error && (
          <div className="auth-error-banner" role="alert">
            <AlertCircle size={16} strokeWidth={2.2} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="reset-email" className="form-label">
              Email Address
            </label>
            <input
              id="reset-email"
              type="email"
              className="form-input"
              placeholder="name@example.com"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending reset link...' : 'Send Reset Link'}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="auth-footer">
          <span>Remembered your password?</span>
          <Link
            to="/login"
            className="auth-nav-link"
            onClick={handleGoToLogin}
          >
            Back to Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
