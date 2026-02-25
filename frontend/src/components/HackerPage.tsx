import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import { evaluatePassword, generateStrongPassword } from '../utils/passwordStrength';

interface Props {
  onBack: () => void;
}

const CRACK_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
const TARGET_PASSWORD = 'Sup3r_A$$1st@nt_2026!';

export default function HackerPage({ onBack }: Props) {
  const { playSound } = useAudio();
  const [crackPhase, setCrackPhase] = useState<'idle' | 'cracking' | 'done'>('idle');
  const [crackedDisplay, setCrackedDisplay] = useState('');
  const [crackProgress, setCrackProgress] = useState(0);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [suggestedPassword, setSuggestedPassword] = useState('');
  const crackRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const strength = password ? evaluatePassword(password) : null;

  useEffect(() => {
    playSound('boot');
    return () => {
      if (crackRef.current) clearInterval(crackRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [playSound]);

  useEffect(() => {
    if (strength?.level === 'Weak' && password) {
      setSuggestedPassword(generateStrongPassword());
    } else {
      setSuggestedPassword('');
    }
  }, [strength?.level, password]);

  const startCrack = () => {
    if (crackPhase === 'cracking') return;
    setCrackPhase('cracking');
    setCrackProgress(0);
    playSound('terminalOpen');

    let progress = 0;
    progressRef.current = setInterval(() => {
      progress += 1;
      setCrackProgress(progress);
      if (progress >= 100) {
        clearInterval(progressRef.current!);
      }
    }, 30);

    let frame = 0;
    crackRef.current = setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / 100) * TARGET_PASSWORD.length);
      const display = TARGET_PASSWORD.slice(0, revealed) +
        Array.from({ length: TARGET_PASSWORD.length - revealed }, () =>
          CRACK_CHARS[Math.floor(Math.random() * CRACK_CHARS.length)]
        ).join('');
      setCrackedDisplay(display);

      if (frame >= 100) {
        clearInterval(crackRef.current!);
        setCrackedDisplay(TARGET_PASSWORD);
        setCrackPhase('done');
        playSound('gameWin');
      }
    }, 30);
  };

  const strengthColor = strength?.level === 'Strong' ? '#00ff41' : strength?.level === 'Medium' ? '#ffaa00' : '#ff3333';
  const strengthClass = strength?.level === 'Strong' ? 'strength-strong' : strength?.level === 'Medium' ? 'strength-medium' : 'strength-weak';

  return (
    <div className="min-h-screen flex flex-col page-enter relative overflow-hidden"
      style={{ background: '#000', fontFamily: "'Share Tech Mono', monospace" }}>

      {/* Background */}
      <div
        className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/assets/generated/hacker-bg.dim_1920x1080.png')" }}
      />

      {/* Matrix rain overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 font-mono-tech text-xs"
            style={{
              left: `${i * 5}%`,
              color: '#00ff41',
              animation: `matrixRain ${3 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`,
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
            }}
          >
            {Array.from({ length: 20 }, () => Math.floor(Math.random() * 2)).join('')}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 p-3 border-b" style={{ borderColor: '#00ff41', background: 'rgba(0,20,0,0.9)' }}>
        <button onClick={() => { playSound('click'); onBack(); }}
          className="px-3 py-1 border text-xs flex items-center gap-1" style={{ borderColor: '#00ff41', color: '#00ff41' }}>
          <ArrowLeft size={14} /> BACK
        </button>
        <span style={{ color: '#ff00ff', fontSize: '0.75rem' }} className="animate-pulse">
          ⚠ CLASSIFIED — EASTER EGG UNLOCKED ⚠
        </span>
        <span style={{ color: '#00ff41', fontSize: '0.75rem' }} className="ml-auto">
          HACKER MODE ACTIVE
        </span>
      </div>

      <div className="relative z-10 flex-1 p-4 sm:p-8 space-y-6 max-w-3xl mx-auto w-full">

        {/* Title */}
        <div className="text-center space-y-2">
          <pre className="text-xs sm:text-sm leading-tight" style={{ color: '#00ff41', textShadow: '0 0 10px #00ff41' }}>
{`██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ 
██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
███████║███████║██║     █████╔╝ █████╗  ██████╔╝
██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`}
          </pre>
          <p style={{ color: '#00ff41', fontSize: '0.7rem' }}>[ EASTER EGG — PASSWORD SECURITY LAB ]</p>
        </div>

        {/* Password Cracker */}
        <div className="border p-4 space-y-4" style={{ borderColor: '#00ff41', background: 'rgba(0,20,0,0.8)' }}>
          <h2 style={{ color: '#00ff41', fontSize: '0.8rem' }}>▶ PASSWORD CRACKER SIMULATION</h2>
          <p style={{ color: '#aaffaa', fontSize: '0.7rem' }}>Simulating brute-force attack on encrypted hash...</p>

          {crackPhase !== 'idle' && (
            <div className="space-y-2">
              <div style={{ height: '4px', background: '#003300', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${crackProgress}%`, background: '#00ff41', boxShadow: '0 0 8px #00ff41', transition: 'width 0.05s' }} />
              </div>
              <div style={{ color: '#00ff41', fontSize: '0.8rem', letterSpacing: '0.1em', fontFamily: 'monospace' }}>
                {crackedDisplay || '...'}
              </div>
              {crackPhase === 'done' && (
                <div className="p-2 border" style={{ borderColor: '#00ff41', background: 'rgba(0,255,65,0.1)' }}>
                  <p style={{ color: '#00ff41', fontSize: '0.75rem' }}>✅ PASSWORD CRACKED: <strong>{TARGET_PASSWORD}</strong></p>
                  <p style={{ color: '#aaffaa', fontSize: '0.65rem' }}>Time: 3.2s | Method: Dictionary + Brute Force | [SIMULATION ONLY]</p>
                </div>
              )}
            </div>
          )}

          <button
            onClick={startCrack}
            disabled={crackPhase === 'cracking'}
            className="px-4 py-2 border text-xs transition-all"
            style={{
              borderColor: '#00ff41', color: '#00ff41',
              background: crackPhase === 'cracking' ? 'rgba(0,255,65,0.1)' : 'transparent',
              cursor: crackPhase === 'cracking' ? 'not-allowed' : 'pointer',
            }}
          >
            {crackPhase === 'idle' ? '▶ INITIATE CRACK SEQUENCE' :
             crackPhase === 'cracking' ? '⏳ CRACKING...' : '✅ CRACKED — RUN AGAIN?'}
          </button>
        </div>

        {/* Password Strength Checker */}
        <div className="border p-4 space-y-4" style={{ borderColor: '#00ff41', background: 'rgba(0,20,0,0.8)' }}>
          <h2 style={{ color: '#00ff41', fontSize: '0.8rem' }}>▶ PASSWORD STRENGTH ANALYZER</h2>

          <div className="flex gap-2">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password to analyze..."
              className="flex-1 bg-transparent outline-none px-3 py-2 border text-sm"
              style={{ borderColor: '#00ff41', color: '#00ff41', fontFamily: 'monospace' }}
            />
            <button
              onClick={() => setShowPassword(s => !s)}
              className="px-3 py-2 border"
              style={{ borderColor: '#00ff41', color: '#00ff41' }}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          {strength && password && (
            <div className="space-y-3">
              {/* Strength bar */}
              <div>
                <div className="flex justify-between mb-1">
                  <span style={{ color: '#aaffaa', fontSize: '0.7rem' }}>STRENGTH:</span>
                  <span style={{ color: strengthColor, fontSize: '0.7rem', fontWeight: 'bold' }}>{strength.level.toUpperCase()}</span>
                </div>
                <div style={{ height: '6px', background: '#003300', borderRadius: '3px' }}>
                  <div
                    className={strengthClass}
                    style={{ height: '100%', width: `${strength.score}%`, borderRadius: '3px', transition: 'width 0.3s' }}
                  />
                </div>
              </div>

              {/* Feedback */}
              {strength.feedback.length > 0 && (
                <div className="space-y-1">
                  {strength.feedback.map((f, i) => (
                    <p key={i} style={{ color: '#ffaa00', fontSize: '0.7rem' }}>⚠ {f}</p>
                  ))}
                </div>
              )}

              {strength.level === 'Strong' && (
                <p style={{ color: '#00ff41', fontSize: '0.7rem' }}>✅ Excellent password! Highly resistant to attacks.</p>
              )}
            </div>
          )}

          {/* Suggested strong password */}
          {suggestedPassword && (
            <div className="border p-3 space-y-2" style={{ borderColor: '#ffaa00', background: 'rgba(255,170,0,0.05)' }}>
              <p style={{ color: '#ffaa00', fontSize: '0.7rem' }}>⚡ SUGGESTED STRONG PASSWORD:</p>
              <div className="flex items-center gap-2">
                <code style={{ color: '#00ff41', fontSize: '0.8rem', flex: 1, wordBreak: 'break-all' }}>{suggestedPassword}</code>
                <button
                  onClick={() => { setSuggestedPassword(generateStrongPassword()); playSound('click'); }}
                  className="p-1 border"
                  style={{ borderColor: '#ffaa00', color: '#ffaa00' }}
                >
                  <RefreshCw size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p style={{ color: '#333', fontSize: '0.65rem', textAlign: 'center' }}>
          [SIMULATION ONLY — No actual hacking. Educational purposes only.]
        </p>
      </div>
    </div>
  );
}
