# Specification

## Summary
**Goal:** Build SUPER ASSISTANT — a futuristic cyberpunk full-stack showcase app with a Motoko backend and a feature-rich neon OS-style frontend.

**Planned changes:**

### Backend (Motoko)
- Single actor in `backend/main.mo` with stable storage for user profiles (username, avatar choice, theme preference), quiz scores (user ID, score, timestamp), and chat history (user ID, message array)
- Query and update methods for CRUD on all three data types

### Frontend

**Intro / Shell**
- Animated splash screen with ASCII art "SUPER ASSISTANT" logo, typewriter reveal, particle burst, Web Audio API sound, and fade/glitch transition after ~4s or Enter keypress
- OS-style main dashboard with icon tiles for all features, keyboard arrow-key + Enter navigation, and a taskbar (live clock, theme switcher, mute toggle, fullscreen button)
- Fullscreen API toggle that reflows layout gracefully

**Themes & Visuals**
- Three instant-switch themes: Dark (black + neon cyan `#00fff7`), Light (white + electric blue `#0066ff`), Hacker (black + matrix green `#00ff41`) using CSS variables; preference saved to backend
- Animated Three.js / React Three Fiber particle background that reacts to mouse movement and adapts color per theme
- Cohesive cyberpunk design: Orbitron/Share Tech Mono fonts, glowing neon borders, hover glow effects, glitch/slide/fade page transitions, ASCII logo with CSS glow pulse in dashboard header

**Features**
- **Chatbot**: Simulated AI panel with 50+ hard-coded responses, typewriter animation, mood detection (5+ emotional keywords → emoji + tone adjustment), conversation history saved/loaded from backend
- **Terminal Mode**: Hacker-green monospace terminal with 7 commands (help, whoami, scan, decrypt, hack, clear, exit), fake progress bars, blinking cursor, boot sound on open
- **Quiz Mode**: 20+ cybersecurity/phishing scenario questions, live score counter, correct/wrong feedback animations, final score saved to backend
- **Games**: Memory game (16 cards, 8 tech-themed pairs, flip animation, move counter, timer, win celebration); Logic Puzzle (5+ programming riddles with text input answer check)
- **Tech News**: Scrolling feed of 15+ hard-coded headlines with timestamps, category tags, breaking news ticker, expandable fake full article view
- **User Profile**: Set username, choose from 8+ cyberpunk SVG/emoji avatars, view stats (quiz score, games played, chats sent), save to backend
- **Cyber Defender**: Phishing email mini-game (5+ clickable suspicious elements), cybersecurity tips carousel (10+ tips), Shield Score tracker, animated fake global threat map
- **Hacker Page (Easter Egg)**: Accessible only via Konami code or terminal `hacker` command; cinematic password cracking animation, real-time password strength checker (Weak/Medium/Strong bar), auto-generated strong password suggestion for weak passwords; full hacker-green aesthetic
- **Guided Demo Tour**: 8–10 step tour with spotlight overlays, animated pointers, tooltip cards, Next/exit controls, and a completion screen

**Audio**
- Web Audio API procedural ambient synthwave loop on dashboard; distinct sound effects for button clicks, theme switch, terminal open, intro, quiz correct/wrong, and game win; global mute toggle persisting across views

**Responsiveness**
- Dashboard reflows to 2-column tile grid below 768px; all interactions (games, quiz, navigation) work on touch screens; no horizontal overflow at any size

**User-visible outcome:** Users experience a fully interactive cyberpunk "operating system" in the browser with a chatbot, terminal, quiz, games, news feed, profile, Cyber Defender awareness page, a hidden hacker easter egg, a guided tour, and persistent data — all styled in a neon futuristic aesthetic with three switchable themes, particle effects, and procedural audio.
