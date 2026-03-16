import React, { useState, useEffect, useCallback } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate } from 'react-router';
import { reviewApi } from '../../services/api';
import { toast } from 'sonner';
import { CheckCircle, XCircle, RefreshCw, ShieldAlert, Clock, FileText, Dog, X } from 'lucide-react';

interface PendingData {
  communityDogs: any[];
  changeRequests: any[];
  evidenceItems: any[];
  totalPending: number;
}

interface DecisionState {
  entityType: string;
  entityId: string;
  action: 'approve' | 'reject';
  label: string;
}

export default function MOD_01() {
  const nav = useNavigate();
  const [data, setData] = useState<PendingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [generalError, setGeneralError] = useState(false);
  const [decision, setDecision] = useState<DecisionState | null>(null);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadPending = useCallback(async () => {
    setLoading(true);
    setAuthError(false);
    setGeneralError(false);
    try {
      const result = await reviewApi.getPending();
      setData(result as PendingData);
    } catch (err: any) {
      if (err?.status === 401 || err?.status === 403) {
        setAuthError(true);
      } else {
        setGeneralError(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPending();
  }, [loadPending]);

  const openDecision = (entityType: string, entityId: string, action: 'approve' | 'reject', label: string) => {
    setDecision({ entityType, entityId, action, label });
    setNotes('');
  };

  const handleDecision = async () => {
    if (!decision) return;
    setSubmitting(true);
    try {
      if (decision.action === 'approve') {
        await reviewApi.approve(decision.entityType, decision.entityId, notes.trim() || undefined);
        toast.success(`"${decision.label}" approved`);
      } else {
        await reviewApi.reject(decision.entityType, decision.entityId, notes.trim() || undefined);
        toast.success(`"${decision.label}" rejected`);
      }
      setDecision(null);
      setNotes('');
      await loadPending();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to apply decision. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="MOD_01_ModerationQueue" />
        <AppBar title="Review Queue" showBack />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw size={28} style={{ color: 'var(--gray-400)' }} className="animate-spin" />
            <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>Loading pending items...</p>
          </div>
        </div>
      </div>
    );
  }

  // ── 401/403 ─────────────────────────────────────────────────────────────────
  if (authError) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="MOD_01_ModerationQueue" />
        <AppBar title="Review Queue" showBack />
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
          <ShieldAlert size={48} style={{ color: 'var(--red-primary)' }} />
          <h3 className="text-[18px] text-center" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Access restricted</h3>
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
            You don't have permission to access the review queue. Moderator or Operator role required.
          </p>
          <Btn variant="secondary" fullWidth onClick={() => nav('/')}>Go to home</Btn>
        </div>
      </div>
    );
  }

  // ── General error ────────────────────────────────────────────────────────────
  if (generalError) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="MOD_01_ModerationQueue" />
        <AppBar title="Review Queue" showBack />
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>Unable to load review queue. Please try again.</p>
          <Btn variant="secondary" onClick={loadPending}>Retry</Btn>
        </div>
      </div>
    );
  }

  // ── Empty ────────────────────────────────────────────────────────────────────
  if (data?.totalPending === 0) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="MOD_01_ModerationQueue" />
        <AppBar title="Review Queue" showBack />
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
          <CheckCircle size={48} style={{ color: 'var(--green-primary)' }} />
          <h3 className="text-[18px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>All clear!</h3>
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>No hay elementos pendientes de revisión.</p>
          <button
            onClick={loadPending}
            className="flex items-center gap-2 text-[13px] px-4 py-2 rounded-xl"
            style={{ background: 'var(--gray-100)', color: 'var(--gray-700)', minHeight: 40 }}
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>
    );
  }

  const dogs = data?.communityDogs ?? [];
  const requests = data?.changeRequests ?? [];
  const evidence = data?.evidenceItems ?? [];

  return (
    <div className="flex flex-col min-h-full relative">
      <ScreenLabel name="MOD_01_ModerationQueue" />
      <AppBar title="Review Queue" showBack />

      <div className="flex-1 p-4 flex flex-col gap-6 pb-20">
        {/* Header summary */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--warning-bg)' }}>
              <Clock size={14} style={{ color: 'var(--warning)' }} />
            </div>
            <span className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
              {data?.totalPending} pending
            </span>
          </div>
          <button
            onClick={loadPending}
            className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-lg"
            style={{ background: 'var(--gray-100)', color: 'var(--gray-700)', minHeight: 36 }}
          >
            <RefreshCw size={12} /> Refresh
          </button>
        </div>

        {/* ── Community Dogs ── */}
        {dogs.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Community Dogs ({dogs.length})
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {dogs.map((dog: any) => (
                <ReviewCard
                  key={dog.id}
                  title={dog.nickname ?? 'Unknown'}
                  subtitle={[dog.breed, dog.size, dog.approximate_area].filter(Boolean).join(' · ')}
                  meta={`ID: ${dog.id}`}
                  date={dog.created_at ? new Date(Number(dog.created_at)).toLocaleDateString() : '—'}
                  onApprove={() => openDecision('community_dog', dog.id, 'approve', dog.nickname ?? dog.id)}
                  onReject={() => openDecision('community_dog', dog.id, 'reject', dog.nickname ?? dog.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Change Requests ── */}
        {requests.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Change Requests ({requests.length})
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {requests.map((req: any) => (
                <ReviewCard
                  key={req.id}
                  title={`${req.target_entity_type ?? 'Entity'} change`}
                  subtitle={req.reason ?? 'No reason provided'}
                  meta={`Target: ${req.target_entity_id ?? '—'}`}
                  date={req.created_at ? new Date(Number(req.created_at)).toLocaleDateString() : '—'}
                  onApprove={() => openDecision('change_request', req.id, 'approve', req.target_entity_id ?? req.id)}
                  onReject={() => openDecision('change_request', req.id, 'reject', req.target_entity_id ?? req.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Evidence Items ── */}
        {evidence.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Evidence Items ({evidence.length})
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {evidence.map((item: any) => (
                <ReviewCard
                  key={item.id}
                  title={item.evidence_type ?? 'Evidence'}
                  subtitle={item.description ?? 'No description'}
                  meta={`Target: ${item.target_entity_id ?? '—'} (${item.target_entity_type ?? '—'})`}
                  date={item.created_at ? new Date(Number(item.created_at)).toLocaleDateString() : '—'}
                  onApprove={() => openDecision('evidence_item', item.id, 'approve', item.evidence_type ?? item.id)}
                  onReject={() => openDecision('evidence_item', item.id, 'reject', item.evidence_type ?? item.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Decision Modal ── */}
      {decision && (
        <div className="absolute inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full bg-white rounded-t-2xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
                {decision.action === 'approve' ? 'Approve' : 'Reject'}: {decision.label}
              </h3>
              <button onClick={() => setDecision(null)} disabled={submitting}>
                <X size={22} style={{ color: 'var(--gray-500)' }} />
              </button>
            </div>

            <div
              className="p-2 rounded-lg text-center text-[12px]"
              style={{
                background: decision.action === 'approve' ? 'var(--green-bg)' : 'var(--warning-bg)',
                color: decision.action === 'approve' ? 'var(--green-dark)' : 'var(--warning-dark)',
                fontWeight: 500,
              }}
            >
              {decision.action === 'approve' ? 'This item will become publicly visible.' : 'This item will be removed from the queue.'}
            </div>

            <div>
              <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>
                Notes <span style={{ color: 'var(--gray-400)' }}>(optional)</span>
              </label>
              <textarea
                className="w-full px-3 py-2.5 rounded-xl text-[14px]"
                style={{ background: 'var(--gray-100)', minHeight: 72, resize: 'none' }}
                placeholder="Add a note for this decision..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                disabled={submitting}
              />
            </div>

            <div className="flex gap-2">
              <Btn variant="ghost" fullWidth onClick={() => setDecision(null)} disabled={submitting}>
                Cancel
              </Btn>
              {decision.action === 'approve' ? (
                <Btn variant="primary" fullWidth onClick={handleDecision} disabled={submitting}>
                  {submitting ? 'Approving...' : 'Confirm Approve'}
                </Btn>
              ) : (
                <Btn variant="destructive" fullWidth onClick={handleDecision} disabled={submitting}>
                  {submitting ? 'Rejecting...' : 'Confirm Reject'}
                </Btn>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ReviewCard sub-component ─────────────────────────────────────────────────
interface ReviewCardProps {
  title: string;
  subtitle: string;
  meta: string;
  date: string;
  onApprove: () => void;
  onReject: () => void;
}

function ReviewCard({ title, subtitle, meta, date, onApprove, onReject }: ReviewCardProps) {
  return (
    <div className="p-3 rounded-xl flex flex-col gap-3" style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)' }}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{title}</p>
          {subtitle && (
            <p className="text-[12px] mt-0.5 truncate" style={{ color: 'var(--gray-500)' }}>{subtitle}</p>
          )}
          <p className="text-[10px] mt-0.5" style={{ color: 'var(--gray-400)' }}>{meta}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--warning-bg)', color: 'var(--warning-dark)', fontWeight: 600 }}>
            pending
          </span>
          <span className="text-[10px]" style={{ color: 'var(--gray-400)' }}>{date}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onApprove}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[13px]"
          style={{ background: 'var(--green-bg)', color: 'var(--green-dark)', fontWeight: 600, minHeight: 40, border: '1px solid var(--green-soft)' }}
        >
          <CheckCircle size={14} /> Approve
        </button>
        <button
          onClick={onReject}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[13px]"
          style={{ background: 'var(--warning-bg)', color: 'var(--warning-dark)', fontWeight: 600, minHeight: 40, border: '1px solid var(--warning-soft)' }}
        >
          <XCircle size={14} /> Reject
        </button>
      </div>
    </div>
  );
}
