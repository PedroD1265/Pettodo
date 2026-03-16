import type { Pet } from "../data/storage";

// ─── Cases ──────────────────────────────────────────────────────────────────

export interface CasePayload {
  id?: string;
  type: "lost" | "found" | "sighted";
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
  type: "lost" | "found" | "sighted";
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

// ─── Images ─────────────────────────────────────────────────────────────────

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

// ─── Community Dogs ──────────────────────────────────────────────────────────

export interface CommunityDogPayload {
  nickname: string;
  breed?: string;
  size?: string;
  colors?: string[];
  marks?: string;
  approximateArea?: string;
  lat?: number;
  lng?: number;
  healthNotes?: string;
  isSterilized?: boolean;
  isVaccinated?: boolean;
}

export interface CommunityDogRecord {
  id: string;
  nickname: string;
  breed: string;
  size: string;
  colors: string[];
  marks: string;
  approximateArea: string;
  healthNotes: string;
  isSterilized: boolean;
  isVaccinated: boolean;
  reviewState?: string;
  createdAt: number;
  updatedAt: number;
}

// ─── Protected Contact ───────────────────────────────────────────────────────

export interface ContactThreadPayload {
  petId?: string;
  caseId?: string;
  initiatorPhone?: string;
  initiatorMessage?: string;
}

export interface ContactThreadRecord {
  id: string;
  petId: string | null;
  caseId: string | null;
  initiatorUid: string;
  ownerUid: string | null;
  threadStatus: string;
  revealState: string;
  initiatorMessage: string;
  initiatorPhone?: string;
  createdAt: number;
  updatedAt: number;
  messages?: ContactMessage[];
}

export interface ContactMessage {
  id: string;
  senderUid: string;
  message: string;
  isSystem: boolean;
  createdAt: number;
}

// ─── Change Requests ─────────────────────────────────────────────────────────

export interface ChangeRequestPayload {
  targetEntityType: "community_dog" | "case" | "pet";
  targetEntityId: string;
  proposedChanges: Record<string, unknown>;
  reason?: string;
}

// ─── Evidence ────────────────────────────────────────────────────────────────

export interface EvidencePayload {
  targetEntityType: "community_dog" | "case" | "pet";
  targetEntityId: string;
  evidenceType:
    | "sighting"
    | "photo_description"
    | "veterinary_record"
    | "witness"
    | "other";
  description: string;
  metadata?: Record<string, unknown>;
}

// ─── Abuse Flags ─────────────────────────────────────────────────────────────

export interface AbuseFlagPayload {
  targetEntityType: string;
  targetEntityId: string;
  reason: string;
  details?: string;
}

// ─── Auth token management ───────────────────────────────────────────────────

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
    "Content-Type": "application/json",
    ...(await authHeaders()),
    ...((opts.headers as Record<string, string>) ?? {}),
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

// ─── Pet API ─────────────────────────────────────────────────────────────────

export const petApi = {
  list: (): Promise<Pet[]> => apiFetch("/pets"),

  get: (id: string): Promise<Pet> => apiFetch(`/pets/${id}`),

  create: (
    pet: Omit<Pet, "id" | "createdAt"> & { id?: string; createdAt?: number },
  ): Promise<Pet> =>
    apiFetch("/pets", { method: "POST", body: JSON.stringify(pet) }),

  update: (id: string, data: Partial<Pet>): Promise<Pet> =>
    apiFetch(`/pets/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  delete: (id: string): Promise<{ deleted: boolean }> =>
    apiFetch(`/pets/${id}`, { method: "DELETE" }),
};

// ─── Import API ───────────────────────────────────────────────────────────────

export const importApi = {
  status: (): Promise<{
    imported: boolean;
    petCount?: number;
    importedAt?: number;
  }> => apiFetch("/import/status"),

  importPets: (pets: Pet[]): Promise<{ imported: number; total: number }> =>
    apiFetch("/import/pets", {
      method: "POST",
      body: JSON.stringify({ pets }),
    }),
};

// ─── Public API ────────────────────────────────────────────────────────────────

export const publicApi = {
  getPet: (
    petId: string,
  ): Promise<{
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
    protectedContactEnabled: boolean;
    contactEntryPoint: string;
  }> =>
    fetch(`/api/public/pet/${petId}`).then((r) => {
      if (!r.ok) throw new Error(`Not found`);
      return r.json();
    }),
};

// ─── Case API ─────────────────────────────────────────────────────────────────

export const caseApi = {
  create: (data: CasePayload): Promise<CaseRecord> =>
    apiFetch("/cases", { method: "POST", body: JSON.stringify(data) }),

  list: (): Promise<CaseRecord[]> => apiFetch("/cases"),

  get: (id: string): Promise<CaseRecord> => apiFetch(`/cases/${id}`),
};

// ─── Image API ──────────────────────────────────────────────────────────────

export const imageApi = {
  getUploadUrl: (params: {
    filename: string;
    mimeType: string;
    entityType?: "pet" | "case";
    entityId?: string;
  }): Promise<UploadUrlResponse> =>
    apiFetch("/storage/upload-url", {
      method: "POST",
      body: JSON.stringify(params),
    }),

  savePetImage: (
    petId: string,
    data: {
      blobPath: string;
      mimeType: string;
      originalFilename: string;
      sizeBytes: number;
      isPrimary?: boolean;
    },
  ): Promise<ImageRef> =>
    apiFetch(`/pets/${petId}/images`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  listPetImages: (petId: string): Promise<ImageRef[]> =>
    apiFetch(`/pets/${petId}/images`),

  deletePetImage: (
    petId: string,
    imageId: string,
  ): Promise<{ deleted: boolean }> =>
    apiFetch(`/pets/${petId}/images/${imageId}`, { method: "DELETE" }),

  saveCaseImage: (
    caseId: string,
    data: {
      blobPath: string;
      mimeType: string;
      originalFilename: string;
      sizeBytes: number;
      isPrimary?: boolean;
    },
  ): Promise<ImageRef> =>
    apiFetch(`/cases/${caseId}/images`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  listCaseImages: (caseId: string): Promise<ImageRef[]> =>
    apiFetch(`/cases/${caseId}/images`),

  deleteCaseImage: (
    caseId: string,
    imageId: string,
  ): Promise<{ deleted: boolean }> =>
    apiFetch(`/cases/${caseId}/images/${imageId}`, { method: "DELETE" }),
};

// ─── Community Dog API ────────────────────────────────────────────────────────

export const communityDogApi = {
  create: (data: CommunityDogPayload): Promise<CommunityDogRecord> =>
    apiFetch("/community-dogs", { method: "POST", body: JSON.stringify(data) }),

  list: (): Promise<CommunityDogRecord[]> =>
    fetch("/api/community-dogs").then((r) => r.json()),

  get: (id: string): Promise<CommunityDogRecord> =>
    fetch(`/api/community-dogs/${id}`).then((r) => {
      if (!r.ok) throw new Error("Not found");
      return r.json();
    }),

  getMyDog: (id: string): Promise<CommunityDogRecord> =>
    apiFetch(`/my-community-dogs/${id}`),

  listMyDogs: (): Promise<CommunityDogRecord[]> =>
    apiFetch("/my-community-dogs"),

  addSighting: (
    dogId: string,
    data: {
      locationLabel?: string;
      lat?: number;
      lng?: number;
      conditionNotes?: string;
      notes?: string;
    },
  ) =>
    apiFetch(`/community-dogs/${dogId}/sightings`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  addAction: (
    dogId: string,
    data: {
      actionType: "feeding" | "medical" | "rescue" | "other";
      notes?: string;
    },
  ) =>
    apiFetch(`/community-dogs/${dogId}/actions`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ─── Protected Contact API ────────────────────────────────────────────────────

export const protectedContactApi = {
  createThread: (data: ContactThreadPayload): Promise<ContactThreadRecord> =>
    apiFetch("/protected-contact/threads", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getThread: (threadId: string): Promise<ContactThreadRecord> =>
    apiFetch(`/protected-contact/threads/${threadId}`),

  sendMessage: (threadId: string, message: string): Promise<ContactMessage> =>
    apiFetch(`/protected-contact/threads/${threadId}/messages`, {
      method: "POST",
      body: JSON.stringify({ message }),
    }),

  requestReveal: (
    threadId: string,
  ): Promise<{ ok: boolean; message: string }> =>
    apiFetch(`/protected-contact/threads/${threadId}/reveal-request`, {
      method: "POST",
    }),

  decideReveal: (
    threadId: string,
    decision: "grant" | "revoke",
  ): Promise<{ ok: boolean; revealState: string }> =>
    apiFetch(`/protected-contact/threads/${threadId}/reveal-decision`, {
      method: "POST",
      body: JSON.stringify({ decision }),
    }),
};

// ─── Change Request API ───────────────────────────────────────────────────────

export const changeRequestApi = {
  submit: (
    data: ChangeRequestPayload,
  ): Promise<{ id: string; reviewState: string; createdAt: number }> =>
    apiFetch("/change-requests", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ─── Evidence API ─────────────────────────────────────────────────────────────

export const evidenceApi = {
  submit: (
    data: EvidencePayload,
  ): Promise<{ id: string; reviewState: string; createdAt: number }> =>
    apiFetch("/evidence-items", { method: "POST", body: JSON.stringify(data) }),
};

// ─── Review API ──────────────────────────────────────────────────────────────

export const reviewApi = {
  getPending: (): Promise<{
    communityDogs: unknown[];
    changeRequests: unknown[];
    evidenceItems: unknown[];
    totalPending: number;
  }> => apiFetch("/reviews/pending"),

  approve: (entityType: string, entityId: string, notes?: string) =>
    apiFetch(`/reviews/${entityType}/${entityId}/approve`, {
      method: "POST",
      body: JSON.stringify({ notes }),
    }),

  reject: (entityType: string, entityId: string, notes?: string) =>
    apiFetch(`/reviews/${entityType}/${entityId}/reject`, {
      method: "POST",
      body: JSON.stringify({ notes }),
    }),
};

// ─── Abuse Flag API ───────────────────────────────────────────────────────────

export const abuseFlagApi = {
  submit: (
    data: AbuseFlagPayload,
  ): Promise<{ ok: boolean; id: string; createdAt: number }> =>
    apiFetch("/abuse-flags", { method: "POST", body: JSON.stringify(data) }),
};
