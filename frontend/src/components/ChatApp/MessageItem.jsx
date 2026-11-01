import React, { useState } from "react";
import confetti from "canvas-confetti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

// Consistent avatar colors matching team-chat-intro.gif
const AVATAR_PALETTE = {
  "PubNub Bot": { bg: "bg-[#E55353] text-white", border: "border-red-200" },
  Alan: { bg: "bg-[#84CC16] text-white", border: "border-lime-200" },
  Bob: { bg: "bg-[#10B981] text-white", border: "border-emerald-200" },
  Carol: { bg: "bg-[#F59E0B] text-white", border: "border-amber-200" },
  Dean: { bg: "bg-[#8B5CF6] text-white", border: "border-purple-200" },
  Elin: { bg: "bg-[#EC4899] text-white", border: "border-pink-200" },
};

function getInitials(name) {
  if (!name) return "??";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export const MessageItem = ({ message, onLike }) => {
  const [isLiking, setIsLiking] = useState(false);

  const { id, user, text, timestamp, likes = 0 } = message;
  const avatarStyle = AVATAR_PALETTE[user] || {
    bg: "bg-blue-600 text-white",
    border: "border-blue-200",
  };

  const handleLikeClick = (e) => {
    setIsLiking(true);
    setTimeout(() => setIsLiking(false), 300);

    // Subtle mini-confetti burst from the button position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 15,
      spread: 45,
      origin: { x, y },
      colors: ["#3b82f6", "#60a5fa", "#93c5fd", "#fbbf24"],
      disableForReducedMotion: true,
      scalar: 0.7,
    });

    onLike(id);
  };

  // Format message text to highlight @mentions
  const renderFormattedText = (rawText) => {
    if (!rawText) return "";
    const mentionRegex = /(@[A-Za-z0-9_]+)/g;
    const parts = rawText.split(mentionRegex);

    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        return (
          <span
            key={index}
            className="inline-flex items-center px-1.5 py-0.2 mx-0.5 rounded-md bg-blue-100 text-blue-700 font-semibold text-[13px] border border-blue-200 shadow-xs hover:bg-blue-200 transition-colors"
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="group flex items-start gap-3.5 py-3 px-4 hover:bg-slate-50/80 rounded-2xl transition-colors">
      {/* User Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm shadow-sm select-none ${avatarStyle.bg}`}
      >
        {getInitials(user)}
      </div>

      {/* Message Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-bold text-sm text-slate-800 tracking-tight">
            {user}
          </span>
          <span className="text-xs text-slate-400 font-normal">
            {timestamp || "Just now"}
          </span>
        </div>

        {/* Message bubble + Like button row */}
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm text-sm text-slate-800 break-words leading-relaxed max-w-2xl">
            {renderFormattedText(text)}
          </div>

          {/* Like button on the right end of chat message */}
          <button
            type="button"
            onClick={handleLikeClick}
            title="Like this message"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all duration-150 active:scale-90 ${
              likes > 0
                ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 shadow-xs"
                : "bg-white text-slate-400 border-slate-200 hover:text-blue-500 hover:border-blue-200 hover:bg-slate-50"
            } ${isLiking ? "animate-pop ring-2 ring-blue-300" : ""}`}
          >
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={`w-3.5 h-3.5 transition-transform ${
                isLiking ? "scale-125" : ""
              } ${likes > 0 ? "text-blue-500" : ""}`}
            />
            <span className="tabular-nums font-bold">{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
