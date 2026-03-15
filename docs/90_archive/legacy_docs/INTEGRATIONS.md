# PETTODO — Integration Guide

This document describes how to activate each external provider. In **demo mode** (`VITE_APP_MODE=demo`) the app runs fully offline with realistic simulations. Switch individual providers by editing `.env` (see `.env.example`).

---

## 1. Storage (Photos & Documents)

### Recommended: Azure Blob Storage
**Why:** You have $1,000 in Azure credits. Blob Storage is cheap, scalable, and has built-in CDN (Azure Front Door).

**Required env vars (backend only — never expose in client):**
```
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=...
AZURE_CONTAINER_NAME=pettodo-uploads
```

**Required VITE var:**
```
VITE_STORAGE_PROVIDER=azure
```

**How it works:**
- Client requests a SAS (Shared Access Signature) token from backend endpoint `POST /api/storage/sas`
- Backend generates short-lived SAS URL (15 min) and returns it
- Client uploads directly to Azure Blob using the SAS URL
- Never send `AZURE_STORAGE_CONNECTION_STRING` to the client

**Alternative: Google Cloud Storage (GCS)**
- Backend generates signed URLs via `@google-cloud/storage`
- Env vars: `GOOGLE_APPLICATION_CREDENTIALS` on backend

**Integration code:** `src/app/services/integration/storageAzure.stub.ts`

---

## 2. SMS / OTP Verification

### Recommended: Twilio Verify
**Why:** Simple REST API, handles OTP delivery and verification natively, no need to manage OTP state.

**Required env vars (backend only):**
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM_NUMBER=+1234567890
```

**Required VITE var:**
```
VITE_SMS_PROVIDER=twilio
```

**How it works:**
- Client calls `POST /api/sms/request-otp` (your backend)
- Backend calls Twilio Verify `POST /v2/Services/{serviceSid}/Verifications`
- Client calls `POST /api/sms/verify-otp` with phone + code
- Backend checks with Twilio; returns `{ success: boolean }`
- Never expose Twilio credentials to the client

**Alternative: MessageBird** — similar API, slightly cheaper in some regions.

**Integration code:** `src/app/services/integration/smsTwilio.stub.ts`

---

## 3. Realtime Chat

### Recommended: Ably
**Why:** Serverless, generous free tier (6M messages/month), SDK for React, easiest setup.

**Required VITE var:**
```
VITE_CHAT_PROVIDER=ably
VITE_ABLY_API_KEY=your_ably_api_key_here
```

**Security note:** Use Ably Token Authentication in production (never expose master API key in client). Add `GET /api/chat/token` endpoint on backend.

**How it works:**
- `chatAbly.stub.ts` implements `IChatService` using `ably` npm package
- `createThread(caseId)` → returns a channel name like `case:{caseId}`
- `sendMessage(threadId, text)` → publishes to channel
- `subscribe(threadId, onMessage)` → subscribes and returns unsubscribe function

**Alternatives:**
- **Pusher Channels** — similar model, good React SDK
- **Supabase Realtime** — if you use Supabase for the database layer too

**Integration code:** `src/app/services/integration/chatAbly.stub.ts`

---

## 4. Push Notifications

### Recommended: Firebase Cloud Messaging (FCM)
**Why:** Unified API for web (service worker) and native mobile (React Native later). Free tier is generous.

**Required VITE var:**
```
VITE_PUSH_PROVIDER=fcm
VITE_FIREBASE_CONFIG_JSON={"projectId":"...","messagingSenderId":"...","apiKey":"...","appId":"..."}
```

**Required env var (backend, for sending server-side pushes):**
```
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"...",...}
```

**How it works:**
1. Browser requests notification permission
2. Service worker (`firebase-messaging-sw.js`) registers
3. Client gets FCM token, sends to backend: `POST /api/push/register`
4. Backend stores token and sends push via Firebase Admin SDK
5. `showLocalNotification(title, body)` — always works offline via service worker `showNotification`

**Integration code:** `src/app/services/integration/pushFcm.stub.ts`

---

## 5. Maps & Geocoding

### Recommended: Google Maps JS API + Places
**Why:** Best geocoding accuracy, familiar UX. Keep Leaflet/OSM for demo (no key needed).

**Required VITE var:**
```
VITE_MAP_PROVIDER=google
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**How it works:**
- Replace `MapPlaceholder`/Leaflet components with `@react-google-maps/api`
- `geoGoogle.stub.ts` implements `IGeoService` using Places Autocomplete + Geocoding API
- Restrict the API key to your domain in Google Cloud Console
- The key IS exposed to the client (normal for Maps JS API); restrict it properly

**Integration code:** `src/app/services/integration/geoGoogle.stub.ts`

---

## 6. AI Assistant & Matching

### Recommended: Gemini Flash (cost) / Gemini Pro (quality)
**Why:** You have Google credits. Flash is cheap and fast for Q&A; Pro for complex reasoning.

**Required env var (backend only — NEVER in client):**
```
GEMINI_API_KEY=your_gemini_api_key
```

**Required VITE var:**
```
VITE_AI_PROVIDER=gemini
```

**How it works:**
- Client calls `POST /api/ai/answer` with `{ question, context }`
- Backend proxies to Gemini API using `@google/generative-ai`
- Returns `{ answer, citations }`
- For matching: `POST /api/ai/rank-matches` → backend generates embeddings + cosine similarity

**Security note:** Never put `GEMINI_API_KEY` in client bundle. Always proxy through your backend.

**Integration code:** `src/app/services/integration/aiGemini.stub.ts`

---

## Integration Code Locations

All stub files are in `src/app/services/integration/`. Each stub:
- Implements the corresponding interface from `src/app/services/interfaces.ts`
- Contains `// TODO: implement` comments with exact steps
- Is never instantiated in `VITE_APP_MODE=demo`

To activate an integration:
1. Copy `VITE_*_PROVIDER=demo` → `VITE_*_PROVIDER=<provider>` in `.env`
2. Fill in the required env vars (use backend for secrets)
3. Complete the stub implementation in `src/app/services/integration/`

---

## Security Rules

1. **No secrets in client bundle.** Check with `grep -r "sk_\|secret\|password\|private_key" src/`
2. **File uploads**: always use signed/SAS URLs — never upload directly with a master key
3. **SMS**: backend-only. OTP state managed server-side
4. **Gemini/OpenAI**: backend proxy only — API keys never in Vite env (`VITE_*` prefix exposes to client)
5. **Maps key**: OK in `VITE_*` but restrict to your domain in provider console
6. **Ably**: use Token Auth in production, not the master API key

---

## Migration Checklist

- [ ] Copy `.env.example` → `.env`
- [ ] Set `VITE_APP_MODE=integration`
- [ ] Set `VITE_STORAGE_PROVIDER=azure` + configure backend SAS endpoint
- [ ] Set `VITE_SMS_PROVIDER=twilio` + configure backend SMS proxy
- [ ] Set `VITE_CHAT_PROVIDER=ably` + configure Ably token endpoint
- [ ] Set `VITE_PUSH_PROVIDER=fcm` + add `firebase-messaging-sw.js` to `public/`
- [ ] Set `VITE_MAP_PROVIDER=google` + add domain restriction on key
- [ ] Set `VITE_AI_PROVIDER=gemini` + configure backend AI proxy
- [ ] Run `npm run build` and verify 0 errors
- [ ] Deploy and smoke test all 6 provider flows
