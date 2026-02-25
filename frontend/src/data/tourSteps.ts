export interface TourStep {
  id: string;
  title: string;
  description: string;
  targetView: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  icon: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'intro',
    title: '🚀 Welcome to SUPER ASSISTANT',
    description: 'You\'re looking at a futuristic cyberpunk AI experience. This guided tour will walk you through all the amazing features. Press Next to continue!',
    targetView: 'dashboard',
    position: 'center',
    icon: '🌟'
  },
  {
    id: 'dashboard',
    title: '🖥️ OS-Style Dashboard',
    description: 'This is your command center! Click any tile to launch a feature. Use arrow keys to navigate and Enter to select. It\'s like a futuristic operating system.',
    targetView: 'dashboard',
    position: 'center',
    icon: '🖥️'
  },
  {
    id: 'themes',
    title: '🎨 Three Cyberpunk Themes',
    description: 'Switch between Dark (neon cyan), Light (electric blue), and Hacker (matrix green) themes instantly using the taskbar. Each has a unique visual identity.',
    targetView: 'dashboard',
    position: 'top',
    icon: '🎨'
  },
  {
    id: 'chatbot',
    title: '🤖 AI Chatbot Simulation',
    description: 'Chat with SUPER ASSISTANT! It responds to 50+ topics with typewriter animation. It even detects your mood and adjusts its tone. Try saying "I\'m frustrated" or "I\'m excited"!',
    targetView: 'chatbot',
    position: 'center',
    icon: '🤖'
  },
  {
    id: 'terminal',
    title: '💻 Hacking Terminal',
    description: 'A full terminal emulator with hacking commands! Try: help, whoami, scan, decrypt, hack, matrix. There\'s even a secret command hidden in there...',
    targetView: 'terminal',
    position: 'center',
    icon: '💻'
  },
  {
    id: 'quiz',
    title: '🧠 Cybersecurity Quiz',
    description: 'Test your knowledge with 22 real-life cybersecurity scenarios! Can you spot a phishing email? Would you click that lottery link? Learn while you play!',
    targetView: 'quiz',
    position: 'center',
    icon: '🧠'
  },
  {
    id: 'games',
    title: '🎮 Memory & Logic Games',
    description: 'Two games await! The Memory Game has 16 tech-themed cards to match. The Logic Puzzle tests your programming knowledge with riddles. Can you beat them all?',
    targetView: 'games',
    position: 'center',
    icon: '🎮'
  },
  {
    id: 'news',
    title: '📰 Tech News Feed',
    description: 'Stay updated with simulated tech news! Breaking news ticker, 16 articles across AI, Security, Blockchain, Quantum, and more. Click any headline to read the full story.',
    targetView: 'news',
    position: 'center',
    icon: '📰'
  },
  {
    id: 'cyber-defender',
    title: '🛡️ Cyber Defender',
    description: 'A dedicated cybersecurity awareness experience! Spot phishing elements in a fake email, learn from 12 security tips, build your Shield Score, and watch the global threat map.',
    targetView: 'cyber-defender',
    position: 'center',
    icon: '🛡️'
  },
  {
    id: 'easter-egg',
    title: '🥚 Secret Easter Egg',
    description: 'There\'s a hidden Hacker Page! Try the Konami code (↑↑↓↓←→←→BA) or type "hacker" in the terminal. It features a password cracker animation and strength checker!',
    targetView: 'dashboard',
    position: 'center',
    icon: '🥚'
  },
];
