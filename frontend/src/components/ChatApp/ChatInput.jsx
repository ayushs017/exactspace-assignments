import React, { useState, useRef, useEffect } from "react";
import { Send, Smile, AtSign, Shuffle, UserCheck } from "lucide-react";
import { EmojiPicker } from "./EmojiPicker";
import { MentionDropdown } from "./MentionDropdown";

const USER_LIST = ["Alan", "Bob", "Carol", "Dean", "Elin"];

export const ChatInput = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionFilter, setMentionFilter] = useState("");
  const [mentionIndex, setMentionIndex] = useState(0);
  const [senderMode, setSenderMode] = useState("random"); // "random" or specific user name

  const inputRef = useRef(null);

  // Filter users based on text after '@'
  const filteredUsers = USER_LIST.filter((user) =>
    user.toLowerCase().startsWith(mentionFilter.toLowerCase())
  );

  // Detect '@' trigger while typing
  const handleInputChange = (e) => {
    const val = e.target.value;
    const cursorPos = e.target.selectionStart;
    setText(val);

    // Look backward from cursor to find if we're in an '@mention' token
    const leftText = val.slice(0, cursorPos);
    const match = leftText.match(/@([a-zA-Z0-9_]*)$/);

    if (match) {
      setMentionFilter(match[1]);
      setShowMentions(true);
      setMentionIndex(0);
    } else {
      setShowMentions(false);
    }
  };

  const handleSelectUser = (user) => {
    const cursorPos = inputRef.current ? inputRef.current.selectionStart : text.length;
    const leftText = text.slice(0, cursorPos);
    const rightText = text.slice(cursorPos);

    // Replace the '@partial' token with '@UserName '
    const updatedLeft = leftText.replace(/@([a-zA-Z0-9_]*)$/, `@${user} `);
    const newText = updatedLeft + rightText;

    setText(newText);
    setShowMentions(false);

    // Focus input and reposition cursor
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const newCursorPos = updatedLeft.length;
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 10);
  };

  const handleSelectEmoji = (emoji) => {
    const cursorPos = inputRef.current ? inputRef.current.selectionStart : text.length;
    const newText = text.slice(0, cursorPos) + emoji + text.slice(cursorPos);
    setText(newText);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const newPos = cursorPos + emoji.length;
        inputRef.current.setSelectionRange(newPos, newPos);
      }
    }, 10);
  };

  const handleKeyDown = (e) => {
    if (showMentions && filteredUsers.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setMentionIndex((prev) => (prev + 1) % filteredUsers.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setMentionIndex((prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length);
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        handleSelectUser(filteredUsers[mentionIndex]);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setShowMentions(false);
        return;
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!text.trim()) return;

    // Pick user: either randomly from USER_LIST or chosen sender
    let chosenUser = senderMode;
    if (senderMode === "random") {
      chosenUser = USER_LIST[Math.floor(Math.random() * USER_LIST.length)];
    }

    onSendMessage(text, chosenUser);
    setText("");
    setShowEmojiPicker(false);
    setShowMentions(false);
  };

  const triggerAtSymbol = () => {
    const cursorPos = inputRef.current ? inputRef.current.selectionStart : text.length;
    const newText = text.slice(0, cursorPos) + "@" + text.slice(cursorPos);
    setText(newText);
    setMentionFilter("");
    setShowMentions(true);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(cursorPos + 1, cursorPos + 1);
      }
    }, 10);
  };

  return (
    <div className="relative p-4 border-t border-slate-200/80 bg-white">
      {/* Mention Dropdown Overlay */}
      {showMentions && (
        <MentionDropdown
          users={filteredUsers}
          selectedIndex={mentionIndex}
          onSelectUser={handleSelectUser}
          filterText={mentionFilter}
        />
      )}

      {/* Emoji Picker Popover */}
      {showEmojiPicker && (
        <EmojiPicker
          onSelectEmoji={handleSelectEmoji}
          onClose={() => setShowEmojiPicker(false)}
        />
      )}

      {/* Helper Bar: Sender Selection & Quick Actions */}
      <div className="flex items-center justify-between pb-2 px-1 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-400">Sending as:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
            <button
              type="button"
              onClick={() => setSenderMode("random")}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold text-xs transition-colors ${
                senderMode === "random"
                  ? "bg-white text-blue-600 shadow-xs border border-slate-200/60"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              title="Per assignment requirement: randomly assign Alan, Bob, Carol, Dean, or Elin"
            >
              <Shuffle className="w-3 h-3 text-blue-500" />
              <span>Random User (Required)</span>
            </button>
            <select
              value={senderMode}
              onChange={(e) => setSenderMode(e.target.value)}
              className={`text-xs px-1.5 py-0.5 rounded-md font-medium border-0 focus:ring-1 focus:ring-blue-400 bg-transparent cursor-pointer ${
                senderMode !== "random" ? "text-blue-600 font-bold" : "text-slate-400"
              }`}
            >
              <option value="random">Or pick user...</option>
              {USER_LIST.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400">
          <span>
            Type <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono">@</kbd> to mention
          </span>
          <span>
            Press <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono">Enter</kbd> to send
          </span>
        </div>
      </div>

      {/* Input container matching the GIF pill style */}
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-2xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all shadow-inner">
        {/* Quick @ mention button */}
        <button
          type="button"
          onClick={triggerAtSymbol}
          title="Mention a team member"
          className="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
        >
          <AtSign className="w-4 h-4" />
        </button>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type Message (type @ for user list, click 😊 for emojis)"
          className="flex-1 bg-transparent border-0 focus:outline-none text-slate-800 placeholder-slate-400 text-sm py-1.5 px-1"
        />

        {/* Emoji picker button on the right matching GIF */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          title="Add Emoji"
          className={`p-1.5 rounded-lg transition-colors ${
            showEmojiPicker
              ? "bg-amber-100 text-amber-600"
              : "text-slate-400 hover:text-amber-500 hover:bg-slate-200/60"
          }`}
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Send Button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!text.trim()}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-all duration-150 shadow-sm active:scale-95 disabled:active:scale-100 disabled:cursor-not-allowed"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
