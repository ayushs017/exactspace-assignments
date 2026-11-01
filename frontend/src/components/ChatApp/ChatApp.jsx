import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { useSocket } from "../../context/SocketContext";

export const ChatApp = () => {
  const { messages, sendMessage, likeMessage, isConnected, onlineUserCount } = useSocket();
  const [activeChannel, setActiveChannel] = useState("introductions");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const channelTitles = {
    "poland-office": {
      name: "Poland Office",
      subtitle: "Updates and discussion from the Krakow & Warsaw branches",
    },
    introductions: {
      name: "Introductions",
      subtitle: "This Channel Is For Company Wide Chatter",
    },
    "india-office": {
      name: "India Office",
      subtitle: "Headquarters chatter from Bangalore tech park",
    },
  };

  const currentChannel = channelTitles[activeChannel] || channelTitles.introductions;

  return (
    <div className="flex h-[calc(100vh-68px)] max-w-7xl mx-auto my-2 rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-xl">
      {/* Sidebar matching team-chat-intro.gif */}
      <Sidebar
        activeChannel={activeChannel}
        onSelectChannel={setActiveChannel}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Chat Thread Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
        <ChatHeader
          channelName={currentChannel.name}
          subtitle={currentChannel.subtitle}
          memberCount={`${onlineUserCount || 3} | 100`}
          isConnected={isConnected}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Message Thread */}
        <MessageList messages={messages} onLike={likeMessage} />

        {/* Chat Input with @mentions and Emoji Picker */}
        <ChatInput onSendMessage={sendMessage} />
      </main>
    </div>
  );
};
