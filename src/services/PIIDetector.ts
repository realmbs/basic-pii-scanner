// Class PIIDetector:
//   static readonly PATTERNS = {
//     email: /regex for emails/,
//     phone: /regex for phone numbers/,
//     ssn: /regex for SSN/,
//     address: /regex for addresses/,
//     // etc.
//   }
//
//   detectPII(text: string) -> PIIMatch[]
//     for each pattern type:
//       find all matches in text
//       create PIIMatch objects with positions
//   
//   sanitizeText(text: string, matches: PIIMatch[]) -> string
//     replace matched text with [REDACTED-TYPE] placeholders


import type { PIIMatch } from '@/types';

export class PIIDetector {
  private static patterns = {
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    phone: /\b(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})\b/g,
    ssn: /\b\d{3}-?\d{2}-?\d{4}\b/g,
    creditCard: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
    address: /\b\d{1,5}\s\w+\s\w+,\s\w{2}\s\d{5}\b/g
  };

  static detectPII(text: string): PIIMatch[] {
    const matches: PIIMatch[] = [];

    for (const [type, pattern] of Object.entries(this.patterns)) {
      const regexMatches = text.matchAll(pattern);

      for (const match of regexMatches) {
        if (match.index !== undefined) {
          matches.push({
            type,
            text: match[0],
            startIndex: match.index,
            endIndex: match.index + match[0].length,
            confidence: 0.8 // placeholder confidence value
          });
        }
      }
    }

    return matches.sort((a, b) => a.startIndex - b.startIndex);
  }

  static createCleanText(originalText: string, matches: PIIMatch[]): string {
    let cleanText = originalText;
    const sortedMatches = [...matches].sort((a, b) => b.startIndex - a.startIndex);

    for (const match of sortedMatches) {
      const replacement = `[${match.type.toUpperCase()} REDACTED]`;
      cleanText = cleanText.slice(0, match.startIndex) + replacement + cleanText.slice(match.endIndex);
    }

    return cleanText;
  }
}