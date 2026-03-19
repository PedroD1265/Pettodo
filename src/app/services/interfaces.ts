export interface IStorageService {
  uploadImage(input: File | string, pathHint: string): Promise<{ url: string }>;
  uploadDocument(file: File, pathHint: string): Promise<{ url: string }>;
}

export interface ISmsService {
  requestOtp(phone: string): Promise<{ success: boolean }>;
  verifyOtp(phone: string, code: string): Promise<{ success: boolean }>;
}

export interface IChatService {
  createThread(caseId: string): Promise<{ threadId: string }>;
  sendMessage(threadId: string, message: string): Promise<void>;
  subscribe(threadId: string, onMessage: (msg: { text: string; sender: string }) => void): () => void;
}

export interface IPushService {
  requestPermission(): Promise<'granted' | 'denied' | 'default'>;
  subscribe(): Promise<{ success: boolean }>;
  showLocalNotification(title: string, body: string): void;
}

export interface IGeoService {
  geocode(query: string): Promise<{ lat: number; lng: number; label: string }[]>;
  reverseGeocode(lat: number, lng: number): Promise<{ label: string }>;
}

export interface IAiAssistantService {
  answer(
    question: string,
    context?: string
  ): Promise<{ answer: string; citations?: { title: string; url?: string }[] }>;
}

export interface MatchResult {
  caseId: string;
  confidence: number;
  reasons: string[];
  location: string;
  time: string;
  candidateType?: 'found' | 'sighted' | 'lost';
  caution?: string;
  nextAction?: string;
  description?: string;
  size?: string;
  colors?: string[];
}

export interface IMatchingService {
  rankMatches(caseId: string): Promise<MatchResult[]>;
}

export type AuthRole = 'user' | 'moderator' | 'operator';
export type AuthAccessSource = 'none' | 'demo' | 'token_claims' | 'review_probe';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthAccessProfile {
  role: AuthRole | null;
  canAccessModeration: boolean;
  source: AuthAccessSource;
}

export interface IAuthService {
  getCurrentUser(): AuthUser | null;
  getIdToken(): Promise<string | null>;
  getAccessProfile(): Promise<AuthAccessProfile>;
  signInWithGoogle(): Promise<AuthUser>;
  signOut(): Promise<void>;
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void;
}

export interface Services {
  storage: IStorageService;
  sms: ISmsService;
  chat: IChatService;
  push: IPushService;
  geo: IGeoService;
  ai: IAiAssistantService;
  matching: IMatchingService;
  auth: IAuthService;
}
