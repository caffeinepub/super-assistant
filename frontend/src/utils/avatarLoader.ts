export interface AvatarConfig {
  id: number;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Sprite sheet is 512x256 with 8 avatars (64x128 each, 2 rows of 4)
export const AVATARS: AvatarConfig[] = [
  { id: 0, label: 'Cyber Warrior', x: 0, y: 0, width: 64, height: 128 },
  { id: 1, label: 'Neon Hacker', x: 64, y: 0, width: 64, height: 128 },
  { id: 2, label: 'AI Entity', x: 128, y: 0, width: 64, height: 128 },
  { id: 3, label: 'Ghost Ops', x: 192, y: 0, width: 64, height: 128 },
  { id: 4, label: 'Data Mage', x: 256, y: 0, width: 64, height: 128 },
  { id: 5, label: 'Quantum Bot', x: 320, y: 0, width: 64, height: 128 },
  { id: 6, label: 'Shadow Net', x: 384, y: 0, width: 64, height: 128 },
  { id: 7, label: 'Void Walker', x: 448, y: 0, width: 64, height: 128 },
];

export function getAvatarStyle(avatarId: number): React.CSSProperties {
  const avatar = AVATARS[avatarId] || AVATARS[0];
  return {
    backgroundImage: `url('/assets/generated/avatars-sheet.dim_512x256.png')`,
    backgroundPosition: `-${avatar.x}px -${avatar.y}px`,
    backgroundSize: '512px 256px',
    width: `${avatar.width}px`,
    height: `${avatar.height}px`,
    imageRendering: 'pixelated',
  };
}
