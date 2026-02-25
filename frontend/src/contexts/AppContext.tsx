import React, { createContext, useContext, useState, useCallback } from 'react';

interface AppContextValue {
  isHackerPageUnlocked: boolean;
  unlockHackerPage: () => void;
  currentView: string;
  setCurrentView: (v: string) => void;
  isTourActive: boolean;
  setIsTourActive: (v: boolean) => void;
  tourStep: number;
  setTourStep: (v: number) => void;
}

const AppContext = createContext<AppContextValue>({
  isHackerPageUnlocked: false,
  unlockHackerPage: () => {},
  currentView: 'intro',
  setCurrentView: () => {},
  isTourActive: false,
  setIsTourActive: () => {},
  tourStep: 0,
  setTourStep: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isHackerPageUnlocked, setIsHackerPageUnlocked] = useState(false);
  const [currentView, setCurrentView] = useState('intro');
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const unlockHackerPage = useCallback(() => {
    setIsHackerPageUnlocked(true);
  }, []);

  return (
    <AppContext.Provider value={{
      isHackerPageUnlocked,
      unlockHackerPage,
      currentView,
      setCurrentView,
      isTourActive,
      setIsTourActive,
      tourStep,
      setTourStep,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
