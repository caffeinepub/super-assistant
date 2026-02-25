import { useState, useEffect } from 'react';
import { ArrowLeft, Save, User } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import { useGetProfile, useCreateOrUpdateProfile } from '../hooks/useQueries';
import { useTheme } from '../contexts/ThemeContext';
import { AVATARS } from '../utils/avatarLoader';

interface Props {
  onBack: () => void;
}

export default function Profile({ onBack }: Props) {
  const { playSound } = useAudio();
  const { theme } = useTheme();
  const { data: profile, isLoading } = useGetProfile();
  const updateProfile = useCreateOrUpdateProfile();

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setAvatar(Number(profile.avatar));
    }
  }, [profile]);

  const handleSave = async () => {
    if (!username.trim()) return;
    playSound('click');
    await updateProfile.mutateAsync({ username: username.trim(), avatar: BigInt(avatar), theme });
    setSaved(true);
    playSound('quizCorrect');
    setTimeout(() => setSaved(false), 2000);
  };

  const EMOJI_AVATARS = ['🤖', '👾', '🦾', '🧬', '⚡', '🔮', '💀', '🛸'];

  return (
    <div className="min-h-screen flex flex-col page-enter">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-neon neon-card">
        <button onClick={() => { playSound('click'); onBack(); }} className="neon-btn p-2">
          <ArrowLeft size={16} />
        </button>
        <User size={20} className="text-neon" />
        <h1 className="font-orbitron text-sm font-bold text-neon">USER PROFILE</h1>
      </div>

      <div className="flex-1 p-4 sm:p-8 max-w-2xl mx-auto w-full space-y-6">
        {isLoading ? (
          <div className="text-center text-neon font-mono-tech animate-pulse">LOADING PROFILE...</div>
        ) : (
          <>
            {/* Avatar selection */}
            <div className="neon-card p-6 space-y-4">
              <h2 className="font-orbitron text-sm text-neon">SELECT AVATAR</h2>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {EMOJI_AVATARS.map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => { playSound('click'); setAvatar(i); }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded border-2 flex items-center justify-center text-2xl transition-all ${
                      avatar === i ? 'border-neon bg-neon-dim shadow-neon-sm' : 'border-muted hover:border-neon'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {/* Sprite sheet avatars */}
              <div className="mt-3">
                <p className="font-mono-tech text-xs text-muted-foreground mb-2">CYBERPUNK AVATARS:</p>
                <div className="w-full overflow-hidden rounded border border-neon/30">
                  <img
                    src="/assets/generated/avatars-sheet.dim_512x256.png"
                    alt="Avatar sheet"
                    className="w-full object-cover"
                    style={{ imageRendering: 'pixelated', maxHeight: '80px' }}
                  />
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="neon-card p-6 space-y-4">
              <h2 className="font-orbitron text-sm text-neon">OPERATOR IDENTITY</h2>
              <div>
                <label className="font-mono-tech text-xs text-muted-foreground block mb-2">USERNAME</label>
                <input
                  className="neon-input w-full rounded"
                  placeholder="Enter your operator name..."
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  maxLength={32}
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="text-4xl">{EMOJI_AVATARS[avatar] || '🤖'}</div>
                <div>
                  <div className="font-orbitron text-sm text-neon">{username || 'ANONYMOUS'}</div>
                  <div className="font-mono-tech text-xs text-muted-foreground">CLEARANCE: LEVEL-5</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            {profile && (
              <div className="neon-card p-6 space-y-4">
                <h2 className="font-orbitron text-sm text-neon">OPERATOR STATS</h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'TOTAL SCORE', value: profile.totalScore.toString() },
                    { label: 'GAMES PLAYED', value: profile.gamesPlayed.toString() },
                    { label: 'CHATS SENT', value: profile.chatsSent.toString() },
                  ].map(stat => (
                    <div key={stat.label} className="neon-card p-3 text-center">
                      <div className="font-orbitron text-lg text-neon">{stat.value}</div>
                      <div className="font-mono-tech text-xs text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={updateProfile.isPending || !username.trim()}
              className={`neon-btn neon-btn-primary w-full flex items-center justify-center gap-2 ${saved ? 'border-green-400 text-green-400' : ''}`}
            >
              {updateProfile.isPending ? (
                <span className="animate-pulse">SAVING...</span>
              ) : saved ? (
                <><Save size={16} /> PROFILE SAVED! ✓</>
              ) : (
                <><Save size={16} /> SAVE PROFILE</>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
