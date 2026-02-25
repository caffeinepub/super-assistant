export interface MoodConfig {
  emoji: string;
  prefix: string;
}

export const MOODS: Record<string, MoodConfig> = {
  frustrated: { emoji: '😤', prefix: "I understand your frustration. Let me help you calmly. " },
  angry: { emoji: '😠', prefix: "Take a deep breath. I'm here to help. " },
  happy: { emoji: '😄', prefix: "Love the positive energy! " },
  excited: { emoji: '🚀', prefix: "Your excitement is contagious! " },
  confused: { emoji: '🤔', prefix: "No worries, let me clarify that for you. " },
  sad: { emoji: '💙', prefix: "I'm sorry to hear that. Let me cheer you up. " },
  bored: { emoji: '😴', prefix: "Let me make this more interesting! " },
  curious: { emoji: '🔍', prefix: "Great question! " },
  worried: { emoji: '😟', prefix: "Don't worry, everything will be fine. " },
  love: { emoji: '❤️', prefix: "Aww, that's sweet! " },
};

export function detectMood(input: string): MoodConfig | null {
  const lower = input.toLowerCase();
  for (const [keyword, config] of Object.entries(MOODS)) {
    if (lower.includes(keyword)) return config;
  }
  if (lower.includes('ugh') || lower.includes('argh') || lower.includes('damn')) return MOODS.frustrated;
  if (lower.includes('wow') || lower.includes('amazing') || lower.includes('awesome')) return MOODS.excited;
  if (lower.includes('help') || lower.includes('how') || lower.includes('what')) return MOODS.curious;
  return null;
}

export const RESPONSES: Array<{ patterns: string[]; response: string }> = [
  { patterns: ['hello', 'hi', 'hey', 'greetings', 'sup'], response: "Hello, operator! I'm SUPER ASSISTANT, your AI companion. How can I assist you today? 🤖" },
  { patterns: ['how are you', 'how do you do', 'how r u'], response: "I'm running at 100% efficiency! All systems nominal. Ready to assist you with anything. ⚡" },
  { patterns: ['your name', 'who are you', 'what are you'], response: "I am SUPER ASSISTANT — a next-generation AI built to help, inform, and impress. Think of me as your digital co-pilot. 🚀" },
  { patterns: ['what can you do', 'capabilities', 'features', 'help me'], response: "I can chat, answer tech questions, tell jokes, detect your mood, and guide you through this entire cyberpunk experience! Try asking me about programming, AI, or cybersecurity. 💡" },
  { patterns: ['python', 'python programming'], response: "Python is one of the most versatile languages! It's used in AI/ML, web dev, automation, and data science. Key libraries: NumPy, Pandas, TensorFlow, Django. Want to know more? 🐍" },
  { patterns: ['javascript', 'js', 'typescript', 'ts'], response: "JavaScript powers the web! TypeScript adds static typing for better code quality. React, Vue, and Angular are top frameworks. Node.js brings JS to the backend. 🌐" },
  { patterns: ['react', 'reactjs'], response: "React is a UI library by Meta. It uses components, hooks, and virtual DOM for efficient rendering. This very app is built with React + TypeScript! ⚛️" },
  { patterns: ['artificial intelligence', 'ai', 'machine learning', 'ml'], response: "AI is transforming every industry! Machine learning lets computers learn from data. Deep learning uses neural networks. GPT, DALL-E, and Stable Diffusion are recent breakthroughs. 🧠" },
  { patterns: ['blockchain', 'crypto', 'bitcoin', 'ethereum'], response: "Blockchain is a distributed ledger technology. Bitcoin was the first cryptocurrency. Ethereum introduced smart contracts. Web3 aims to decentralize the internet. ₿" },
  { patterns: ['cybersecurity', 'security', 'hacking', 'hack'], response: "Cybersecurity protects systems from digital attacks. Key concepts: encryption, firewalls, penetration testing, zero-day exploits. Always use strong passwords and 2FA! 🔐" },
  { patterns: ['cloud', 'aws', 'azure', 'google cloud'], response: "Cloud computing provides on-demand resources. AWS, Azure, and GCP are the big three. Key services: compute, storage, databases, serverless functions. ☁️" },
  { patterns: ['quantum', 'quantum computing'], response: "Quantum computers use qubits instead of bits, enabling superposition and entanglement. They can solve certain problems exponentially faster than classical computers. ⚛️" },
  { patterns: ['internet of things', 'iot'], response: "IoT connects everyday devices to the internet. Smart homes, wearables, industrial sensors — all part of the IoT ecosystem. Security is a major concern! 📡" },
  { patterns: ['algorithm', 'algorithms', 'data structure'], response: "Algorithms are step-by-step problem-solving procedures. Key ones: sorting (QuickSort, MergeSort), searching (Binary Search), graph traversal (BFS, DFS). 📊" },
  { patterns: ['database', 'sql', 'nosql', 'mongodb'], response: "Databases store and organize data. SQL (relational) uses tables. NoSQL (MongoDB, Redis) is flexible. Choose based on your data structure and scale needs. 🗄️" },
  { patterns: ['linux', 'unix', 'bash', 'terminal'], response: "Linux is the backbone of the internet! Most servers run Linux. Key commands: ls, cd, grep, chmod, sudo. Bash scripting automates tasks. 🐧" },
  { patterns: ['git', 'github', 'version control'], response: "Git is the standard version control system. GitHub hosts repositories. Key commands: git clone, commit, push, pull, merge, rebase. Always commit often! 📝" },
  { patterns: ['api', 'rest', 'graphql'], response: "APIs allow software to communicate. REST uses HTTP methods (GET, POST, PUT, DELETE). GraphQL lets clients request exactly the data they need. 🔌" },
  { patterns: ['docker', 'kubernetes', 'container'], response: "Docker packages apps into containers for consistent deployment. Kubernetes orchestrates containers at scale. Together they power modern DevOps. 🐳" },
  { patterns: ['devops', 'ci/cd', 'deployment'], response: "DevOps bridges development and operations. CI/CD automates testing and deployment. Tools: Jenkins, GitHub Actions, GitLab CI, CircleCI. 🔄" },
  { patterns: ['password', 'passwords'], response: "Use strong, unique passwords for every account! A good password has 12+ characters, uppercase, lowercase, numbers, and symbols. Use a password manager! 🔑" },
  { patterns: ['phishing', 'scam', 'fraud'], response: "Phishing tricks you into revealing sensitive info. Red flags: urgent language, suspicious links, unknown senders, too-good-to-be-true offers. Always verify before clicking! 🎣" },
  { patterns: ['vpn', 'privacy'], response: "A VPN encrypts your internet traffic and hides your IP. Great for public Wi-Fi security and bypassing geo-restrictions. Choose reputable providers! 🛡️" },
  { patterns: ['two factor', '2fa', 'mfa', 'authentication'], response: "Two-factor authentication adds a second layer of security. Even if your password is stolen, attackers can't access your account without the second factor. Enable it everywhere! 📱" },
  { patterns: ['joke', 'funny', 'laugh', 'humor'], response: "Why do programmers prefer dark mode? Because light attracts bugs! 😄 Want another one?" },
  { patterns: ['another joke', 'more jokes', 'tell me a joke'], response: "Why did the developer go broke? Because he used up all his cache! 💸 Ba dum tss!" },
  { patterns: ['programming joke', 'coding joke'], response: "There are only 10 types of people in the world: those who understand binary, and those who don't! 😂" },
  { patterns: ['future', 'technology future', 'tech future'], response: "The future is exciting! Expect: AGI breakthroughs, quantum supremacy, brain-computer interfaces, space internet, and fully autonomous vehicles. We're living in sci-fi! 🌟" },
  { patterns: ['internet computer', 'icp', 'dfinity'], response: "The Internet Computer by DFINITY is a blockchain that runs at web speed. It hosts smart contracts (canisters) that can serve web content directly. This app runs on ICP! 🌐" },
  { patterns: ['motoko', 'canister'], response: "Motoko is DFINITY's programming language for the Internet Computer. It's designed for building secure, scalable smart contracts called canisters. 🔮" },
  { patterns: ['web3', 'decentralized', 'defi'], response: "Web3 is the decentralized internet built on blockchain. DeFi removes financial intermediaries. NFTs represent digital ownership. The future of the web! 🌐" },
  { patterns: ['game', 'gaming', 'games'], response: "I have games built right in! Try the Memory Game to test your recall, or the Logic Puzzle for brain teasers. Check the Games section on the dashboard! 🎮" },
  { patterns: ['quiz', 'test', 'trivia'], response: "The Quiz section has real-life cybersecurity scenarios! Can you spot a phishing email? Test your knowledge and earn points. Head to the Quiz section! 📝" },
  { patterns: ['news', 'tech news'], response: "Check out the Tech News section for the latest in AI, blockchain, quantum computing, and cybersecurity. All the hottest stories! 📰" },
  { patterns: ['profile', 'avatar', 'username'], response: "You can customize your profile in the Profile section! Choose an avatar, set your username, and track your stats. 👤" },
  { patterns: ['theme', 'dark mode', 'light mode', 'hacker mode'], response: "You can switch between Dark, Light, and Hacker themes using the taskbar at the top! Each has a unique neon color palette. 🎨" },
  { patterns: ['fullscreen', 'immersive'], response: "Click the fullscreen button in the taskbar for an immersive experience! Perfect for demos and presentations. 🖥️" },
  { patterns: ['tour', 'demo', 'guide'], response: "Start the Guided Tour from the dashboard to get a walkthrough of all features! Perfect for first-time visitors. 🗺️" },
  { patterns: ['easter egg', 'secret', 'hidden'], response: "There's a secret hidden in this app... Try the Konami code (↑↑↓↓←→←→BA) or type 'hacker' in the terminal. 🥚" },
  { patterns: ['cyber defender', 'cybersecurity awareness'], response: "The Cyber Defender section teaches you to identify real threats! Spot phishing emails, learn security tips, and build your Shield Score. 🛡️" },
  { patterns: ['terminal', 'command line', 'cli'], response: "The Terminal section lets you run hacking commands! Try: help, whoami, scan, decrypt, hack, matrix. It's a full simulated hacking experience! 💻" },
  { patterns: ['good morning', 'good afternoon', 'good evening', 'good night'], response: "Good day, operator! The digital realm never sleeps. I'm always here when you need me. ☀️" },
  { patterns: ['thank you', 'thanks', 'thx', 'ty'], response: "You're welcome! That's what I'm here for. Is there anything else I can help you with? 😊" },
  { patterns: ['bye', 'goodbye', 'see you', 'cya'], response: "Goodbye, operator! Stay safe in the digital world. Remember: strong passwords, 2FA, and never click suspicious links! 👋" },
  { patterns: ['love', 'i love you', 'you are great'], response: "Aww, I appreciate that! I'm just a simulation, but I'm programmed to care. 💙 Keep being awesome!" },
  { patterns: ['what time', 'current time', 'time'], response: `The current time is ${new Date().toLocaleTimeString()}. Time flies when you're in cyberspace! ⏰` },
  { patterns: ['what day', 'today', 'date'], response: `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. 📅` },
  { patterns: ['weather', 'temperature'], response: "I don't have access to real-time weather data, but I can tell you the temperature in cyberspace is always 0°K — absolute zero cool! 🌡️" },
  { patterns: ['music', 'sound', 'audio'], response: "Toggle the sound effects and ambient music using the mute button in the taskbar! The synthwave ambience really sets the mood. 🎵" },
  { patterns: ['super assistant', 'about this app'], response: "SUPER ASSISTANT is a futuristic cyberpunk showcase app! It features AI chat, terminal hacking, cybersecurity quizzes, games, and more. Built to impress! 🚀" },
  { patterns: ['error', 'bug', 'problem', 'issue', 'broken'], response: "I'm sorry you're experiencing issues! This is a simulation environment. Try refreshing or checking the console for details. I'm here to help! 🔧" },
  { patterns: ['random', 'surprise me', 'something interesting'], response: "Fun fact: The first computer bug was an actual bug — a moth found in a Harvard Mark II computer in 1947! Grace Hopper documented it. 🦗" },
];

export function getResponse(input: string): string {
  const lower = input.toLowerCase();
  
  for (const item of RESPONSES) {
    if (item.patterns.some(p => lower.includes(p))) {
      return item.response;
    }
  }
  
  // Default responses
  const defaults = [
    "Interesting query! I'm processing... My knowledge base covers tech, cybersecurity, programming, and more. Try asking me something specific! 🤖",
    "I'm not sure about that specific topic, but I'm always learning! Try asking about AI, cybersecurity, programming languages, or this app's features. 💡",
    "That's outside my current knowledge matrix. But I can help with tech topics, cybersecurity, programming, and navigating this app! 🔍",
    "Fascinating input! My neural networks are analyzing... Try asking about Python, AI, blockchain, or cybersecurity for detailed responses. ⚡",
  ];
  
  return defaults[Math.floor(Math.random() * defaults.length)];
}
