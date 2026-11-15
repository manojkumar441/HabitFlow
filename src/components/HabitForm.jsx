import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Categories supported by HabitFlow
const CATEGORIES = ['Study', 'Health', 'Fitness', 'Personal'];

// HabitForm.jsx - Modal form to add or edit a habit (Phase 9 Polish)
function HabitForm({ isOpen, onClose, onSubmit, initialData = null }) {
  // Initialize form fields directly from initialData
  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState(initialData?.category || 'Study');
  const [description, setDescription] = useState(initialData?.description || '');
  const [error, setError] = useState('');

  // Close modal on Escape key press for keyboard accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isEditMode = Boolean(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Habit name is required.');
      return;
    }

    if (trimmedName.length > 60) {
      setError('Habit name cannot exceed 60 characters.');
      return;
    }

    onSubmit({
      name: trimmedName,
      category,
      description: description.trim(),
    });

    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      {/* Stop click propagation so clicking inside the modal does not close it */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditMode ? 'Edit Habit' : 'Create New Habit'}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="habit-form">
          {/* Validation Error Banner */}
          {error && <div className="form-error-banner">{error}</div>}

          {/* Habit Name (Required) */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="habit-name" className="form-label">
                Habit Name <span className="required-star">*</span>
              </label>
              <span className="char-count">{name.length}/60</span>
            </div>
            <input
              id="habit-name"
              type="text"
              maxLength={60}
              className={`form-input ${error ? 'input-error' : ''}`}
              placeholder="e.g., Read 15 pages, Drink Water, Morning Walk"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              autoFocus
            />
          </div>

          {/* Category Dropdown */}
          <div className="form-group">
            <label htmlFor="habit-category" className="form-label">
              Category
            </label>
            <select
              id="habit-category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Optional Short Description */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="habit-description" className="form-label">
                Description <span className="optional-tag">(Optional)</span>
              </label>
              <span className="char-count">{description.length}/200</span>
            </div>
            <textarea
              id="habit-description"
              className="form-textarea"
              maxLength={200}
              rows={3}
              placeholder="Add details, a target, or why this habit matters to you..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Form Actions */}
          <div className="modal-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              {isEditMode ? 'Save Changes' : 'Create Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HabitForm;
