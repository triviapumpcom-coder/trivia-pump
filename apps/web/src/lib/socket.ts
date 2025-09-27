import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(apiBase?: string): Socket {
  // Use current domain in production, localhost in development
  const currentDomain = typeof window !== 'undefined' ? window.location.origin : '';
  const base = apiBase ?? (import.meta as any).env?.VITE_API_BASE ?? currentDomain || "http://127.0.0.1:5001";
  console.log('🔗 WebSocket connecting to:', base);
  if (!socket) {
    socket = io(base, { 
      transports: ["websocket"], 
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    // Connection event handlers
    socket.on('connect', () => {
      console.log('🔗 Connected to server');
    });

    socket.on('disconnect', (reason) => {
      console.log('🔌 Disconnected:', reason);
    });

    socket.on('reconnect', (attemptNumber) => {
      console.log('🔄 Reconnected after', attemptNumber, 'attempts');
    });

    socket.on('reconnect_error', (error) => {
      console.warn('❌ Reconnection failed:', error);
    });
  }
  return socket;
}


