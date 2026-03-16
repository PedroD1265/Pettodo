import type { Pet } from '../data/storage';

export interface CasePayload {
  id?: string;
  type: 'lost' | 'found' | 'sighted';
  petId?: string | null;
  location?: string;
  lat?: number | null;
  lng?: number | null;
  timeLabel?: string;
  description?: string;
  size?: string;
  colors?: string[];
  traits?: string[];
  direction?: string;
  createdAt?: number;
}

export interface CaseRecord {
  id: string;
  type: 'lost' | 'found' | 'sighted';
  status: string;
  petId: string | null;
  location: string;
  lat: number | null;
  lng: number | null;
  privacyRadius: number;
  timeLabel: string;
  time: string;
  description: string;
  size: string;
  colors: string[];
  traits: string[];
  direction: string;
  createdAt: number;
  updatedAt: number;
}

type GetToken = () => Promise<string | null>;

let _getToken: GetToken | null = null;

export function setApiTokenProvider(fn: GetToken) {
  _getToken = fn;
}

async function authHeaders(): Promise<Record<string, string>> {
  if (!_getToken) return {};
  const token = await _getToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

async function apiFetch(path: string, opts: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(await authHeaders()),
    ...(opts.headers as Record<string, string> ?? {}),
  };
  const res = await fetch(`/api${path}`, { ...opts, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.message || body.error || `API ${res.status}`);
    (err as any).status = res.status;
    (err as any).body = body;
    throw err;
  }
  return res.json();
}

export const petApi = {
  list: (): Promise<Pet[]> => apiFetch('/pets'),

  get: (id: string): Promise<Pet> => apiFetch(`/pets/${id}`),

  create: (pet: Omit<Pet, 'id' | 'createdAt'> & { id?: string; createdAt?: number }): Promise<Pet> =>
    apiFetch('/pets', { method: 'POST', body: JSON.stringify(pet) }),

  update: (id: string, data: Partial<Pet>): Promise<Pet> =>
    apiFetch(`/pets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  delete: (id: string): Promise<{ deleted: boolean }> =>
    apiFetch(`/pets/${id}`, { method: 'DELETE' }),
};

export const importApi = {
  status: (): Promise<{ imported: boolean; petCount?: number; importedAt?: number }> =>
    apiFetch('/import/status'),

  importPets: (pets: Pet[]): Promise<{ imported: number; total: number }> =>
    apiFetch('/import/pets', { method: 'POST', body: JSON.stringify({ pets }) }),
};

export const publicApi = {
  getPet: (petId: string): Promise<{
    id: string;
    name: string;
    breed: string;
    size: string;
    colors: string[];
    marks: string;
    collar: string;
    temperament: string;
    age: string;
    microchip: string;
    vaccines: string;
    hasOwner: boolean;
  }> => fetch(`/api/public/pet/${petId}`).then(r => {
    if (!r.ok) throw new Error(`Not found`);
    return r.json();
  }),
};

export const caseApi = {
  create: (data: CasePayload): Promise<CaseRecord> =>
    apiFetch('/cases', { method: 'POST', body: JSON.stringify(data) }),

  list: (): Promise<CaseRecord[]> => apiFetch('/cases'),

  get: (id: string): Promise<CaseRecord> => apiFetch(`/cases/${id}`),
};

export interface ImageRef {
  id: string;
  blobPath: string;
  mimeType: string;
  originalFilename: string;
  sizeBytes: number;
  isPrimary: boolean;
  sortOrder: number;
  createdAt: number;
  url: string;
}

export interface UploadUrlResponse {
  uploadUrl: string;
  blobPath: string;
  readUrl: string;
}

export const imageApi = {
  getUploadUrl: (params: {
    filename: string;
    mimeType: string;
    entityType?: 'pet' | 'case';
    entityId?: string;
  }): Promise<UploadUrlResponse> =>
    apiFetch('/storage/upload-url', { method: 'POST', body: JSON.stringify(params) }),

  savePetImage: (
    petId: string,
    data: { blobPath: string; mimeType: string; originalFilename: string; sizeBytes: number; isPrimary?: boolean },
  ): Promise<ImageRef> =>
    apiFetch(`/pets/${petId}/images`, { method: 'POST', body: JSON.stringify(data) }),

  listPetImages: (petId: string): Promise<ImageRef[]> =>
    apiFetch(`/pets/${petId}/images`),

  deletePetImage: (petId: string, imageId: string): Promise<{ deleted: boolean }> =>
    apiFetch(`/pets/${petId}/images/${imageId}`, { method: 'DELETE' }),

  saveCaseImage: (
    caseId: string,
    data: { blobPath: string; mimeType: string; originalFilename: string; sizeBytes: number; isPrimary?: boolean },
  ): Promise<ImageRef> =>
    apiFetch(`/cases/${caseId}/images`, { method: 'POST', body: JSON.stringify(data) }),

  listCaseImages: (caseId: string): Promise<ImageRef[]> =>
    apiFetch(`/cases/${caseId}/images`),

  deleteCaseImage: (caseId: string, imageId: string): Promise<{ deleted: boolean }> =>
    apiFetch(`/cases/${caseId}/images/${imageId}`, { method: 'DELETE' }),
};
