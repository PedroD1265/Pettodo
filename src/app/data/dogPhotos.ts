const DOG_PHOTOS: Record<string, string> = {
  luna: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop&crop=face',
  match1: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=200&h=200&fit=crop&crop=face',
  match2: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=200&h=200&fit=crop&crop=face',
  match3: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&h=200&fit=crop&crop=face',
  found: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=200&h=200&fit=crop&crop=face',
  sighted: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=200&h=200&fit=crop&crop=face',
  buddy: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=200&h=200&fit=crop&crop=face',
  max: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc8f9b?w=200&h=200&fit=crop&crop=face',
  canela: 'https://images.unsplash.com/photo-1615233500064-caa995e2f9dd?w=200&h=200&fit=crop&crop=face',
};

export function getDogPhoto(key: string): string {
  return DOG_PHOTOS[key] ?? DOG_PHOTOS.luna;
}

export function getMatchPhoto(index: number): string {
  const keys = ['match1', 'match2', 'match3', 'found', 'sighted'];
  return DOG_PHOTOS[keys[index % keys.length]];
}

export function getCommunityDogPhoto(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('buddy')) return DOG_PHOTOS.buddy;
  if (lower.includes('max')) return DOG_PHOTOS.max;
  if (lower.includes('canela')) return DOG_PHOTOS.canela;
  return DOG_PHOTOS.sighted;
}
