import { useState } from 'react';
import { User, Database, AlertTriangle, RotateCcw, Trash2 } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import ConfirmModal from '../components/ConfirmModal';

/**
 * Settings.jsx - Application settings and account data management.
 * Uses Lucide User for account info, Database for storage, AlertTriangle for danger zone,
 * RotateCcw for restoring starter data, and Trash2 for clearing habit data.
 */
function Settings({ habitManager }) {
  const { currentUser } = useAuth();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const habits = habitManager ? habitManager.habits : [];
  const completions = habitManager ? habitManager.completions : {};

  // Count total logged completions across all habits
  const totalCompletionCount = Object.values(completions).reduce(
    (acc, datesArray) => acc + (Array.isArray(datesArray) ? datesArray.length : 0),
    0
  );

  const handleClearAll = () => {
    if (habitManager && habitManager.clearAllData) {
      habitManager.clearAllData();
      setIsConfirmOpen(false);
      setFeedbackMessage('All habit data for your account has been cleared.');
      setTimeout(() => setFeedbackMessage(''), 4000);
    }
  };

  const handleRestoreDefaults = () => {
    if (habitManager && habitManager.resetToDefaultData) {
      habitManager.resetToDefaultData();
      setFeedbackMessage('Starter sample habits restored to your account.');
      setTimeout(() => setFeedbackMessage(''), 4000);
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="welcome-title">Settings</h1>
        <p className="page-subtitle">Manage application storage and account preferences.</p>
      </div>

      {feedbackMessage && (
        <div className="settings-feedback-banner">
          {feedbackMessage}
        </div>
      )}

      {/* Account Info Card */}
      {currentUser && (
        <div className="settings-card" style={{ marginBottom: '24px' }}>
          <h2 className="settings-card-title" style={{ display: 'flex', alignItems: 'center' }}>
            <User size={18} strokeWidth={2} style={{ marginRight: '8px', color: 'var(--primary)' }} />
            Account Information
          </h2>
          <p className="settings-card-desc">
            Signed in as <strong>{currentUser.email}</strong>
            {currentUser.displayName && ` (${currentUser.displayName})`}. Your habit data is securely
            isolated under your personal user account.
          </p>
        </div>
      )}

      {/* Storage Information Card */}
      <div className="settings-card">
        <h2 className="settings-card-title" style={{ display: 'flex', alignItems: 'center' }}>
          <Database size={18} strokeWidth={2} style={{ marginRight: '8px', color: 'var(--primary)' }} />
          Isolated Storage Info
        </h2>
        <p className="settings-card-desc">
          HabitFlow saves your data locally using your personal user ID (<code>habitflow_{currentUser?.uid ? `${currentUser.uid.slice(0, 8)}...` : 'user'}_habits</code>).
          Switching accounts or logging in as another user will never expose or mix your habit records.
        </p>

        <div className="settings-stats-row">
          <div className="settings-stat-item">
            <span className="stat-label">Your Active Habits</span>
            <span className="settings-stat-number">{habits.length}</span>
          </div>
          <div className="settings-stat-item">
            <span className="stat-label">Your Check-In Logs</span>
            <span className="settings-stat-number">{totalCompletionCount}</span>
          </div>
          <div className="settings-stat-item">
            <span className="stat-label">Account Isolation</span>
            <span className="settings-stat-badge">UID Protected</span>
          </div>
        </div>
      </div>

      {/* Danger Zone / Data Management */}
      <div className="settings-card danger-zone">
        <h2 className="settings-card-title" style={{ color: '#DC2626', display: 'flex', alignItems: 'center' }}>
          <AlertTriangle size={18} strokeWidth={2} style={{ marginRight: '8px', color: '#DC2626' }} />
          Data Management
        </h2>
        <p className="settings-card-desc">
          You can wipe your personal habit records or restore the default starter habits anytime.
          This only affects your account and will not modify any other user&apos;s data.
        </p>

        <div className="settings-actions-row">
          <button
            type="button"
            className="secondary-btn"
            onClick={handleRestoreDefaults}
          >
            <RotateCcw size={15} strokeWidth={2} style={{ marginRight: '6px' }} />
            Restore Starter Data
          </button>
          <button
            type="button"
            className="danger-btn"
            onClick={() => setIsConfirmOpen(true)}
          >
            <Trash2 size={15} strokeWidth={2} style={{ marginRight: '6px' }} />
            Clear My Habit Data
          </button>
        </div>
      </div>

      {/* Confirmation Dialog for Clearing All Data */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Clear All Habit Data"
        message="Are you sure you want to delete all habits and completion history for this account? This action cannot be undone."
        confirmText="Yes, Clear My Habits"
        cancelText="Cancel"
        onConfirm={handleClearAll}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}

export default Settings;
