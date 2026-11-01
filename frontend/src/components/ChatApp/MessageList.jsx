import React, { useEffect, useRef } from "react";
import { MessageItem } from "./MessageItem";
import { MessageSquareDashed } from "lucide-react";

export const MessageList = ({ messages, onLike }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
        <MessageSquareDashed className="w-12 h-12 text-slate-300 mb-3 animate-pulse" />
        <p className="text-base font-semibold text-slate-600">No messages yet</p>
        <p className="text-xs text-slate-400 max-w-sm mt-1">
          Be the first to say hello! Type a message below and hit send.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
      {/* Channel Header Banner */}
      <div className="text-center py-6 border-b border-slate-100 mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 font-bold text-lg mb-2">
          #
        </div>
        <h2 className="text-lg font-bold text-slate-800">Welcome to #Introductions</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
          This is the start of the <span className="font-semibold text-slate-700">#Introductions</span> channel.
          Send messages, tag teammates with @mentions, and react with likes!
        </p>
      </div>

      {messages.map((message) => (
        <MessageItem key={message.id} message={message} onLike={onLike} />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};
