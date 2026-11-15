import { useMemo } from 'react';
import { BarChart3, Flame, Sprout, Lightbulb } from 'lucide-react';
import CalendarHeatmap from '../components/CalendarHeatmap';
import { getTodayDateString } from '../utils/dateUtils';
import { calculateAllStreaks } from '../utils/streakUtils';

// Stable empty fallbacks to avoid recreation on re-renders
const EMPTY_HABITS = [];
const EMPTY_COMPLETIONS = {};

/**
 * Analytics.jsx - Comprehensive habit analytics & 28-day activity calendar.
 * Uses Lucide icons for empty state, streaks, and tips.
 */
function Analytics({ habitManager }) {
  const habits = habitManager ? habitManager.habits : EMPTY_HABITS;
  const completions = habitManager ? habitManager.completions : EMPTY_COMPLETIONS;

  const todayStr = useMemo(() => getTodayDateString(), []);

  // Calculate streaks across habits
  const { bestStreak } = useMemo(() => {
    return calculateAllStreaks(habits, completions, todayStr);
  }, [habits, completions, todayStr]);

  // Total completions across all records
  const totalAllTimeLogs = useMemo(() => {
    return Object.values(completions).reduce(
      (acc, dates) => acc + (Array.isArray(dates) ? dates.length : 0),
      0
    );
  }, [completions]);

  if (habits.length === 0) {
    return (
      <div className="analytics-page">
        <div className="page-header">
          <h1 className="welcome-title">Analytics & Activity</h1>
          <p className="page-subtitle">Track your consistency, streaks, and habit trends over time.</p>
        </div>

        <div className="empty-habits-state">
          <div className="empty-icon" aria-hidden="true">
            <BarChart3 size={48} strokeWidth={1.75} color="var(--primary)" />
          </div>
          <h3 className="empty-title">No Habit Analytics Yet</h3>
          <p className="empty-subtitle">
            You don&apos;t have any active habits. Add habits on the Dashboard and mark them complete
            to populate your 28-day activity calendar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1 className="welcome-title">Analytics & Activity</h1>
        <p className="page-subtitle">Track your consistency, streaks, and habit trends over time.</p>
      </div>

      {/* Analytics Overview Metric Cards */}
      <div className="stats-grid" style={{ marginBottom: '28px' }}>
        <div className="stat-card">
          <span className="stat-label">Active Habits</span>
          <span className="stat-value">{habits.length}</span>
          <span className="stat-note">Tracked daily</span>
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
          <span className="stat-note">{bestStreak === 1 ? '1 day' : `${bestStreak} days`} active streak</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Total Completions</span>
          <span className="stat-value" style={{ color: 'var(--primary)' }}>
            {totalAllTimeLogs}
          </span>
          <span className="stat-note">All-time check-ins logged</span>
        </div>
      </div>

      {/* 28-Day Activity Heatmap Grid */}
      <div style={{ marginBottom: '28px' }}>
        <CalendarHeatmap
          habits={habits}
          completions={completions}
          todayStr={todayStr}
        />
      </div>

      {/* Consistency Tips Card */}
      <div className="settings-card">
        <h3 className="settings-card-title" style={{ display: 'flex', alignItems: 'center' }}>
          <Lightbulb size={18} strokeWidth={2} style={{ color: '#D97706', marginRight: '8px' }} />
          Consistency Tips
        </h3>
        <p className="settings-card-desc" style={{ marginBottom: 0 }}>
          Streaks compound over time. Even completing just <strong>one habit per day</strong> keeps your habit
          neural pathways strong. Review your 28-day grid weekly to spot which days of the week you tend to be
          most consistent!
        </p>
      </div>
    </div>
  );
}

export default Analytics;
