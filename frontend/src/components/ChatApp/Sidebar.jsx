import React from "react";
import { Hash, Plus, Users, ShieldCheck, ChevronDown, Radio } from "lucide-react";

export const Sidebar = ({ activeChannel, onSelectChannel, isOpen, onClose }) => {
  const channels = [
    { id: "poland-office", name: "Poland Office", unread: 0 },
    { id: "introductions", name: "Introductions", unread: 3 },
    { id: "india-office", name: "India Office", unread: 0 },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:shadow-none"
        }`}
      >
        {/* User Profile Header (Rolande Raimondi) */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-[#E58080] text-white flex items-center justify-center font-bold text-base shadow-sm">
              RR
            </div>
            {/* Green Online Status Dot */}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-bold text-slate-800 text-sm truncate">
              Rolande Raimondi
            </div>
            <div className="text-xs text-slate-400 truncate">
              Research Nurse
            </div>
          </div>
        </div>

        {/* Workspace Brand / Info */}
        <div className="px-4 py-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-slate-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Exactspace Industrial AI
          </span>
          <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">
            PROD
          </span>
        </div>

        {/* Conversations Section */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="flex items-center justify-between px-2 mb-2 text-xs font-semibold text-slate-500">
            <span>Conversations</span>
            <button
              type="button"
              className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-colors"
              title="Add conversation"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <nav className="space-y-1">
            {channels.map((chan) => {
              const isActive = activeChannel === chan.id;
              return (
                <button
                  key={chan.id}
                  type="button"
                  onClick={() => {
                    onSelectChannel(chan.id);
                    onClose?.();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm font-semibold"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      #
                    </div>
                    <span className="truncate">{chan.name}</span>
                  </div>

                  {chan.unread > 0 && !isActive && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">
                      {chan.unread}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Members in channel */}
          <div className="mt-8 px-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Assigned Users (Randomized)
            </div>
            <div className="space-y-2">
              {["Alan", "Bob", "Carol", "Dean", "Elin"].map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-between text-xs text-slate-600 px-1 py-1"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{name}</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Online</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-100 text-center text-[11px] text-slate-400">
          Exactspace Frontend Assignment
        </div>
      </aside>
    </>
  );
};
