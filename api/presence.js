// Vercel Serverless Function: Real-Time Multi-Device Presence Counter
// Allows PC, Phone, and other concurrent visitors to synchronize live population.

// In-memory session registry (persisted in container warm memory)
const sessions = globalThis.__activePresenceSessions || new Map();
globalThis.__activePresenceSessions = sessions;

const HEARTBEAT_TTL_MS = 14000; // 14 seconds session window

export default function handler(req, res) {
  // CORS & caching headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const now = Date.now();
  const id = req.query.id || (req.body && req.body.id);
  const action = req.query.action || (req.body && req.body.action) || 'ping';

  // 1. Purge stale sessions
  for (const [sessionId, lastSeen] of sessions.entries()) {
    if (now - lastSeen > HEARTBEAT_TTL_MS) {
      sessions.delete(sessionId);
    }
  }

  // 2. Handle join / ping / leave
  if (id) {
    if (action === 'leave') {
      sessions.delete(id);
    } else {
      sessions.set(id, now);
    }
  }

  // 3. Return active count
  const liveCount = Math.max(1, sessions.size);

  return res.status(200).json({
    success: true,
    liveCount,
    timestamp: now
  });
}
