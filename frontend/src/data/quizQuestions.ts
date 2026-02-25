export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "You receive an email saying you won a $1,000,000 lottery! It asks you to click a link to claim your prize. What do you do?",
    options: ["Click the link immediately — it's your lucky day!", "Report it as spam/phishing and delete it", "Forward it to friends so they can win too", "Reply with your bank details to claim the prize"],
    correctIndex: 1,
    explanation: "This is a classic phishing scam. Legitimate lotteries don't contact winners via unsolicited emails. Never click suspicious links or provide personal information.",
    category: "Phishing"
  },
  {
    id: 2,
    text: "Which password is the STRONGEST?",
    options: ["password123", "MyDog2020", "Tr0ub4dor&3", "qwerty"],
    correctIndex: 2,
    explanation: "Tr0ub4dor&3 uses uppercase, lowercase, numbers, and special characters. It's long and complex, making it much harder to crack.",
    category: "Passwords"
  },
  {
    id: 3,
    text: "You get a call from 'Microsoft Support' saying your computer has a virus and they need remote access. What do you do?",
    options: ["Give them remote access — they're from Microsoft!", "Hang up immediately — it's a scam", "Ask them to prove they're from Microsoft first", "Pay them to fix the problem"],
    correctIndex: 1,
    explanation: "Microsoft never calls users unsolicited. This is a tech support scam. Hang up and report the number.",
    category: "Social Engineering"
  },
  {
    id: 4,
    text: "What does HTTPS in a website URL indicate?",
    options: ["The website is 100% safe and trustworthy", "The connection between your browser and the site is encrypted", "The website is owned by a government", "The website has been verified by Google"],
    correctIndex: 1,
    explanation: "HTTPS means the connection is encrypted using SSL/TLS. However, it doesn't guarantee the site itself is legitimate — phishing sites can also use HTTPS.",
    category: "Web Security"
  },
  {
    id: 5,
    text: "A friend's social media account sends you a message: 'I'm stuck abroad, lost my wallet, please send $500 urgently!' What do you do?",
    options: ["Send the money immediately — your friend needs help!", "Call or text your friend directly to verify", "Ignore it — friends shouldn't ask for money online", "Report the account as hacked and contact your friend another way"],
    correctIndex: 3,
    explanation: "This is a common account hijacking scam. The account was likely hacked. Report it and contact your friend through a different channel to verify.",
    category: "Social Engineering"
  },
  {
    id: 6,
    text: "What is two-factor authentication (2FA)?",
    options: ["Using two different passwords", "A second verification step beyond your password", "Logging in from two devices simultaneously", "Having two email accounts"],
    correctIndex: 1,
    explanation: "2FA adds a second layer of security. Even if someone steals your password, they can't access your account without the second factor (like a code sent to your phone).",
    category: "Authentication"
  },
  {
    id: 7,
    text: "You're using public Wi-Fi at a coffee shop. What's the SAFEST thing to do?",
    options: ["Check your bank account — it's convenient!", "Use a VPN to encrypt your connection", "Share your Wi-Fi password with others", "Download large files since it's free"],
    correctIndex: 1,
    explanation: "Public Wi-Fi is often unsecured. A VPN encrypts your traffic, protecting you from eavesdroppers on the same network.",
    category: "Network Security"
  },
  {
    id: 8,
    text: "An email from 'paypa1.com' asks you to verify your PayPal account. What should you do?",
    options: ["Click the link and verify — it looks official", "Check the sender's email domain carefully — it's a fake!", "Forward it to PayPal customer service", "Ignore it and hope for the best"],
    correctIndex: 1,
    explanation: "Notice 'paypa1.com' uses the number '1' instead of the letter 'l'. This is a typosquatting attack. Always check URLs carefully before clicking.",
    category: "Phishing"
  },
  {
    id: 9,
    text: "How often should you update your software and operating system?",
    options: ["Never — updates can break things", "Only when you notice problems", "As soon as updates are available", "Once a year is enough"],
    correctIndex: 2,
    explanation: "Software updates often include critical security patches. Delaying updates leaves you vulnerable to known exploits that attackers actively target.",
    category: "Best Practices"
  },
  {
    id: 10,
    text: "What is ransomware?",
    options: ["Software that speeds up your computer", "Malware that encrypts your files and demands payment", "A type of antivirus program", "Software for managing passwords"],
    correctIndex: 1,
    explanation: "Ransomware encrypts your files and demands a ransom (usually cryptocurrency) to decrypt them. Prevention: regular backups, updated software, and avoiding suspicious downloads.",
    category: "Malware"
  },
  {
    id: 11,
    text: "You receive a USB drive in the mail with no return address. What do you do?",
    options: ["Plug it in to see what's on it", "Give it to IT security or destroy it", "Plug it into a spare computer to check", "Keep it — free storage!"],
    correctIndex: 1,
    explanation: "Unknown USB drives are a classic attack vector. They can contain malware that auto-executes when plugged in. This is called a 'USB drop attack'.",
    category: "Physical Security"
  },
  {
    id: 12,
    text: "What is a 'zero-day' vulnerability?",
    options: ["A bug that was fixed on day zero", "A security flaw unknown to the software vendor", "A virus that activates at midnight", "A password that expires immediately"],
    correctIndex: 1,
    explanation: "A zero-day is a vulnerability that the software vendor doesn't know about yet, giving them 'zero days' to fix it. These are highly valuable to attackers.",
    category: "Vulnerabilities"
  },
  {
    id: 13,
    text: "Which of these is the BEST practice for backing up important data?",
    options: ["Save everything on one external hard drive", "Use the 3-2-1 rule: 3 copies, 2 different media, 1 offsite", "Back up once a year", "Only back up files you use daily"],
    correctIndex: 1,
    explanation: "The 3-2-1 backup rule: keep 3 copies of data, on 2 different storage types, with 1 copy offsite (like cloud storage). This protects against hardware failure, theft, and ransomware.",
    category: "Data Protection"
  },
  {
    id: 14,
    text: "A website asks for your Social Security Number to 'verify your identity' for a free prize. What do you do?",
    options: ["Provide it — you need to verify your identity", "Refuse and close the website immediately", "Provide only the last 4 digits", "Ask them why they need it first"],
    correctIndex: 1,
    explanation: "Legitimate websites rarely need your SSN. This is almost certainly a scam to steal your identity. Never provide sensitive personal information to unverified sources.",
    category: "Identity Theft"
  },
  {
    id: 15,
    text: "What does 'social engineering' mean in cybersecurity?",
    options: ["Building social media platforms", "Manipulating people to reveal confidential information", "Engineering social networks", "Creating fake social media profiles"],
    correctIndex: 1,
    explanation: "Social engineering exploits human psychology rather than technical vulnerabilities. Attackers manipulate people into revealing passwords, granting access, or transferring money.",
    category: "Social Engineering"
  },
  {
    id: 16,
    text: "You notice your computer is running unusually slow and your hard drive light is constantly on. What might this indicate?",
    options: ["Your computer needs more RAM", "Possible malware infection running in the background", "Your internet connection is slow", "You have too many browser tabs open"],
    correctIndex: 1,
    explanation: "Unusual slowness and constant disk activity can indicate malware running in the background. Run a full antivirus scan and check your task manager for suspicious processes.",
    category: "Malware"
  },
  {
    id: 17,
    text: "What is the purpose of a firewall?",
    options: ["To speed up your internet connection", "To monitor and control incoming/outgoing network traffic", "To protect against physical theft", "To encrypt your hard drive"],
    correctIndex: 1,
    explanation: "A firewall monitors network traffic and blocks unauthorized access based on security rules. It's your first line of defense against network-based attacks.",
    category: "Network Security"
  },
  {
    id: 18,
    text: "An app on your phone requests access to your contacts, camera, microphone, AND location — but it's just a flashlight app. What do you do?",
    options: ["Grant all permissions — it might need them", "Deny unnecessary permissions and only grant flashlight access", "Uninstall the app immediately", "Grant permissions but turn them off later"],
    correctIndex: 1,
    explanation: "Apps should only request permissions they actually need. A flashlight app has no legitimate reason to access your contacts, camera, or location. This is a red flag for data harvesting.",
    category: "Mobile Security"
  },
  {
    id: 19,
    text: "What is 'end-to-end encryption'?",
    options: ["Encryption that only protects data at the server", "Encryption where only the sender and recipient can read messages", "A type of firewall protection", "Encryption that expires after 24 hours"],
    correctIndex: 1,
    explanation: "End-to-end encryption ensures only the communicating users can read the messages. Even the service provider cannot decrypt them. WhatsApp and Signal use E2E encryption.",
    category: "Encryption"
  },
  {
    id: 20,
    text: "You find a document labeled 'CONFIDENTIAL' on a printer at work. What should you do?",
    options: ["Read it — it was left in a public area", "Return it to the owner or report it to security", "Shred it to protect the company", "Leave it — it's not your problem"],
    correctIndex: 1,
    explanation: "Confidential documents left unattended are a physical security risk. Return it to the owner or report it to your security team. This is part of good security hygiene.",
    category: "Physical Security"
  },
  {
    id: 21,
    text: "What is a 'man-in-the-middle' attack?",
    options: ["When a hacker physically stands between two computers", "When an attacker secretly intercepts communication between two parties", "A type of password attack", "When malware spreads through a network"],
    correctIndex: 1,
    explanation: "In a MITM attack, an attacker secretly intercepts and potentially alters communication between two parties who believe they're communicating directly with each other.",
    category: "Attack Types"
  },
  {
    id: 22,
    text: "Which of these is a sign that a website might be fake?",
    options: ["It has a green padlock icon", "The URL has slight misspellings like 'amaz0n.com'", "It loads quickly", "It has a privacy policy"],
    correctIndex: 1,
    explanation: "Typosquatting uses URLs that look similar to legitimate sites but have subtle differences. Always check the full URL carefully, especially before entering login credentials.",
    category: "Phishing"
  },
];
