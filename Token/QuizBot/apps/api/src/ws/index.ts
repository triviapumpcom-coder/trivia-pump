import type { Server as IOServer } from "socket.io";

export function setupWS(io: IOServer) {
  io.on("connection", (socket) => {
    socket.emit("hello", { t: Date.now() });
  });

  return {
    broadcast(event: string, payload: unknown) {
      io.emit(event, payload);
    },
  };
}


