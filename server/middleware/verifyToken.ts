import type { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../firebaseAdmin.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    name?: string;
    picture?: string;
    email_verified?: boolean;
  };
}

export async function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }

  if (!adminAuth) {
    console.error('[verifyToken] adminAuth is not initialized (missing env vars).');
    res.status(500).json({ error: 'auth_not_configured' });
    return;
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
      email_verified: decoded.email_verified,
    };
    next();
  } catch (err) {
    res.status(401).json({ error: 'unauthorized' });
  }
}

