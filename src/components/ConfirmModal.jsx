import { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

/**
 * ConfirmModal.jsx - Reusable modal for confirming destructive actions.
 * Uses Lucide X for close button and AlertTriangle for confirmation warning.
 */
function ConfirmModal({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) {
  // Close dialog when Escape is pressed
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-container confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onCancel}
            aria-label="Close dialog"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        <div className="confirm-body">
          <div className="confirm-icon" aria-hidden="true">
            <AlertTriangle size={36} strokeWidth={2} color="#D97706" />
          </div>
          <p className="confirm-message">{message}</p>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="danger-btn"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
