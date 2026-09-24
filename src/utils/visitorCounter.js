import { useState, useEffect } from 'react';

const STORAGE_KEY = 'budgetbee_active_sessions';
const TOTAL_VISITS_KEY = 'budgetbee_total_visits';
const SESSION_VISITED_KEY = 'budgetbee_session_counted';
const HEARTBEAT_INTERVAL_MS = 3000;
const SESSION_TIMEOUT_MS = 8000;

// Unique tab session ID for this browser tab
function getTabId() {
  if (typeof window === 'undefined') return 'server_session';
  let tabId = sessionStorage.getItem('budgetbee_tab_id');
  if (!tabId) {
    tabId = 'tab_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    sessionStorage.setItem('budgetbee_tab_id', tabId);
  }
  return tabId;
}

// Read and sanitize active sessions from localStorage
function getCleanedSessions(tabId) {
  if (typeof window === 'undefined') return { count: 1, sessions: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const sessions = raw ? JSON.parse(raw) : {};
    const now = Date.now();
    const active = {};

    // Filter out expired tab heartbeats
    Object.keys(sessions).forEach((id) => {
      if (now - sessions[id] < SESSION_TIMEOUT_MS) {
        active[id] = sessions[id];
      }
    });

    // Ensure current tab is registered
    if (tabId) {
      active[tabId] = now;
    }

    const count = Math.max(1, Object.keys(active).length);
    return { count, sessions: active };
  } catch (e) {
    return { count: 1, sessions: {} };
  }
}

// Record total visits count in localStorage
function recordTotalVisit() {
  if (typeof window === 'undefined') return 1;
  try {
    let total = parseInt(localStorage.getItem(TOTAL_VISITS_KEY) || '0', 10);
    const alreadyCountedInSession = sessionStorage.getItem(SESSION_VISITED_KEY);
    if (!alreadyCountedInSession) {
      total += 1;
      localStorage.setItem(TOTAL_VISITS_KEY, String(total));
      sessionStorage.setItem(SESSION_VISITED_KEY, 'true');
    }
    return Math.max(1, total);
  } catch (e) {
    return 1;
  }
}

/**
 * Custom React hook that tracks real-time population/visitors
 * using localStorage and multi-tab synchronization.
 * Default is 1 on first visit; increments when new tabs/visitors join.
 */
export function useVisitorCount() {
  const [liveCount, setLiveCount] = useState(1);
  const [totalVisits, setTotalVisits] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const tabId = getTabId();
    const visits = recordTotalVisit();
    setTotalVisits(visits);

    // Register tab and update count
    const updatePresence = () => {
      const { count, sessions } = getCleanedSessions(tabId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
      } catch (err) {
        // Ignore quota errors
      }
      setLiveCount(count);
    };

    // Initial registration
    updatePresence();

    // Regular heartbeat to keep this tab alive in localStorage
    const heartbeatTimer = setInterval(() => {
      updatePresence();
    }, HEARTBEAT_INTERVAL_MS);

    // Multi-tab synchronization using storage event
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          const sessions = e.newValue ? JSON.parse(e.newValue) : {};
          const now = Date.now();
          let count = 0;
          Object.values(sessions).forEach((ts) => {
            if (now - ts < SESSION_TIMEOUT_MS) count++;
          });
          setLiveCount(Math.max(1, count));
        } catch (err) {
          // fallback
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // BroadcastChannel if supported by the browser
    let channel = null;
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        channel = new BroadcastChannel('budgetbee_presence_channel');
        channel.onmessage = (msg) => {
          if (msg.data && msg.data.type === 'HEARTBEAT') {
            updatePresence();
          }
        };
        channel.postMessage({ type: 'HEARTBEAT' });
      } catch (e) {
        // BroadcastChannel unavailable
      }
    }

    // Cleanup on tab close / unmount
    const handleUnload = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const sessions = JSON.parse(raw);
          delete sessions[tabId];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
          if (channel) {
            channel.postMessage({ type: 'HEARTBEAT' });
          }
        }
      } catch (err) {
        // Ignore
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);

    return () => {
      clearInterval(heartbeatTimer);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('pagehide', handleUnload);
      handleUnload();
      if (channel) {
        channel.close();
      }
    };
  }, []);

  return { liveCount, totalVisits };
}
