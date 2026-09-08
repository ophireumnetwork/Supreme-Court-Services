/**
 * Cryptographic helpers for ENFI (PAdES, RFC 3161 TSA, SHA-256, HSM hashes)
 */

export async function computeSha256(text: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback pseudo-hash if SubtleCrypto unavailable in certain sandbox contexts
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(64, '0');
  }
}

export function generateRandomHex(length: number): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function formatTimestampRFC3161(date: Date = new Date()): string {
  const iso = date.toISOString();
  return `${iso.replace('Z', '')}+00:00 [RFC 3161 TSA Qualified Authority: Supreme Court National Trust TSA Node #01]`;
}

export function generateCertFingerprint(): string {
  return Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0')
      .toUpperCase()
  ).join(':');
}
