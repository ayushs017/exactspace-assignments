import React, { useState } from "react";
import { SocketProvider } from "./context/SocketContext";
import { Navbar } from "./components/Navigation/Navbar";
import { ChatApp } from "./components/ChatApp/ChatApp";
import { PhotoGallery } from "./components/PhotoGallery/PhotoGallery";

export function App() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <SocketProvider>
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
        {/* Top Navbar */}
        <Navbar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Main Content Area */}
        <div className="flex-1 p-2 sm:p-4">
          {activeTab === "chat" ? <ChatApp /> : <PhotoGallery />}
        </div>
      </div>
    </SocketProvider>
  );
}

export default App;
