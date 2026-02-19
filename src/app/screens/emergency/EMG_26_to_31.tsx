import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { SafePointCard } from '../../components/pettodo/Cards';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { MapPlaceholder } from '../../components/pettodo/MapComponents';
import { TimelineView } from '../../components/pettodo/Timeline';
import { useNavigate } from 'react-router';
import { SAFE_POINT, LOST_CASE, LUNA } from '../../data/demoData';
import { CheckCircle, Calendar, Clock, AlertTriangle, Shield, MapPin, Star } from 'lucide-react';

// EMG_26
export function EMG_26() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_26_SafePoint_Select" />
      <AppBar title="Select Safe Point" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Choose a safe handoff location</h3>
        <Banner type="antiscam" text="Handoff only at a safe point" />

        <MapPlaceholder height={160} />

        <div className="flex flex-col gap-2">
          <SafePointCard name={SAFE_POINT.name} hours={SAFE_POINT.hours} distance={SAFE_POINT.distance} trusted onClick={() => nav('/emg/safe-delivery-schedule')} />
          <SafePointCard name="Downtown Pet Clinic" hours="Open 9 AM – 6 PM" distance="1.2 km away" onClick={() => nav('/emg/safe-delivery-schedule')} />
          <SafePointCard name="City Animal Shelter" hours="Open 7 AM – 9 PM" distance="2.5 km away" trusted onClick={() => nav('/emg/safe-delivery-schedule')} />
        </div>
      </div>
    </div>
  );
}

// EMG_27
export function EMG_27() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_27_SafeDelivery_Schedule" />
      <AppBar title="Schedule Handoff" showBack backTo="/emg/safe-point-select" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <span className="text-2xl">🏥</span>
          <div>
            <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>{SAFE_POINT.name}</p>
            <p className="text-[12px]" style={{ color: 'var(--green-dark)' }}>{SAFE_POINT.hours} · {SAFE_POINT.distance}</p>
          </div>
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Select date</label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
            <Calendar size={16} style={{ color: 'var(--gray-400)' }} />
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>Tomorrow — February 20, 2026</span>
          </div>
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Select time</label>
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
            <Clock size={16} style={{ color: 'var(--gray-400)' }} />
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>10:00 AM</span>
          </div>
        </div>

        {/* Safe point unavailable fallback */}
        <div className="p-3 rounded-xl" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={14} style={{ color: 'var(--warning)' }} />
            <span className="text-[12px]" style={{ fontWeight: 600, color: 'var(--warning)' }}>Safe point unavailable?</span>
          </div>
          <p className="text-[11px]" style={{ color: '#92400E' }}>
            If the safe point is closed or unavailable, you can choose a new trusted location or reschedule.
          </p>
          <div className="flex gap-2 mt-2">
            <button className="px-3 py-1.5 rounded-lg text-[11px]" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', minHeight: 44, fontWeight: 500 }}>
              Choose new location
            </button>
            <button className="px-3 py-1.5 rounded-lg text-[11px]" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', minHeight: 44, fontWeight: 500 }}>
              Reschedule
            </button>
          </div>
        </div>

        <div className="mt-auto pb-4">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/safe-delivery-rules')}>
            Confirm Schedule
          </Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_28
export function EMG_28() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_28_SafeDelivery_ConfirmRules" />
      <AppBar title="Handoff Rules" showBack backTo="/emg/safe-delivery-schedule" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Safety rules for handoff</h3>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Please read and accept before proceeding.</p>

        <div className="flex flex-col gap-3">
          {[
            { icon: <MapPin size={18} />, text: 'Handoff only at a safe point' },
            { icon: <Shield size={18} />, text: 'Do not share your address' },
            { icon: <Star size={18} />, text: 'Reward only after the handoff' },
            { icon: <AlertTriangle size={18} />, text: 'No upfront payments or deposits' },
          ].map((rule, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
              <span style={{ color: 'var(--red-primary)' }}>{rule.icon}</span>
              <span className="text-[14px]" style={{ color: 'var(--gray-900)', fontWeight: 500 }}>{rule.text}</span>
            </div>
          ))}
        </div>

        <Banner type="noPayments" text="PETTODO does not process payments" />

        <div className="mt-auto pb-4 flex flex-col gap-2">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/safe-delivery-checkin')}>
            I Accept — Confirm Handoff
          </Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav(-1)}>Go Back</Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_29
export function EMG_29() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_29_SafeDelivery_CheckIn" />
      <AppBar title="Check In" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="text-center">
          <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Handoff at {SAFE_POINT.name}</h3>
          <p className="text-[13px] mt-1" style={{ color: 'var(--gray-500)' }}>Tomorrow — Feb 20, 2026 at 10:00 AM</p>
        </div>

        <MapPlaceholder height={140} />

        <div className="p-3 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Status: Scheduled</p>
          <p className="text-[12px] mt-0.5" style={{ color: 'var(--green-dark)' }}>Both parties have confirmed.</p>
        </div>

        {/* Safe point unavailable fallback */}
        <div className="p-3 rounded-xl" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
          <p className="text-[12px]" style={{ fontWeight: 600, color: 'var(--warning)' }}>Safe point unavailable?</p>
          <p className="text-[11px] mt-0.5" style={{ color: '#92400E' }}>
            Safe point unavailable. Choose a new trusted location.
          </p>
          <div className="flex gap-2 mt-2">
            <Btn variant="secondary" className="flex-1">Reschedule</Btn>
            <Btn variant="secondary" className="flex-1">No-show report</Btn>
          </div>
        </div>

        <div className="mt-auto pb-4 flex flex-col gap-2">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/case-resolved')}>
            <CheckCircle size={18} /> Confirm Handoff Complete
          </Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_30
export function EMG_30() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_30_CaseResolved_CloseFlow" />
      <AppBar title="Case Resolved" showBack={false} showBell={false} />
      <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
          <CheckCircle size={48} style={{ color: 'var(--green-primary)' }} />
        </div>
        <h2 className="text-[22px] text-center" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Luna is home! 🎉</h2>
        <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
          Case {LOST_CASE.id} has been resolved. Thank you to everyone who helped.
        </p>

        <div className="w-full p-3 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <p className="text-[12px]" style={{ color: 'var(--green-dark)' }}>
            <strong>Duration:</strong> 18 hours · <strong>Sightings:</strong> {LOST_CASE.sightings} · <strong>Community helpers:</strong> {LOST_CASE.followers}
          </p>
        </div>

        <div className="w-full flex flex-col gap-2 mt-4">
          <Btn variant="daily" fullWidth onClick={() => nav('/home-daily')}>Return to Home</Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/emg/case-lifecycle')}>View Case Timeline</Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_31
export function EMG_31() {
  const nav = useNavigate();
  const entries = [
    { label: 'Case created', date: 'Feb 19, 2026 — 6:45 PM', status: 'completed' as const },
    { label: 'Report published', date: 'Feb 19, 2026 — 6:46 PM', status: 'completed' as const, detail: 'Flyer shared 12 times' },
    { label: 'First sighting reported', date: 'Feb 19, 2026 — 7:10 PM', status: 'completed' as const },
    { label: 'AI match found (87%)', date: 'Feb 19, 2026 — 7:30 PM', status: 'completed' as const, detail: 'Possible match (AI doesn\'t confirm)' },
    { label: 'Chat started with finder', date: 'Feb 19, 2026 — 8:00 PM', status: 'completed' as const },
    { label: 'Proof of life received', date: 'Feb 19, 2026 — 8:15 PM', status: 'completed' as const },
    { label: 'Safe handoff scheduled', date: 'Feb 20, 2026 — 10:00 AM', status: 'completed' as const, detail: SAFE_POINT.name },
    { label: 'Handoff completed', date: 'Feb 20, 2026 — 10:20 AM', status: 'completed' as const },
    { label: 'Case resolved', date: 'Feb 20, 2026 — 10:25 AM', status: 'active' as const },
    { label: 'Case auto-closes', date: 'Mar 21, 2026 (30 days)', status: 'pending' as const, detail: '10-day match window · 30-day case window' },
  ];

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_31_CaseLifecycle_Statuses" />
      <AppBar title="Case Lifecycle" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Case {LOST_CASE.id} — Timeline</h3>
        <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>10-day match window · 30-day case lifecycle</p>
        <TimelineView entries={entries} />
      </div>
    </div>
  );
}
