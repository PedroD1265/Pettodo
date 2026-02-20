import type { IGeoService } from '../interfaces';

const GEO_LOOKUP: { label: string; lat: number; lng: number }[] = [
  { label: 'Central Park, New York, NY', lat: 40.7829, lng: -73.9654 },
  { label: 'Bethesda Fountain, Central Park', lat: 40.7741, lng: -73.9715 },
  { label: 'Upper West Side, New York, NY', lat: 40.7850, lng: -73.9800 },
  { label: 'Upper East Side, New York, NY', lat: 40.7731, lng: -73.9547 },
  { label: 'Midtown Manhattan, New York, NY', lat: 40.7549, lng: -73.9840 },
  { label: 'Brooklyn, New York, NY', lat: 40.6782, lng: -73.9442 },
  { label: 'Williamsburg, Brooklyn, NY', lat: 40.7162, lng: -73.9500 },
  { label: 'Chelsea, New York, NY', lat: 40.7465, lng: -74.0014 },
  { label: 'East Village, New York, NY', lat: 40.7264, lng: -73.9818 },
  { label: "Hell's Kitchen, New York, NY", lat: 40.7640, lng: -73.9920 },
];

export const geoDemoAdapter: IGeoService = {
  async geocode(query) {
    const q = query.toLowerCase();
    const matches = GEO_LOOKUP.filter(l => l.label.toLowerCase().includes(q));
    return matches.length > 0 ? matches : [GEO_LOOKUP[0]];
  },

  async reverseGeocode(lat, lng) {
    let best = GEO_LOOKUP[0];
    let bestDist = Infinity;
    for (const loc of GEO_LOOKUP) {
      const d = Math.abs(loc.lat - lat) + Math.abs(loc.lng - lng);
      if (d < bestDist) {
        bestDist = d;
        best = loc;
      }
    }
    return { label: best.label };
  },
};
