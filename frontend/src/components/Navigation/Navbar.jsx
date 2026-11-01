import React from "react";
import { MessageSquare, Image, Sparkles, Cpu, Github, ExternalLink } from "lucide-react";

export const Navbar = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md font-black text-lg">
            E
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base">
                Exactspace
              </span>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full border border-slate-200">
                UI Internship Evaluation
              </span>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              Industrial AI Technologies • Bangalore
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
          {/* Task 1 Tab */}
          <button
            type="button"
            onClick={() => onSelectTab("chat")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
              activeTab === "chat"
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Task 1: Chat App</span>
            <span className="hidden md:inline-block text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded font-semibold border border-blue-200">
              WebSockets
            </span>
          </button>

          {/* Task 2 Tab */}
          <button
            type="button"
            onClick={() => onSelectTab("gallery")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
              activeTab === "gallery"
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Image className="w-4 h-4 text-indigo-600" />
            <span>Task 2: Photo Gallery</span>
            <span className="hidden md:inline-block text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded font-semibold border border-indigo-200">
              Infinite Scroll
            </span>
          </button>
        </div>

        {/* Info & GitHub link */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href="https://github.com/exact-space/react-assignments"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Specs Repo</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </nav>
  );
};
