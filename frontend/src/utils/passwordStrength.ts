export type StrengthLevel = 'Weak' | 'Medium' | 'Strong';

export interface PasswordStrength {
  level: StrengthLevel;
  score: number; // 0-100
  feedback: string[];
}

export function evaluatePassword(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) score += 20; else feedback.push('At least 8 characters');
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;
  if (/[A-Z]/.test(password)) score += 15; else feedback.push('Add uppercase letters');
  if (/[a-z]/.test(password)) score += 10; else feedback.push('Add lowercase letters');
  if (/[0-9]/.test(password)) score += 15; else feedback.push('Add numbers');
  if (/[^A-Za-z0-9]/.test(password)) score += 20; else feedback.push('Add special characters (!@#$%^&*)');

  let level: StrengthLevel;
  if (score < 40) level = 'Weak';
  else if (score < 70) level = 'Medium';
  else level = 'Strong';

  return { level, score, feedback };
}

export function generateStrongPassword(length = 16): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const all = upper + lower + digits + symbols;

  let password = '';
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = 4; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  return password.split('').sort(() => Math.random() - 0.5).join('');
}
