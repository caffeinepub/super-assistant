import { useState, useEffect, useRef } from 'react';

interface Props {
  text: string;
  delay?: number;
  onDone?: () => void;
  className?: string;
}

export default function TypewriterText({ text, delay = 28, onDone, className = '' }: Props) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);
  const textRef = useRef(text);

  useEffect(() => {
    textRef.current = text;
    indexRef.current = 0;
    setDisplayed('');

    const tick = () => {
      if (indexRef.current < textRef.current.length) {
        indexRef.current++;
        setDisplayed(textRef.current.slice(0, indexRef.current));
        const variance = delay + (Math.random() - 0.5) * 20;
        timer = setTimeout(tick, Math.max(5, variance));
      } else {
        onDone?.();
      }
    };

    let timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [text, delay, onDone]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-2 h-4 bg-current opacity-80 animate-pulse ml-0.5" />
      )}
    </span>
  );
}
