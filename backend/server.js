import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Color mapping for users
const USER_COLORS = {
  "PubNub Bot": "#E55353",
  Alan: "#3B82F6",
  Bob: "#10B981",
  Carol: "#F59E0B",
  Dean: "#8B5CF6",
  Elin: "#EC4899",
};

// Initial seed messages reflecting the assignment demo GIF
let messages = [
  {
    id: "msg-seed-1",
    user: "PubNub Bot",
    avatarColor: USER_COLORS["PubNub Bot"],
    text: "Welcome to Team Chat. 👏👏 Send a message now to start interacting with other users in the app. ⬇️",
    timestamp: "12:16",
    likes: 2,
    createdAt: Date.now() - 3600000,
  },
  {
    id: "msg-seed-2",
    user: "Alan",
    avatarColor: USER_COLORS["Alan"],
    text: "Hey everyone! Glad to test out the real-time chat interface. 👋",
    timestamp: "17:28",
    likes: 5,
    createdAt: Date.now() - 1800000,
  },
  {
    id: "msg-seed-3",
    user: "Elin",
    avatarColor: USER_COLORS["Elin"],
    text: "Oh hi, @Alan! Rolande is around, too... check out the @mentions feature! 🎉",
    timestamp: "17:30",
    likes: 3,
    createdAt: Date.now() - 900000,
  },
];

// Helper to format current time as HH:mm
function getCurrentTimeString() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

// REST Endpoints
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Exactspace Real-time Chat API",
    uptime: process.uptime(),
    activeSockets: io.engine.clientsCount,
    messageCount: messages.length,
  });
});

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const { text, user } = req.body;
  if (!text || !user) {
    return res.status(400).json({ error: "Missing required fields: text, user" });
  }

  const newMessage = {
    id: "msg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    user,
    avatarColor: USER_COLORS[user] || "#64748B",
    text,
    timestamp: getCurrentTimeString(),
    likes: 0,
    createdAt: Date.now(),
  };

  messages.push(newMessage);
  io.emit("new_message", newMessage);
  res.status(201).json(newMessage);
});

app.post("/api/messages/:id/like", (req, res) => {
  const { id } = req.params;
  const target = messages.find((m) => m.id === id);
  if (!target) {
    return res.status(404).json({ error: "Message not found" });
  }

  target.likes += 1;
  io.emit("update_likes", { messageId: id, likes: target.likes });
  res.json({ messageId: id, likes: target.likes });
});

app.post("/api/messages/reset", (req, res) => {
  messages = messages.slice(0, 3);
  io.emit("init_messages", messages);
  res.json({ message: "Messages reset to seed", messages });
});

// Socket.IO Real-time Connection Handling
io.on("connection", (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  // Send initial message history to new client
  socket.emit("init_messages", messages);

  // Broadcast user count update
  io.emit("user_count", io.engine.clientsCount);

  // Handle incoming chat messages
  socket.on("send_message", (data) => {
    if (!data || !data.text || !data.user) {
      return;
    }

    const newMessage = {
      id: "msg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      user: data.user,
      avatarColor: USER_COLORS[data.user] || "#64748B",
      text: data.text.trim(),
      timestamp: getCurrentTimeString(),
      likes: 0,
      createdAt: Date.now(),
    };

    messages.push(newMessage);
    // Broadcast to all connected clients including sender
    io.emit("new_message", newMessage);
  });

  // Handle like button click
  socket.on("like_message", ({ messageId }) => {
    if (!messageId) return;
    const target = messages.find((m) => m.id === messageId);
    if (target) {
      target.likes += 1;
      io.emit("update_likes", { messageId, likes: target.likes });
    }
  });

  // Handle typing indicator
  socket.on("typing", (data) => {
    socket.broadcast.emit("user_typing", data);
  });

  socket.on("disconnect", () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    io.emit("user_count", io.engine.clientsCount);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Exactspace Backend & Socket.IO server running on http://localhost:${PORT}`);
});
