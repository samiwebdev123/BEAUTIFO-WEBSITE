/**
 * BEAUTIFO Admin Authentication & Session Service
 * 
 * Fixed Admin Password: Beautifo@2026
 * Pure client-side sessionStorage administration session.
 * No environment variables, no external auth, no OTP.
 */

const ADMIN_SESSION_KEY = 'beautifo_admin_session';
const ADMIN_PASSWORD = 'Beautifo@2026';

/**
 * Returns true if an active admin session exists in sessionStorage (or localStorage fallback).
 */
export function isAdminAuthenticated(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY) || localStorage.getItem(ADMIN_SESSION_KEY);
    return session === 'active';
  } catch {
    return false;
  }
}

/**
 * Validates the entered admin password against the fixed password Beautifo@2026.
 * If valid, immediately creates an active session.
 */
export function loginAdmin(enteredPassword: string): { success: boolean; error?: string } {
  // Check exact password
  if (enteredPassword === ADMIN_PASSWORD) {
    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'active');
        localStorage.setItem(ADMIN_SESSION_KEY, 'active');
      }
    } catch (e) {
      console.error('Session storage error', e);
    }
    return { success: true };
  }

  // Exact required error message
  return { success: false, error: 'Incorrect password' };
}

/**
 * Clears the admin session and returns to /admin.
 */
export function logoutAdmin(): void {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch (e) {
    console.error('Logout error', e);
  }
}

