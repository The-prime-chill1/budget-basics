/**
 * User Session Manager (Auth-Free & Privacy-First)
 * Automatically provisions an anonymous unique Student ID for any visitor.
 * Persists in localStorage with zero authentication or backend requirements.
 */

const STORAGE_KEY = 'budgetbasics_student_session';

export function getOrCreateStudentSession() {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
      const parsed = JSON.parse(existing);
      if (parsed && parsed.userId) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('LocalStorage error reading session:', e);
  }

  // Generate anonymous student ID, e.g. STU-4829
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newSession = {
    userId: `STU-${randomNum}`,
    displayName: `Student #${randomNum}`,
    createdAt: new Date().toISOString(),
    role: 'Campus Learner (Guest)'
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
  } catch (e) {
    console.warn('LocalStorage error saving session:', e);
  }

  return newSession;
}
