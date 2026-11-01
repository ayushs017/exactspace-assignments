import React from "react";
import { Smile, Sparkles, ThumbsUp, Heart } from "lucide-react";

const EMOJI_CATEGORIES = [
  {
    name: "Smileys & Faces",
    emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😎", "🤩", "🥳", "😏", "🤔", "🤫", "🤗"],
  },
  {
    name: "Gestures & People",
    emojis: ["👋", "🖐️", "✋", "👌", "🤌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "👍", "👎", "✊", "👊", "👏", "🙌", "👐", "🤲", "🤝", "🙏"],
  },
  {
    name: "Reactions & Emblems",
    emojis: ["🔥", "⭐", "🌟", "✨", "💥", "💯", "🎉", "🎊", "🏆", "🚀", "⚡", "💡", "🎯", "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "💔", "👀", "🧠"],
  },
  {
    name: "Tech & Work",
    emojis: ["💻", "🖥️", "⌨️", "🖱️", "📱", "📊", "📈", "📉", "📁", "📂", "📝", "📋", "📅", "⏱️", "⚙️", "🔧", "🛠️", "☕", "🍕", "🍔", "🎈", "🚩", "✅", "⚠️"],
  },
];

export const EmojiPicker = ({ onSelectEmoji, onClose }) => {
  return (
    <div className="absolute bottom-16 right-4 sm:right-10 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 w-80 max-h-96 overflow-y-auto animate-fade-in">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Smile className="w-4 h-4 text-amber-500" /> Choose Emoji
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 text-xs px-2 py-0.5 rounded hover:bg-slate-100 transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        {EMOJI_CATEGORIES.map((category) => (
          <div key={category.name}>
            <div className="text-[11px] font-medium text-slate-400 mb-1 px-1">
              {category.name}
            </div>
            <div className="grid grid-cols-8 gap-1">
              {category.emojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onSelectEmoji(emoji)}
                  className="w-8 h-8 flex items-center justify-center text-lg hover:bg-slate-100 hover:scale-125 rounded-lg transition-all duration-150 cursor-pointer active:scale-95"
                  title={emoji}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
