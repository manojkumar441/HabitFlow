import { Sprout, Plus } from 'lucide-react';
import HabitCard from './HabitCard';

/**
 * HabitList.jsx - Container for rendering the collection of habit cards or empty state.
 * Uses Lucide Sprout icon for starting progress and Plus for action button.
 */
function HabitList({
  habits = [],
  completedHabitIds = [],
  streaks = {},
  onToggleComplete,
  onEdit,
  onDelete,
  onOpenAddModal,
}) {
  // Empty state when user has no habits yet
  if (habits.length === 0) {
    return (
      <div className="empty-habits-state">
        <div className="empty-icon" aria-hidden="true">
          <Sprout size={48} strokeWidth={1.75} color="var(--primary)" />
        </div>
        <h3 className="empty-title">No habits created yet</h3>
        <p className="empty-subtitle">
          Small steps lead to big changes. Add your first daily habit to start tracking your streak!
        </p>
        {onOpenAddModal && (
          <button type="button" className="primary-btn" onClick={onOpenAddModal}>
            <Plus size={16} strokeWidth={2.5} style={{ marginRight: '6px' }} />
            Add Your First Habit
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="habit-list-grid">
      {habits.map((habit) => {
        const isCompleted = completedHabitIds.includes(habit.id);
        const habitStreak = streaks[habit.id] || 0;

        return (
          <HabitCard
            key={habit.id}
            habit={habit}
            isCompletedToday={isCompleted}
            streak={habitStreak}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}

export default HabitList;
