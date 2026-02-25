export interface NewsItem {
  id: number;
  headline: string;
  category: 'AI' | 'Security' | 'Blockchain' | 'IoT' | 'Quantum' | 'Cloud' | 'Space' | 'Robotics';
  timestamp: string;
  excerpt: string;
  fullArticle: string;
  isBreaking?: boolean;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    headline: "GPT-6 Achieves Human-Level Reasoning in Complex Scientific Problems",
    category: "AI",
    timestamp: "2 hours ago",
    excerpt: "OpenAI's latest model demonstrates unprecedented reasoning capabilities, solving PhD-level physics problems with 94% accuracy.",
    fullArticle: "In a landmark achievement for artificial intelligence, OpenAI's GPT-6 has demonstrated human-level reasoning across a broad spectrum of complex scientific domains. The model, trained on an unprecedented dataset of 100 trillion tokens, achieved 94% accuracy on PhD-level physics problems and 89% on advanced mathematics. Researchers note that the model doesn't just pattern-match — it shows genuine step-by-step logical reasoning. 'This is a qualitative leap,' said Dr. Sarah Chen, lead researcher. 'We're seeing emergent capabilities we didn't explicitly train for.' The model is expected to enter limited beta testing next quarter.",
    isBreaking: true
  },
  {
    id: 2,
    headline: "Critical Zero-Day Vulnerability Found in Major Banking Software",
    category: "Security",
    timestamp: "4 hours ago",
    excerpt: "Security researchers discover a critical flaw affecting 200+ financial institutions worldwide. Patch released within 6 hours.",
    fullArticle: "Cybersecurity firm CipherShield disclosed a critical zero-day vulnerability in CoreBanking Pro, software used by over 200 financial institutions globally. The flaw, designated CVE-2026-0042, allows remote code execution without authentication. The vulnerability was discovered by researcher Marcus Webb during a routine penetration test. 'The attack surface was surprisingly simple,' Webb explained. 'A single malformed HTTP request could grant full system access.' The software vendor released an emergency patch within 6 hours of disclosure. All affected institutions are urged to apply the patch immediately. No confirmed exploits in the wild have been reported.",
    isBreaking: true
  },
  {
    id: 3,
    headline: "Quantum Computer Breaks 2048-bit RSA Encryption in 8 Minutes",
    category: "Quantum",
    timestamp: "6 hours ago",
    excerpt: "IBM's 10,000-qubit quantum processor achieves what was once thought decades away, sending shockwaves through the cryptography world.",
    fullArticle: "IBM's latest quantum processor, codenamed 'Condor X', has successfully factored a 2048-bit RSA key in just 8 minutes — a task that would take classical computers millions of years. This breakthrough, published in Nature Quantum Information, marks a critical inflection point for global cybersecurity. 'Post-quantum cryptography is no longer optional,' warned NIST director Dr. James Park. 'Organizations must begin migrating to quantum-resistant algorithms immediately.' The achievement uses Shor's algorithm on a 10,000-qubit processor with error correction rates below 0.001%. NIST's post-quantum cryptography standards, finalized in 2024, are now urgently recommended for all sensitive communications.",
    isBreaking: false
  },
  {
    id: 4,
    headline: "Ethereum 4.0 Upgrade Reduces Energy Consumption by 99.99%",
    category: "Blockchain",
    timestamp: "8 hours ago",
    excerpt: "The latest Ethereum upgrade introduces a revolutionary consensus mechanism that makes blockchain nearly carbon-neutral.",
    fullArticle: "The Ethereum Foundation has successfully deployed the 'Serenity' upgrade, reducing the network's energy consumption by an astounding 99.99% compared to its original proof-of-work mechanism. The new 'Proof of Harmony' consensus algorithm distributes validation across millions of lightweight nodes, eliminating the need for energy-intensive mining. Transaction throughput has increased to 100,000 TPS, rivaling traditional payment networks. Gas fees have dropped to fractions of a cent. 'This is the moment Ethereum becomes truly scalable and sustainable,' said Vitalik Buterin. The upgrade also introduces native AI smart contracts, enabling on-chain machine learning inference.",
    isBreaking: false
  },
  {
    id: 5,
    headline: "Smart City Initiative Connects 50 Million IoT Devices in Singapore",
    category: "IoT",
    timestamp: "12 hours ago",
    excerpt: "Singapore's Smart Nation 2.0 project creates the world's most connected urban environment with real-time city management.",
    fullArticle: "Singapore has completed Phase 1 of its Smart Nation 2.0 initiative, connecting over 50 million IoT sensors and devices across the city-state. The network monitors traffic flow, air quality, energy consumption, waste management, and public safety in real-time. AI algorithms optimize traffic lights, reducing average commute times by 34%. Smart bins alert collection services when full, cutting waste management costs by 28%. The system processes 2.3 petabytes of data daily. Privacy advocates have raised concerns about the extensive surveillance capabilities, prompting the government to establish an independent oversight committee. The project is expected to save $2.1 billion annually in operational costs.",
    isBreaking: false
  },
  {
    id: 6,
    headline: "Microsoft Azure Launches Neuromorphic Computing Cloud Service",
    category: "Cloud",
    timestamp: "1 day ago",
    excerpt: "Azure's new neuromorphic computing service mimics the human brain's architecture, offering 1000x efficiency for AI workloads.",
    fullArticle: "Microsoft Azure has launched 'Azure Neuro', the world's first commercial neuromorphic computing cloud service. Based on Intel's Loihi 3 chips, the service mimics the human brain's neural architecture, processing AI workloads with 1000x greater energy efficiency than traditional GPUs. Early benchmarks show 50x faster inference for natural language processing tasks. The service is particularly suited for edge AI applications, autonomous systems, and real-time sensory processing. Pricing starts at $0.001 per million synaptic operations. Major customers including Tesla, Boston Dynamics, and DeepMind have already signed enterprise agreements. The service is available in 15 Azure regions globally.",
    isBreaking: false
  },
  {
    id: 7,
    headline: "SpaceX Starlink Gen 3 Achieves 10 Gbps Satellite Internet",
    category: "Space",
    timestamp: "1 day ago",
    excerpt: "The latest Starlink constellation delivers fiber-like speeds to remote areas, bridging the global digital divide.",
    fullArticle: "SpaceX's third-generation Starlink constellation has achieved sustained download speeds of 10 Gbps in beta testing, matching fiber optic performance. The 12,000-satellite network uses laser inter-satellite links and advanced phased array antennas to deliver ultra-low latency (8ms) globally. The service is now available in 195 countries, including previously unconnected regions in sub-Saharan Africa and the Amazon basin. 'We're eliminating the digital divide,' said SpaceX CEO Gwynne Shotwell. The new terminals are the size of a paperback book and cost $99. Monthly service plans start at $29 for basic connectivity. The network also serves as a global timing reference, replacing GPS for many applications.",
    isBreaking: false
  },
  {
    id: 8,
    headline: "Boston Dynamics' Atlas Robot Passes Medical Licensing Exam",
    category: "Robotics",
    timestamp: "2 days ago",
    excerpt: "The humanoid robot scores in the 95th percentile on the USMLE, opening doors for AI-assisted surgery and remote healthcare.",
    fullArticle: "Boston Dynamics' Atlas robot, equipped with the latest GPT-6 medical module, has passed the United States Medical Licensing Examination (USMLE) with a score in the 95th percentile. The robot demonstrated not only medical knowledge but also the ability to perform physical examinations and basic surgical procedures with sub-millimeter precision. 'This isn't about replacing doctors,' clarified Dr. Robert Kim of Johns Hopkins. 'It's about extending healthcare to underserved areas.' The FDA has approved Atlas for supervised use in remote surgery applications. Trials are planned in rural Alaska and sub-Saharan Africa. The robot can perform 47 types of surgical procedures autonomously.",
    isBreaking: false
  },
  {
    id: 9,
    headline: "New AI Model Predicts Cyberattacks 72 Hours in Advance",
    category: "Security",
    timestamp: "2 days ago",
    excerpt: "CyberOracle AI analyzes global threat intelligence to predict and prevent attacks before they happen.",
    fullArticle: "Cybersecurity startup ThreatHorizon has unveiled CyberOracle, an AI system that predicts cyberattacks up to 72 hours before they occur. The model analyzes dark web chatter, vulnerability disclosures, geopolitical events, and historical attack patterns to generate threat predictions with 87% accuracy. In a 6-month trial with 50 Fortune 500 companies, CyberOracle prevented 234 confirmed attack attempts. 'We're shifting from reactive to predictive security,' said CEO Priya Sharma. The system integrates with existing SIEM platforms and provides actionable recommendations. Early access pricing is $50,000/month for enterprise customers. The company has raised $200M in Series B funding.",
    isBreaking: false
  },
  {
    id: 10,
    headline: "China Launches World's First Quantum Internet Node",
    category: "Quantum",
    timestamp: "3 days ago",
    excerpt: "The Beijing Quantum Network enables theoretically unhackable communication between government facilities.",
    fullArticle: "China has activated the world's first operational quantum internet node in Beijing, connecting 10 government facilities with theoretically unhackable quantum key distribution (QKD) communication. The network uses entangled photon pairs to create encryption keys that are physically impossible to intercept without detection. The system achieves key distribution rates of 1 Mbps over 100km fiber links. 'Any eavesdropping attempt immediately collapses the quantum state, alerting both parties,' explained Professor Li Wei of Tsinghua University. The US, EU, and Japan have announced accelerated quantum network programs in response. A global quantum internet is projected by 2035.",
    isBreaking: false
  },
  {
    id: 11,
    headline: "Apple Vision Pro 3 Introduces Neural Interface Control",
    category: "AI",
    timestamp: "3 days ago",
    excerpt: "The latest AR headset can be controlled by thought alone, using non-invasive EEG sensors embedded in the frame.",
    fullArticle: "Apple has unveiled Vision Pro 3, featuring revolutionary neural interface technology that allows users to control the device using thought alone. Non-invasive EEG sensors embedded in the headset frame detect neural signals with 98% accuracy, enabling hands-free navigation, text input at 40 WPM, and precise cursor control. The device also features holographic displays with 16K resolution per eye and a 180° field of view. 'This is the most personal computer ever made,' said Apple CEO Tim Cook. Privacy advocates have raised concerns about neural data collection. Apple has committed to on-device processing with no neural data leaving the device. Pre-orders open next month at $2,999.",
    isBreaking: false
  },
  {
    id: 12,
    headline: "Decentralized AI Network Challenges Big Tech Monopoly",
    category: "Blockchain",
    timestamp: "4 days ago",
    excerpt: "Bittensor's distributed AI marketplace reaches $100B valuation as developers flock to the censorship-resistant platform.",
    fullArticle: "Bittensor, the decentralized AI network, has reached a $100 billion market valuation as its distributed machine learning marketplace gains mainstream adoption. The platform allows anyone to contribute AI models and earn cryptocurrency rewards based on their model's performance. Over 50,000 AI models are now available on the network, covering everything from language translation to medical diagnosis. 'We're democratizing AI,' said founder Jacob Steeves. Major enterprises are using Bittensor to access specialized AI capabilities without vendor lock-in. The network processes 10 million AI inference requests daily. Critics note that quality control remains a challenge in the decentralized model.",
    isBreaking: false
  },
  {
    id: 13,
    headline: "Global Ransomware Attack Hits 500 Hospitals Simultaneously",
    category: "Security",
    timestamp: "5 days ago",
    excerpt: "Coordinated attack by 'DarkNexus' group disrupts healthcare systems across 40 countries, demanding $500M in Bitcoin.",
    fullArticle: "A sophisticated ransomware attack attributed to the 'DarkNexus' group has simultaneously encrypted systems at 500 hospitals across 40 countries, demanding $500 million in Bitcoin for decryption keys. The attack exploited a previously unknown vulnerability in MedCore, a widely-used hospital management system. Patient records, medical devices, and scheduling systems were affected. Several hospitals reverted to paper-based operations. No patient deaths have been directly attributed to the attack, though several surgeries were postponed. Interpol and FBI have launched a joint investigation. Cybersecurity experts urge healthcare organizations to implement air-gapped backups and network segmentation immediately.",
    isBreaking: false
  },
  {
    id: 14,
    headline: "Tesla's Full Self-Driving Achieves Level 5 Autonomy Certification",
    category: "AI",
    timestamp: "5 days ago",
    excerpt: "After 10 billion miles of training data, Tesla's FSD system receives the first-ever Level 5 autonomous driving certification.",
    fullArticle: "Tesla has received the world's first Level 5 autonomous driving certification from the National Highway Traffic Safety Administration (NHTSA), following a 3-year evaluation process. The certification covers all road conditions, weather scenarios, and geographic regions in the United States. Tesla's FSD system, trained on over 10 billion miles of real-world driving data, demonstrated a safety record 10x better than human drivers in the evaluation period. 'This is the Wright Brothers moment for autonomous vehicles,' said Elon Musk. The certification enables Tesla to offer fully driverless robotaxi services. Rollout begins in 10 major US cities next quarter, with global expansion planned for 2027.",
    isBreaking: false
  },
  {
    id: 15,
    headline: "Internet Computer Protocol Reaches 1 Million Canisters Deployed",
    category: "Blockchain",
    timestamp: "6 days ago",
    excerpt: "DFINITY's Internet Computer hits a major milestone as developers embrace on-chain web hosting and smart contracts.",
    fullArticle: "The Internet Computer Protocol (ICP) by DFINITY has reached the milestone of 1 million deployed canisters, marking a significant adoption surge for the blockchain-based cloud computing platform. Canisters — the ICP equivalent of smart contracts — can host full web applications, store data, and run complex computations entirely on-chain. The platform now processes 50 million transactions daily with sub-second finality. Notable deployments include decentralized social networks, AI applications, and enterprise software. 'The Internet Computer is becoming the backbone of Web3,' said DFINITY founder Dominic Williams. Developer grants totaling $100M have been distributed to accelerate ecosystem growth.",
    isBreaking: false
  },
  {
    id: 16,
    headline: "MIT Develops Self-Healing Cybersecurity System Inspired by Human Immune System",
    category: "Security",
    timestamp: "1 week ago",
    excerpt: "The AI-powered system automatically detects, isolates, and repairs security breaches without human intervention.",
    fullArticle: "MIT's Computer Science and Artificial Intelligence Laboratory (CSAIL) has developed an autonomous cybersecurity system called 'CyberImmune' that mimics the human immune system's ability to detect and neutralize threats. The system uses a distributed network of AI agents that continuously monitor network behavior, automatically isolating infected nodes and deploying countermeasures within milliseconds. In testing, CyberImmune detected and neutralized 99.7% of novel malware variants it had never seen before. 'Traditional antivirus is reactive. CyberImmune is adaptive,' said lead researcher Dr. Ananya Patel. The system is being commercialized through a DARPA partnership and is expected to be available to enterprise customers within 18 months.",
    isBreaking: false
  },
];

export const BREAKING_NEWS = NEWS_ITEMS.filter(n => n.isBreaking).map(n => n.headline);
