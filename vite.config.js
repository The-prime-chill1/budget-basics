import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Lightweight local presence middleware for multi-device testing on local network
function localPresencePlugin() {
  const localSessions = new Map();
  const TTL_MS = 14000;

  return {
    name: 'local-presence-middleware',
    configureServer(server) {
      server.middlewares.use('/api/presence', (req, res) => {
        const url = new URL(req.url, 'http://localhost:3000');
        const id = url.searchParams.get('id');
        const action = url.searchParams.get('action') || 'ping';
        const now = Date.now();

        // Clean stale sessions
        for (const [sessId, time] of localSessions.entries()) {
          if (now - time > TTL_MS) {
            localSessions.delete(sessId);
          }
        }

        // Handle session
        if (id) {
          if (action === 'leave') {
            localSessions.delete(id);
          } else {
            localSessions.set(id, now);
          }
        }

        const count = Math.max(1, localSessions.size);

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({
          success: true,
          liveCount: count,
          timestamp: now
        }));
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localPresencePlugin()],
  server: {
    port: 3000,
    open: true,
    host: true // Expose to local network so phone can test localhost
  }
});
