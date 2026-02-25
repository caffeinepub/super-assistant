export interface CyberTip {
  id: number;
  title: string;
  description: string;
  icon: string;
  severity: 'critical' | 'high' | 'medium';
}

export const CYBER_TIPS: CyberTip[] = [
  {
    id: 1,
    title: "Use Strong, Unique Passwords",
    description: "Create passwords with 12+ characters mixing uppercase, lowercase, numbers, and symbols. Never reuse passwords across accounts. Use a password manager like Bitwarden or 1Password.",
    icon: "🔑",
    severity: "critical"
  },
  {
    id: 2,
    title: "Enable Two-Factor Authentication",
    description: "Add 2FA to all important accounts. Use an authenticator app (Google Authenticator, Authy) rather than SMS when possible. This stops 99.9% of automated attacks.",
    icon: "📱",
    severity: "critical"
  },
  {
    id: 3,
    title: "Recognize Phishing Attempts",
    description: "Check sender email addresses carefully. Look for urgency, threats, or too-good-to-be-true offers. Hover over links before clicking. When in doubt, go directly to the website.",
    icon: "🎣",
    severity: "critical"
  },
  {
    id: 4,
    title: "Keep Software Updated",
    description: "Enable automatic updates for your OS, browsers, and apps. Security patches fix known vulnerabilities that attackers actively exploit. Outdated software is a major attack vector.",
    icon: "🔄",
    severity: "high"
  },
  {
    id: 5,
    title: "Use a VPN on Public Wi-Fi",
    description: "Public Wi-Fi networks are often unsecured. A VPN encrypts your traffic, preventing eavesdroppers from intercepting your data. Avoid banking or sensitive activities on public networks.",
    icon: "🛡️",
    severity: "high"
  },
  {
    id: 6,
    title: "Beware of Social Engineering",
    description: "Attackers manipulate people, not just systems. Be skeptical of unsolicited calls, emails, or messages asking for information. Verify identities through official channels before sharing anything.",
    icon: "🎭",
    severity: "high"
  },
  {
    id: 7,
    title: "Back Up Your Data Regularly",
    description: "Follow the 3-2-1 rule: 3 copies, 2 different media types, 1 offsite backup. Test your backups regularly. This is your best defense against ransomware and hardware failure.",
    icon: "💾",
    severity: "high"
  },
  {
    id: 8,
    title: "Review App Permissions",
    description: "Regularly audit what permissions your apps have. Revoke unnecessary access to camera, microphone, location, and contacts. If an app requests more than it needs, that's a red flag.",
    icon: "📋",
    severity: "medium"
  },
  {
    id: 9,
    title: "Secure Your Home Network",
    description: "Change your router's default password. Use WPA3 encryption. Create a separate guest network for IoT devices. Regularly check for unauthorized devices on your network.",
    icon: "📡",
    severity: "medium"
  },
  {
    id: 10,
    title: "Monitor Your Digital Footprint",
    description: "Regularly Google yourself to see what's publicly available. Use HaveIBeenPwned.com to check if your email was in a data breach. Set up Google Alerts for your name.",
    icon: "👁️",
    severity: "medium"
  },
  {
    id: 11,
    title: "Encrypt Sensitive Data",
    description: "Use full-disk encryption (BitLocker on Windows, FileVault on Mac) to protect data if your device is stolen. Encrypt sensitive files before storing them in the cloud.",
    icon: "🔐",
    severity: "medium"
  },
  {
    id: 12,
    title: "Report Suspicious Activity",
    description: "If you receive a phishing email, report it to your email provider and the impersonated organization. Report cybercrime to IC3.gov (US) or your national cybercrime unit.",
    icon: "🚨",
    severity: "medium"
  },
];

export const PHISHING_EMAIL = {
  from: "security@paypa1-support.com",
  to: "user@example.com",
  subject: "URGENT: Your PayPal Account Has Been Compromised!",
  date: "Mon, 25 Feb 2026 09:23:41",
  body: `Dear Valued Customer,

We have detected SUSPICIOUS ACTIVITY on your PayPal account. Your account has been TEMPORARILY LIMITED.

To restore full access, you must verify your information IMMEDIATELY by clicking the link below:

>> CLICK HERE TO VERIFY YOUR ACCOUNT <<
http://paypa1-secure-verify.xyz/login

If you do not verify within 24 HOURS, your account will be PERMANENTLY SUSPENDED and all funds will be frozen.

Required information:
• Full name and date of birth
• Credit card number and CVV
• Social Security Number
• Current password

This is an AUTOMATED SECURITY ALERT. Do not ignore this message.

Best regards,
PayPal Security Team
PayPal Inc., 2211 North First Street, San Jose, CA 95131`,
  suspiciousElements: [
    { id: 'sender', label: 'Fake sender email', description: 'paypa1-support.com uses number "1" instead of letter "l" — classic typosquatting!', position: 'top' },
    { id: 'urgency', label: 'Artificial urgency', description: '"IMMEDIATELY", "24 HOURS", "PERMANENTLY SUSPENDED" — creating panic to bypass rational thinking', position: 'subject' },
    { id: 'link', label: 'Suspicious link', description: 'paypa1-secure-verify.xyz is NOT PayPal\'s domain. Real PayPal links go to paypal.com', position: 'link' },
    { id: 'ssn', label: 'Requests SSN', description: 'PayPal NEVER asks for your Social Security Number via email. This is identity theft!', position: 'ssn' },
    { id: 'password', label: 'Asks for password', description: 'Legitimate companies NEVER ask for your current password via email. This is always a scam!', position: 'password' },
    { id: 'cvv', label: 'Requests CVV', description: 'No legitimate service asks for your CVV via email. This is credit card fraud!', position: 'cvv' },
  ]
};
