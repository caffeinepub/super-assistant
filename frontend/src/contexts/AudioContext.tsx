import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

type SoundType = 'click' | 'themeSwitch' | 'terminalOpen' | 'intro' | 'quizCorrect' | 'quizWrong' | 'gameWin' | 'notification' | 'boot';

interface AudioContextValue {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (type: SoundType) => void;
  startAmbient: () => void;
  stopAmbient: () => void;
}

const AudioCtx = createContext<AudioContextValue>({
  isMuted: false,
  toggleMute: () => {},
  playSound: () => {},
  startAmbient: () => {},
  stopAmbient: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('sa-muted') === 'true';
  });
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (isMuted) return;
    try {
      const ctx = getAudioCtx();
      const now = ctx.currentTime;

      switch (type) {
        case 'click': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now); osc.stop(now + 0.05);
          break;
        }
        case 'themeSwitch': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.start(now); osc.stop(now + 0.2);
          break;
        }
        case 'terminalOpen': {
          for (let i = 0; i < 3; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = 'square';
            osc.frequency.setValueAtTime(200 + i * 100, now + i * 0.05);
            gain.gain.setValueAtTime(0.05, now + i * 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.04);
            osc.start(now + i * 0.05); osc.stop(now + i * 0.05 + 0.04);
          }
          break;
        }
        case 'intro': {
          const freqs = [261, 329, 392, 523];
          freqs.forEach((f, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now + i * 0.15);
            gain.gain.setValueAtTime(0.08, now + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.3);
            osc.start(now + i * 0.15); osc.stop(now + i * 0.15 + 0.3);
          });
          break;
        }
        case 'quizCorrect': {
          const freqs2 = [523, 659, 784];
          freqs2.forEach((f, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now + i * 0.1);
            gain.gain.setValueAtTime(0.1, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.2);
            osc.start(now + i * 0.1); osc.stop(now + i * 0.1 + 0.2);
          });
          break;
        }
        case 'quizWrong': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(200, now);
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.3);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.start(now); osc.stop(now + 0.3);
          break;
        }
        case 'gameWin': {
          const melody = [523, 659, 784, 1047];
          melody.forEach((f, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now + i * 0.12);
            gain.gain.setValueAtTime(0.12, now + i * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.25);
            osc.start(now + i * 0.12); osc.stop(now + i * 0.12 + 0.25);
          });
          break;
        }
        case 'notification': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(660, now);
          osc.frequency.setValueAtTime(880, now + 0.1);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.start(now); osc.stop(now + 0.2);
          break;
        }
        case 'boot': {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(80, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.5);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          osc.start(now); osc.stop(now + 0.5);
          break;
        }
      }
    } catch {
      // Silently ignore audio errors
    }
  }, [isMuted, getAudioCtx]);

  const startAmbient = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioCtx();
      if (ambientRef.current) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      osc.start();
      ambientRef.current = osc;
      ambientGainRef.current = gain;
    } catch {
      // Silently ignore
    }
  }, [isMuted, getAudioCtx]);

  const stopAmbient = useCallback(() => {
    try {
      if (ambientRef.current) {
        ambientRef.current.stop();
        ambientRef.current = null;
        ambientGainRef.current = null;
      }
    } catch {
      // Silently ignore
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      localStorage.setItem('sa-muted', String(next));
      if (next) stopAmbient();
      return next;
    });
  }, [stopAmbient]);

  useEffect(() => {
    return () => { stopAmbient(); };
  }, [stopAmbient]);

  return (
    <AudioCtx.Provider value={{ isMuted, toggleMute, playSound, startAmbient, stopAmbient }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  return useContext(AudioCtx);
}
