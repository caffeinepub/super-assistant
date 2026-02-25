import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import { useAddQuizScore } from '../hooks/useQueries';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

interface Props {
  onBack: () => void;
}

type Phase = 'start' | 'question' | 'feedback' | 'done';

export default function Quiz({ onBack }: Props) {
  const [phase, setPhase] = useState<Phase>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [shake, setShake] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const { playSound } = useAudio();
  const addScore = useAddQuizScore();

  const questions = QUIZ_QUESTIONS;
  const current = questions[currentIdx];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === current.correctIndex;
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) {
      setScore(s => s + 1);
      playSound('quizCorrect');
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 600);
    } else {
      playSound('quizWrong');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setPhase('feedback');
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      const finalScore = score + (feedback === 'correct' ? 0 : 0);
      addScore.mutate(BigInt(score));
      setPhase('done');
    } else {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setFeedback(null);
      setPhase('question');
    }
  };

  const handleRestart = () => {
    setPhase('start');
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setFeedback(null);
  };

  const categoryColors: Record<string, string> = {
    Phishing: 'text-red-400',
    Passwords: 'text-yellow-400',
    'Social Engineering': 'text-orange-400',
    'Web Security': 'text-blue-400',
    Authentication: 'text-purple-400',
    'Network Security': 'text-cyan-400',
    Malware: 'text-red-500',
    Vulnerabilities: 'text-orange-500',
    'Data Protection': 'text-green-400',
    'Identity Theft': 'text-pink-400',
    'Physical Security': 'text-gray-400',
    Encryption: 'text-indigo-400',
    'Mobile Security': 'text-teal-400',
    'Attack Types': 'text-red-300',
  };

  if (phase === 'start') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 page-enter">
        <div className="neon-card p-8 max-w-lg w-full text-center space-y-6">
          <div className="text-6xl">🧠</div>
          <h1 className="font-orbitron text-2xl font-bold text-neon animate-neon-pulse">CYBER QUIZ</h1>
          <p className="font-rajdhani text-muted-foreground">
            Test your cybersecurity knowledge with {questions.length} real-life scenarios.
            Can you spot phishing emails? Would you click that suspicious link?
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm font-mono-tech">
            <div className="neon-card p-3"><span className="text-neon">{questions.length}</span><br /><span className="text-muted-foreground text-xs">Questions</span></div>
            <div className="neon-card p-3"><span className="text-neon">Real-Life</span><br /><span className="text-muted-foreground text-xs">Scenarios</span></div>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { playSound('click'); onBack(); }} className="neon-btn flex items-center gap-2">
              <ArrowLeft size={14} /> BACK
            </button>
            <button onClick={() => { playSound('click'); setPhase('question'); }} className="neon-btn neon-btn-primary">
              START QUIZ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 page-enter">
        <div className={`neon-card p-8 max-w-lg w-full text-center space-y-6 ${celebrate ? 'animate-celebrate' : ''}`}>
          <Trophy size={64} className="text-neon mx-auto animate-float" />
          <h1 className="font-orbitron text-2xl font-bold text-neon">QUIZ COMPLETE!</h1>
          <div className="text-5xl font-orbitron text-neon animate-neon-pulse">{score}/{questions.length}</div>
          <div className="font-rajdhani text-lg text-muted-foreground">{pct}% Correct</div>
          <div className="neon-progress">
            <div className="neon-progress-bar" style={{ width: `${pct}%` }} />
          </div>
          <p className="font-rajdhani text-muted-foreground">
            {pct >= 80 ? '🏆 Excellent! You\'re a cybersecurity expert!' :
             pct >= 60 ? '👍 Good job! Keep learning to stay safe online.' :
             '📚 Keep studying! Cybersecurity knowledge saves lives.'}
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { playSound('click'); onBack(); }} className="neon-btn flex items-center gap-2">
              <ArrowLeft size={14} /> DASHBOARD
            </button>
            <button onClick={() => { playSound('click'); handleRestart(); }} className="neon-btn neon-btn-primary">
              PLAY AGAIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col page-enter">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-neon neon-card">
        <button onClick={() => { playSound('click'); onBack(); }} className="neon-btn p-2">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-orbitron text-sm text-neon">CYBER QUIZ</span>
            <span className="font-mono-tech text-sm text-neon">Score: {score}/{questions.length}</span>
          </div>
          <div className="neon-progress mt-1">
            <div className="neon-progress-bar" style={{ width: `${((currentIdx) / questions.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className={`neon-card p-6 max-w-2xl w-full space-y-6 ${shake ? 'animate-[shake_0.5s_ease]' : ''}`}>
          {/* Category + number */}
          <div className="flex items-center justify-between">
            <span className={`font-mono-tech text-xs ${categoryColors[current.category] || 'text-neon'}`}>
              [{current.category}]
            </span>
            <span className="font-mono-tech text-xs text-muted-foreground">
              {currentIdx + 1} / {questions.length}
            </span>
          </div>

          {/* Question text */}
          <p className="font-rajdhani text-base sm:text-lg text-foreground leading-relaxed">
            {current.text}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {current.options.map((opt, i) => {
              let btnClass = 'neon-btn w-full text-left px-4 py-3 font-rajdhani text-sm';
              if (selected !== null) {
                if (i === current.correctIndex) btnClass += ' border-green-400 text-green-400 bg-green-400/10';
                else if (i === selected && i !== current.correctIndex) btnClass += ' border-red-400 text-red-400 bg-red-400/10';
                else btnClass += ' opacity-40';
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)} disabled={selected !== null} className={btnClass}>
                  <span className="font-orbitron text-xs mr-3">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                  {selected !== null && i === current.correctIndex && <CheckCircle size={16} className="inline ml-2 text-green-400" />}
                  {selected !== null && i === selected && i !== current.correctIndex && <XCircle size={16} className="inline ml-2 text-red-400" />}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`p-3 rounded border font-rajdhani text-sm ${
              feedback === 'correct' ? 'border-green-400 bg-green-400/10 text-green-400' : 'border-red-400 bg-red-400/10 text-red-400'
            }`}>
              {feedback === 'correct' ? '✅ Correct! ' : '❌ Wrong! '}
              {current.explanation}
            </div>
          )}

          {phase === 'feedback' && (
            <button onClick={() => { playSound('click'); handleNext(); }} className="neon-btn neon-btn-primary w-full">
              {currentIdx + 1 >= questions.length ? 'SEE RESULTS' : 'NEXT QUESTION →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
