import { Router, type Response } from 'express';
import { verifyToken, type AuthenticatedRequest } from '../middleware/verifyToken.js';
import { query } from '../db.js';

const router = Router();

// ── Heuristic scoring helpers ─────────────────────────────────────────────────

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

function recencyScore(createdAt: number): { score: number; reason: string | null } {
  const hoursAgo = (Date.now() - createdAt) / (1000 * 60 * 60);
  if (hoursAgo < 2) return { score: 30, reason: 'very recent sighting' };
  if (hoursAgo < 6) return { score: 22, reason: 'recent report' };
  if (hoursAgo < 24) return { score: 15, reason: 'within last 24 hours' };
  if (hoursAgo < 72) return { score: 8, reason: null };
  return { score: 2, reason: null };
}

function distanceScore(km: number): { score: number; reason: string | null } {
  if (km < 0.5) return { score: 30, reason: 'very close to your area' };
  if (km < 1) return { score: 22, reason: 'near your area' };
  if (km < 2) return { score: 15, reason: `${km.toFixed(1)} km away` };
  if (km < 5) return { score: 8, reason: `${km.toFixed(1)} km away` };
  return { score: 2, reason: null };
}

function colorOverlap(a: string[], b: string[]): number {
  const aSet = new Set((a ?? []).map((s) => s.toLowerCase()));
  return (b ?? []).filter((c) => aSet.has(c.toLowerCase())).length;
}

function formatTimeAgo(createdAt: number): string {
  const ms = Date.now() - createdAt;
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

// ── GET /api/matching/cases/:id ───────────────────────────────────────────────
// Returns ranked candidate matches for the given case from the live DB.
// Any authenticated user can run matching on any active case.
// Candidates: all active cases of opposite type(s), system-wide.

router.get('/matching/cases/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    // 1. Fetch origin case (must exist, any status)
    const originRes = await query('SELECT * FROM cases WHERE id = $1', [id]);
    if (originRes.rows.length === 0) {
      res.status(404).json({ error: 'case_not_found' });
      return;
    }
    const origin = originRes.rows[0];

    // 2. Determine candidate types
    const candidateTypes: string[] =
      origin.type === 'lost' ? ['found', 'sighted'] : ['lost'];

    // 3. Fetch active candidates (all users, not just requester)
    const candidatesRes = await query(
      `SELECT * FROM cases
       WHERE type = ANY($1::text[]) AND status = 'active' AND id != $2
       ORDER BY created_at DESC
       LIMIT 300`,
      [candidateTypes, id]
    );

    // 4. Score each candidate
    const originLat = origin.approx_lat != null ? parseFloat(origin.approx_lat) : null;
    const originLng = origin.approx_lng != null ? parseFloat(origin.approx_lng) : null;

    const results: object[] = [];

    for (const c of candidatesRes.rows) {
      let score = 0;
      const reasons: string[] = [];

      // Distance
      const cLat = c.approx_lat != null ? parseFloat(c.approx_lat) : null;
      const cLng = c.approx_lng != null ? parseFloat(c.approx_lng) : null;
      if (originLat != null && originLng != null && cLat != null && cLng != null) {
        const km = haversineKm(originLat, originLng, cLat, cLng);
        const d = distanceScore(km);
        score += d.score;
        if (d.reason) reasons.push(d.reason);
      }

      // Recency
      const r = recencyScore(Number(c.created_at));
      score += r.score;
      if (r.reason) reasons.push(r.reason);

      // Size
      const originSize = (origin.size ?? '').toLowerCase();
      const cSize = (c.size ?? '').toLowerCase();
      if (originSize && cSize && originSize === cSize) {
        score += 20;
        reasons.push('similar size');
      }

      // Colors
      const colorMatches = colorOverlap(origin.colors ?? [], c.colors ?? []);
      if (colorMatches > 0) {
        score += Math.min(colorMatches * 10, 20);
        reasons.push('similar color');
      }

      // Traits
      const originTraits: string[] = origin.traits ?? [];
      const cTraits: string[] = c.traits ?? [];
      const sharedTraits = originTraits.filter((t) =>
        cTraits.some(
          (ct) =>
            ct.toLowerCase().includes(t.toLowerCase()) ||
            t.toLowerCase().includes(ct.toLowerCase())
        )
      );
      if (sharedTraits.length > 0) {
        score += Math.min(sharedTraits.length * 5, 15);
        reasons.push('matching trait');
      }

      const confidence = Math.min(Math.round((score / 95) * 100), 95);
      if (confidence < 15) continue;

      results.push({
        caseId: c.id,
        confidence,
        reasons: reasons.slice(0, 3),
        location: c.location ?? '',
        time: formatTimeAgo(Number(c.created_at)),
        timeLabel: c.time_label ?? '',
        description: c.description ?? '',
        size: c.size ?? '',
        colors: c.colors ?? [],
        candidateType: c.type,
        caution: CAUTION,
        nextAction: nextActionForType(c.type),
      });
    }

    // Sort by confidence desc, return top 20
    const sorted = (results as { confidence: number }[])
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 20);

    res.json(sorted);
  } catch (err: any) {
    console.error('[matching] GET /matching/cases/:id error:', err.message);
    res.status(500).json({ error: 'matching_failed', message: err.message });
  }
});

export default router;
