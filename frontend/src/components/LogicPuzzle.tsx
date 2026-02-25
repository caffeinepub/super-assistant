import { useState } from 'react';
import { useAudio } from '../contexts/AudioContext';
import { RIDDLES } from '../data/logicRiddles';
import { CheckCircle, XCircle } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function LogicPuzzle({ onBack }: Props) {
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(0);
  const { playSound } = useAudio();

  const riddle = RIDDLES[idx];

  const checkAnswer = () => {
    if (!answer.trim()) return;
    const userAns = answer.trim().toLowerCase();
    const correct = Array.isArray(riddle.answer)
      ? riddle.answer.some(a => a.toLowerCase() === userAns)
      : riddle.answer.toLowerCase() === userAns;

    if (correct) {
      setFeedback('correct');
      setCompleted(c => c + 1);
      playSound('quizCorrect');
    } else {
      setFeedback('wrong');
      setShowAnswer(true);
      playSound('quizWrong');
    }
  };

  const next = () => {
    if (idx + 1 < RIDDLES.length) {
      setIdx(i => i + 1);
      setAnswer('');
      setFeedback(null);
      setShowAnswer(false);
    }
  };

  const reset = () => {
    setIdx(0);
    setAnswer('');
    setFeedback(null);
    setShowAnswer(false);
    setCompleted(0);
  };

  const allDone = idx >= RIDDLES.length - 1 && feedback !== null;

  return (
    <div className="flex flex-col items-center gap-4 p-4 max-w-xl mx-auto">
      <div className="flex items-center justify-between w-full font-mono-tech text-xs text-neon">
        <span>RIDDLE {idx + 1}/{RIDDLES.length}</span>
        <span>SOLVED: {completed}</span>
      </div>

      <div className="neon-card p-6 w-full space-y-4">
        <div className="font-mono-tech text-xs text-muted-foreground">[{riddle.type === 'number' ? 'NUMERIC' : 'TEXT'} ANSWER]</div>
        <pre className="font-mono-tech text-sm text-foreground whitespace-pre-wrap leading-relaxed">{riddle.question}</pre>
        <p className="font-rajdhani text-xs text-muted-foreground italic">Hint: {riddle.hint}</p>

        {feedback === null && (
          <div className="flex gap-2">
            <input
              className="neon-input flex-1 rounded text-sm"
              placeholder="Your answer..."
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && checkAnswer()}
            />
            <button onClick={() => { playSound('click'); checkAnswer(); }} className="neon-btn neon-btn-primary px-4">
              CHECK
            </button>
          </div>
        )}

        {feedback === 'correct' && (
          <div className="p-3 border border-green-400 bg-green-400/10 rounded">
            <div className="flex items-center gap-2 text-green-400 font-orbitron text-sm mb-1">
              <CheckCircle size={16} /> CORRECT!
            </div>
            <p className="font-rajdhani text-sm text-green-300">{riddle.explanation}</p>
          </div>
        )}

        {feedback === 'wrong' && (
          <div className="p-3 border border-red-400 bg-red-400/10 rounded">
            <div className="flex items-center gap-2 text-red-400 font-orbitron text-sm mb-1">
              <XCircle size={16} /> INCORRECT
            </div>
            {showAnswer && (
              <p className="font-rajdhani text-sm text-red-300">
                Answer: <strong>{Array.isArray(riddle.answer) ? riddle.answer[0] : riddle.answer}</strong>
                <br />{riddle.explanation}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={() => { playSound('click'); onBack(); }} className="neon-btn text-xs">← BACK</button>
        {feedback !== null && !allDone && (
          <button onClick={() => { playSound('click'); next(); }} className="neon-btn neon-btn-primary text-xs">NEXT →</button>
        )}
        {allDone && (
          <button onClick={() => { playSound('click'); reset(); }} className="neon-btn neon-btn-primary text-xs">RESTART</button>
        )}
      </div>

      {allDone && (
        <div className="neon-card p-4 text-center animate-celebrate">
          <p className="font-orbitron text-sm text-neon">🎉 ALL RIDDLES COMPLETE! Solved: {completed}/{RIDDLES.length}</p>
        </div>
      )}
    </div>
  );
}
