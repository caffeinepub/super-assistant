import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Bot, User } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import { useGetChatHistory, useAddChatMessage } from '../hooks/useQueries';
import { getResponse, detectMood } from '../data/chatbotResponses';
import TypewriterText from './TypewriterText';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  mood?: string;
  isTyping?: boolean;
}

interface Props {
  onBack: () => void;
}

export default function Chatbot({ onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: "Hello, operator! I'm SUPER ASSISTANT. Ask me anything about tech, cybersecurity, programming, or just chat. I can even detect your mood! 🤖",
    }
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { playSound } = useAudio();
  const { data: history } = useGetChatHistory();
  const addMessage = useAddChatMessage();

  useEffect(() => {
    if (history && history.length > 0) {
      const loaded: Message[] = history.slice(-20).map((m, i) => ({
        id: `hist-${i}`,
        role: 'user' as const,
        text: m.message,
      }));
      if (loaded.length > 0) {
        setMessages(prev => [prev[0], ...loaded]);
      }
    }
  }, [history]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || thinking) return;
    const userText = input.trim();
    setInput('');
    playSound('click');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setThinking(true);

    // Save to backend
    addMessage.mutate(userText);

    // Simulate thinking delay
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));

    const mood = detectMood(userText);
    const baseResponse = getResponse(userText);
    const fullResponse = mood
      ? `${mood.emoji} ${mood.prefix}${baseResponse}`
      : baseResponse;

    setThinking(false);
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: fullResponse,
      mood: mood?.emoji,
      isTyping: true,
    };
    setMessages(prev => [...prev, assistantMsg]);
    playSound('notification');
  };

  return (
    <div className="min-h-screen flex flex-col page-enter">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-neon neon-card">
        <button onClick={() => { playSound('click'); onBack(); }} className="neon-btn p-2">
          <ArrowLeft size={16} />
        </button>
        <Bot size={20} className="text-neon" />
        <div>
          <h1 className="font-orbitron text-sm font-bold text-neon">AI ASSISTANT</h1>
          <p className="font-mono-tech text-xs text-muted-foreground">50+ responses · Mood detection · Live typing</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono-tech text-xs text-neon">ONLINE</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl w-full mx-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 border border-neon ${
              msg.role === 'assistant' ? 'bg-neon-dim' : 'bg-muted'
            }`}>
              {msg.role === 'assistant' ? <Bot size={14} className="text-neon" /> : <User size={14} className="text-neon" />}
            </div>
            <div className={`max-w-[80%] neon-card p-3 ${msg.role === 'user' ? 'ml-auto' : ''}`}>
              {msg.isTyping ? (
                <TypewriterText
                  text={msg.text}
                  delay={25}
                  className="font-rajdhani text-sm text-foreground leading-relaxed"
                />
              ) : (
                <p className="font-rajdhani text-sm text-foreground leading-relaxed">{msg.text}</p>
              )}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded flex items-center justify-center border border-neon bg-neon-dim">
              <Bot size={14} className="text-neon" />
            </div>
            <div className="neon-card p-3">
              <div className="flex gap-1 items-center">
                <span className="font-mono-tech text-xs text-neon">THINKING</span>
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-neon max-w-4xl w-full mx-auto">
        <div className="flex gap-2">
          <input
            className="neon-input flex-1 rounded text-sm"
            placeholder="Type a message... (try 'I'm frustrated' or 'tell me about AI')"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            disabled={thinking}
          />
          <button
            onClick={handleSend}
            disabled={thinking || !input.trim()}
            className="neon-btn neon-btn-primary px-4"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="font-mono-tech text-xs text-muted-foreground mt-2 opacity-50">
          Mood detection active · 50+ response patterns
        </p>
      </div>
    </div>
  );
}
