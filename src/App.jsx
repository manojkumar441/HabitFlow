import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import useHabits from './hooks/useHabits';
import './styles/components.css';
import './styles/dashboard.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';

/**
 * HabitTrackerShell - The complete existing Habit Tracker application UI.
 * Fully preserved with Dashboard, Analytics, Settings, Navbar, and Sidebar.
 * Uses the authenticated user's UID for data isolation.
 */
function HabitTrackerShell() {
  const { currentUser } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Central Habit & Completion Manager isolated by user UID
  const habitManager = useHabits(currentUser?.uid);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Top Navigation Bar with live user profile and Logout */}
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="app-body">
        {/* Navigation Sidebar */}
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        {/* Dynamic Page Content */}
        <main className="main-content">
          {activePage === 'dashboard' && <Dashboard habitManager={habitManager} />}
          {activePage === 'analytics' && <Analytics habitManager={habitManager} />}
          {activePage === 'settings' && <Settings habitManager={habitManager} />}
        </main>
      </div>
    </div>
  );
}

/**
 * Root Application Component
 * Configures Public and Protected routes with Firebase Authentication.
 */
function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      {/* Public Routes: Redirects logged-in users directly to Dashboard */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      {/* Protected Routes: Keyed by user UID so switching users creates a fresh isolated instance */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <HabitTrackerShell key={currentUser?.uid || 'guest'} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
