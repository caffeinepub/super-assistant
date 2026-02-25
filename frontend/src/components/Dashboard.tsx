import { useState, useEffect, useCallback } from 'react';
import { useAudio } from '../contexts/AudioContext';
import { useApp } from '../contexts/AppContext';
import {
  MessageSquare, Terminal, Brain, Gamepad2, Newspaper,
  User, Shield, Lock, Map, Zap
} from 'lucide-react';

type View = 'intro' | 'dashboard' | 'chatbot' | 'terminal' | 'quiz' | 'games' | 'news' | 'profile' | 'cyber-defender' | 'hacker';

interface Tile {
  id: View;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  requiresUnlock?: boolean;
}

const TILES: Tile[] = [
  { id: 'chatbot', label: 'AI ASSISTANT', icon: <MessageSquare size={28} />, description: 'Chat with AI', color: 'cyan' },
  { id: 'terminal', label: 'TERMINAL', icon: <Terminal size={28} />, description: 'Hack the system', color: 'green' },
  { id: 'quiz', label: 'CYBER QUIZ', icon: <Brain size={28} />, description: 'Test your skills', color: 'purple' },
  { id: 'games', label: 'GAMES', icon: <Gamepad2 size={28} />, description: 'Memory & Logic', color: 'orange' },
  { id: 'news', label: 'TECH NEWS', icon: <Newspaper size={28} />, description: 'Latest updates', color: 'blue' },
  { id: 'profile', label: 'PROFILE', icon: <User size={28} />, description: 'Your identity', color: 'pink' },
  { id: 'cyber-defender', label: 'CYBER DEFENDER', icon: <Shield size={28} />, description: 'Defend the net', color: 'teal' },
  { id: 'hacker', label: '[ CLASSIFIED ]', icon: <Lock size={28} />, description: '???', color: 'red', requiresUnlock: true },
];

interface Props {
  onNavigate: (v: View) => void;
  onStartTour: () => void;
}

export default function Dashboard({ onNavigate, onStartTour }: Props) {
  const { playSound, startAmbient, stopAmbient } = useAudio();
  const { isHackerPageUnlocked } = useApp();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    startAmbient();
    return () => stopAmbient();
  }, [startAmbient, stopAmbient]);

  const handleNavigate = useCallback((tile: Tile) => {
    if (tile.requiresUnlock && !isHackerPageUnlocked) return;
    playSound('click');
    onNavigate(tile.id);
  }, [playSound, onNavigate, isHackerPageUnlocked]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const cols = window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4;
      if (e.key === 'ArrowRight') setFocusedIndex(i => Math.min(i + 1, TILES.length - 1));
      else if (e.key === 'ArrowLeft') setFocusedIndex(i => Math.max(i - 1, 0));
      else if (e.key === 'ArrowDown') setFocusedIndex(i => Math.min(i + cols, TILES.length - 1));
      else if (e.key === 'ArrowUp') setFocusedIndex(i => Math.max(i - cols, 0));
      else if (e.key === 'Enter') handleNavigate(TILES[focusedIndex]);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [focusedIndex, handleNavigate]);

  const ASCII_LOGO = `
 ____  _   _ ____  _____ ____  
/ ___|| | | |  _ \\| ____|  _ \\ 
\\___ \\| | | |  _ <|  _| | |_) |
 ___) | |_| | |_) | |___|  _ < 
|____/ \\___/|____/|_____|_| \\_\\`;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/assets/generated/dashboard-bg.dim_1920x1080.png')" }}
      />

      <div className={`relative z-10 flex flex-col items-center px-4 py-6 sm:py-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

        {/* ASCII Logo Header */}
        <div className="mb-6 text-center">
          <pre className="ascii-glow animate-neon-pulse text-center leading-tight"
            style={{ fontSize: 'clamp(6px, 1.5vw, 13px)' }}>
            {ASCII_LOGO}
          </pre>
          <p className="font-rajdhani text-sm sm:text-base text-neon opacity-70 mt-2 tracking-widest">
            NEXT-GENERATION AI CYBERPUNK EXPERIENCE
          </p>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-4 mb-8 font-mono-tech text-xs text-neon opacity-60">
          <span>● ONLINE</span>
          <span>● AI:READY</span>
          <span>● SECURE</span>
          <span className="hidden sm:inline">● {new Date().toLocaleDateString()}</span>
        </div>

        {/* Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl">
          {TILES.map((tile, idx) => {
            const locked = tile.requiresUnlock && !isHackerPageUnlocked;
            return (
              <button
                key={tile.id}
                onClick={() => handleNavigate(tile)}
                className={`tile-card neon-card flex flex-col items-center justify-center gap-3 p-4 sm:p-6 min-h-[120px] sm:min-h-[140px] text-center transition-all duration-300 ${
                  focusedIndex === idx ? 'focused' : ''
                } ${locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onMouseEnter={() => setFocusedIndex(idx)}
                disabled={locked}
              >
                <div className={`text-neon ${focusedIndex === idx ? 'animate-float' : ''}`}>
                  {tile.icon}
                </div>
                <div>
                  <div className="font-orbitron text-xs sm:text-sm font-bold text-neon tracking-wider">
                    {tile.label}
                  </div>
                  <div className="font-rajdhani text-xs text-muted-foreground mt-1">
                    {locked ? 'LOCKED — Find the secret' : tile.description}
                  </div>
                </div>
                {focusedIndex === idx && (
                  <div className="absolute inset-0 rounded pointer-events-none border border-neon opacity-60 animate-neon-border" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom actions */}
        <div className="flex flex-wrap gap-3 mt-8 justify-center">
          <button
            onClick={() => { playSound('click'); onStartTour(); }}
            className="neon-btn neon-btn-primary flex items-center gap-2"
          >
            <Map size={14} />
            GUIDED TOUR
          </button>
          <button
            onClick={() => { playSound('click'); onNavigate('cyber-defender'); }}
            className="neon-btn flex items-center gap-2"
          >
            <Shield size={14} />
            CYBER DEFENDER
          </button>
          <button
            onClick={() => { playSound('click'); onNavigate('terminal'); }}
            className="neon-btn flex items-center gap-2"
          >
            <Zap size={14} />
            TERMINAL
          </button>
        </div>

        {/* Keyboard hint */}
        <p className="font-mono-tech text-xs text-muted-foreground mt-6 opacity-50">
          ↑↓←→ NAVIGATE · ENTER SELECT · KONAMI CODE FOR SECRET
        </p>
      </div>
    </div>
  );
}
