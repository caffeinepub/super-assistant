import { useState, useEffect, useCallback } from 'react';
import { useAudio } from '../contexts/AudioContext';
import { Lock, Bug, Shield, Key, Wifi, Code, Terminal, Cloud, Cpu, Database, Globe, Zap, Eye, Server, Layers, Radio } from 'lucide-react';

const ICONS = [Lock, Bug, Shield, Key, Wifi, Code, Terminal, Cloud, Cpu, Database, Globe, Zap, Eye, Server, Layers, Radio];

interface Card {
  id: number;
  iconIdx: number;
  flipped: boolean;
  matched: boolean;
}

function createDeck(): Card[] {
  const pairs = ICONS.slice(0, 8);
  const cards: Card[] = [];
  pairs.forEach((_, i) => {
    cards.push({ id: i * 2, iconIdx: i, flipped: false, matched: false });
    cards.push({ id: i * 2 + 1, iconIdx: i, flipped: false, matched: false });
  });
  return cards.sort(() => Math.random() - 0.5);
}

interface Props {
  onBack: () => void;
}

export default function MemoryGame({ onBack }: Props) {
  const [cards, setCards] = useState<Card[]>(createDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [won, setWon] = useState(false);
  const { playSound } = useAudio();

  useEffect(() => {
    if (!running || won) return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [running, won]);

  const handleFlip = useCallback((id: number) => {
    if (won) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched || flipped.length >= 2) return;

    if (!running) setRunning(true);
    playSound('click');

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    setCards(prev => prev.map(c => c.id === id ? { ...c, flipped: true } : c));

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped.map(fid => cards.find(c => c.id === fid)!);
      if (a.iconIdx === b.iconIdx) {
        playSound('quizCorrect');
        setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, matched: true } : c));
        setFlipped([]);
        const allMatched = cards.filter(c => !newFlipped.includes(c.id)).every(c => c.matched);
        if (allMatched || cards.filter(c => !c.matched).length === 2) {
          setTimeout(() => { setWon(true); playSound('gameWin'); }, 300);
        }
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c));
          setFlipped([]);
        }, 900);
      }
    }
  }, [cards, flipped, running, won, playSound]);

  useEffect(() => {
    const matched = cards.filter(c => c.matched).length;
    if (matched === cards.length && cards.length > 0) {
      setWon(true);
      playSound('gameWin');
    }
  }, [cards, playSound]);

  const reset = () => {
    setCards(createDeck());
    setFlipped([]);
    setMoves(0);
    setSeconds(0);
    setRunning(false);
    setWon(false);
  };

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Stats */}
      <div className="flex gap-6 font-mono-tech text-sm text-neon">
        <span>MOVES: {moves}</span>
        <span>TIME: {fmt(seconds)}</span>
        <span>MATCHED: {cards.filter(c => c.matched).length / 2}/8</span>
      </div>

      {won && (
        <div className="neon-card p-4 text-center animate-celebrate border-green-400">
          <div className="text-3xl mb-2">🏆</div>
          <p className="font-orbitron text-sm text-green-400">YOU WIN! {moves} moves · {fmt(seconds)}</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {cards.map(card => {
          const Icon = ICONS[card.iconIdx];
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                card.matched
                  ? 'border-green-400 bg-green-400/20 text-green-400'
                  : card.flipped
                  ? 'border-neon bg-neon-dim text-neon'
                  : 'border-muted bg-muted hover:border-neon cursor-pointer'
              }`}
              style={{
                transform: card.flipped || card.matched ? 'rotateY(0deg)' : 'rotateY(180deg)',
                transition: 'transform 0.3s, border-color 0.2s',
              }}
            >
              {(card.flipped || card.matched) ? <Icon size={24} /> : <span className="text-muted-foreground text-lg">?</span>}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={() => { playSound('click'); onBack(); }} className="neon-btn text-xs">← BACK</button>
        <button onClick={() => { playSound('click'); reset(); }} className="neon-btn neon-btn-primary text-xs">RESET</button>
      </div>
    </div>
  );
}
