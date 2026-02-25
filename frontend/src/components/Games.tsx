import { useState } from 'react';
import { ArrowLeft, Brain, Layers } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import MemoryGame from './MemoryGame';
import LogicPuzzle from './LogicPuzzle';

type GameMode = 'select' | 'memory' | 'logic';

interface Props {
  onBack: () => void;
}

export default function Games({ onBack }: Props) {
  const [mode, setMode] = useState<GameMode>('select');
  const { playSound } = useAudio();

  if (mode === 'memory') return (
    <div className="min-h-screen flex flex-col page-enter">
      <div className="flex items-center gap-3 p-4 border-b border-neon neon-card">
        <button onClick={() => { playSound('click'); setMode('select'); }} className="neon-btn p-2"><ArrowLeft size={16} /></button>
        <h1 className="font-orbitron text-sm font-bold text-neon">MEMORY GAME</h1>
        <span className="font-mono-tech text-xs text-muted-foreground ml-2">Match 8 pairs of tech icons</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <MemoryGame onBack={() => setMode('select')} />
      </div>
    </div>
  );

  if (mode === 'logic') return (
    <div className="min-h-screen flex flex-col page-enter">
      <div className="flex items-center gap-3 p-4 border-b border-neon neon-card">
        <button onClick={() => { playSound('click'); setMode('select'); }} className="neon-btn p-2"><ArrowLeft size={16} /></button>
        <h1 className="font-orbitron text-sm font-bold text-neon">LOGIC PUZZLE</h1>
        <span className="font-mono-tech text-xs text-muted-foreground ml-2">Solve programming riddles</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <LogicPuzzle onBack={() => setMode('select')} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col page-enter">
      <div className="flex items-center gap-3 p-4 border-b border-neon neon-card">
        <button onClick={() => { playSound('click'); onBack(); }} className="neon-btn p-2"><ArrowLeft size={16} /></button>
        <h1 className="font-orbitron text-sm font-bold text-neon">GAMES</h1>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
        <h2 className="font-orbitron text-xl text-neon animate-neon-pulse">SELECT GAME</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
          <button
            onClick={() => { playSound('click'); setMode('memory'); }}
            className="tile-card neon-card p-8 flex flex-col items-center gap-4"
          >
            <Layers size={40} className="text-neon animate-float" />
            <div className="text-center">
              <div className="font-orbitron text-sm font-bold text-neon">MEMORY GAME</div>
              <div className="font-rajdhani text-xs text-muted-foreground mt-1">16 cards · 8 pairs · Tech icons</div>
            </div>
          </button>
          <button
            onClick={() => { playSound('click'); setMode('logic'); }}
            className="tile-card neon-card p-8 flex flex-col items-center gap-4"
          >
            <Brain size={40} className="text-neon animate-float" style={{ animationDelay: '0.5s' }} />
            <div className="text-center">
              <div className="font-orbitron text-sm font-bold text-neon">LOGIC PUZZLE</div>
              <div className="font-rajdhani text-xs text-muted-foreground mt-1">8 riddles · Programming logic</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
