import { useNavigate } from 'react-router-dom';
import { Menu, CalendarCheck, Calendar, LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth';

// Static formatted date for today's display
const TODAY_FORMATTED = new Date().toLocaleDateString('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

/**
 * Navbar.jsx - Top navigation header with brand, date, user pill, and logout.
 * Uses Lucide Menu for mobile toggle, CalendarCheck for brand logo, Calendar for today's date badge,
 * and LogOut for user sign-out action.
 */
function Navbar({ onToggleSidebar }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  // Get user display name or fallback to email prefix
  const userGreeting = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <button
          className="menu-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          type="button"
        >
          <Menu size={20} strokeWidth={2.2} />
        </button>
        <div className="brand-icon" aria-hidden="true">
          <CalendarCheck size={18} strokeWidth={2.5} />
        </div>
        <span className="brand-title">HabitFlow</span>
      </div>

      <div className="navbar-right">
        <span className="today-badge" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <Calendar size={14} strokeWidth={2} style={{ marginRight: '6px' }} />
          <span>{TODAY_FORMATTED}</span>
        </span>

        {currentUser && (
          <div className="navbar-user-section">
            <span className="user-profile-badge" title={`Signed in as ${currentUser.email}`}>
              <span className="user-avatar-circle">
                {userGreeting.charAt(0).toUpperCase()}
              </span>
              <span className="user-name-text">{userGreeting}</span>
            </span>

            <button
              type="button"
              className="navbar-logout-btn"
              onClick={handleLogout}
              title="Log out of your account"
            >
              <LogOut size={15} strokeWidth={2} className="logout-icon" />
              <span className="logout-text">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
