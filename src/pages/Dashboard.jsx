import { useState, useMemo } from 'react';
import { CheckCircle2, Trophy, Sprout, Flame, Plus } from 'lucide-react';
import useHabits from '../hooks/useHabits';
import { getTodayDateString } from '../utils/dateUtils';
import { calculateAllStreaks } from '../utils/streakUtils';
import ProgressBar from '../components/ProgressBar';
import HabitList from '../components/HabitList';
import HabitForm from '../components/HabitForm';
import ConfirmModal from '../components/ConfirmModal';

const FILTER_CATEGORIES = ['All', 'Study', 'Health', 'Fitness', 'Personal'];

// Dashboard.jsx - Main Dashboard with Polished UI & Category Filters (Phase 9)
function Dashboard({ habitManager }) {
  const fallbackManager = useHabits();
  const {
    habits,
    completions,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
  } = habitManager || fallbackManager;

  const todayStr = useMemo(() => getTodayDateString(), []);

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Temporary action feedback message banner (e.g., "Habit added!")
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Compute array of habit IDs completed on today's date
  const completedHabitIds = useMemo(() => {
    return habits
      .filter((habit) => {
        const habitDates = completions[habit.id] || [];
        return habitDates.includes(todayStr);
      })
      .map((habit) => habit.id);
  }, [habits, completions, todayStr]);

  // Dynamically calculate consecutive day streaks for all habits
  const { streaksByHabit, bestStreak } = useMemo(() => {
    return calculateAllStreaks(habits, completions, todayStr);
  }, [habits, completions, todayStr]);

  // Filter habits by selected category
  const filteredHabits = useMemo(() => {
    if (selectedCategory === 'All') return habits;
    return habits.filter(
      (h) => (h.category || '').toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [habits, selectedCategory]);

  // Modal and form editing state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  // Delete confirmation modal state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingHabit, setDeletingHabit] = useState(null);

  // Derived progress values
  const totalHabits = habits.length;
  const completedToday = completedHabitIds.length;
  const completionPercentage =
    totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;
  const isAllCompleted = totalHabits > 0 && completedToday === totalHabits;

  // Toggle complete / undo for today's date
  const handleToggleComplete = (habitId) => {
    toggleHabitCompletion(habitId, todayStr);
  };

  // Open modal in Add mode
  const handleOpenAddModal = () => {
    setEditingHabit(null);
    setIsFormOpen(true);
  };

  // Open modal in Edit mode
  const handleOpenEditModal = (habit) => {
    setEditingHabit(habit);
    setIsFormOpen(true);
  };

  // Open Delete confirmation dialog
  const handleOpenDeleteModal = (habitId) => {
    const habitToDelete = habits.find((h) => h.id === habitId);
    if (habitToDelete) {
      setDeletingHabit(habitToDelete);
      setIsConfirmOpen(true);
    }
  };

  // Confirm habit deletion
  const handleConfirmDelete = () => {
    if (deletingHabit) {
      const name = deletingHabit.name;
      deleteHabit(deletingHabit.id);
      setIsConfirmOpen(false);
      setDeletingHabit(null);
      showToast(`Habit "${name}" deleted.`);
    }
  };

  // Form submit handler for Create / Update
  const handleFormSubmit = (formData) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, formData);
      showToast(`Habit "${formData.name}" updated!`);
    } else {
      addHabit(formData);
      showToast(`Habit "${formData.name}" created!`);
    }
  };

  return (
    <div className="dashboard-page">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="toast-notification" role="status">
          <CheckCircle2 size={16} strokeWidth={2.2} style={{ marginRight: '6px' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <h1 className="welcome-title">Welcome back!</h1>
        <p className="page-subtitle">Track your daily habits, build streaks, and stay consistent.</p>
      </div>

      {/* Daily Motivation / Celebration Banner */}
      {isAllCompleted ? (
        <div className="milestone-banner celebration">
          <Trophy size={18} strokeWidth={2} style={{ color: '#15803D', flexShrink: 0 }} />
          <span><strong>Phenomenal work!</strong> You have completed 100% of your habits today!</span>
        </div>
      ) : totalHabits > 0 && completedToday === 0 ? (
        <div className="milestone-banner reminder">
          <Sprout size={18} strokeWidth={2} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <span><strong>Ready to start?</strong> Check off your first habit today to build momentum and maintain your streak!</span>
        </div>
      ) : null}

      {/* Statistics Overview Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Habits</span>
          <span className="stat-value">{totalHabits}</span>
          <span className="stat-note">Habits currently active</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Completed Today</span>
          <span className="stat-value" style={{ color: 'var(--success)' }}>
            {completedToday}
          </span>
          <span className="stat-note">Out of {totalHabits} habits</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Daily Progress</span>
          <span className="stat-value" style={{ color: 'var(--primary)' }}>
            {Math.round(completionPercentage)}%
          </span>
          <span className="stat-note">Today&apos;s completion rate</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Best Streak</span>
          <span className="stat-value" style={{ color: '#C2410C', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {bestStreak > 0 ? (
              <>
                <Flame size={22} strokeWidth={2.2} color="#EA580C" /> {bestStreak}
              </>
            ) : (
              <>
                <Sprout size={22} strokeWidth={2.2} color="#94A3B8" /> 0
              </>
            )}
          </span>
          <span className="stat-note">
            {bestStreak > 0 ? `${bestStreak === 1 ? 'day' : 'days'} consecutive` : 'Start a streak today'}
          </span>
        </div>
      </div>

      {/* Progress Bar Component */}
      <div style={{ marginBottom: '32px' }}>
        <ProgressBar
          percentage={completionPercentage}
          label="Today's Habit Completion"
        />
      </div>

      {/* Habits Section Header with Action & Category Filters */}
      <div className="section-header-block">
        <div className="section-header">
          <h2 className="section-title">Your Habits</h2>
          <button
            type="button"
            className="primary-btn"
            onClick={handleOpenAddModal}
          >
            <Plus size={16} strokeWidth={2.5} style={{ marginRight: '6px' }} />
            Add New Habit
          </button>
        </div>

        {/* Category Filter Pills (Phase 9) */}
        {totalHabits > 0 && (
          <div className="category-filter-bar" role="tablist" aria-label="Filter habits by category">
            {FILTER_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-pill ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Category Empty Filter State */}
      {totalHabits > 0 && filteredHabits.length === 0 ? (
        <div className="empty-category-state">
          <p>No habits found under the <strong>{selectedCategory}</strong> category.</p>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => setSelectedCategory('All')}
            style={{ marginTop: '10px' }}
          >
            Show All Habits
          </button>
        </div>
      ) : (
        /* HabitList Component */
        <HabitList
          habits={filteredHabits}
          completedHabitIds={completedHabitIds}
          streaks={streaksByHabit}
          onToggleComplete={handleToggleComplete}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
          onOpenAddModal={handleOpenAddModal}
        />
      )}

      {/* HabitForm Component (Add / Edit Modal) */}
      {isFormOpen && (
        <HabitForm
          key={editingHabit ? editingHabit.id : 'new-habit'}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editingHabit}
        />
      )}

      {/* ConfirmModal for Safe Deletion */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Delete Habit"
        message={
          deletingHabit
            ? `Are you sure you want to delete "${deletingHabit.name}"? This action cannot be undone.`
            : 'Are you sure you want to delete this habit?'
        }
        confirmText="Delete Habit"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsConfirmOpen(false);
          setDeletingHabit(null);
        }}
      />
    </div>
  );
}

export default Dashboard;
