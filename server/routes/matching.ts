import { Router, type Response } from 'express';
import { verifyToken, type AuthenticatedRequest } from '../middleware/verifyToken.js';
import { query } from '../db.js';

const router = Router();

const MAX_SCORE = 115;
const MAX_CONFIDENCE = 95;

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeToken(value: string): string {
  return value.trim().toLowerCase();
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

function recencyScore(createdAt: number | null): { score: number; reason: string | null } {
  if (createdAt == null) return { score: 0, reason: null };

  const hoursAgo = (Date.now() - createdAt) / (1000 * 60 * 60);
  if (!Number.isFinite(hoursAgo)) return { score: 0, reason: null };

  if (hoursAgo < 2) return { score: 30, reason: 'very recent sighting' };
  if (hoursAgo < 6) return { score: 22, reason: 'recent report' };
  if (hoursAgo < 24) return { score: 15, reason: 'within last 24 hours' };
  if (hoursAgo < 72) return { score: 8, reason: null };
  return { score: 2, reason: null };
}

function distanceScore(km: number | null): { score: number; reason: string | null } {
  if (km == null || !Number.isFinite(km)) return { score: 0, reason: null };

  if (km < 0.5) return { score: 30, reason: 'very close to your area' };
  if (km < 1) return { score: 22, reason: 'near your area' };
  if (km < 2) return { score: 15, reason: `${km.toFixed(1)} km away` };
  if (km < 5) return { score: 8, reason: `${km.toFixed(1)} km away` };
  return { score: 2, reason: null };
}

function colorOverlap(a: unknown, b: unknown): number {
  const aSet = new Set(toStringArray(a).map((s) => normalizeToken(s)));
  return toStringArray(b).filter((c) => aSet.has(normalizeToken(c))).length;
}

function traitOverlap(a: unknown, b: unknown): number {
  const originTraits = toStringArray(a).map((s) => normalizeToken(s));
  const candidateTraits = new Set(toStringArray(b).map((s) => normalizeToken(s)));
  const seen = new Set<string>();

  let count = 0;
  for (const trait of originTraits) {
    if (!trait || seen.has(trait)) continue;
    if (candidateTraits.has(trait)) {
      count += 1;
      seen.add(trait);
    }
  }

  return count;
}

function formatTimeAgo(createdAt: number | null): string {
  if (createdAt == null) return 'unknown';

  const ms = Date.now() - createdAt;
  if (!Number.isFinite(ms)) return 'unknown';

  const minutes = Math.round(ms / 60000);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
}

const CAUTION =
  'Suggestion based on location, size, and traits. Visual confirmation is required before any action.';

function nextActionForType(type: string): string {
  if (type === 'found') return 'contact_finder';
  return 'view_sighting';
}

router.get('/matching/cases/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    const originRes = await query('SELECT * FROM cases WHERE id = $1', [id]);
    if (originRes.rows.length === 0) {
      res.status(404).json({ error: 'case_not_found' });
      return;
    }
    const origin = originRes.rows[0];

    const candidateTypes: string[] = origin.type === 'lost' ? ['found', 'sighted'] : ['lost'];

    const candidatesRes = await query(
      `SELECT * FROM cases
       WHERE type = ANY($1::text[]) AND status = 'active' AND id != $2
       ORDER BY created_at DESC
       LIMIT 300`,
      [candidateTypes, id]
    );

    const originLat = toFiniteNumber(origin.approx_lat);
    const originLng = toFiniteNumber(origin.approx_lng);
    const originColors = toStringArray(origin.colors);
    const originTraits = toStringArray(origin.traits);
    const originSize = typeof origin.size === 'string' ? origin.size.trim().toLowerCase() : '';

    const results: Array<{ confidence: number; [key: string]: unknown }> = [];

    for (const c of candidatesRes.rows) {
      let score = 0;
      const reasons: string[] = [];

      const cLat = toFiniteNumber(c.approx_lat);
      const cLng = toFiniteNumber(c.approx_lng);
      if (originLat != null && originLng != null && cLat != null && cLng != null) {
        const km = haversineKm(originLat, originLng, cLat, cLng);
        const d = distanceScore(km);
        score += d.score;
        if (d.reason) reasons.push(d.reason);
      }

      const createdAt = toFiniteNumber(c.created_at);
      const r = recencyScore(createdAt);
      score += r.score;
      if (r.reason) reasons.push(r.reason);

      const cSize = typeof c.size === 'string' ? c.size.trim().toLowerCase() : '';
      if (originSize && cSize && originSize === cSize) {
        score += 20;
        reasons.push('similar size');
      }

      const candidateColors = toStringArray(c.colors);
      const colorMatches = colorOverlap(originColors, candidateColors);
      if (colorMatches > 0) {
        score += Math.min(colorMatches * 10, 20);
        reasons.push('similar color');
      }

      const traitMatches = traitOverlap(originTraits, c.traits);
      if (traitMatches > 0) {
        score += Math.min(traitMatches * 5, 15);
        reasons.push('matching trait');
      }

      const confidenceRaw = (score / MAX_SCORE) * 100;
      const confidence = Number.isFinite(confidenceRaw)
        ? Math.min(Math.max(Math.round(confidenceRaw), 0), MAX_CONFIDENCE)
        : 0;
      if (confidence < 15) continue;

      results.push({
        caseId: c.id,
        confidence,
        reasons: reasons.slice(0, 3),
        location: c.location ?? '',
        time: formatTimeAgo(createdAt),
        timeLabel: c.time_label ?? '',
        description: c.description ?? '',
        size: c.size ?? '',
        colors: candidateColors,
        candidateType: c.type,
        caution: CAUTION,
        nextAction: nextActionForType(c.type),
      });
    }

    const sorted = results.sort((a, b) => b.confidence - a.confidence).slice(0, 20);

    res.json(sorted);
  } catch (err: unknown) {
    console.error('[matching] GET /matching/cases/:id error:', err);
    res.status(500).json({ error: 'matching_failed' });
  }
});

export { MAX_SCORE, recencyScore, distanceScore, colorOverlap };
export default router;
