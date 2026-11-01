import React from "react";
import { User } from "lucide-react";

export const USER_COLORS = {
  Alan: { bg: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500" },
  Bob: { bg: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  Carol: { bg: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  Dean: { bg: "bg-purple-100 text-purple-700 border-purple-200", dot: "bg-purple-500" },
  Elin: { bg: "bg-pink-100 text-pink-700 border-pink-200", dot: "bg-pink-500" },
  "PubNub Bot": { bg: "bg-rose-100 text-rose-700 border-rose-200", dot: "bg-rose-500" },
};

export const MentionDropdown = ({ users, selectedIndex, onSelectUser, filterText }) => {
  if (users.length === 0) return null;

  return (
    <div className="absolute bottom-16 left-6 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl w-64 overflow-hidden animate-fade-in">
      <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Mention someone...</span>
        <span className="text-[10px] text-slate-400">↑↓ to navigate, Enter</span>
      </div>
      <div className="py-1 max-h-48 overflow-y-auto">
        {users.map((user, idx) => {
          const color = USER_COLORS[user] || { bg: "bg-slate-100 text-slate-700", dot: "bg-slate-400" };
          const isSelected = idx === selectedIndex;

          return (
            <button
              key={user}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault(); // Prevents input from blurring
                onSelectUser(user);
              }}
              className={`w-full px-3 py-2 flex items-center gap-2.5 text-left transition-colors ${
                isSelected ? "bg-blue-50 text-blue-700 font-semibold" : "hover:bg-slate-50 text-slate-700"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${color.bg}`}
              >
                {user.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 flex items-center justify-between">
                <span className="text-sm">@{user}</span>
                <span className="text-[10px] text-slate-400">Team Member</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
