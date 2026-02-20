const getEnv = (key: string, fallback: string): string =>
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.[key]) || fallback;

export const appConfig = {
  mode: getEnv('VITE_APP_MODE', 'demo') as 'demo' | 'integration',
  storageProvider: getEnv('VITE_STORAGE_PROVIDER', 'demo') as 'demo' | 'azure' | 'gcs',
  smsProvider: getEnv('VITE_SMS_PROVIDER', 'demo') as 'demo' | 'twilio',
  chatProvider: getEnv('VITE_CHAT_PROVIDER', 'demo') as 'demo' | 'ably' | 'pusher' | 'supabase',
  pushProvider: getEnv('VITE_PUSH_PROVIDER', 'demo') as 'demo' | 'fcm',
  mapProvider: getEnv('VITE_MAP_PROVIDER', 'osm') as 'osm' | 'google',
  aiProvider: getEnv('VITE_AI_PROVIDER', 'demo') as 'demo' | 'gemini',
  apiBaseUrl: getEnv('VITE_API_BASE_URL', ''),
} as const;

export type AppConfig = typeof appConfig;
