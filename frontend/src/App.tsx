import { useState, useCallback } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AudioProvider } from './contexts/AudioContext';
import { AppProvider, useApp } from './contexts/AppContext';
import IntroScreen from './components/IntroScreen';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Terminal from './components/Terminal';
import Quiz from './components/Quiz';
import Games from './components/Games';
import TechNews from './components/TechNews';
import Profile from './components/Profile';
import CyberDefender from './components/CyberDefender';
import HackerPage from './components/HackerPage';
import ParticleBackground from './components/ParticleBackground';
import Taskbar from './components/Taskbar';
import GuidedTour from './components/GuidedTour';
import { useKonamiCode } from './hooks/useKonamiCode';

type View = 'intro' | 'dashboard' | 'chatbot' | 'terminal' | 'quiz' | 'games' | 'news' | 'profile' | 'cyber-defender' | 'hacker';

function AppInner() {
  const { isHackerPageUnlocked, unlockHackerPage, isTourActive, setIsTourActive } = useApp();
  const [view, setView] = useState<View>('intro');
  const [transitioning, setTransitioning] = useState(false);

  const navigate = useCallback((to: View) => {
    if (to === 'hacker') unlockHackerPage();
    setTransitioning(true);
    setTimeout(() => {
      setView(to);
      setTransitioning(false);
    }, 200);
  }, [unlockHackerPage]);

  useKonamiCode(() => {
    unlockHackerPage();
    navigate('hacker');
  });

  const renderView = () => {
    switch (view) {
      case 'intro': return <IntroScreen onEnter={() => navigate('dashboard')} />;
      case 'dashboard': return <Dashboard onNavigate={navigate} onStartTour={() => setIsTourActive(true)} />;
      case 'chatbot': return <Chatbot onBack={() => navigate('dashboard')} />;
      case 'terminal': return <Terminal onBack={() => navigate('dashboard')} onHackerUnlock={() => navigate('hacker')} />;
      case 'quiz': return <Quiz onBack={() => navigate('dashboard')} />;
      case 'games': return <Games onBack={() => navigate('dashboard')} />;
      case 'news': return <TechNews onBack={() => navigate('dashboard')} />;
      case 'profile': return <Profile onBack={() => navigate('dashboard')} />;
      case 'cyber-defender': return <CyberDefender onBack={() => navigate('dashboard')} />;
      case 'hacker': return isHackerPageUnlocked ? <HackerPage onBack={() => navigate('dashboard')} /> : <Dashboard onNavigate={navigate} onStartTour={() => setIsTourActive(true)} />;
      default: return <Dashboard onNavigate={navigate} onStartTour={() => setIsTourActive(true)} />;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <ParticleBackground />
      {view !== 'intro' && <Taskbar onNavigate={navigate} currentView={view} />}
      <main
        className={`relative z-10 transition-opacity duration-200 ${transitioning ? 'opacity-0' : 'opacity-100'} ${view !== 'intro' ? 'pt-12' : ''}`}
        style={{ minHeight: '100vh' }}
      >
        {renderView()}
      </main>
      {isTourActive && (
        <GuidedTour
          onNavigate={navigate}
          onClose={() => setIsTourActive(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <AppProvider>
          <AppInner />
        </AppProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}
