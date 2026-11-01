import React from "react";
import { Users, Menu, Wifi, WifiOff, RefreshCw } from "lucide-react";

export const ChatHeader = ({
  channelName = "Introductions",
  subtitle = "This Channel Is For Company Wide Chatter",
  memberCount = "3 | 100",
  isConnected,
  onToggleSidebar,
}) => {
  return (
    <header className="h-16 px-4 md:px-6 border-b border-slate-200/90 bg-white flex items-center justify-between shadow-2xs">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          title="Toggle channels"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base md:text-lg font-bold text-slate-800 tracking-tight">
              {channelName}
            </h1>
            <span className="hidden sm:inline-block text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              #public
            </span>
          </div>
          <p className="text-xs text-slate-400 font-normal">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Socket.IO Connection Status Pill */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
            isConnected
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}
          title={
            isConnected
              ? "Socket.IO server connected: Messages and likes sync in real-time across tabs!"
              : "Standalone client mode: Messages and likes update locally."
          }
        >
          {isConnected ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Socket.IO Live</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Offline Mode</span>
            </>
          )}
        </div>

        {/* Member count matching team-chat-intro.gif ("3 | 100") */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/60">
          <span>{memberCount}</span>
          <Users className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
};
