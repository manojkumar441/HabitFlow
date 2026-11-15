import { useState, useMemo } from 'react';
import { CalendarCheck, Zap, Target } from 'lucide-react';
import { getLastNDays, formatDateForDisplay, getTodayDateString } from '../utils/dateUtils';

/**
 * CalendarHeatmap.jsx - 28-Day Activity Grid / Heatmap Component.
 * Uses Lucide CalendarCheck for grid header, Zap for active days, and Target for consistency rate.
 */
function CalendarHeatmap({ habits = [], completions = {}, todayStr = getTodayDateString() }) {
  const [selectedDay, setSelectedDay] = useState(null);

  // Generate the last 28 days in chronological order
  const days = useMemo(() => {
    return getLastNDays(28, todayStr);
  }, [todayStr]);

  // Map each day to its completion count and completed habit names
  const activityData = useMemo(() => {
    return days.map((day) => {
      const completedHabits = habits.filter((habit) => {
        const dates = completions[habit.id] || [];
        return dates.includes(day.dateStr);
      });

      const count = completedHabits.length;

      // Activity level: 0 (none), 1 (1 habit), 2 (2 habits), 3 (3+ habits)
      let level = 0;
      if (count === 1) level = 1;
      else if (count === 2) level = 2;
      else if (count >= 3) level = 3;

      return {
        ...day,
        count,
        level,
        completedHabitNames: completedHabits.map((h) => h.name),
      };
    });
  }, [days, habits, completions]);

  // Summary statistics for the 28-day window
  const totalCompletionsInWindow = useMemo(() => {
    return activityData.reduce((acc, curr) => acc + curr.count, 0);
  }, [activityData]);

  const activeDaysCount = useMemo(() => {
    return activityData.filter((d) => d.count > 0).length;
  }, [activityData]);

  const consistencyRate = Math.round((activeDaysCount / 28) * 100);

  const startDateFormatted = days.length > 0 ? formatDateForDisplay(days[0].dateStr) : '';
  const endDateFormatted = days.length > 0 ? formatDateForDisplay(days[days.length - 1].dateStr) : '';

  return (
    <div className="calendar-heatmap-card">
      <div className="heatmap-header">
        <div>
          <h2 className="heatmap-title" style={{ display: 'flex', alignItems: 'center' }}>
            <CalendarCheck size={20} strokeWidth={2} style={{ marginRight: '8px' }} />
            28-Day Activity Grid
          </h2>
          <p className="heatmap-subtitle">
            {startDateFormatted} — {endDateFormatted}
          </p>
        </div>

        <div className="heatmap-meta-badges">
          <span className="heatmap-badge" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Zap size={14} strokeWidth={2.2} style={{ marginRight: '5px', color: 'var(--primary)' }} />
            <span><strong>{activeDaysCount} / 28</strong> active days</span>
          </span>
          <span className="heatmap-badge highlight" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Target size={14} strokeWidth={2.2} style={{ marginRight: '5px' }} />
            <span><strong>{consistencyRate}%</strong> consistency</span>
          </span>
        </div>
      </div>

      {/* 28-Day Heatmap Grid */}
      <div className="heatmap-grid" role="grid" aria-label="28-day habit activity calendar">
        {activityData.map((day) => {
          const tooltip = `${formatDateForDisplay(day.dateStr)}${day.isToday ? ' (Today)' : ''}: ${
            day.count === 0
              ? 'No habits completed'
              : `${day.count} ${day.count === 1 ? 'habit' : 'habits'} completed (${day.completedHabitNames.join(', ')})`
          }`;

          const isSelected = selectedDay && selectedDay.dateStr === day.dateStr;

          return (
            <button
              key={day.dateStr}
              type="button"
              className={`heatmap-cell level-${day.level} ${day.isToday ? 'is-today' : ''} ${
                isSelected ? 'is-selected' : ''
              }`}
              title={tooltip}
              onClick={() => setSelectedDay(isSelected ? null : day)}
              aria-label={tooltip}
            >
              <span className="cell-day-name">{day.dayOfWeek}</span>
              <span className="cell-day-number">{day.dayNumber}</span>
              {day.count > 0 && <span className="cell-count-pill">{day.count}</span>}
              {day.isToday && <span className="today-dot" title="Today" />}
            </button>
          );
        })}
      </div>

      {/* Selected Day Detail Popover / Callout */}
      {selectedDay && (
        <div className="selected-day-detail">
          <div className="detail-header">
            <strong>{formatDateForDisplay(selectedDay.dateStr)}</strong>
            {selectedDay.isToday && <span className="tag-badge health">Today</span>}
          </div>
          <p className="detail-summary">
            {selectedDay.count === 0 ? (
              'No habits were marked complete on this date.'
            ) : (
              <>
                Completed <strong>{selectedDay.count}</strong> {selectedDay.count === 1 ? 'habit' : 'habits'}:{' '}
                <span className="detail-habit-list">
                  {selectedDay.completedHabitNames.join(', ')}
                </span>
              </>
            )}
          </p>
        </div>
      )}

      {/* Heatmap Legend */}
      <div className="heatmap-legend">
        <span className="legend-label">Activity Level:</span>
        <div className="legend-items">
          <span className="legend-step">
            <span className="legend-color level-0" />
            <span>0</span>
          </span>
          <span className="legend-step">
            <span className="legend-color level-1" />
            <span>1</span>
          </span>
          <span className="legend-step">
            <span className="legend-color level-2" />
            <span>2</span>
          </span>
          <span className="legend-step">
            <span className="legend-color level-3" />
            <span>3+</span>
          </span>
        </div>
        <span className="legend-total">Total logs: {totalCompletionsInWindow}</span>
      </div>
    </div>
  );
}

export default CalendarHeatmap;
