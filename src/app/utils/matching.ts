import { Case } from '../data/storage';

export interface MatchResult {
  case: Case;
  confidence: number;
  reasons: string[];
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function recencyScore(createdAt: number): number {
  const hoursAgo = (Date.now() - createdAt) / (1000 * 60 * 60);
  if (hoursAgo < 2) return 30;
  if (hoursAgo < 6) return 22;
  if (hoursAgo < 24) return 15;
  if (hoursAgo < 72) return 8;
  return 2;
}

function distanceScore(km: number): number {
  if (km < 0.5) return 30;
  if (km < 1) return 22;
  if (km < 2) return 15;
  if (km < 5) return 8;
  return 2;
}

function colorOverlap(a: string[], b: string[]): number {
  const aSet = new Set(a.map(s => s.toLowerCase()));
  const matches = b.filter(c => aSet.has(c.toLowerCase())).length;
  return matches;
}

export function rankMatches(lostCase: Case, candidates: Case[]): MatchResult[] {
  const results: MatchResult[] = [];

  for (const c of candidates) {
    if (c.id === lostCase.id) continue;
    if (c.type === 'lost') continue;
    if (c.status === 'resolved' || c.status === 'archived') continue;

    let score = 0;
    const reasons: string[] = [];

    const km = haversineKm(lostCase.lat, lostCase.lng, c.lat, c.lng);
    const ds = distanceScore(km);
    score += ds;
    if (ds >= 22) reasons.push('near your area');
    else if (ds >= 8) reasons.push(`${km.toFixed(1)} km away`);

    const rs = recencyScore(c.createdAt);
    score += rs;
    if (rs >= 22) reasons.push('very recent sighting');
    else if (rs >= 8) reasons.push('recent report');

    if (lostCase.size && c.size && lostCase.size === c.size) {
      score += 20;
      reasons.push('similar size');
    }

    const colorMatches = colorOverlap(lostCase.colors, c.colors);
    if (colorMatches > 0) {
      score += colorMatches * 10;
      reasons.push('similar color');
    }

    const sharedTraits = lostCase.traits.filter(t =>
      c.traits.some(ct => ct.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(ct.toLowerCase()))
    );
    if (sharedTraits.length > 0) {
      score += sharedTraits.length * 5;
      reasons.push('matching feature');
    }

    const confidence = Math.min(Math.round((score / 95) * 100), 95);
    if (confidence >= 20) {
      results.push({ case: c, confidence, reasons: reasons.slice(0, 3) });
    }
  }

  return results.sort((a, b) => b.confidence - a.confidence);
}
