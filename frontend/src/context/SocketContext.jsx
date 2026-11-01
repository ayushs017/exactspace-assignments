import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUserCount, setOnlineUserCount] = useState(1);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Attempt connecting to the backend via relative path (proxied by Vite) or fallback to localhost:5001
    const socket = io(window.location.origin, {
      path: "/socket.io",
      transports: ["websocket", "polling"],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 5000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[SocketContext] Connected to server:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("[SocketContext] Disconnected from server");
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.warn("[SocketContext] Connection error, fallback active:", err.message);
      setIsConnected(false);
    });

    socket.on("user_count", (count) => {
      if (typeof count === "number") {
        setOnlineUserCount(count);
      }
    });

    socket.on("init_messages", (initialMessages) => {
      if (Array.isArray(initialMessages)) {
        setMessages(initialMessages);
      }
    });

    socket.on("new_message", (message) => {
      setMessages((prev) => {
        // Prevent duplicate appending
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    socket.on("update_likes", ({ messageId, likes }) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, likes } : m))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (text, user) => {
    if (!text.trim()) return;

    if (isConnected && socketRef.current) {
      socketRef.current.emit("send_message", { text: text.trim(), user });
    } else {
      // Offline fallback: generate local message
      const now = new Date();
      const timestamp = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      const localMsg = {
        id: "local-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
        user,
        text: text.trim(),
        timestamp,
        likes: 0,
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, localMsg]);
    }
  };

  const likeMessage = (messageId) => {
    if (isConnected && socketRef.current) {
      socketRef.current.emit("like_message", { messageId });
    } else {
      // Local optimistic update
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId ? { ...m, likes: (m.likes || 0) + 1 } : m
        )
      );
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        onlineUserCount,
        messages,
        sendMessage,
        likeMessage,
        setMessages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
