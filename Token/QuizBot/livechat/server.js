require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { io: clientIo } = require('socket.io-client');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;
const coinAddress = process.env.CONTRACT_ADDRESS;

if (!coinAddress) {
  console.error("Error: Please set the CONTRACT_ADDRESS variable in your .env file.");
  process.exit(1);
}

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let pumpSocket;

function connectToPumpFun() {
  if (pumpSocket && pumpSocket.connected) {
    console.log("Already connected to Pump.fun.");
    return;
  }

  console.log("Connecting to Pump.fun...");
  pumpSocket = clientIo("https://livechat.pump.fun", {
    transports: ["websocket"],
    path: "/socket.io",
    auth: {},
    reconnection: true,
  });

  pumpSocket.on("connect", () => {
    console.log("✅ Connected to Pump.fun! Socket ID:", pumpSocket.id);
    io.emit('status', { connected: true, message: 'Connected. Joining room...' });

    console.log(`💬 Joining room: ${coinAddress}...`);
    // This sequence is crucial for properly joining the chat room.
    pumpSocket.emit("join", coinAddress);
    pumpSocket.emit("subscribe", { room: coinAddress });
    pumpSocket.emit("joinRoom", { roomId: coinAddress });
    pumpSocket.emit("join", { room: coinAddress, type: "chat" });
  });

  pumpSocket.on("disconnect", (reason) => {
    console.log("❌ Disconnected from Pump.fun:", reason);
    io.emit('status', { connected: false, message: 'Disconnected' });
  });

  pumpSocket.on("connect_error", (error) => {
    console.log("🔴 Connection error:", error.message);
    io.emit('status', { connected: false, message: `Connection Error: ${error.message}` });
  });

  // Listen for all possible message events
  const chatEvents = ["message", "chat", "newMessage", "messageReceived"];
  chatEvents.forEach(event => {
    pumpSocket.on(event, (data) => {
        // Ensure the event data has the expected structure before broadcasting
        if (data && data.username && data.message) {
            console.log(`[${event}] from ${data.username}: ${data.message}`);
            io.emit('chat-event', data);
        }
    });
  });
}

io.on('connection', (socket) => {
  console.log(`👤 Client connected. Total: ${io.engine.clientsCount}`);
  socket.emit('status', { 
    connected: pumpSocket ? pumpSocket.connected : false, 
    message: pumpSocket && pumpSocket.connected ? 'Connected' : 'Connecting...'
  });

  socket.on('disconnect', () => {
    console.log(`👤 Client disconnected. Remaining: ${io.engine.clientsCount}`);
  });
});

server.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
  console.log(`📍 Monitoring coin: ${coinAddress}`);
  connectToPumpFun();
});

process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  if (pumpSocket) {
    pumpSocket.disconnect();
  }
  server.close();
  process.exit(0);
});
