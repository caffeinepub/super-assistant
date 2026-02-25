import { useState } from 'react';
import { ArrowLeft, Shield, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import { CYBER_TIPS, PHISHING_EMAIL } from '../data/cyberTips';
import ThreatMap from './ThreatMap';

interface Props {
  onBack: () => void;
}

export default function CyberDefender({ onBack }: Props) {
  const { playSound } = useAudio();
  const [tipIdx, setTipIdx] = useState(0);
  const [shieldScore, setShieldScore] = useState(0);
  const [foundElements, setFoundElements] = useState<Set<string>>(new Set());
  const [showTip, setShowTip] = useState<string | null>(null);

  const tip = CYBER_TIPS[tipIdx];

  const handleFindElement = (id: string) => {
    if (foundElements.has(id)) return;
    playSound('quizCorrect');
    const newFound = new Set(foundElements);
    newFound.add(id);
    setFoundElements(newFound);
    setShieldScore(s => s + 10);
    setShowTip(id);
    setTimeout(() => setShowTip(null), 3000);
  };

  const nextTip = () => {
    playSound('click');
    setTipIdx(i => (i + 1) % CYBER_TIPS.length);
    setShieldScore(s => s + 2);
  };

  const prevTip = () => {
    playSound('click');
    setTipIdx(i => (i - 1 + CYBER_TIPS.length) % CYBER_TIPS.length);
  };

  const allFound = foundElements.size >= PHISHING_EMAIL.suspiciousElements.length;

  return (
    <div className="min-h-screen flex flex-col page-enter">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-neon neon-card">
        <button onClick={() => { playSound('click'); onBack(); }} className="neon-btn p-2">
          <ArrowLeft size={16} />
        </button>
        <Shield size={20} className="text-neon" />
        <h1 className="font-orbitron text-sm font-bold text-neon">CYBER DEFENDER</h1>
        <div className="ml-auto flex items-center gap-2">
          <Shield size={14} className="text-neon" />
          <span className="font-orbitron text-sm text-neon">SHIELD: {shieldScore}</span>
        </div>
      </div>

      {/* Banner */}
      <div className="relative h-32 sm:h-48 overflow-hidden">
        <img
          src="/assets/generated/cyber-defender-banner.dim_1200x400.png"
          alt="Cyber Defender"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-orbitron text-xl sm:text-3xl font-bold text-neon animate-neon-pulse">CYBER DEFENDER</h2>
            <p className="font-rajdhani text-sm text-neon/80 mt-1">Protect. Detect. Defend.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-6 max-w-4xl mx-auto w-full">

        {/* Shield Score */}
        <div className="neon-card p-4 flex items-center gap-4">
          <Shield size={32} className="text-neon animate-float" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-orbitron text-sm text-neon">SHIELD SCORE</span>
              <span className="font-orbitron text-lg text-neon">{shieldScore}</span>
            </div>
            <div className="neon-progress">
              <div className="neon-progress-bar" style={{ width: `${Math.min(100, shieldScore)}%` }} />
            </div>
            <p className="font-mono-tech text-xs text-muted-foreground mt-1">
              Find phishing elements (+10) · View tips (+2)
            </p>
          </div>
        </div>

        {/* Phishing Email Mini-Game */}
        <div className="neon-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-orbitron text-sm text-neon">🎯 PHISHING DETECTOR</h3>
            <span className="font-mono-tech text-xs text-muted-foreground">
              Found: {foundElements.size}/{PHISHING_EMAIL.suspiciousElements.length}
            </span>
          </div>
          <p className="font-rajdhani text-sm text-muted-foreground">
            Click on suspicious elements in this email to identify threats!
          </p>

          {/* Fake email */}
          <div className="border border-neon/30 rounded p-3 space-y-2 font-mono-tech text-xs" style={{ background: 'rgba(0,0,0,0.4)' }}>
            {/* Email header */}
            <div className="space-y-1 border-b border-neon/20 pb-2">
              <div className="flex gap-2">
                <span className="text-muted-foreground">FROM:</span>
                <button
                  onClick={() => handleFindElement('sender')}
                  className={`transition-all ${foundElements.has('sender') ? 'text-green-400 line-through' : 'text-red-400 hover:bg-red-400/20 cursor-pointer underline'}`}
                >
                  {PHISHING_EMAIL.from}
                </button>
                {foundElements.has('sender') && <CheckCircle size={12} className="text-green-400" />}
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">TO:</span>
                <span className="text-foreground">{PHISHING_EMAIL.to}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted-foreground">SUBJECT:</span>
                <button
                  onClick={() => handleFindElement('urgency')}
                  className={`transition-all text-left ${foundElements.has('urgency') ? 'text-green-400 line-through' : 'text-yellow-400 hover:bg-yellow-400/20 cursor-pointer'}`}
                >
                  {PHISHING_EMAIL.subject}
                </button>
                {foundElements.has('urgency') && <CheckCircle size={12} className="text-green-400" />}
              </div>
            </div>

            {/* Email body */}
            <div className="space-y-2 text-foreground leading-relaxed whitespace-pre-wrap text-xs">
              <p>Dear Valued Customer,</p>
              <p>We have detected SUSPICIOUS ACTIVITY on your PayPal account. Your account has been TEMPORARILY LIMITED.</p>
              <p>To restore full access, you must verify your information IMMEDIATELY by clicking the link below:</p>
              <button
                onClick={() => handleFindElement('link')}
                className={`block transition-all ${foundElements.has('link') ? 'text-green-400 line-through' : 'text-blue-400 hover:bg-blue-400/20 cursor-pointer underline'}`}
              >
                &gt;&gt; CLICK HERE TO VERIFY YOUR ACCOUNT &lt;&lt;<br />
                http://paypa1-secure-verify.xyz/login
              </button>
              {foundElements.has('link') && <CheckCircle size={12} className="text-green-400 inline" />}
              <p>Required information:</p>
              <ul className="ml-4 space-y-1">
                <li>• Full name and date of birth</li>
                <li>• Credit card number and</li>
                <button
                  onClick={() => handleFindElement('cvv')}
                  className={`ml-0 transition-all ${foundElements.has('cvv') ? 'text-green-400 line-through' : 'text-red-400 hover:bg-red-400/20 cursor-pointer'}`}
                >
                  • CVV security code
                </button>
                {foundElements.has('cvv') && <CheckCircle size={12} className="text-green-400 inline ml-1" />}
                <button
                  onClick={() => handleFindElement('ssn')}
                  className={`block ml-0 transition-all ${foundElements.has('ssn') ? 'text-green-400 line-through' : 'text-red-400 hover:bg-red-400/20 cursor-pointer'}`}
                >
                  • Social Security Number
                </button>
                {foundElements.has('ssn') && <CheckCircle size={12} className="text-green-400 inline ml-1" />}
                <button
                  onClick={() => handleFindElement('password')}
                  className={`block ml-0 transition-all ${foundElements.has('password') ? 'text-green-400 line-through' : 'text-red-400 hover:bg-red-400/20 cursor-pointer'}`}
                >
                  • Current password
                </button>
                {foundElements.has('password') && <CheckCircle size={12} className="text-green-400 inline ml-1" />}
              </ul>
            </div>
          </div>

          {/* Tooltip for found element */}
          {showTip && (
            <div className="p-3 border border-green-400 bg-green-400/10 rounded animate-slide-up">
              <p className="font-rajdhani text-sm text-green-400">
                ✅ <strong>{PHISHING_EMAIL.suspiciousElements.find(e => e.id === showTip)?.label}:</strong>{' '}
                {PHISHING_EMAIL.suspiciousElements.find(e => e.id === showTip)?.description}
              </p>
            </div>
          )}

          {allFound && (
            <div className="p-3 border border-green-400 bg-green-400/10 rounded text-center animate-celebrate">
              <p className="font-orbitron text-sm text-green-400">🏆 ALL THREATS IDENTIFIED! You're a Cyber Defender!</p>
            </div>
          )}
        </div>

        {/* Tips Carousel */}
        <div className="neon-card p-4 space-y-3">
          <h3 className="font-orbitron text-sm text-neon">💡 SECURITY TIPS</h3>
          <div className="flex items-center gap-3">
            <button onClick={prevTip} className="neon-btn p-2"><ChevronLeft size={16} /></button>
            <div className="flex-1 neon-card p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{tip.icon}</span>
                <span className="font-orbitron text-sm text-neon">{tip.title}</span>
                <span className={`ml-auto font-mono-tech text-xs px-2 py-0.5 border rounded ${
                  tip.severity === 'critical' ? 'text-red-400 border-red-400' :
                  tip.severity === 'high' ? 'text-orange-400 border-orange-400' :
                  'text-yellow-400 border-yellow-400'
                }`}>{tip.severity.toUpperCase()}</span>
              </div>
              <p className="font-rajdhani text-sm text-muted-foreground">{tip.description}</p>
            </div>
            <button onClick={nextTip} className="neon-btn p-2"><ChevronRight size={16} /></button>
          </div>
          <div className="flex justify-center gap-1">
            {CYBER_TIPS.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === tipIdx ? 'bg-neon' : 'bg-muted'}`} />
            ))}
          </div>
          <p className="font-mono-tech text-xs text-muted-foreground text-center">{tipIdx + 1} / {CYBER_TIPS.length}</p>
        </div>

        {/* Threat Map */}
        <div className="neon-card p-4 space-y-3">
          <h3 className="font-orbitron text-sm text-neon">🌍 GLOBAL THREAT MAP</h3>
          <p className="font-mono-tech text-xs text-muted-foreground">Live simulation of cyber attack paths worldwide</p>
          <ThreatMap />
        </div>
      </div>
    </div>
  );
}
