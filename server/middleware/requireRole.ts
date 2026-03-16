import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from './verifyToken.js';
import { query } from '../db.js';

/**
 * Middleware that checks the caller has at least one of the required roles
 * in the user_roles table. Must be used AFTER verifyToken.
 *
 * Roles: 'user' | 'moderator' | 'operator'
 * Note: 'operator' implicitly satisfies 'moderator' requirements.
 */
export function requireRole(...allowedRoles: string[]) {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const uid = req.user?.uid;
    if (!uid) {
      res.status(401).json({ error: 'unauthorized' });
      return;
    }

    try {
      const result = await query(
        'SELECT role FROM user_roles WHERE user_uid = $1',
        [uid]
      );
      const userRoles = result.rows.map((r: any) => r.role as string);

      // operator satisfies any moderator-or-below requirement
      if (userRoles.includes('operator')) {
        next();
        return;
      }

      const hasRole = allowedRoles.some(r => userRoles.includes(r));
      if (!hasRole) {
        res.status(403).json({
          error: 'forbidden',
          message: 'Insufficient role for this action',
        });
        return;
      }

      next();
    } catch (err: any) {
      console.error('[requireRole] DB error:', err.message);
      res.status(500).json({ error: 'role_check_failed' });
    }
  };
}
