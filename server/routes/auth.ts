import { Router } from 'express';
import { verifyToken, type AuthenticatedRequest } from '../middleware/verifyToken.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ ok: true });
});

router.get('/auth/me', verifyToken, (req: AuthenticatedRequest, res) => {
  const user = req.user!;
  res.json({
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.name ?? null,
    photoURL: user.picture ?? null,
  });
});

export default router;
