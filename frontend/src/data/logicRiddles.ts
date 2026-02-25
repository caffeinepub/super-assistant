export interface LogicRiddle {
  id: number;
  question: string;
  hint: string;
  answer: string | string[];
  explanation: string;
  type: 'text' | 'number';
}

export const RIDDLES: LogicRiddle[] = [
  {
    id: 1,
    question: "What is the decimal value of the binary number 1010?",
    hint: "Each bit position represents a power of 2 (8, 4, 2, 1)",
    answer: "10",
    explanation: "1010 in binary = 1×8 + 0×4 + 1×2 + 0×1 = 8 + 0 + 2 + 0 = 10",
    type: 'number'
  },
  {
    id: 2,
    question: "I have keys but no locks. I have space but no room. You can enter but can't go inside. What am I?",
    hint: "You use me every day to type...",
    answer: ["keyboard", "a keyboard"],
    explanation: "A keyboard has keys, a space bar, and an Enter key — but no physical locks, rooms, or doors!",
    type: 'text'
  },
  {
    id: 3,
    question: "What does this code output?\n\nfor i in range(3):\n    print(i * 2)",
    hint: "range(3) generates 0, 1, 2",
    answer: ["0\n2\n4", "0 2 4", "024"],
    explanation: "range(3) = [0, 1, 2]. Multiplied by 2: 0×2=0, 1×2=2, 2×2=4. Output: 0, 2, 4",
    type: 'text'
  },
  {
    id: 4,
    question: "How many bits are in a byte?",
    hint: "It's a fundamental unit of digital information",
    answer: "8",
    explanation: "A byte consists of 8 bits. This is why a byte can represent 256 different values (2^8 = 256).",
    type: 'number'
  },
  {
    id: 5,
    question: "What is the output of: console.log(typeof null)?",
    hint: "This is a famous JavaScript quirk...",
    answer: ["object", '"object"'],
    explanation: "typeof null returns 'object' in JavaScript — this is a well-known bug from the original JavaScript implementation that was never fixed for backward compatibility.",
    type: 'text'
  },
  {
    id: 6,
    question: "If a program has O(n²) time complexity and n=10, approximately how many operations does it perform?",
    hint: "Square the value of n",
    answer: "100",
    explanation: "O(n²) means the number of operations grows as n squared. With n=10: 10² = 100 operations.",
    type: 'number'
  },
  {
    id: 7,
    question: "What is the hexadecimal representation of the decimal number 255?",
    hint: "Hex uses digits 0-9 and letters A-F",
    answer: ["ff", "FF", "0xff", "0xFF"],
    explanation: "255 in decimal = 15×16 + 15 = FF in hexadecimal. That's why #FFFFFF is white in CSS (max value for all RGB channels).",
    type: 'text'
  },
  {
    id: 8,
    question: "A recursive function calls itself. What MUST every recursive function have to avoid infinite loops?",
    hint: "Think about when the function should stop calling itself...",
    answer: ["base case", "a base case", "base condition", "stopping condition"],
    explanation: "Every recursive function must have a base case — a condition where it stops calling itself. Without it, the function recurses infinitely until a stack overflow occurs.",
    type: 'text'
  },
];
