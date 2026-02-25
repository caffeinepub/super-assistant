import { useState, useEffect } from 'react';
import { useTheme, type Theme } from '../contexts/ThemeContext';
import { useAudio } from '../contexts/AudioContext';
import { useFullscreen } from '../hooks/useFullscreen';
import { useSwitchTheme } from '../hooks/useQueries';
import { Volume2, VolumeX, Maximize, Minimize, Sun, Moon, Terminal, User, Home } from 'lucide-react';

type View = 'intro' | 'dashboard' | 'chatbot' | 'terminal' | 'quiz' | 'games' | 'news' | 'profile' | 'cyber-defender' | 'hacker';

interface Props {
  onNavigate: (v: View) => void;
  currentView: View;
}

export default function Taskbar({ onNavigate, currentView }: Props) {
  const { theme, switchTheme } = useTheme();
  const { isMuted, toggleMute, playSound } = useAudio();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const switchThemeMutation = useSwitchTheme();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleTheme = (t: Theme) => {
    switchTheme(t);
    playSound('themeSwitch');
    switchThemeMutation.mutate(t);
  };

  const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'dark', label: 'DARK', icon: <Moon size={12} /> },
    { value: 'light', label: 'LIGHT', icon: <Sun size={12} /> },
    { value: 'hacker', label: 'HACK', icon: <Terminal size={12} /> },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-12 flex items-center justify-between px-3 sm:px-4 border-b border-neon"
      style={{ background: 'oklch(var(--card) / 0.95)', backdropFilter: 'blur(12px)' }}>

      {/* Left: Logo + Home */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => { playSound('click'); onNavigate('dashboard'); }}
          className="neon-btn px-2 py-1 text-xs hidden sm:flex items-center gap-1"
        >
          <Home size={12} />
          <span className="font-orbitron text-xs">SA</span>
        </button>
        <span className="font-orbitron text-xs text-neon hidden md:block tracking-widest animate-neon-pulse">
          SUPER ASSISTANT
        </span>
        <span className="font-orbitron text-xs text-neon md:hidden tracking-widest">SA</span>
      </div>

      {/* Center: Theme switcher */}
      <div className="flex items-center gap-1">
        {themes.map(t => (
          <button
            key={t.value}
            onClick={() => handleTheme(t.value)}
            className={`flex items-center gap-1 px-2 py-1 font-orbitron text-xs border transition-all duration-200 min-h-[32px] ${
              theme === t.value
                ? 'border-neon bg-neon-dim text-neon shadow-neon-sm'
                : 'border-transparent text-muted-foreground hover:border-neon hover:text-neon'
            }`}
          >
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Right: Controls + Clock */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Current view indicator */}
        {currentView !== 'dashboard' && (
          <span className="font-mono-tech text-xs text-neon opacity-60 hidden sm:block uppercase">
            /{currentView}
          </span>
        )}

        {/* Profile */}
        <button
          onClick={() => { playSound('click'); onNavigate('profile'); }}
          className="neon-btn p-1.5"
          title="Profile"
        >
          <User size={14} />
        </button>

        {/* Mute */}
        <button
          onClick={() => { toggleMute(); }}
          className="neon-btn p-1.5"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="neon-btn p-1.5"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
        </button>

        {/* Clock */}
        <div className="font-mono-tech text-xs text-neon opacity-80 min-w-[60px] text-right hidden sm:block">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
