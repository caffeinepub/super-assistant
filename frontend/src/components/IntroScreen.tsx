import { useEffect, useState, useRef } from 'react';
import { useAudio } from '../contexts/AudioContext';

const ASCII_LOGO = `
 ____  _   _ ____  _____ ____     _    ____ ____ ___ ____ _____  _    _   _ _____ 
/ ___|| | | |  _ \\| ____|  _ \\   / \\  / ___/ ___|_ _/ ___|_   _|/ \\  | \\ | |_   _|
\\___ \\| | | | |_) |  _| | |_) | / _ \\ \\___ \\___ \\| |\\___ \\ | | / _ \\ |  \\| | | |  
 ___) | |_| |  __/| |___|  _ < / ___ \\ ___) |__) | | ___) || |/ ___ \\| |\\  | | |  
|____/ \\___/|_|   |_____|_| \\_/_/   \\_\\____/____/___|____/ |_/_/   \\_\\_| \\_| |_|  
`;

const TAGLINE = '> INITIALIZING SUPER ASSISTANT v2.0 ...';
const SUBTITLE = '[ NEXT-GEN AI CYBERPUNK EXPERIENCE ]';

interface Props {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: Props) {
  const [logoChars, setLogoChars] = useState('');
  const [taglineChars, setTaglineChars] = useState('');
  const [subtitleChars, setSubtitleChars] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const { playSound } = useAudio();
  const doneRef = useRef(false);

  useEffect(() => {
    playSound('intro');

    let i = 0;
    const logoInterval = setInterval(() => {
      if (i <= ASCII_LOGO.length) {
        setLogoChars(ASCII_LOGO.slice(0, i));
        i++;
      } else {
        clearInterval(logoInterval);
        let j = 0;
        const tagInterval = setInterval(() => {
          if (j <= TAGLINE.length) {
            setTaglineChars(TAGLINE.slice(0, j));
            j++;
          } else {
            clearInterval(tagInterval);
            let k = 0;
            const subInterval = setInterval(() => {
              if (k <= SUBTITLE.length) {
                setSubtitleChars(SUBTITLE.slice(0, k));
                k++;
              } else {
                clearInterval(subInterval);
                setShowPrompt(true);
              }
            }, 40);
          }
        }, 25);
      }
    }, 4);

    const autoTimer = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        triggerExit();
      }
    }, 6000);

    return () => {
      clearInterval(logoInterval);
      clearTimeout(autoTimer);
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !doneRef.current) {
        doneRef.current = true;
        triggerExit();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const triggerExit = () => {
    setGlitching(true);
    playSound('boot');
    setTimeout(() => onEnter(), 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden cursor-pointer"
      onClick={() => { if (!doneRef.current) { doneRef.current = true; triggerExit(); } }}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)'
      }} />

      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{
        backgroundImage: 'linear-gradient(var(--neon-border) 1px, transparent 1px), linear-gradient(90deg, var(--neon-border) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className={`flex flex-col items-center gap-6 px-4 transition-all duration-500 ${glitching ? 'opacity-0 scale-110 blur-sm' : 'opacity-100 scale-100'}`}>
        {/* ASCII Logo */}
        <div className="overflow-x-auto w-full flex justify-center">
          <pre
            className="ascii-glow text-xs sm:text-sm leading-tight animate-neon-pulse"
            style={{ fontSize: 'clamp(5px, 1.2vw, 12px)' }}
          >
            {logoChars}
          </pre>
        </div>

        {/* Tagline */}
        <div className="font-mono-tech text-sm sm:text-base text-neon opacity-90">
          {taglineChars}
          {taglineChars.length < TAGLINE.length && <span className="animate-pulse">█</span>}
        </div>

        {/* Subtitle */}
        <div className="font-orbitron text-xs sm:text-sm tracking-widest text-neon opacity-70">
          {subtitleChars}
        </div>

        {/* Loading bar */}
        <div className="w-64 sm:w-96 neon-progress mt-4">
          <div
            className="neon-progress-bar transition-all duration-100"
            style={{ width: `${Math.min(100, (logoChars.length / ASCII_LOGO.length) * 100)}%` }}
          />
        </div>

        {/* Prompt */}
        {showPrompt && (
          <div className="font-mono-tech text-xs text-neon opacity-60 animate-pulse mt-2">
            [ PRESS ENTER OR CLICK TO CONTINUE ]
          </div>
        )}

        {/* Particles burst */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: 'var(--neon-cyan)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5,
                animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-neon font-mono-tech text-xs opacity-50">SYS:ONLINE</div>
      <div className="absolute top-4 right-4 text-neon font-mono-tech text-xs opacity-50">v2.0.26</div>
      <div className="absolute bottom-4 left-4 text-neon font-mono-tech text-xs opacity-50">SECURE:TRUE</div>
      <div className="absolute bottom-4 right-4 text-neon font-mono-tech text-xs opacity-50">AI:READY</div>
    </div>
  );
}
