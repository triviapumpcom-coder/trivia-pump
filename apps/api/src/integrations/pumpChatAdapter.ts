export type LiveChatMessage = {
  roomMint?: string;
  account: string; // wallet or stable account id
  displayName?: string;
  message: string;
};

type StartArgs = { contractAddress: string; onMessage: (msg: LiveChatMessage) => void };

export async function startPumpChatIntegration(
  contractAddress: string,
  onMessage: (msg: LiveChatMessage) => void
): Promise<void> {
  try {
    const { io } = await import("socket.io-client");
    const pumpSocket = io("https://livechat.pump.fun", {
      transports: ["websocket"],
      path: "/socket.io",
      reconnection: true,
    });

    pumpSocket.on("connect", () => {
      // eslint-disable-next-line no-console
      console.log(`🔥 [pumpChat] CONNECTED to pump.fun! Socket ID: ${pumpSocket.id}`);
      console.log(`🎯 [pumpChat] JOINING ROOM: ${contractAddress}`);
      pumpSocket.emit("join", contractAddress);
      pumpSocket.emit("subscribe", { room: contractAddress });
      pumpSocket.emit("joinRoom", { roomId: contractAddress });
      pumpSocket.emit("join", { room: contractAddress, type: "chat" });
    });

    const chatEvents = ["message", "chat", "newMessage", "messageReceived"];
    chatEvents.forEach((event) => {
      pumpSocket.on(event, (data: any) => {
        if (data && (data.username || data.user || data.account) && data.message) {
          onMessage({
            account: data.account || data.user || data.username,
            displayName: data.username || data.user,
            message: data.message,
          });
        }
      });
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[pumpChat] fallback connection error", err);
  }
}


