import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

const hasCredentials = !!(projectId && clientEmail && privateKey);

if (!hasCredentials) {
  console.warn(
    '[firebase-admin] Missing one or more env vars (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY). Token verification will fail. Server will run in demo/no-auth mode.'
  );
}

if (hasCredentials && getApps().length === 0) {
  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export const adminAuth = hasCredentials ? getAuth() : null;
