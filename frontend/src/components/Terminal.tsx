import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import { useGetProfile } from '../hooks/useQueries';
import { handleCommand } from '../utils/terminalCommands';

interface OutputLine {
  text: string;
  color?: string;
}

interface Props {
  onBack: () => void;
  onHackerUnlock: () => void;
}

export default function Terminal({ onBack, onHackerUnlock }: Props) {
  const [history, setHistory] = useState<OutputLine[]>([
    { text: '╔══════════════════════════════════════════════╗', color: '#00ff41' },
    { text: '║   SUPER ASSISTANT TERMINAL v2.0 — ONLINE    ║', color: '#00ff41' },
    { text: '╚══════════════════════════════════════════════╝', color: '#00ff41' },
    { text: "Type 'help' for available commands.", color: '#aaffaa' },
    { text: '' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playSound } = useAudio();
  const { data: profile } = useGetProfile();

  useEffect(() => {
    playSound('terminalOpen');
    inputRef.current?.focus();
  }, [playSound]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const runCommand = useCallback(async (cmd: string) => {
    if (!cmd.trim()) return;
    setProcessing(true);
    setCmdHistory(prev => [cmd, ...prev]);
    setCmdIndex(-1);

    setHistory(prev => [...prev, { text: `> ${cmd}`, color: '#ffffff' }]);

    const result = handleCommand(cmd, profile?.username || 'OPERATOR');

    if (result.hasProgress) {
      setProgressLabel(result.progressLabel || 'PROCESSING');
      for (let p = 0; p <= 100; p += 5) {
        setProgress(p);
        await new Promise(r => setTimeout(r, 40));
      }
      setProgress(0);
      setProgressLabel('');
    }

    for (const line of result.lines) {
      if (line.delay) await new Promise(r => setTimeout(r, line.delay));
      setHistory(prev => [...prev, { text: line.text, color: line.color }]);
    }

    setHistory(prev => [...prev, { text: '' }]);
    setProcessing(false);

    if (result.navigateTo === 'hacker') {
      setTimeout(() => { onHackerUnlock(); }, 1200);
    } else if (result.navigateTo === 'dashboard') {
      setTimeout(() => { onBack(); }, 800);
    }
  }, [profile, onHackerUnlock, onBack]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(newIdx);
      setInput(cmdHistory[newIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(cmdIndex - 1, -1);
      setCmdIndex(newIdx);
      setInput(newIdx === -1 ? '' : cmdHistory[newIdx]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col page-enter" style={{ background: '#000', fontFamily: "'Share Tech Mono', monospace" }}>
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b" style={{ borderColor: '#00ff41', background: '#001100' }}>
        <button onClick={() => { playSound('click'); onBack(); }}
          className="px-3 py-1 border text-xs" style={{ borderColor: '#00ff41', color: '#00ff41' }}>
          <ArrowLeft size={14} />
        </button>
        <span style={{ color: '#00ff41', fontSize: '0.75rem' }}>SUPER ASSISTANT TERMINAL v2.0</span>
        <div className="ml-auto flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full" style={{ background: '#00ff41' }} />
        </div>
      </div>

      {/* Progress bar */}
      {progressLabel && (
        <div className="px-4 py-2" style={{ background: '#001100' }}>
          <div className="flex items-center gap-2 mb-1">
            <span style={{ color: '#00ff41', fontSize: '0.7rem' }}>{progressLabel}...</span>
            <span style={{ color: '#00ff41', fontSize: '0.7rem' }}>{progress}%</span>
          </div>
          <div style={{ height: '4px', background: '#003300', borderRadius: '2px' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#00ff41', boxShadow: '0 0 8px #00ff41', transition: 'width 0.05s' }} />
          </div>
        </div>
      )}

      {/* Output */}
      <div className="flex-1 overflow-y-auto p-4 space-y-0.5" onClick={() => inputRef.current?.focus()}>
        {history.map((line, i) => (
          <div key={i} style={{ color: line.color || '#00ff41', fontSize: '0.8rem', lineHeight: '1.5', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {line.text || '\u00A0'}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input line */}
      <div className="flex items-center gap-2 p-4 border-t" style={{ borderColor: '#00ff41', background: '#000' }}>
        <span style={{ color: '#00ff41', fontSize: '0.8rem' }}>
          {profile?.username || 'operator'}@super-assistant:~$
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={processing}
          className="flex-1 bg-transparent outline-none blink-cursor"
          style={{ color: '#00ff41', fontSize: '0.8rem', caretColor: '#00ff41' }}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
