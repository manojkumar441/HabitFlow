import useLocalStorage from './useLocalStorage';
import { getTodayDateString } from '../utils/dateUtils';
import useAuth from './useAuth';

// Legacy keys from pre-auth version
export const LEGACY_KEY_HABITS = 'habitflow_habits';
export const LEGACY_KEY_COMPLETIONS = 'habitflow_completions';
export const MIGRATION_FLAG_KEY = 'habitflow_legacy_migrated_uid';

// Default starter habits for new user accounts
export const DEFAULT_HABITS = [
  {
    id: 'habit_001',
    name: 'Practice Python & DSA',
    category: 'Study',
    description: 'Solve 2 problems on arrays and clean up code.',
    createdAt: '2026-11-12',
  },
  {
    id: 'habit_002',
    name: 'Morning Jog & Stretch',
    category: 'Fitness',
    description: 'Run 2km around the neighborhood and stretch.',
    createdAt: '2026-11-13',
  },
  {
    id: 'habit_003',
    name: 'Drink 3L of Water',
    category: 'Health',
    description: 'Keep water bottle filled and track daily hydration.',
    createdAt: '2026-11-14',
  },
];

// Default completion records for new user accounts
export const DEFAULT_COMPLETIONS = {
  habit_001: ['2026-11-13', '2026-11-12'],
  habit_002: ['2026-11-14', '2026-11-13'],
  habit_003: [],
};

/**
 * Safely migrate legacy unauthenticated habit data to the first authenticated user
 * Preserves the old localStorage entries without deleting or corrupting them
 */
function checkAndMigrateLegacyData(userId) {
  if (!userId || typeof window === 'undefined') return;

  const userHabitsKey = `habitflow_${userId}_habits`;
  const userCompletionsKey = `habitflow_${userId}_completions`;

  try {
    // If this user already has habit data stored, no migration needed
    if (window.localStorage.getItem(userHabitsKey) !== null) {
      return;
    }

    const legacyMigratedTo = window.localStorage.getItem(MIGRATION_FLAG_KEY);
    const legacyHabits = window.localStorage.getItem(LEGACY_KEY_HABITS);
    const legacyCompletions = window.localStorage.getItem(LEGACY_KEY_COMPLETIONS);

    // If legacy data exists and has not been migrated to an account yet
    if (!legacyMigratedTo && legacyHabits !== null) {
      // Copy legacy data into this user's namespace
      window.localStorage.setItem(userHabitsKey, legacyHabits);

      if (legacyCompletions !== null) {
        window.localStorage.setItem(userCompletionsKey, legacyCompletions);
      }

      // Record which user received the legacy migration
      window.localStorage.setItem(MIGRATION_FLAG_KEY, userId);
    }
  } catch (error) {
    console.warn('Notice: Legacy habit migration skipped or failed:', error);
  }
}

/**
 * useHabits.js - Manages habit list and completion records isolated by Firebase user UID.
 *
 * @param {string} [userIdOverride] - Optional user ID (otherwise read from AuthContext)
 */
export function useHabits(userIdOverride) {
  const authContext = useAuth();
  const userId = userIdOverride !== undefined ? userIdOverride : authContext?.currentUser?.uid || null;

  // Perform migration for this user before mounting storage hooks
  if (userId) {
    checkAndMigrateLegacyData(userId);
  }

  // Derive user-specific localStorage keys
  const habitsKey = userId ? `habitflow_${userId}_habits` : 'habitflow_guest_habits';
  const completionsKey = userId ? `habitflow_${userId}_completions` : 'habitflow_guest_completions';

  // Persist habits and completions under this user's isolated keys
  const [habits, setHabits] = useLocalStorage(habitsKey, DEFAULT_HABITS);
  const [completions, setCompletions] = useLocalStorage(completionsKey, DEFAULT_COMPLETIONS);

  /**
   * Add a new habit for this user
   */
  const addHabit = ({ name, category = 'Personal', description = '' }) => {
    const trimmedName = name ? name.trim() : '';
    if (!trimmedName) {
      throw new Error('Habit name cannot be empty.');
    }

    const today = getTodayDateString();
    const newHabit = {
      id: `habit_${Date.now()}`,
      name: trimmedName,
      category,
      description: description ? description.trim() : '',
      createdAt: today,
    };

    setHabits((prevHabits) => [newHabit, ...prevHabits]);
    setCompletions((prev) => ({
      ...prev,
      [newHabit.id]: [],
    }));

    return newHabit;
  };

  /**
   * Update an existing habit
   */
  const updateHabit = (id, updatedFields) => {
    const trimmedName = updatedFields.name ? updatedFields.name.trim() : '';
    if (!trimmedName) {
      throw new Error('Habit name cannot be empty.');
    }

    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              name: trimmedName,
              category: updatedFields.category || habit.category,
              description:
                updatedFields.description !== undefined
                  ? updatedFields.description.trim()
                  : habit.description,
            }
          : habit
      )
    );
  };

  /**
   * Delete a habit and its completions
   */
  const deleteHabit = (id) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
    setCompletions((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  /**
   * Toggle completion status for a habit on a given date (defaults to today)
   */
  const toggleHabitCompletion = (habitId, dateStr = getTodayDateString()) => {
    setCompletions((prev) => {
      const existingDates = prev[habitId] || [];
      const alreadyCompleted = existingDates.includes(dateStr);

      let updatedDates;
      if (alreadyCompleted) {
        // Undo: remove date
        updatedDates = existingDates.filter((d) => d !== dateStr);
      } else {
        // Complete: add date without duplicates
        updatedDates = [...new Set([...existingDates, dateStr])];
      }

      return {
        ...prev,
        [habitId]: updatedDates,
      };
    });
  };

  /**
   * Clear all stored habits and completions for this user only
   */
  const clearAllData = () => {
    setHabits([]);
    setCompletions({});
  };

  /**
   * Reset data back to starter habits for this user only
   */
  const resetToDefaultData = () => {
    setHabits(DEFAULT_HABITS);
    setCompletions(DEFAULT_COMPLETIONS);
  };

  return {
    habits,
    completions,
    userId,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    clearAllData,
    resetToDefaultData,
    setHabits,
    setCompletions,
  };
}

export default useHabits;
