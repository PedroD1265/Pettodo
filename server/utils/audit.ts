import { query } from '../db.js';

/**
 * Write a row to audit_logs.
 * Non-throwing — errors are logged but never propagate to callers
 * so a logging failure never breaks the main operation.
 */
export async function writeAuditLog(params: {
  actionType: string;
  actorUid: string;
  targetEntityType?: string;
  targetEntityId?: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const { actionType, actorUid, targetEntityType, targetEntityId, metadata } = params;
  const id = `al_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const now = Date.now();

  try {
    await query(
      `INSERT INTO audit_logs
         (id, action_type, actor_uid, target_entity_type, target_entity_id, metadata, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        id,
        actionType,
        actorUid,
        targetEntityType ?? null,
        targetEntityId ?? null,
        JSON.stringify(metadata ?? {}),
        now,
      ]
    );
  } catch (err: any) {
    console.error('[audit] Failed to write audit log:', err.message, { actionType, actorUid });
  }
}
