# Exactspace Frontend / UI Developer Internship Assignment

> **Candidate Submission** for **Exactspace Technologies Pvt Ltd, Bangalore**  
> **Role:** Front End / UI Developer Intern (8 Months)  
> **Source Repository:** [exact-space/react-assignments](https://github.com/exact-space/react-assignments)

---

## 🚀 Overview

This repository contains full, production-ready implementations for **both Task 1 (Chat App with all 3 stretch goals)** and **Task 2 (Infinite Scroll Photo Gallery)**, structured in a clean, unified workspace with an intuitive navigation switcher.

```
exactspace-assignment/
├── backend/                  # Express.js + Socket.IO real-time server (Task 1)
│   ├── server.js             # WebSocket events, REST endpoints, and in-memory state
│   └── package.json
├── frontend/                 # Vite + React 18 + Tailwind CSS frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation/   # Top navbar with live switcher & status badges
│   │   │   ├── ChatApp/      # Task 1: Real-time Team Chat
│   │   │   │   ├── ChatApp.jsx
│   │   │   │   ├── ChatHeader.jsx
│   │   │   │   ├── ChatInput.jsx      # @mention autocomplete & emoji picker
│   │   │   │   ├── EmojiPicker.jsx    # Categorized emoji selector
│   │   │   │   ├── MentionDropdown.jsx# Autocomplete list for user mentions
│   │   │   │   ├── MessageItem.jsx    # Avatar, @highlights, like button + counter
│   │   │   │   ├── MessageList.jsx    # Auto-scrolling chat thread
│   │   │   │   └── Sidebar.jsx        # GIF-matching channels & user profile
│   │   │   └── PhotoGallery/ # Task 2: Paginated Infinite Scroll Gallery
│   │   │       ├── PhotoGallery.jsx   # IntersectionObserver infinite scrolling
│   │   │       └── PhotoCard.jsx      # 1-column card + FontAwesome thumbs-up
│   │   ├── context/
│   │   │   └── SocketContext.jsx      # Socket.IO connection & multi-tab sync
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── package.json              # Root orchestration script (npm run dev)
└── README.md
```

---

## 📋 Requirements & Features Checklist

### ✅ Task 1: React Team Chat App

| Requirement | Status | Details |
|---|:---:|---|
| **Single Page ReactJS Application** | ✅ Completed | Built with React 18 & Vite for instant load times and reactivity |
| **Input textbox & Send button** | ✅ Completed | Rounded pill input matching `team-chat-intro.gif` |
| **Chat thread above input** | ✅ Completed | Messages displayed with avatar, sender, timestamp, and message bubble |
| **Random User Assignment** | ✅ Completed | Randomly assigns one of `["Alan", "Bob", "Carol", "Dean", "Elin"]` per message |
| **Message Like Button with Count** | ✅ Completed | Thumbs-up button at the right end of each message; increments count on each click |
| **Stretch Goal 1: Emoji Options** | ✅ Completed | Built-in categorized Emoji Picker (Smileys, Gestures, Reactions, Tech) |
| **Stretch Goal 2: @ Mentions Feature** | ✅ Completed | Typing `@` triggers an interactive user autocomplete dropdown; mentions are highlighted in messages |
| **Stretch Goal 3: WebSocket (Socket.IO)** | ✅ Completed | Full Express + Socket.IO backend with multi-tab real-time sync for messages & likes |

---

### ✅ Task 2: Infinite Scroll Photo Gallery

| Requirement | Status | Details |
|---|:---:|---|
| **Single Page Paginated Feed** | ✅ Completed | Fetches from `https://picsum.photos/v2/list?page=1`, `?page=2`, etc. |
| **1-Column Layout** | ✅ Completed | Left photo + Right `Author: [Name]` and thumbs up count, matching `photo-gallery.png` |
| **FontAwesome Thumbs Up Icon** | ✅ Completed | Official `@fortawesome/react-fontawesome` thumbs-up icon |
| **Persistent Click Counter** | ✅ Completed | Initialized to 0; increments on every click without limit |
| **Infinite Scrolling** | ✅ Completed | Modern `IntersectionObserver` auto-fetches next page when scrolling near the bottom |
| **Graceful States** | ✅ Completed | Loading shimmer skeleton, error retry handling, and end-of-catalog detection |

---

## ⚡ Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Clone & Enter Directory
```bash
cd exactspace-assignment
```

### 2. Install All Dependencies
To install dependencies for root, backend, and frontend with a single command:
```bash
npm run install:all
```
*(Or navigate to `backend/` and `frontend/` separately and run `npm install` in each).*

### 3. Run Development Servers
Start both the Socket.IO Express backend (port 5001) and Vite React frontend (port 5173) concurrently:
```bash
npm run dev
```

Open your browser to:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🧪 Testing Guide

### Testing Task 1: Real-time Team Chat
1. Open [http://localhost:5173](http://localhost:5173) in **two different browser tabs or windows side-by-side**.
2. Notice the green **"Socket.IO Live"** connection pill in the top header.
3. In Tab 1, type a message or type `@` to see the autocomplete list of teammates (`Alan`, `Bob`, `Carol`, `Dean`, `Elin`).
4. Click the 😊 smiley icon to insert emojis.
5. Click **Send** or press **Enter**. Notice how the message instantly appears in **both tabs** simultaneously!
6. Click the like button on any message: the like count increments in real-time across both tabs with a playful animation.

### Testing Task 2: Infinite Photo Gallery
1. Click the **"Task 2: Photo Gallery"** tab in the top navigation bar.
2. The initial batch of photos loads from `https://picsum.photos/v2/list?page=1` in the 1-column layout.
3. Click the blue FontAwesome thumbs-up icon next to any author to increment the like count.
4. Scroll down towards the bottom of the page: the application automatically fetches `page=2`, `page=3`, etc., seamlessly appending photos to the feed.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React, FontAwesome, Canvas Confetti
- **Backend:** Node.js, Express.js, Socket.IO, CORS
- **APIs:** Picsum Photos paginated JSON API
- **Tooling:** Concurrently, PostCSS, Autoprefixer

---

## 📄 License & Attribution
Prepared specifically for the **Exactspace Technologies** selection process.
All rights reserved.
