import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import { NEWS_ITEMS, BREAKING_NEWS, type NewsItem } from '../data/newsData';

interface Props {
  onBack: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  AI: 'text-purple-400 border-purple-400',
  Security: 'text-red-400 border-red-400',
  Blockchain: 'text-yellow-400 border-yellow-400',
  IoT: 'text-blue-400 border-blue-400',
  Quantum: 'text-cyan-400 border-cyan-400',
  Cloud: 'text-sky-400 border-sky-400',
  Space: 'text-indigo-400 border-indigo-400',
  Robotics: 'text-orange-400 border-orange-400',
};

export default function TechNews({ onBack }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { playSound } = useAudio();

  const toggle = (id: number) => {
    playSound('click');
    setExpanded(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col page-enter">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-neon neon-card">
        <button onClick={() => { playSound('click'); onBack(); }} className="neon-btn p-2">
          <ArrowLeft size={16} />
        </button>
        <h1 className="font-orbitron text-sm font-bold text-neon">TECH NEWS FEED</h1>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="font-mono-tech text-xs text-red-400">LIVE</span>
        </div>
      </div>

      {/* Breaking news ticker */}
      <div className="bg-red-900/30 border-b border-red-400/50 py-2 overflow-hidden">
        <div className="flex items-center gap-4">
          <span className="font-orbitron text-xs text-red-400 px-3 py-0.5 border border-red-400 flex-shrink-0 ml-2">
            BREAKING
          </span>
          <div className="overflow-hidden flex-1">
            <div className="animate-ticker whitespace-nowrap font-mono-tech text-xs text-red-300">
              {BREAKING_NEWS.join('  ●  ')}  ●  {BREAKING_NEWS.join('  ●  ')}
            </div>
          </div>
        </div>
      </div>

      {/* News feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-w-4xl w-full mx-auto">
        {NEWS_ITEMS.map(item => (
          <article key={item.id} className="neon-card overflow-hidden">
            <button
              onClick={() => toggle(item.id)}
              className="w-full text-left p-4 hover:bg-neon-dim transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`font-mono-tech text-xs px-2 py-0.5 border rounded ${CATEGORY_COLORS[item.category] || 'text-neon border-neon'}`}>
                      {item.category}
                    </span>
                    {item.isBreaking && (
                      <span className="font-mono-tech text-xs text-red-400 border border-red-400 px-2 py-0.5 rounded animate-pulse">
                        BREAKING
                      </span>
                    )}
                    <span className="font-mono-tech text-xs text-muted-foreground">{item.timestamp}</span>
                  </div>
                  <h2 className="font-orbitron text-sm font-bold text-foreground leading-tight mb-1">
                    {item.headline}
                  </h2>
                  <p className="font-rajdhani text-sm text-muted-foreground">{item.excerpt}</p>
                </div>
                <div className="text-neon flex-shrink-0 mt-1">
                  {expanded === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
            </button>

            {expanded === item.id && (
              <div className="px-4 pb-4 border-t border-neon/30">
                <p className="font-rajdhani text-sm text-foreground leading-relaxed mt-3">
                  {item.fullArticle}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
