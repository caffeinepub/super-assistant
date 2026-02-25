export interface CommandOutput {
  lines: Array<{ text: string; color?: string; delay?: number }>;
  hasProgress?: boolean;
  progressLabel?: string;
  navigateTo?: string;
}

export function handleCommand(cmd: string, username: string): CommandOutput {
  const c = cmd.trim().toLowerCase();

  switch (c) {
    case 'help':
      return {
        lines: [
          { text: '╔══════════════════════════════════════╗', color: '#00ff41' },
          { text: '║     SUPER ASSISTANT TERMINAL v2.0    ║', color: '#00ff41' },
          { text: '╚══════════════════════════════════════╝', color: '#00ff41' },
          { text: '' },
          { text: '  help      — Show this help menu', color: '#aaffaa' },
          { text: '  whoami    — Display current user info', color: '#aaffaa' },
          { text: '  scan      — Scan network for threats', color: '#aaffaa' },
          { text: '  decrypt   — Decrypt intercepted data', color: '#aaffaa' },
          { text: '  hack      — Initiate hack sequence', color: '#aaffaa' },
          { text: '  status    — System status report', color: '#aaffaa' },
          { text: '  matrix    — Enter the matrix', color: '#aaffaa' },
          { text: '  hacker    — [CLASSIFIED]', color: '#ff4444' },
          { text: '  clear     — Clear terminal', color: '#aaffaa' },
          { text: '  exit      — Return to dashboard', color: '#aaffaa' },
          { text: '' },
          { text: '  Type any command to execute...', color: '#555' },
        ],
      };

    case 'whoami':
      return {
        lines: [
          { text: `> Identifying user...`, color: '#00ff41', delay: 100 },
          { text: `  USERNAME  : ${username || 'ANONYMOUS'}`, color: '#aaffaa', delay: 200 },
          { text: `  CLEARANCE : LEVEL-5 OPERATOR`, color: '#aaffaa', delay: 300 },
          { text: `  NODE      : SUPER-ASSISTANT-CORE`, color: '#aaffaa', delay: 400 },
          { text: `  IP        : 192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`, color: '#aaffaa', delay: 500 },
          { text: `  STATUS    : ACTIVE`, color: '#00ff41', delay: 600 },
          { text: `  THREAT LVL: NONE DETECTED`, color: '#00ff41', delay: 700 },
        ],
      };

    case 'scan':
      return {
        lines: [
          { text: '> Initiating network scan...', color: '#00ff41' },
          { text: '  Scanning ports 1-65535...', color: '#ffaa00', delay: 300 },
          { text: '  [OPEN]  Port 22  — SSH', color: '#aaffaa', delay: 600 },
          { text: '  [OPEN]  Port 80  — HTTP', color: '#aaffaa', delay: 800 },
          { text: '  [OPEN]  Port 443 — HTTPS', color: '#aaffaa', delay: 1000 },
          { text: '  [WARN]  Port 8080 — Suspicious activity', color: '#ffaa00', delay: 1200 },
          { text: '  [CRIT]  Port 31337 — BACKDOOR DETECTED!', color: '#ff4444', delay: 1400 },
          { text: '' },
          { text: '  Threat neutralized. System secured.', color: '#00ff41', delay: 1800 },
        ],
        hasProgress: true,
        progressLabel: 'SCANNING',
      };

    case 'decrypt':
      return {
        lines: [
          { text: '> Loading encrypted payload...', color: '#00ff41' },
          { text: '  Payload: 4a7f2b9c1e3d8a6f5b2c9e1d4a7f2b9c', color: '#555', delay: 200 },
          { text: '  Algorithm: AES-256-CBC', color: '#aaffaa', delay: 400 },
          { text: '  Attempting decryption...', color: '#ffaa00', delay: 600 },
          { text: '  Key found: ████████████████', color: '#aaffaa', delay: 1200 },
          { text: '  DECRYPTED: "The password is: SUPER_ASSISTANT_2026"', color: '#00ff41', delay: 1600 },
          { text: '  Decryption complete. Data secured.', color: '#00ff41', delay: 1800 },
        ],
        hasProgress: true,
        progressLabel: 'DECRYPTING',
      };

    case 'hack':
      return {
        lines: [
          { text: '> INITIATING HACK SEQUENCE...', color: '#ff4444' },
          { text: '  WARNING: Unauthorized access detected', color: '#ffaa00', delay: 200 },
          { text: '  Bypassing firewall...', color: '#aaffaa', delay: 500 },
          { text: '  Injecting payload...', color: '#aaffaa', delay: 900 },
          { text: '  Escalating privileges...', color: '#ffaa00', delay: 1200 },
          { text: '  ROOT ACCESS GRANTED', color: '#00ff41', delay: 1600 },
          { text: '  ██████████████████████ 100%', color: '#00ff41', delay: 1800 },
          { text: '' },
          { text: '  [SIMULATION ONLY — No actual hacking occurred]', color: '#555', delay: 2000 },
        ],
        hasProgress: true,
        progressLabel: 'HACKING',
      };

    case 'status':
      return {
        lines: [
          { text: '> SYSTEM STATUS REPORT', color: '#00ff41' },
          { text: `  CPU Usage    : ${Math.floor(Math.random() * 30 + 10)}%`, color: '#aaffaa', delay: 100 },
          { text: `  Memory       : ${Math.floor(Math.random() * 2 + 4)}GB / 16GB`, color: '#aaffaa', delay: 200 },
          { text: `  Network      : 1.2 Gbps`, color: '#aaffaa', delay: 300 },
          { text: `  Threats      : 0 Active`, color: '#00ff41', delay: 400 },
          { text: `  Uptime       : 99.97%`, color: '#00ff41', delay: 500 },
          { text: `  AI Core      : ONLINE`, color: '#00ff41', delay: 600 },
          { text: `  Encryption   : AES-256 ACTIVE`, color: '#00ff41', delay: 700 },
        ],
      };

    case 'matrix':
      return {
        lines: [
          { text: '> Entering the Matrix...', color: '#00ff41' },
          { text: '  01001000 01100101 01101100 01101100', color: '#00ff41', delay: 200 },
          { text: '  01101111 00100000 01001110 01100101', color: '#00ff41', delay: 400 },
          { text: '  01101111 00100000 01010111 01101111', color: '#00ff41', delay: 600 },
          { text: '  01110010 01101100 01100100 00100001', color: '#00ff41', delay: 800 },
          { text: '' },
          { text: '  Translation: "Hello Neo World!"', color: '#aaffaa', delay: 1000 },
          { text: '  Wake up, Neo... The Matrix has you.', color: '#00ff41', delay: 1200 },
        ],
      };

    case 'hacker':
      return {
        lines: [
          { text: '> EASTER EGG DETECTED!', color: '#ff00ff' },
          { text: '  Unlocking HACKER PAGE...', color: '#ff00ff', delay: 300 },
          { text: '  ████████████████████ 100%', color: '#ff00ff', delay: 800 },
          { text: '  ACCESS GRANTED — Redirecting...', color: '#00ff41', delay: 1000 },
        ],
        navigateTo: 'hacker',
      };

    case 'clear':
      return { lines: [] };

    case 'exit':
      return {
        lines: [
          { text: '> Closing terminal...', color: '#00ff41' },
          { text: '  Goodbye, operator.', color: '#aaffaa', delay: 300 },
        ],
        navigateTo: 'dashboard',
      };

    default:
      return {
        lines: [
          { text: `> Command not found: ${cmd}`, color: '#ff4444' },
          { text: "  Type 'help' for available commands.", color: '#555' },
        ],
      };
  }
}
