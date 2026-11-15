import { useState, useEffect } from 'react';

/**
 * useLocalStorage.js - Custom hook to synchronize React state with browser localStorage.
 * Supports dynamic user keys (e.g. per-user storage isolation) and safe JSON parsing.
 *
 * @param {string|null} key - The localStorage key (or null if unauthenticated)
 * @param {*} initialValue - Fallback value if key is missing or corrupted
 * @returns {[*, Function]} [storedValue, setStoredValue]
 */
export function useLocalStorage(key, initialValue) {
  // Track the active key so key changes can be handled cleanly
  const [currentKey, setCurrentKey] = useState(key);

  // Helper to read current value from localStorage safely
  const readStorage = (targetKey) => {
    if (!targetKey) return initialValue;
    try {
      const item = window.localStorage.getItem(targetKey);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${targetKey}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(() => readStorage(key));

  // If the key changed (e.g., user logged in or switched accounts),
  // immediately update state for the new key during render to avoid stale overwrites
  if (key !== currentKey) {
    setCurrentKey(key);
    const newValue = readStorage(key);
    setStoredValue(newValue);
  }

  // Synchronize state changes to localStorage
  useEffect(() => {
    if (!key) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
