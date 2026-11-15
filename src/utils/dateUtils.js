/**
 * dateUtils.js - Date helper utilities for HabitFlow
 * Standardizes all date representations to YYYY-MM-DD format
 */

/**
 * Format a Date object into YYYY-MM-DD string
 * Uses local time components to prevent timezone shift issues
 * @param {Date} date
 * @returns {string} YYYY-MM-DD format (e.g., "2026-11-14")
 */
export function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get today's date formatted as YYYY-MM-DD
 * @returns {string}
 */
export function getTodayDateString() {
  return formatDate(new Date());
}

/**
 * Get a past or future date relative to a reference YYYY-MM-DD date
 * @param {string} dateString - Starting YYYY-MM-DD date
 * @param {number} daysAgo - Number of days to subtract (e.g., 1 for yesterday)
 * @returns {string} Target date as YYYY-MM-DD
 */
export function getPreviousDateString(dateString, daysAgo = 1) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date);
}

/**
 * Generate an array of the last N days in chronological order ending on referenceDateStr
 * @param {number} numDays - Total days to generate (e.g. 28)
 * @param {string} referenceDateStr - Ending date (defaults to today)
 * @returns {Array<{ dateStr: string, dayNumber: number, dayOfWeek: string, monthName: string, isToday: boolean }>}
 */
export function getLastNDays(numDays = 28, referenceDateStr = getTodayDateString()) {
  if (!referenceDateStr) return [];
  const [year, month, day] = referenceDateStr.split('-').map(Number);
  const days = [];

  for (let i = numDays - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, day);
    d.setDate(d.getDate() - i);
    const dateStr = formatDate(d);

    days.push({
      dateStr,
      dayNumber: d.getDate(),
      dayOfWeek: d.toLocaleDateString('en-US', { weekday: 'short' }),
      monthName: d.toLocaleDateString('en-US', { month: 'short' }),
      isToday: i === 0,
    });
  }

  return days;
}

/**
 * Format a YYYY-MM-DD string into a friendly display string (e.g. "Sat, Nov 14, 2026")
 * @param {string} dateString - YYYY-MM-DD
 * @returns {string}
 */
export function formatDateForDisplay(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Check if a date string matches YYYY-MM-DD format
 * @param {string} str
 * @returns {boolean}
 */
export function isValidDateString(str) {
  return typeof str === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(str);
}
