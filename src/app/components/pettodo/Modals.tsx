import React, { useState } from 'react';
import { X, AlertTriangle, Flag } from 'lucide-react';
import { Btn } from './Buttons';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="w-full max-w-[390px] rounded-t-3xl p-5 pb-8 animate-in slide-in-from-bottom" style={{ background: 'var(--white)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{title}</h3>
          <button onClick={onClose} className="p-2" style={{ minWidth: 44, minHeight: 44 }}>
            <X size={20} style={{ color: 'var(--gray-500)' }} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ReportSuspiciousModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [reason, setReason] = useState('');
  const reasons = ['Asking for payment upfront', 'Sharing suspicious links', 'Impersonating owner', 'Threatening behavior', 'Other'];
  return (
    <Modal open={open} onClose={onClose} title="Report suspicious behavior">
      <div className="flex flex-col gap-3">
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Select a reason for your report:</p>
        {reasons.map((r) => (
          <button
            key={r}
            onClick={() => setReason(r)}
            className="text-left px-3 py-2.5 rounded-xl text-[14px] transition-all"
            style={{
              background: reason === r ? 'var(--red-bg)' : 'var(--gray-100)',
              color: reason === r ? 'var(--red-dark)' : 'var(--gray-700)',
              border: reason === r ? '1px solid var(--red-soft)' : '1px solid transparent',
              fontWeight: reason === r ? 600 : 400,
              minHeight: 44,
            }}
          >
            {r}
          </button>
        ))}
        <textarea
          placeholder="Additional details (optional)"
          className="w-full px-3 py-2 rounded-xl text-[14px]"
          style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)', minHeight: 72 }}
        />
        <Btn variant="destructive" fullWidth onClick={onClose}>Submit Report</Btn>
      </div>
    </Modal>
  );
}

export function VerificationEscalationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Verification Required">
      <div className="flex flex-col gap-4 items-center text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--warning-bg)' }}>
          <AlertTriangle size={28} style={{ color: 'var(--warning)' }} />
        </div>
        <p className="text-[14px]" style={{ color: 'var(--gray-700)' }}>
          This action requires Strict verification (ID + Selfie).
        </p>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
          Strict verification helps keep the community safe. It takes about 2 minutes.
        </p>
        <Btn variant="primary" fullWidth onClick={onClose}>Start Verification</Btn>
        <Btn variant="ghost" onClick={onClose}>Maybe later</Btn>
      </div>
    </Modal>
  );
}

export function ProofOfLifeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Request proof of life">
      <div className="flex flex-col gap-4">
        <p className="text-[14px]" style={{ color: 'var(--gray-700)' }}>
          Ask the finder to take a <strong>live photo or video</strong> of the dog. This helps verify the dog is safe before arranging a meeting.
        </p>
        <div className="p-3 rounded-xl" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
          <p className="text-[12px]" style={{ color: 'var(--warning)', fontWeight: 500 }}>
            Only live captures are accepted — gallery photos are not allowed for proof of life.
          </p>
        </div>
        <Btn variant="primary" fullWidth onClick={onClose}>Send Proof of Life Request</Btn>
      </div>
    </Modal>
  );
}

export function RewardRulesModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Reward Rules">
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-2">
          <span className="text-[14px]">1.</span>
          <p className="text-[14px]" style={{ color: 'var(--gray-700)' }}>Reward only after the handoff</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-[14px]">2.</span>
          <p className="text-[14px]" style={{ color: 'var(--gray-700)' }}>No upfront payments or deposits</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-[14px]">3.</span>
          <p className="text-[14px]" style={{ color: 'var(--gray-700)' }}>Handoff only at a safe point</p>
        </div>
        <div className="p-3 rounded-xl" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
          <p className="text-[13px]" style={{ color: 'var(--warning)', fontWeight: 500 }}>
            PETTODO does not process payments
          </p>
        </div>
        <Btn variant="primary" fullWidth onClick={onClose}>I Understand</Btn>
      </div>
    </Modal>
  );
}