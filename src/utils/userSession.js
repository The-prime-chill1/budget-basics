const STORAGE_KEY = 'budgetbasics_student_session';
const NAME_KEY = 'budgetbasics_student_name';

// Generates or retrieves an anonymous local session ID (STU-XXXX) so students can use the platform without signup
export function getOrCreateStudentSession() {
  let session = null;
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
      session = JSON.parse(existing);
    }
  } catch (e) {
    console.warn('LocalStorage error reading session:', e);
  }

  if (!session || !session.userId) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    session = {
      userId: `STU-${randomNum}`,
      displayName: `Student STU-${randomNum}`,
      name: null,
      createdAt: new Date().toISOString(),
      role: 'Campus Learner'
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('LocalStorage error saving session:', e);
    }
  }

  // Check if a custom name was explicitly declared by the user
  try {
    const storedName = localStorage.getItem(NAME_KEY);
    if (storedName && storedName.trim()) {
      session.name = storedName.trim();
    } else {
      session.name = null;
    }
  } catch {
    session.name = null;
  }

  return session;
}

export function setStudentName(name) {
  if (!name || typeof name !== 'string') return;
  const trimmed = name.trim();
  if (!trimmed) return;
  try {
    localStorage.setItem(NAME_KEY, trimmed);
    const session = getOrCreateStudentSession();
    session.name = trimmed;
    session.displayName = trimmed;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (e) {
    console.warn('LocalStorage error setting student name:', e);
  }
}
