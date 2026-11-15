import { Flame, Sprout } from 'lucide-react';

/**
 * StreakCounter.jsx - Reusable visual badge displaying current habit streak.
 * Uses Lucide Flame for active streaks and Sprout for initial/zero streak.
 */
function StreakCounter({ streak = 0, size = 'normal' }) {
  const hasStreak = streak > 0;

  return (
    <span
      className={`streak-counter-badge ${hasStreak ? 'active-streak' : 'zero-streak'} size-${size}`}
      title={hasStreak ? `${streak} consecutive day streak` : 'Complete today to start a streak'}
    >
      <span className="streak-icon" aria-hidden="true">
        {hasStreak ? (
          <Flame size={14} strokeWidth={2.2} />
        ) : (
          <Sprout size={14} strokeWidth={2.2} />
        )}
      </span>
      <span className="streak-count">
        {streak} {streak === 1 ? 'day' : 'days'}
      </span>
    </span>
  );
}

export default StreakCounter;
