import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Trophy } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import { TOUR_STEPS } from '../data/tourSteps';

type View = 'intro' | 'dashboard' | 'chatbot' | 'terminal' | 'quiz' | 'games' | 'news' | 'profile' | 'cyber-defender' | 'hacker';

interface Props {
  onNavigate: (v: View) => void;
  onClose: () => void;
}

export default function GuidedTour({ onNavigate, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const { playSound } = useAudio();

  const current = TOUR_STEPS[step];

  const next = () => {
    playSound('click');
    if (step + 1 >= TOUR_STEPS.length) {
      setDone(true);
    } else {
      const nextStep = TOUR_STEPS[step + 1];
      if (nextStep.targetView !== current.targetView) {
        onNavigate(nextStep.targetView as View);
      }
      setStep(s => s + 1);
    }
  };

  const prev = () => {
    playSound('click');
    if (step > 0) {
      const prevStep = TOUR_STEPS[step - 1];
      onNavigate(prevStep.targetView as View);
      setStep(s => s - 1);
    }
  };

  const handleClose = () => {
    playSound('click');
    onClose();
  };

  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.85)' }}>
        <div className="neon-card p-8 max-w-md w-full mx-4 text-center space-y-6 animate-celebrate">
          <Trophy size={64} className="text-neon mx-auto animate-float" />
          <h2 className="font-orbitron text-2xl font-bold text-neon animate-neon-pulse">TOUR COMPLETE!</h2>
          <p className="font-rajdhani text-muted-foreground">
            You've explored all the features of SUPER ASSISTANT! Now go ahead and experience the full cyberpunk journey. 🚀
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech text-left">
            {TOUR_STEPS.map(s => (
              <div key={s.id} className="flex items-center gap-2 text-green-400">
                <span>✓</span>
                <span className="truncate">{s.title.replace(/^[\S]+\s/, '')}</span>
              </div>
            ))}
          </div>
          <button onClick={handleClose} className="neon-btn neon-btn-primary w-full">
            START EXPLORING! 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-auto"
        style={{ background: 'rgba(0,0,0,0.65)' }}
        onClick={handleClose}
      />

      {/* Tooltip card — anchored to bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pointer-events-auto">
        <div className="neon-card p-5 space-y-4 animate-slide-up">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-xs text-muted-foreground">
              STEP {step + 1} / {TOUR_STEPS.length}
            </span>
            <button
              onClick={handleClose}
              className="text-muted-foreground hover:text-neon transition-colors p-1"
              aria-label="Close tour"
            >
              <X size={16} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="neon-progress">
            <div
              className="neon-progress-bar"
              style={{ width: `${((step + 1) / TOUR_STEPS.length) * 100}%` }}
            />
          </div>

          {/* Step icon + title */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">{current.icon}</span>
            <h3 className="font-orbitron text-sm font-bold text-neon leading-tight">
              {current.title}
            </h3>
          </div>

          {/* Description */}
          <p className="font-rajdhani text-sm text-foreground leading-relaxed">
            {current.description}
          </p>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={prev}
              disabled={step === 0}
              className="neon-btn flex items-center gap-1 text-xs disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} /> PREV
            </button>

            {/* Dot indicators */}
            <div className="flex gap-1 flex-wrap justify-center">
              {TOUR_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === step
                      ? 'bg-neon scale-125'
                      : i < step
                      ? 'bg-green-400'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="neon-btn neon-btn-primary flex items-center gap-1 text-xs"
            >
              {step + 1 >= TOUR_STEPS.length ? 'FINISH 🏆' : 'NEXT'}
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
