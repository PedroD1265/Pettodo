import React from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, X, Plus, Minus } from 'lucide-react';

export function DemoControlsFab() {
  const { showDemoControls, setShowDemoControls } = useApp();
  
  return (
    <button
      onClick={() => setShowDemoControls(!showDemoControls)}
      className="fixed z-40 flex items-center justify-center rounded-full"
      style={{
        bottom: 72,
        right: 8,
        width: 36,
        height: 36,
        background: 'var(--gray-900)',
        color: 'var(--white)',
        opacity: 0.5,
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <Settings size={16} />
    </button>
  );
}

export function DemoControlsPanel() {
  const {
    showDemoControls, setShowDemoControls,
    hasActiveCase, setHasActiveCase,
    verificationLevel, setVerificationLevel,
    strictStatus, setStrictStatus,
    caseClaimed, setCaseClaimed,
    demoTimeOffset, setDemoTimeOffset,
    caseStatus, setCaseStatus,
    mode, setMode,
  } = useApp();

  if (!showDemoControls) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="w-full max-w-[390px] rounded-t-2xl p-4 pb-6" style={{ background: 'var(--white)', maxHeight: '70vh', overflowY: 'auto' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Demo Controls</h3>
          <button onClick={() => setShowDemoControls(false)} style={{ minWidth: 44, minHeight: 44, color: 'var(--gray-400)' }}>
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {/* Mode */}
          <Row label="Mode">
            <ToggleBtn active={mode === 'emergency'} onClick={() => setMode('emergency')} label="Emergency" color="var(--red-primary)" />
            <ToggleBtn active={mode === 'daily'} onClick={() => setMode('daily')} label="Daily" color="var(--green-primary)" />
          </Row>

          {/* Active Case */}
          <Row label="Active Case">
            <ToggleBtn active={hasActiveCase} onClick={() => setHasActiveCase(true)} label="Yes" color="var(--red-primary)" />
            <ToggleBtn active={!hasActiveCase} onClick={() => setHasActiveCase(false)} label="No" color="var(--gray-500)" />
          </Row>

          {/* Case Claimed */}
          <Row label="Case Claimed">
            <ToggleBtn active={caseClaimed} onClick={() => setCaseClaimed(true)} label="Yes" color="var(--green-primary)" />
            <ToggleBtn active={!caseClaimed} onClick={() => setCaseClaimed(false)} label="No" color="var(--gray-500)" />
          </Row>

          {/* Verification Level */}
          <Row label="Verification">
            <ToggleBtn active={verificationLevel === 'none'} onClick={() => setVerificationLevel('none')} label="None" color="var(--gray-500)" />
            <ToggleBtn active={verificationLevel === 'basic'} onClick={() => setVerificationLevel('basic')} label="Basic" color="var(--info)" />
            <ToggleBtn active={verificationLevel === 'strict' as string} onClick={() => setVerificationLevel('strict' as any)} label="Strict" color="var(--green-primary)" />
          </Row>

          {/* Strict Status */}
          <Row label="Strict Status">
            <ToggleBtn active={strictStatus === 'not_started'} onClick={() => setStrictStatus('not_started')} label="None" color="var(--gray-500)" />
            <ToggleBtn active={strictStatus === 'pending'} onClick={() => setStrictStatus('pending')} label="Pend" color="var(--info)" />
            <ToggleBtn active={strictStatus === 'approved'} onClick={() => setStrictStatus('approved')} label="OK" color="var(--green-primary)" />
            <ToggleBtn active={strictStatus === 'rejected'} onClick={() => setStrictStatus('rejected')} label="Rej" color="var(--red-primary)" />
          </Row>

          {/* Case Status */}
          <Row label="Case Status">
            <select
              value={caseStatus}
              onChange={e => setCaseStatus(e.target.value as any)}
              className="flex-1 px-2 py-1.5 rounded-lg text-[12px]"
              style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)', color: 'var(--gray-900)', minHeight: 44 }}
            >
              <option value="active">Active</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="paused">Paused</option>
              <option value="expired">Expired</option>
              <option value="archived">Archived</option>
            </select>
          </Row>

          {/* Time Offset */}
          <Row label={`Time Offset: Day ${demoTimeOffset}`}>
            <button
              onClick={() => setDemoTimeOffset(Math.max(0, demoTimeOffset - 1))}
              className="flex items-center justify-center rounded-lg"
              style={{ minWidth: 44, minHeight: 44, background: 'var(--gray-100)', color: 'var(--gray-700)' }}
            >
              <Minus size={16} />
            </button>
            <span className="text-[14px] px-2" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{demoTimeOffset}</span>
            <button
              onClick={() => setDemoTimeOffset(demoTimeOffset + 1)}
              className="flex items-center justify-center rounded-lg"
              style={{ minWidth: 44, minHeight: 44, background: 'var(--gray-100)', color: 'var(--gray-700)' }}
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => setDemoTimeOffset(7)}
              className="px-2 py-1 rounded-lg text-[11px]"
              style={{ background: 'var(--warning-bg)', color: 'var(--warning-dark)', fontWeight: 600, minHeight: 44 }}
            >
              +7d
            </button>
            <button
              onClick={() => setDemoTimeOffset(10)}
              className="px-2 py-1 rounded-lg text-[11px]"
              style={{ background: 'var(--red-bg)', color: 'var(--red-dark)', fontWeight: 600, minHeight: 44 }}
            >
              +10d
            </button>
          </Row>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px]" style={{ fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      <div className="flex items-center gap-1.5 flex-wrap">{children}</div>
    </div>
  );
}

function ToggleBtn({ active, onClick, label, color }: { active: boolean; onClick: () => void; label: string; color: string }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 rounded-lg text-[11px]"
      style={{
        background: active ? color : 'var(--gray-100)',
        color: active ? 'var(--white)' : 'var(--gray-500)',
        fontWeight: 600,
        minHeight: 36,
      }}
    >
      {label}
    </button>
  );
}
