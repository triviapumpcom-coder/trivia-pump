export type LiveChatMessage = {
  roomMint?: string;
  account: string; // wallet or stable account id
  displayName?: string;
  message: string;
};

type StartArgs = { contractAddress: string; onMessage: (msg: LiveChatMessage) => void };

// Global socket to manage disconnection
let globalPumpSocket: any = null;

export async function startPumpChatIntegration(
  contractAddress: string,
  onMessage: (msg: LiveChatMessage) => void
): Promise<void> {
  try {
    // Disconnect any existing connection first
    if (globalPumpSocket) {
      console.log(`🔌 [pumpChat] DISCONNECTING old socket`);
      globalPumpSocket.disconnect();
      globalPumpSocket = null;
    }

    const { io } = await import("socket.io-client");
    const pumpSocket = io("https://livechat.pump.fun", {
      transports: ["websocket"],
      path: "/socket.io",
      reconnection: true,
      forceNew: true, // Force new connection
    });
    
    globalPumpSocket = pumpSocket;

    pumpSocket.on("connect", () => {
      // eslint-disable-next-line no-console
      console.log(`🔥 [pumpChat] CONNECTED to pump.fun! Socket ID: ${pumpSocket.id}`);
      console.log(`🎯 [pumpChat] JOINING ROOM: ${contractAddress}`);
      pumpSocket.emit("join", contractAddress);
      pumpSocket.emit("subscribe", { room: contractAddress });
      pumpSocket.emit("joinRoom", { roomId: contractAddress });
      pumpSocket.emit("join", { room: contractAddress, type: "chat" });
    });

    // Debug: Listen to ALL events
    pumpSocket.onAny((eventName: string, ...args: any[]) => {
      console.log(`🔍 [pumpChat] Event received: ${eventName}`, JSON.stringify(args, null, 2));
    });

    const chatEvents = ["message", "chat", "newMessage", "messageReceived"];
    chatEvents.forEach((event) => {
      pumpSocket.on(event, (data: any) => {
        console.log(`🔍 [pumpChat] ${event} event:`, JSON.stringify(data, null, 2));
        if (data && (data.username || data.user || data.account) && data.message) {
          console.log(`✅ [pumpChat] Valid message found, calling onMessage`);
          onMessage({
            account: data.account || data.user || data.username,
            displayName: data.username || data.user,
            message: data.message,
          });
        } else {
          console.log(`⚠️ [pumpChat] Invalid message format:`, data);
        }
      });
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[pumpChat] fallback connection error", err);
  }
}


