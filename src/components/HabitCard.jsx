import { Pencil, Trash2, Check } from 'lucide-react';
import StreakCounter from './StreakCounter';

/**
 * HabitCard.jsx - Individual habit card displaying habit details and actions.
 * Uses Lucide Pencil for edit, Trash2 for delete, and Check for completed status.
 */
function HabitCard({
  habit,
  isCompletedToday = false,
  streak = 0,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const { id, name, category = 'personal', description = '' } = habit;
  const categoryLower = category.toLowerCase();

  return (
    <div className={`habit-card ${isCompletedToday ? 'completed' : ''}`}>
      <div className="habit-card-header">
        <div className="habit-header-meta">
          <span className={`tag-badge ${categoryLower}`}>
            {category}
          </span>
          <StreakCounter streak={streak} />
        </div>

        {/* Action icons for editing and deleting */}
        <div className="habit-card-actions">
          <button
            type="button"
            className="card-action-btn edit-btn"
            onClick={() => onEdit && onEdit(habit)}
            aria-label="Edit habit"
            title="Edit habit"
          >
            <Pencil size={14} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="card-action-btn delete-btn"
            onClick={() => onDelete && onDelete(id)}
            aria-label="Delete habit"
            title="Delete habit"
          >
            <Trash2 size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="habit-card-body">
        <h3 className="habit-name">{name}</h3>
        {description ? (
          <p className="habit-description">{description}</p>
        ) : (
          <p className="habit-description empty-desc">No description provided</p>
        )}
      </div>

      <div className="habit-card-footer">
        <div className="habit-status-indicator">
          <span className={`status-dot ${isCompletedToday ? 'done' : 'pending'}`} />
          <span className="status-text">
            {isCompletedToday ? 'Completed today' : 'Not completed today'}
          </span>
        </div>

        <button
          type="button"
          className={`habit-toggle-btn ${isCompletedToday ? 'completed' : ''}`}
          onClick={() => onToggleComplete && onToggleComplete(id)}
        >
          {isCompletedToday ? (
            <>
              <Check size={14} strokeWidth={2.5} style={{ marginRight: '4px' }} />
              Done (Undo)
            </>
          ) : (
            'Mark Complete'
          )}
        </button>
      </div>
    </div>
  );
}

export default HabitCard;
