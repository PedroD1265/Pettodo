import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { PlayDateCard } from '../../components/pettodo/Cards';
import { ChatView } from '../../components/pettodo/Chat';
import { ReportSuspiciousModal } from '../../components/pettodo/Modals';
import { useNavigate } from 'react-router';
import { LUNA } from '../../data/demoData';
import { Filter, Plus, Shield, MapPin, Calendar, Clock, CheckCircle, AlertTriangle, Flag, Send, Star, Phone } from 'lucide-react';
import { toast } from 'sonner';

// PD_01
export function PD_01() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="PD_01_PlayDateHome_FiltersSafetyTips" />
      <AppBar title="Play Dates" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 44 }}>
            <span className="text-[14px]" style={{ color: 'var(--gray-400)' }}>Search play dates...</span>
          </div>
          <button className="p-2 rounded-xl" style={{ background: 'var(--gray-100)', minWidth: 44, minHeight: 44 }}>
            <Filter size={18} style={{ color: 'var(--gray-500)' }} />
          </button>
        </div>

        <Banner type="info">
          <span className="text-[12px]"><Shield size={12} className="inline mr-1" />Safety tips: Always meet in public places. Ensure dogs are up to date on vaccinations.</span>
        </Banner>

        <PlayDateCard title="Park play session — Small dogs" participants={4} location="Central Park Dog Run" onClick={() => nav('/playdates/detail')} />
        <PlayDateCard title="Weekend beach play" participants={6} location="Riverside Dog Beach" onClick={() => nav('/playdates/detail')} />
        <PlayDateCard title="Training & socialization" participants={3} location="Community Center Yard" onClick={() => nav('/playdates/detail')} />

        <Btn variant="daily" fullWidth onClick={() => nav('/playdates/create')} icon={<Plus size={16} />}>
          Create Play Date
        </Btn>
        <Btn variant="secondary" fullWidth onClick={() => nav('/playdates/compatibility')}>
          Dog Compatibility Profile
        </Btn>
      </div>
    </div>
  );
}

// PD_02
export function PD_02() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="PD_02_DogCompatibilityProfile" />
      <AppBar title="Compatibility Profile" showBack backTo="/playdates/home" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
            <span className="text-2xl">🐕</span>
          </div>
          <div>
            <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{LUNA.name}'s compatibility</h3>
            <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{LUNA.breed}</p>
          </div>
        </div>

        {[
          { label: 'Energy level', value: 'High', bar: 80, color: 'var(--warning)' },
          { label: 'Sociability', value: 'Very friendly', bar: 90, color: 'var(--green-primary)' },
          { label: 'Size preference', value: 'Medium–Large', bar: 60, color: 'var(--info)' },
          { label: 'Training level', value: 'Good recall', bar: 70, color: 'var(--green-primary)' },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px]" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>{item.label}</span>
              <span className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{item.value}</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: 'var(--gray-200)' }}>
              <div className="h-full rounded-full" style={{ width: `${item.bar}%`, background: item.color }} />
            </div>
          </div>
        ))}

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[13px]" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Notes</p>
          <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>
            Luna does well with dogs her size or larger. Can be excited at first but settles quickly. Good recall.
          </p>
        </div>
      </div>
    </div>
  );
}

// PD_03
export function PD_03() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="PD_03_CreatePlayDate_PublicPlace" />
      <AppBar title="Create Play Date" showBack backTo="/playdates/home" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Title</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="e.g., Weekend park play" />
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Location (public places only)</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="e.g., Central Park Dog Run" />
          <p className="text-[11px] mt-1" style={{ color: 'var(--gray-400)' }}>Only public locations are allowed for safety.</p>
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Date & Time</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="Select date and time" />
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Max participants</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="e.g., 6" />
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Size requirements</label>
          <div className="flex gap-2">
            {['Small', 'Medium', 'Large', 'Any'].map((s) => (
              <button key={s} className="flex-1 py-2 rounded-xl text-[13px]" style={{ background: s === 'Any' ? 'var(--green-primary)' : 'var(--gray-100)', color: s === 'Any' ? 'var(--white)' : 'var(--gray-700)', minHeight: 44 }}>{s}</button>
            ))}
          </div>
        </div>

        <Banner type="info" text="Play dates must be in public places for everyone's safety." />

        <Btn variant="daily" fullWidth onClick={() => nav('/playdates/approval')}>Create Play Date</Btn>
      </div>
    </div>
  );
}

// PD_04
export function PD_04() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="PD_04_ApprovalQueue" />
      <AppBar title="Join Requests" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Pending requests</h3>
        {[
          { owner: 'Maria G.', dog: 'Coco', size: 'Small', energy: 'Medium' },
          { owner: 'James T.', dog: 'Rocky', size: 'Large', energy: 'High' },
        ].map((r, i) => (
          <div key={i} className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{r.owner}</span>
                <span className="text-[12px]" style={{ color: 'var(--gray-500)' }}>with {r.dog}</span>
              </div>
            </div>
            <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>{r.size} · {r.energy} energy</p>
            <div className="flex gap-2 mt-2">
              <Btn variant="daily" className="flex-1" onClick={() => nav('/playdates/detail')}>Approve</Btn>
              <Btn variant="ghost" className="flex-1">Decline</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// PD_05
export function PD_05() {
  const nav = useNavigate();
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const handleCalendar = (type: 'google' | 'ics') => {
    if (type === 'google') {
      window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent('Park play session') + '&location=' + encodeURIComponent('Central Park Dog Run'), '_blank');
    } else {
      toast.success('Downloaded .ics file (simulated)');
    }
    setShowCalendarModal(false);
  };

  return (
    <div className="flex flex-col min-h-full relative">
      <ScreenLabel name="PD_05_PlayDateDetail_RulesChecklist" />
      <AppBar title="Play Date Detail" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h2 className="text-[20px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Park play session — Small dogs</h2>
        <div className="flex items-center gap-2">
          <Calendar size={14} style={{ color: 'var(--gray-400)' }} />
          <span className="text-[13px]" style={{ color: 'var(--gray-700)' }}>Saturday, Feb 22, 2026 — 3:00 PM</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} style={{ color: 'var(--gray-400)' }} />
          <span className="text-[13px]" style={{ color: 'var(--gray-700)' }}>Central Park Dog Run</span>
        </div>

        <h4 className="text-[14px] mt-2" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Safety checklist</h4>
        {[
          'All dogs must be up to date on vaccinations',
          'Meet in a public, fenced area',
          'Each owner is responsible for their dog',
          'Report any incidents immediately',
          'No aggressive dogs allowed',
        ].map((rule, i) => (
          <div key={i} className="flex items-center gap-2 py-1">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'var(--green-primary)' }}>
              <CheckCircle size={12} style={{ color: 'var(--white)' }} />
            </div>
            <span className="text-[13px]" style={{ color: 'var(--gray-700)' }}>{rule}</span>
          </div>
        ))}

        <h4 className="text-[14px] mt-2" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Participants (4)</h4>
        {['Luna (You)', 'Coco (Maria G.)', 'Bella (Emily K.)', 'Charlie (Sofia L.)'].map((p) => (
          <div key={p} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 44 }}>
            <span className="text-[14px]">🐕</span>
            <span className="text-[13px]" style={{ color: 'var(--gray-900)' }}>{p}</span>
          </div>
        ))}

        <div className="flex gap-2 mt-auto">
          <Btn variant="daily" className="flex-1" onClick={() => nav('/playdates/chat')}>Group Chat</Btn>
          <Btn variant="secondary" icon={<Calendar size={16} />} onClick={() => setShowCalendarModal(true)}>Calendar</Btn>
        </div>
      </div>

      {showCalendarModal && (
        <div className="absolute inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full bg-white rounded-t-2xl p-4 flex flex-col gap-4 animate-in slide-in-from-bottom duration-300">
             <h3 className="text-[17px] font-semibold text-center">Add to Calendar</h3>
             <Btn variant="secondary" fullWidth onClick={() => handleCalendar('google')}>Google Calendar</Btn>
             <Btn variant="secondary" fullWidth onClick={() => handleCalendar('ics')}>Download .ics File</Btn>
             <Btn variant="ghost" fullWidth onClick={() => setShowCalendarModal(false)}>Cancel</Btn>
             <p className="text-[11px] text-center text-gray-400">Calendar integration is simulated in this prototype.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// PD_06
export function PD_06() {
  const nav = useNavigate();
  const [showReport, setShowReport] = useState(false);
  const msgs = [
    { id: 1, sender: 'system' as const, text: 'Play date group chat. Please respect all participants. Report suspicious behavior.' },
    { id: 2, sender: 'other' as const, text: 'Looking forward to Saturday! Coco loves small dogs.' },
    { id: 3, sender: 'me' as const, text: 'Luna is excited! See you all at 3 PM.' },
    { id: 4, sender: 'other' as const, text: 'Reminder: the dog run closes at 6 PM.' },
  ];
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="PD_06_PlayDateChat_SafetyBanner" />
      <div className="flex items-center justify-between px-4 py-2" style={{ background: 'var(--green-bg)', borderBottom: '1px solid var(--green-soft)' }}>
        <button onClick={() => nav(-1)} className="text-[14px]" style={{ color: 'var(--green-primary)', minHeight: 44 }}>← Back</button>
        <span className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Play Date Chat</span>
        <button onClick={() => setShowReport(true)} style={{ color: 'var(--red-primary)', minHeight: 44, minWidth: 44 }}>
          <Flag size={16} />
        </button>
      </div>
      <Banner type="info" text="This is a group chat. Be respectful. Report suspicious behavior." />
      <ChatView messages={msgs} />
      <div className="px-4 pb-2">
        <button className="text-[12px] flex items-center gap-1" style={{ color: 'var(--red-primary)', minHeight: 44, fontWeight: 500 }} onClick={() => setShowReport(true)}>
          <Flag size={12} /> Report suspicious behavior
        </button>
      </div>
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderTop: '1px solid var(--gray-200)' }}>
        <div className="flex-1 px-3 py-2 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 44 }}>
          <span className="text-[14px]" style={{ color: 'var(--gray-400)' }}>Type a message...</span>
        </div>
        <button className="p-2" style={{ minWidth: 44, minHeight: 44, color: 'var(--green-primary)' }}>
          <Send size={20} />
        </button>
      </div>
      <ReportSuspiciousModal open={showReport} onClose={() => setShowReport(false)} />
    </div>
  );
}

// PD_07
export function PD_07() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="PD_07_PlayDateIncident_BlockReputation" />
      <AppBar title="Report Incident" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <Banner type="antiscam" text="Incidents affect participant reputation. Please report accurately." />

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>What happened?</label>
          {['Dog aggression', 'Owner dispute', 'Dog injury', 'No-show', 'Other'].map((r) => (
            <button key={r} className="w-full text-left px-3 py-2.5 rounded-xl mb-1 text-[14px]" style={{ background: 'var(--gray-100)', minHeight: 44, color: 'var(--gray-700)' }}>
              {r}
            </button>
          ))}
        </div>

        <textarea className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 72 }} placeholder="Describe what happened..." />

        <div className="flex gap-2">
          <Btn variant="destructive" className="flex-1">Block User</Btn>
          <Btn variant="secondary" className="flex-1">Report Only</Btn>
        </div>

        <Btn variant="destructive" fullWidth onClick={() => nav('/playdates/home')}>Submit Incident Report</Btn>
      </div>
    </div>
  );
}

// PD_08
export function PD_08() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="PD_08_PlayDateParticipation_SMSorEscalation" />
      <AppBar title="Participation" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Confirm participation</h3>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
          To join play dates, verify your identity with SMS or upgrade to Strict verification.
        </p>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <div className="flex items-center gap-2">
            <Phone size={16} style={{ color: 'var(--info)' }} />
            <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>SMS Verification</span>
          </div>
          <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>Basic participation in public play dates.</p>
          <Btn variant="primary" fullWidth className="mt-2">Verify via SMS</Btn>
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
          <div className="flex items-center gap-2">
            <Shield size={16} style={{ color: 'var(--warning)' }} />
            <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Strict Verification (Recommended)</span>
          </div>
          <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>
            This action requires Strict verification (ID + Selfie). Unlocks all features and higher trust.
          </p>
          <Btn variant="secondary" fullWidth className="mt-2">Start Strict Verification</Btn>
        </div>
      </div>
    </div>
  );
}
