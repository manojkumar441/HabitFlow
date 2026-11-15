/**
 * firebaseConfig.js - Compatibility bridge
 * Re-exports Firebase instances and configuration from src/firebase/config.js
 */
export {
  firebaseConfig,
  isFirebaseConfigured,
  app,
  auth,
  default,
} from './firebase/config';
