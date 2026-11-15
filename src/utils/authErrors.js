/**
 * authErrors.js - Translates Firebase Authentication error codes
 * into human-readable, beginner-friendly error messages.
 */
export function formatAuthError(error) {
  if (!error) return '';

  const code = error.code || '';

  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email address is already registered. Please log in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'Email/password sign-in is not enabled in Firebase Console.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/user-disabled':
      return 'This user account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email address. Please sign up.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please verify your details.';
    case 'auth/too-many-requests':
      return 'Access temporarily disabled due to too many failed attempts. Try again later.';
    case 'auth/network-request-failed':
      return 'Network connection error. Please check your internet connection.';
    case 'auth/missing-password':
      return 'Please enter your password.';
    case 'auth/missing-email':
      return 'Please enter your email address.';
    default:
      return error.message || 'An unexpected authentication error occurred. Please try again.';
  }
}

export default formatAuthError;
