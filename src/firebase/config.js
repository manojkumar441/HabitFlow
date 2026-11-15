import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

/**
 * Read Firebase credentials safely from Vite environment variables.
 * In Vite, all client-exposed environment variables MUST begin with 'VITE_'.
 */
const firebaseConfig = {
  apiKey: (
    import.meta.env.VITE_FIREBASE_API_KEY ||
    import.meta.env.VITE_API_KEY ||
    import.meta.env.VITE_FIREBASE_APIKEY ||
    ''
  ).trim(),
  authDomain: (
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    import.meta.env.VITE_AUTH_DOMAIN ||
    ''
  ).trim(),
  projectId: (
    import.meta.env.VITE_FIREBASE_PROJECT_ID ||
    import.meta.env.VITE_PROJECT_ID ||
    ''
  ).trim(),
  storageBucket: (
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    import.meta.env.VITE_STORAGE_BUCKET ||
    ''
  ).trim(),
  messagingSenderId: (
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    import.meta.env.VITE_MESSAGING_SENDER_ID ||
    import.meta.env.VITE_FIREBASE_SENDER_ID ||
    ''
  ).trim(),
  appId: (
    import.meta.env.VITE_FIREBASE_APP_ID ||
    import.meta.env.VITE_APP_ID ||
    ''
  ).trim(),
  measurementId: (
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ||
    import.meta.env.VITE_MEASUREMENT_ID ||
    ''
  ).trim(),
};

/**
 * Validates that the necessary Firebase configuration values exist
 * and are not placeholder text or empty strings.
 */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'your_api_key_here' &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== 'your_project_id'
);

let app = null;
let auth = null;

// Only initialize Firebase if credentials have been populated in .env
if (isFirebaseConfigured) {
  try {
    // If already initialized (e.g. during Vite HMR reload), reuse existing instance
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
  } catch (error) {
    console.error('Error initializing Firebase Auth:', error);
  }
} else {
  console.warn(
    'Notice: Firebase configuration in .env is pending. Please populate your VITE_FIREBASE_* variables in Habitflow/.env'
  );
}

export { firebaseConfig, app, auth };
export default app;
