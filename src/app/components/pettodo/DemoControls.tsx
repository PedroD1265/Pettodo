import React from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, X, Plus, Minus, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { appConfig } from '../../config/appConfig';
import { resetRateLimit } from '../../utils/rateLimit';
import { makeInboundMessage } from '../../services/demo/chatDemo';
import { generateId } from '../../data/storage';

export function DemoControlsFab() {
  return null;
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
    addSighting, addNotification, addChatMessage, resetStore, store,
  } = useApp();

  if (!showDemoControls) return null;

  const isDemo = appConfig.mode === 'demo';

  const handleSimulateSighting = () => {
    const sighting = addSighting({
      caseId: 'CASE-2026-0219',
      lat: 40.7760 + (Math.random() - 0.5) * 0.002,
      lng: -73.9710 + (Math.random() - 0.5) * 0.002,
      location: '0.2 km NW (simulated)',
      time: 'Just now',
      note: '[SIMULATED] Dog spotted near the fountain, running east.',
    });
    addNotification({
      title: 'New Sighting Reported',
      body: `A sighting was added near Luna's case. Location: ${sighting.location}`,
      type: 'sighting',
      linkTo: '/emg/map-layers',
    });
    toast('Sighting simulated — check the map!');
  };

  const handleSimulateMatch = () => {
    const existingCases = store.cases.filter(c => c.type !== 'lost');
    if (existingCases.length === 0) {
      toast.error('No found/sighted cases available to simulate match.');
      return;
    }
    addNotification({
      title: 'AI Match Found — 94% confidence',
      body: 'A high-confidence match was found for Luna (CASE-2026-0219). Tap to review.',
      type: 'match',
      linkTo: '/emg/matching-top10',
    });
    toast('AI Match simulated — check notifications!');
  };

  const handleSimulateChat = () => {
    const inbound = makeInboundMessage('thread-luna-001', 'CASE-2026-0219');
    addChatMessage({
      threadId: inbound.threadId,
      caseId: inbound.caseId,
      text: inbound.text,
      sender: 'other',
    });
    addNotification({
      title: 'New message from Finder',
      body: inbound.text,
      type: 'chat',
      linkTo: '/emg/chat',
    });
    toast('Chat message simulated — check EMG_23!');
  };

  const handleSimulatePush = () => {
    const messages = [
      'Luna may have been spotted near Columbus Circle.',
      'Community alert: lost dog search in your area.',
      'Reminder: update your pet profile for faster matching.',
    ];
    const body = messages[Math.floor(Math.random() * messages.length)];
    addNotification({
      title: 'Push Alert (Simulated)',
      body,
      type: 'push',
      linkTo: '/home-notifications',
    });
    toast('Push Alert', { description: body, duration: 5000 });
  };

  const handleResetDemo = () => {
    resetStore();
    resetRateLimit();
    toast('Demo reset — store, rate limit, and notifications cleared.');
    setShowDemoControls(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="w-full max-w-[390px] rounded-t-2xl p-4 pb-6" style={{ background: 'var(--white)', maxHeight: '80vh', overflowY: 'auto' }}>
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

          {/* Simulator section */}
          <div className="mt-1 pt-3" style={{ borderTop: '1px solid var(--gray-200)' }}>
            <div className="flex items-center gap-1.5 mb-2">
              <Zap size={13} style={{ color: isDemo ? 'var(--green-primary)' : 'var(--gray-400)' }} />
              <span className="text-[11px]" style={{ fontWeight: 700, color: isDemo ? 'var(--gray-700)' : 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Simulator {!isDemo && '(DEMO mode only)'}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <SimBtn disabled={!isDemo} onClick={handleSimulateSighting} label="Simulate New Sighting" />
              <SimBtn disabled={!isDemo} onClick={handleSimulateMatch} label="Simulate AI Match" />
              <SimBtn disabled={!isDemo} onClick={handleSimulateChat} label="Simulate Chat Message" />
              <SimBtn disabled={!isDemo} onClick={handleSimulatePush} label="Simulate Push Alert" />
              <button
                disabled={!isDemo}
                onClick={handleResetDemo}
                className="w-full py-2 rounded-xl text-[12px]"
                style={{
                  background: isDemo ? 'var(--red-bg)' : 'var(--gray-100)',
                  color: isDemo ? 'var(--red-dark)' : 'var(--gray-400)',
                  fontWeight: 700,
                  minHeight: 44,
                  border: '1px solid var(--red-soft, var(--gray-200))',
                }}
              >
                Reset Demo
              </button>
            </div>
          </div>
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

function SimBtn({ disabled, onClick, label }: { disabled: boolean; onClick: () => void; label: string }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full py-2 rounded-xl text-[12px]"
      style={{
        background: disabled ? 'var(--gray-100)' : 'var(--green-bg)',
        color: disabled ? 'var(--gray-400)' : 'var(--green-dark)',
        fontWeight: 600,
        minHeight: 44,
        border: `1px solid ${disabled ? 'var(--gray-200)' : 'var(--green-soft)'}`,
      }}
    >
      {label}
    </button>
  );
}
