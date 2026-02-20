const RATE_KEY = 'pettodo_reveal_rate_v1';
const MAX_REVEALS = 5;
const WINDOW_MS = 60 * 60 * 1000;

function getTimestamps(): number[] {
  try {
    const raw = localStorage.getItem(RATE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getRecent(timestamps: number[]): number[] {
  const now = Date.now();
  return timestamps.filter(t => now - t < WINDOW_MS);
}

export interface RateLimitStatus {
  allowed: boolean;
  remaining: number;
  resetInMinutes: number;
}

export function checkRevealRateLimit(): RateLimitStatus {
  const recent = getRecent(getTimestamps());
  if (recent.length >= MAX_REVEALS) {
    const oldest = Math.min(...recent);
    const resetInMs = WINDOW_MS - (Date.now() - oldest);
    const resetInMinutes = Math.ceil(resetInMs / 60000);
    return { allowed: false, remaining: 0, resetInMinutes };
  }
  return { allowed: true, remaining: MAX_REVEALS - recent.length, resetInMinutes: 0 };
}

export function recordReveal(): void {
  const recent = getRecent(getTimestamps());
  recent.push(Date.now());
  localStorage.setItem(RATE_KEY, JSON.stringify(recent));
}

export function forceRateLimit(): void {
  const now = Date.now();
  const faked = Array.from({ length: MAX_REVEALS }, (_, i) => now - i * 100);
  localStorage.setItem(RATE_KEY, JSON.stringify(faked));
}

export function resetRateLimit(): void {
  localStorage.removeItem(RATE_KEY);
}
