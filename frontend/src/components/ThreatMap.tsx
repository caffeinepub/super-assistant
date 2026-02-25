import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const NODES = [
  { id: 'NYC', x: 220, y: 140, label: 'New York' },
  { id: 'LON', x: 460, y: 110, label: 'London' },
  { id: 'PAR', x: 480, y: 120, label: 'Paris' },
  { id: 'BER', x: 500, y: 105, label: 'Berlin' },
  { id: 'MOS', x: 560, y: 95, label: 'Moscow' },
  { id: 'BEI', x: 680, y: 130, label: 'Beijing' },
  { id: 'TOK', x: 730, y: 140, label: 'Tokyo' },
  { id: 'SYD', x: 740, y: 260, label: 'Sydney' },
  { id: 'SAO', x: 270, y: 250, label: 'São Paulo' },
  { id: 'JNB', x: 520, y: 250, label: 'Johannesburg' },
  { id: 'MUM', x: 620, y: 175, label: 'Mumbai' },
  { id: 'SIN', x: 690, y: 200, label: 'Singapore' },
  { id: 'LAX', x: 130, y: 145, label: 'Los Angeles' },
  { id: 'CHI', x: 195, y: 135, label: 'Chicago' },
];

const ATTACKS = [
  { from: 'MOS', to: 'NYC' },
  { from: 'BEI', to: 'LON' },
  { from: 'NYC', to: 'BER' },
  { from: 'TOK', to: 'LAX' },
  { from: 'MOS', to: 'BER' },
  { from: 'BEI', to: 'SIN' },
  { from: 'SAO', to: 'NYC' },
  { from: 'JNB', to: 'LON' },
  { from: 'MUM', to: 'NYC' },
  { from: 'LAX', to: 'TOK' },
];

export default function ThreatMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animRef = useRef<number>(0);
  const progressRef = useRef<number[]>(ATTACKS.map(() => Math.random()));

  const getColor = () => {
    if (theme === 'hacker') return '#00ff41';
    if (theme === 'light') return '#0066ff';
    return '#00fff7';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const color = getColor();

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // World map silhouette (simplified)
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(0, 0, W, H);

      // Draw attack arcs
      ATTACKS.forEach((attack, i) => {
        const from = NODES.find(n => n.id === attack.from)!;
        const to = NODES.find(n => n.id === attack.to)!;
        const progress = progressRef.current[i];

        // Arc
        const mx = (from.x + to.x) / 2;
        const my = Math.min(from.y, to.y) - 40;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(mx, my, to.x, to.y);
        ctx.strokeStyle = `${color}33`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Animated dot
        const t = progress;
        const px = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * mx + t * t * to.x;
        const py = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * my + t * t * to.y;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;

        progressRef.current[i] = (progress + 0.004) % 1;
      });

      // Draw nodes
      NODES.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = `${color}99`;
        ctx.font = '8px Share Tech Mono';
        ctx.fillText(node.id, node.x + 6, node.y + 3);
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={320}
      className="w-full rounded border border-neon/30"
      style={{ background: 'rgba(0,0,0,0.6)' }}
    />
  );
}
