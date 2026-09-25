import { useState, useEffect } from 'react';

const STORAGE_KEY = 'budgetbee_active_sessions';
const TOTAL_VISITS_KEY = 'budgetbee_total_visits';
const SESSION_VISITED_KEY = 'budgetbee_session_counted';
const HEARTBEAT_INTERVAL_MS = 3500;
const SESSION_TIMEOUT_MS = 14000;

function getSessionId() {
  if (typeof window === 'undefined') return 'server_session';
  let tabId = sessionStorage.getItem('budgetbee_tab_id');
  if (!tabId) {
    tabId = 'device_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    sessionStorage.setItem('budgetbee_tab_id', tabId);
  }
  return tabId;
}

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

// Hybrid presence counter: pings /api/presence endpoint, falling back to BroadcastChannel and localStorage when offline
export function useVisitorCount() {
  const [liveCount, setLiveCount] = useState(1);
  const [totalVisits, setTotalVisits] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sessionId = getSessionId();
    const visits = recordTotalVisit();
    setTotalVisits(visits);

    let isMounted = true;

    const pingPresence = async (action = 'ping') => {
      try {
        const response = await fetch(`/api/presence?action=${action}&id=${encodeURIComponent(sessionId)}&_t=${Date.now()}`, {
          method: 'GET',
          cache: 'no-store'
        });

        if (response.ok) {
          const data = await response.json();
          if (isMounted && typeof data.liveCount === 'number') {
            setLiveCount(Math.max(1, data.liveCount));
            return;
          }
        }
      } catch (err) {
      }

      if (isMounted) {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          const sessions = raw ? JSON.parse(raw) : {};
          const now = Date.now();
          const active = {};

          Object.keys(sessions).forEach((id) => {
            if (now - sessions[id] < SESSION_TIMEOUT_MS) {
              active[id] = sessions[id];
            }
          });

          if (action !== 'leave') {
            active[sessionId] = now;
          }

          localStorage.setItem(STORAGE_KEY, JSON.stringify(active));
          setLiveCount(Math.max(1, Object.keys(active).length));
        } catch (e) {
        }
      }
    };

    pingPresence('ping');

    const heartbeatTimer = setInterval(() => {
      pingPresence('ping');
    }, HEARTBEAT_INTERVAL_MS);

    let channel = null;
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        channel = new BroadcastChannel('budgetbee_presence_channel');
        channel.onmessage = (msg) => {
          if (msg.data && msg.data.type === 'HEARTBEAT') {
            pingPresence('ping');
          }
        };
        channel.postMessage({ type: 'HEARTBEAT' });
      } catch (e) {
      }
    }

    const handleLeave = () => {
      const leaveUrl = `/api/presence?action=leave&id=${encodeURIComponent(sessionId)}&_t=${Date.now()}`;
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        try {
          navigator.sendBeacon(leaveUrl);
        } catch (e) {
          fetch(leaveUrl, { keepalive: true }).catch(() => {});
        }
      } else {
        fetch(leaveUrl, { keepalive: true }).catch(() => {});
      }

      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const sessions = JSON.parse(raw);
          delete sessions[sessionId];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
        }
      } catch (e) {}
    };

    window.addEventListener('beforeunload', handleLeave);
    window.addEventListener('pagehide', handleLeave);

    return () => {
      isMounted = false;
      clearInterval(heartbeatTimer);
      window.removeEventListener('beforeunload', handleLeave);
      window.removeEventListener('pagehide', handleLeave);
      handleLeave();
      if (channel) {
        channel.close();
      }
    };
  }, []);

  return { liveCount, totalVisits };
}
