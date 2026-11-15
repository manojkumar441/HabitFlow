import { getTodayDateString, getPreviousDateString } from './dateUtils';

/**
 * streakUtils.js - Consecutive habit streak calculations
 *
 * Requirements Rule:
 * "A streak is the number of consecutive dates on which the habit was completed,
 * counting back from today. If it was not completed today, the calculation may
 * allow the streak to continue from yesterday."
 */

/**
 * Calculate the current active streak for a single habit
 *
 * @param {string[]} completedDates - Array of YYYY-MM-DD date strings when habit was done
 * @param {string} todayStr - Today's date as YYYY-MM-DD (defaults to current date)
 * @returns {number} The consecutive active streak in days
 */
export function calculateStreak(completedDates = [], todayStr = getTodayDateString()) {
  if (!Array.isArray(completedDates) || completedDates.length === 0) {
    return 0;
  }

  // Use a Set for instant O(1) date lookups
  const dateSet = new Set(completedDates);

  const completedToday = dateSet.has(todayStr);
  const yesterdayStr = getPreviousDateString(todayStr, 1);
  const completedYesterday = dateSet.has(yesterdayStr);

  // If the habit was not done today AND not done yesterday, the streak is 0
  if (!completedToday && !completedYesterday) {
    return 0;
  }

  let streak = 0;
  // If completed today, we count starting from today (0 days ago).
  // If NOT completed today (but was completed yesterday), we start counting from yesterday (1 day ago).
  let daysAgo = completedToday ? 0 : 1;

  while (true) {
    const targetDate = daysAgo === 0 ? todayStr : getPreviousDateString(todayStr, daysAgo);

    if (dateSet.has(targetDate)) {
      streak += 1;
      daysAgo += 1;
    } else {
      // Consecutive chain is broken
      break;
    }
  }

  return streak;
}

/**
 * Calculate streaks for an entire collection of habits
 *
 * @param {Array} habits - List of habit objects
 * @param {Object} completions - Mapping of habitId -> array of completed dates
 * @param {string} todayStr - Today's date as YYYY-MM-DD
 * @returns {{ streaksByHabit: Object, bestStreak: number }}
 */
export function calculateAllStreaks(habits = [], completions = {}, todayStr = getTodayDateString()) {
  const streaksByHabit = {};
  let bestStreak = 0;

  habits.forEach((habit) => {
    const dates = completions[habit.id] || [];
    const habitStreak = calculateStreak(dates, todayStr);
    streaksByHabit[habit.id] = habitStreak;

    if (habitStreak > bestStreak) {
      bestStreak = habitStreak;
    }
  });

  return {
    streaksByHabit,
    bestStreak,
  };
}
