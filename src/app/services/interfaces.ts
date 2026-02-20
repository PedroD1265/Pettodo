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
}

export interface IMatchingService {
  rankMatches(lostCaseId: string): Promise<MatchResult[]>;
}

export interface Services {
  storage: IStorageService;
  sms: ISmsService;
  chat: IChatService;
  push: IPushService;
  geo: IGeoService;
  ai: IAiAssistantService;
  matching: IMatchingService;
}
