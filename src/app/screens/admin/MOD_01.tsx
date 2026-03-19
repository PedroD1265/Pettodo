import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  AlertTriangle,
  CheckCircle,
  Clock3,
  Dog,
  FileSearch,
  RefreshCw,
  ShieldAlert,
  XCircle,
} from 'lucide-react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { useAuth } from '../../context/AuthContext';
import {
  reviewApi,
  type PendingReviewResponse,
  type ReviewEntityType,
  type ReviewPendingChangeRequest,
} from '../../services/api';
import { toast } from 'sonner';

type ScreenState = 'loading' | 'ready' | 'auth_error' | 'error';
type DecisionAction = 'approve' | 'reject';
type AuthErrorCode = 401 | 403 | null;

function formatTimestamp(value?: number | null) {
  if (!value) return 'Unknown date';
  return new Date(value).toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatRelativeSectionUpdate(value?: number | null) {
  if (!value) return 'Not refreshed yet';
  return `Updated ${new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function formatEntityLabel(value?: string | null) {
  if (!value) return 'Unknown entity';
  return value
    .split('_')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

function getChangeSummary(changeRequest: ReviewPendingChangeRequest) {
  const proposedChanges = changeRequest.proposed_changes;
  if (!proposedChanges || typeof proposedChanges !== 'object') {
    return 'No proposed fields attached';
  }

  const fields = Object.keys(proposedChanges);
  if (fields.length === 0) {
    return 'No proposed fields attached';
  }

  const preview = fields.slice(0, 3).join(', ');
  return fields.length > 3
    ? `Fields: ${preview} +${fields.length - 3} more`
    : `Fields: ${preview}`;
}

function removePendingItem(
  current: PendingReviewResponse | null,
  entityType: ReviewEntityType,
  entityId: string,
): PendingReviewResponse | null {
  if (!current) return current;

  switch (entityType) {
    case 'community_dog': {
      const communityDogs = current.communityDogs.filter((item) => item.id !== entityId);
      return {
        ...current,
        communityDogs,
        totalPending: Math.max(0, current.totalPending - (current.communityDogs.length - communityDogs.length)),
      };
    }
    case 'change_request': {
      const changeRequests = current.changeRequests.filter((item) => item.id !== entityId);
      return {
        ...current,
        changeRequests,
        totalPending: Math.max(0, current.totalPending - (current.changeRequests.length - changeRequests.length)),
      };
    }
    case 'evidence_item': {
      const evidenceItems = current.evidenceItems.filter((item) => item.id !== entityId);
      return {
        ...current,
        evidenceItems,
        totalPending: Math.max(0, current.totalPending - (current.evidenceItems.length - evidenceItems.length)),
      };
    }
  }
}

export default function MOD_01() {
  const nav = useNavigate();
  const { user, isDemo, role, accessSource } = useAuth();
  const [data, setData] = useState<PendingReviewResponse | null>(null);
  const [screenState, setScreenState] = useState<ScreenState>('loading');
  const [authErrorCode, setAuthErrorCode] = useState<AuthErrorCode>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [submittingKey, setSubmittingKey] = useState<string | null>(null);
  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number | null>(null);

  const loadPending = useCallback(async ({ background = false }: { background?: boolean } = {}) => {
    const shouldRefreshInPlace = background;

    if (shouldRefreshInPlace) {
      setRefreshing(true);
    } else {
      setScreenState('loading');
    }

    setAuthErrorCode(null);

    try {
      const result = await reviewApi.getPending();
      setData(result);
      setScreenState('ready');
      setLastUpdatedAt(Date.now());
    } catch (err: any) {
      const status = err?.status;

      if (status === 401 || status === 403) {
        setAuthErrorCode(status);
        setScreenState('auth_error');
        return;
      }

      if (shouldRefreshInPlace) {
        toast.error('Could not refresh the review queue. Showing the last loaded data.');
      } else {
        setScreenState('error');
      }
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadPending();
  }, [loadPending]);

  const isBusy = refreshing || Boolean(submittingKey);
  const counts = useMemo(() => ({
    dogs: data?.communityDogs.length ?? 0,
    changeRequests: data?.changeRequests.length ?? 0,
    evidenceItems: data?.evidenceItems.length ?? 0,
  }), [data]);
  const accessLabel = role === 'operator'
    ? 'Operator'
    : role === 'moderator'
    ? 'Moderator'
    : accessSource === 'review_probe'
    ? 'Reviewer'
    : 'Authorized';

  const updateNotes = (itemKey: string, value: string) => {
    setDraftNotes((current) => ({ ...current, [itemKey]: value }));
  };

  const handleDecision = async (
    entityType: ReviewEntityType,
    entityId: string,
    action: DecisionAction,
    label: string,
  ) => {
    const itemKey = `${entityType}:${entityId}`;
    if (submittingKey || refreshing) return;

    setSubmittingKey(itemKey);

    try {
      const notes = draftNotes[itemKey]?.trim();

      if (action === 'approve') {
        await reviewApi.approve(entityType, entityId, notes || undefined);
      } else {
        await reviewApi.reject(entityType, entityId, notes || undefined);
      }

      setData((current) => removePendingItem(current, entityType, entityId));
      setDraftNotes((current) => {
        const next = { ...current };
        delete next[itemKey];
        return next;
      });

      toast.success(
        action === 'approve'
          ? `"${label}" approved and removed from queue.`
          : `"${label}" rejected and removed from queue.`,
      );

      await loadPending({ background: true });
    } catch (err: any) {
      if (err?.status === 401 || err?.status === 403) {
        setAuthErrorCode(err.status);
        setScreenState('auth_error');
        return;
      }

      toast.error(err?.message || 'Failed to save the decision. Please try again.');
    } finally {
      setSubmittingKey(null);
    }
  };

  if (screenState === 'loading') {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="MOD_01_ModerationQueue" />
        <AppBar title="Review Queue" showBack showBell={false} />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw size={28} className="animate-spin" style={{ color: 'var(--gray-400)' }} />
            <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>Loading moderation queue...</p>
          </div>
        </div>
      </div>
    );
  }

  if (screenState === 'auth_error') {
    const isForbidden = authErrorCode === 403;

    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="MOD_01_ModerationQueue" />
        <AppBar title="Review Queue" showBack showBell={false} />
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
          <ShieldAlert size={48} style={{ color: 'var(--red-primary)' }} />
          <h3 className="text-[18px] text-center" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>
            {isForbidden ? 'Role required' : 'Session expired'}
          </h3>
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
            {isForbidden
              ? 'This queue is restricted to moderator or operator roles.'
              : 'Sign in again to keep reviewing pending items.'}
          </p>
          <div className="w-full max-w-[320px] flex flex-col gap-2">
            <Btn
              variant="primary"
              fullWidth
              onClick={() => nav(isForbidden ? '/' : '/auth/sign-in')}
            >
              {isForbidden ? 'Go to home' : 'Go to sign in'}
            </Btn>
            <Btn variant="secondary" fullWidth onClick={() => void loadPending()}>
              Retry
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  if (screenState === 'error') {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="MOD_01_ModerationQueue" />
        <AppBar title="Review Queue" showBack showBell={false} />
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
          <AlertTriangle size={44} style={{ color: 'var(--warning)' }} />
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
            We could not load the moderation queue right now.
          </p>
          <Btn variant="secondary" onClick={() => void loadPending()}>
            Retry
          </Btn>
        </div>
      </div>
    );
  }

  if (!data || data.totalPending === 0) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="MOD_01_ModerationQueue" />
        <AppBar title="Review Queue" showBack showBell={false} />
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
          <CheckCircle size={48} style={{ color: 'var(--green-primary)' }} />
          <h3 className="text-[18px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Queue clear</h3>
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
            There are no pending moderation items right now.
          </p>
          <div className="w-full max-w-[320px] flex flex-col gap-2">
            <Btn variant="secondary" fullWidth onClick={() => void loadPending()}>
              Refresh queue
            </Btn>
            <Btn variant="ghost" fullWidth onClick={() => nav('/')}>
              Back to home
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="MOD_01_ModerationQueue" />
      <AppBar title="Review Queue" showBack showBell={false} />

      <div className="flex-1 p-4 pb-20 flex flex-col gap-4">
        <div
          className="p-4 rounded-2xl flex flex-col gap-3"
          style={{ background: 'var(--white)', border: '1px solid var(--gray-200)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'var(--warning-bg)' }}
                >
                  <Clock3 size={16} style={{ color: 'var(--warning-dark)' }} />
                </div>
                <div>
                  <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Operator queue</p>
                  <h2 className="text-[20px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>
                    {data.totalPending} pending items
                  </h2>
                </div>
              </div>
              <p className="text-[12px] mt-3" style={{ color: 'var(--gray-500)' }}>
                {user?.email ? `Signed in as ${user.email}` : 'Signed in'}
              </p>
              <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
                Access: {accessLabel}
              </p>
              <p className="text-[12px]" style={{ color: 'var(--gray-400)' }}>
                {formatRelativeSectionUpdate(lastUpdatedAt)}{isDemo ? ' - demo mode may return unauthorized' : ''}
              </p>
            </div>

            <button
              onClick={() => void loadPending({ background: true })}
              disabled={isBusy}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl shrink-0"
              style={{
                minHeight: 40,
                background: isBusy ? 'var(--gray-100)' : 'var(--gray-900)',
                color: isBusy ? 'var(--gray-400)' : 'var(--white)',
              }}
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              <span className="text-[12px]" style={{ fontWeight: 600 }}>
                {refreshing ? 'Refreshing' : 'Refresh'}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <SummaryPill label="CommunityDogs" value={counts.dogs} tone="warning" />
            <SummaryPill label="ChangeRequests" value={counts.changeRequests} tone="info" />
            <SummaryPill label="EvidenceItems" value={counts.evidenceItems} tone="success" />
          </div>

          <Banner type="info" text="Notes are optional. Each approval or rejection is sent immediately and logged." />
        </div>

        <ReviewSection
          title="CommunityDogs"
          count={counts.dogs}
          icon={<Dog size={16} />}
          emptyText="No pending community dogs."
        >
          {data.communityDogs.map((dog) => {
            const itemKey = `community_dog:${dog.id}`;

            return (
              <ReviewCard
                key={itemKey}
                title={dog.nickname || 'Unnamed dog'}
                subtitle={[
                  dog.breed || 'Breed unknown',
                  dog.size || 'Size unknown',
                  dog.approximate_area || 'Area not provided',
                ].join(' / ')}
                meta={[
                  dog.colors?.length ? `Colors: ${dog.colors.join(', ')}` : 'Colors: not provided',
                  dog.created_by ? `Created by: ${dog.created_by}` : 'Created by: unknown',
                  `Submitted: ${formatTimestamp(dog.created_at)}`,
                  `ID: ${dog.id}`,
                ]}
                notes={draftNotes[itemKey] || ''}
                onNotesChange={(value) => updateNotes(itemKey, value)}
                onApprove={() => void handleDecision('community_dog', dog.id, 'approve', dog.nickname || dog.id)}
                onReject={() => void handleDecision('community_dog', dog.id, 'reject', dog.nickname || dog.id)}
                disabled={isBusy}
                submitting={submittingKey === itemKey}
              />
            );
          })}
        </ReviewSection>

        <ReviewSection
          title="ChangeRequests"
          count={counts.changeRequests}
          icon={<FileSearch size={16} />}
          emptyText="No pending change requests."
        >
          {data.changeRequests.map((request) => {
            const itemKey = `change_request:${request.id}`;
            const label = request.target_entity_id || request.id;

            return (
              <ReviewCard
                key={itemKey}
                title={`${formatEntityLabel(request.target_entity_type)} update`}
                subtitle={request.reason || 'No reason supplied'}
                meta={[
                  `Target: ${request.target_entity_id || 'Unknown target'}`,
                  getChangeSummary(request),
                  request.requested_by ? `Requested by: ${request.requested_by}` : 'Requested by: unknown',
                  `Submitted: ${formatTimestamp(request.created_at)}`,
                ]}
                notes={draftNotes[itemKey] || ''}
                onNotesChange={(value) => updateNotes(itemKey, value)}
                onApprove={() => void handleDecision('change_request', request.id, 'approve', label)}
                onReject={() => void handleDecision('change_request', request.id, 'reject', label)}
                disabled={isBusy}
                submitting={submittingKey === itemKey}
              />
            );
          })}
        </ReviewSection>

        <ReviewSection
          title="EvidenceItems"
          count={counts.evidenceItems}
          icon={<CheckCircle size={16} />}
          emptyText="No pending evidence items."
        >
          {data.evidenceItems.map((item) => {
            const itemKey = `evidence_item:${item.id}`;
            const label = item.evidence_type || item.id;

            return (
              <ReviewCard
                key={itemKey}
                title={formatEntityLabel(item.evidence_type)}
                subtitle={item.description || 'No description supplied'}
                meta={[
                  `Target: ${formatEntityLabel(item.target_entity_type)} ${item.target_entity_id || ''}`.trim(),
                  item.submitted_by ? `Submitted by: ${item.submitted_by}` : 'Submitted by: unknown',
                  `Submitted: ${formatTimestamp(item.created_at)}`,
                  `ID: ${item.id}`,
                ]}
                notes={draftNotes[itemKey] || ''}
                onNotesChange={(value) => updateNotes(itemKey, value)}
                onApprove={() => void handleDecision('evidence_item', item.id, 'approve', label)}
                onReject={() => void handleDecision('evidence_item', item.id, 'reject', label)}
                disabled={isBusy}
                submitting={submittingKey === itemKey}
              />
            );
          })}
        </ReviewSection>
      </div>
    </div>
  );
}

function SummaryPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'warning' | 'info' | 'success';
}) {
  const tones = {
    warning: {
      background: 'var(--warning-bg)',
      border: 'var(--warning-soft)',
      color: 'var(--warning-dark)',
    },
    info: {
      background: 'var(--info-bg)',
      border: 'var(--info-soft)',
      color: 'var(--info-dark)',
    },
    success: {
      background: 'var(--green-bg)',
      border: 'var(--green-soft)',
      color: 'var(--green-dark)',
    },
  } as const;

  const currentTone = tones[tone];

  return (
    <div
      className="rounded-xl p-3"
      style={{
        background: currentTone.background,
        border: `1px solid ${currentTone.border}`,
      }}
    >
      <p className="text-[10px]" style={{ color: currentTone.color, fontWeight: 700 }}>
        {label}
      </p>
      <p className="text-[18px]" style={{ color: currentTone.color, fontWeight: 700 }}>
        {value}
      </p>
    </div>
  );
}

function ReviewSection({
  title,
  count,
  icon,
  emptyText,
  children,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  emptyText: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="p-4 rounded-2xl flex flex-col gap-3"
      style={{ background: 'var(--white)', border: '1px solid var(--gray-200)' }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'var(--gray-100)', color: 'var(--gray-700)' }}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-[15px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{title}</h3>
            <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
              {count} pending
            </p>
          </div>
        </div>
      </div>

      {count === 0 ? (
        <div
          className="p-3 rounded-xl"
          style={{ background: 'var(--gray-50)', border: '1px dashed var(--gray-200)' }}
        >
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>{emptyText}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">{children}</div>
      )}
    </section>
  );
}

function ReviewCard({
  title,
  subtitle,
  meta,
  notes,
  onNotesChange,
  onApprove,
  onReject,
  disabled,
  submitting,
}: {
  title: string;
  subtitle: string;
  meta: string[];
  notes: string;
  onNotesChange: (value: string) => void;
  onApprove: () => void;
  onReject: () => void;
  disabled: boolean;
  submitting: boolean;
}) {
  return (
    <div
      className="p-4 rounded-2xl flex flex-col gap-3"
      style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-[15px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{title}</h4>
          <p className="text-[13px] mt-1" style={{ color: 'var(--gray-600)' }}>{subtitle}</p>
        </div>

        <span
          className="shrink-0 px-2.5 py-1 rounded-full text-[10px]"
          style={{ background: 'var(--warning-bg)', color: 'var(--warning-dark)', fontWeight: 700 }}
        >
          pending
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {meta.map((line, index) => (
          <p key={`${index}:${line}`} className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
            {line}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(event) => onNotesChange(event.target.value)}
          disabled={disabled}
          placeholder="Add context for this decision if needed."
          className="w-full rounded-xl px-3 py-2.5 text-[13px]"
          style={{
            minHeight: 86,
            resize: 'vertical',
            background: disabled ? 'var(--gray-100)' : 'var(--white)',
            border: '1px solid var(--gray-200)',
            color: 'var(--gray-900)',
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onReject}
          disabled={disabled}
          className="flex items-center justify-center gap-2 rounded-xl px-4 py-3"
          style={{
            minHeight: 44,
            background: disabled ? 'var(--gray-100)' : 'var(--warning-bg)',
            color: disabled ? 'var(--gray-400)' : 'var(--warning-dark)',
            border: `1px solid ${disabled ? 'var(--gray-200)' : 'var(--warning-soft)'}`,
            fontWeight: 700,
          }}
        >
          <XCircle size={16} />
          <span className="text-[13px]">{submitting ? 'Saving...' : 'Reject'}</span>
        </button>

        <button
          onClick={onApprove}
          disabled={disabled}
          className="flex items-center justify-center gap-2 rounded-xl px-4 py-3"
          style={{
            minHeight: 44,
            background: disabled ? 'var(--gray-100)' : 'var(--green-bg)',
            color: disabled ? 'var(--gray-400)' : 'var(--green-dark)',
            border: `1px solid ${disabled ? 'var(--gray-200)' : 'var(--green-soft)'}`,
            fontWeight: 700,
          }}
        >
          <CheckCircle size={16} />
          <span className="text-[13px]">{submitting ? 'Saving...' : 'Approve'}</span>
        </button>
      </div>
    </div>
  );
}
