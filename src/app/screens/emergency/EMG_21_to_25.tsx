import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { MapPlaceholder } from '../../components/pettodo/MapComponents';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { FreshnessBadge } from '../../components/pettodo/Badges';
import { ChatView } from '../../components/pettodo/Chat';
import { Modal, ReportSuspiciousModal, ProofOfLifeModal } from '../../components/pettodo/Modals';
import { useNavigate } from 'react-router';
import { CHAT_MESSAGES, LOST_CASE } from '../../data/demoData';
import { Flag, Send, Camera, Video, Shield } from 'lucide-react';

// EMG_21
export function EMG_21() {
  const nav = useNavigate();
  const [period, setPeriod] = useState('24h');
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_21_Heatmap_ByCase_24h7d30d" />
      <AppBar title="Search Heatmap" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Sighting heatmap — Luna</h3>
        <FreshnessBadge text="Last updated 12 min ago" />

        <div className="flex gap-2">
          {['24h', '7d', '30d'].map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className="flex-1 py-2 rounded-xl text-[13px]" style={{
              background: period === p ? 'var(--red-primary)' : 'var(--gray-100)',
              color: period === p ? 'var(--white)' : 'var(--gray-700)',
              fontWeight: 600, minHeight: 44,
            }}>{p}</button>
          ))}
        </div>

        <div className="relative">
          <MapPlaceholder height={260} />
          {/* Zone labels */}
          <div className="absolute top-1/4 left-1/3 px-2 py-0.5 rounded text-[10px]" style={{ background: 'rgba(220,38,38,0.8)', color: 'var(--white)', fontWeight: 700 }}>Zone A</div>
          <div className="absolute top-1/2 right-1/4 px-2 py-0.5 rounded text-[10px]" style={{ background: 'rgba(220,38,38,0.5)', color: 'var(--white)', fontWeight: 700 }}>Zone B</div>
          <div className="absolute bottom-1/4 left-1/4 px-2 py-0.5 rounded text-[10px]" style={{ background: 'rgba(220,38,38,0.3)', color: 'var(--white)', fontWeight: 700 }}>Zone C</div>
        </div>

        <div className="flex flex-col gap-1.5 p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Probable zones</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: 'rgba(220,38,38,0.8)' }} />
            <span className="text-[11px]" style={{ color: 'var(--gray-700)' }}>Zone A — Most sightings (near Bethesda Fountain)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: 'rgba(220,38,38,0.5)' }} />
            <span className="text-[11px]" style={{ color: 'var(--gray-700)' }}>Zone B — Moderate (West 72nd St area)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: 'rgba(220,38,38,0.3)' }} />
            <span className="text-[11px]" style={{ color: 'var(--gray-700)' }}>Zone C — Few sightings (Bow Bridge)</span>
          </div>
        </div>

        <Btn variant="secondary" fullWidth onClick={() => nav('/emg/quadrants')}>
          View Search Quadrants
        </Btn>
      </div>
    </div>
  );
}

// EMG_22
export function EMG_22() {
  const nav = useNavigate();
  const quadrants = [
    { id: 'Q1', area: 'NE — Bethesda Fountain', person: 'Sarah M.', status: 'Searching' },
    { id: 'Q2', area: 'NW — West 72nd St', person: 'Mike R.', status: 'Assigned' },
    { id: 'Q3', area: 'SE — Bow Bridge', person: null, status: 'Unassigned' },
    { id: 'Q4', area: 'SW — Strawberry Fields', person: 'Emily K.', status: 'Completed' },
  ];
  const statusColors: Record<string, { bg: string; color: string }> = {
    Searching: { bg: 'var(--warning-bg)', color: 'var(--warning)' },
    Assigned: { bg: 'var(--info-bg)', color: 'var(--info)' },
    Unassigned: { bg: 'var(--gray-100)', color: 'var(--gray-500)' },
    Completed: { bg: 'var(--green-bg)', color: 'var(--green-primary)' },
  };

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_22_Quadrants_AssignmentStates" />
      <AppBar title="Search Quadrants" showBack backTo="/emg/heatmap" />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Search area assignments</h3>
        <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Coordinate searches across the area. Assign family, neighbors, or volunteers.</p>

        <MapPlaceholder height={160} />

        <div className="flex flex-col gap-2">
          {quadrants.map((q) => {
            const sc = statusColors[q.status];
            return (
              <div key={q.id} className="p-3 rounded-xl" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{q.id}: {q.area}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: sc.bg, color: sc.color, fontWeight: 600 }}>{q.status}</span>
                </div>
                <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
                  {q.person ? `Assigned to: ${q.person}` : 'Not assigned — tap to assign'}
                </p>
              </div>
            );
          })}
        </div>

        <Btn variant="secondary" fullWidth>
          Assign Volunteer to Q3
        </Btn>
      </div>
    </div>
  );
}

// EMG_23
export function EMG_23() {
  const nav = useNavigate();
  const [showReport, setShowReport] = useState(false);
  const [showProof, setShowProof] = useState(false);
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_23_Chat_Safe_AntiscamBanner" />
      {/* Chat header */}
      <div className="flex items-center justify-between px-4 py-2" style={{ background: 'var(--red-bg)', borderBottom: '1px solid var(--red-soft)' }}>
        <button onClick={() => nav(-1)} className="text-[14px]" style={{ color: 'var(--red-primary)', minHeight: 44, minWidth: 44 }}>← Back</button>
        <span className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Chat — Case</span>
        <button onClick={() => setShowReport(true)} className="flex items-center gap-1" style={{ color: 'var(--red-primary)', minHeight: 44, minWidth: 44 }}>
          <Flag size={16} />
        </button>
      </div>

      <Banner type="antiscam">
        <div className="flex flex-col gap-0.5">
          <span>Do not share your address</span>
          <span className="text-[11px]" style={{ opacity: 0.8 }}>Handoff only at a safe point · No upfront payments or deposits</span>
        </div>
      </Banner>

      <ChatView messages={CHAT_MESSAGES} />

      {/* Action bar */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderTop: '1px solid var(--gray-200)' }}>
        <button onClick={() => { setShowProof(true); }} className="p-2" style={{ minWidth: 44, minHeight: 44, color: 'var(--gray-500)' }}>
          <Shield size={20} />
        </button>
        <div className="flex-1 px-3 py-2 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 44 }}>
          <span className="text-[14px]" style={{ color: 'var(--gray-400)' }}>Type a message...</span>
        </div>
        <button className="p-2" style={{ minWidth: 44, minHeight: 44, color: 'var(--red-primary)' }}>
          <Send size={20} />
        </button>
      </div>

      <div className="px-4 pb-3 flex gap-2">
        <Btn variant="secondary" className="flex-1" onClick={() => setShowProof(true)}>Request proof of life</Btn>
        <Btn variant="emergency" className="flex-1" onClick={() => nav('/emg/proof-modal')}>
          Safe Handoff
        </Btn>
      </div>

      <ReportSuspiciousModal open={showReport} onClose={() => setShowReport(false)} />
      <ProofOfLifeModal open={showProof} onClose={() => setShowProof(false)} />
    </div>
  );
}

// EMG_24
export function EMG_24() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_24_ProofOfLife_Modal" />
      <AppBar title="Proof of Life" showBack backTo="/emg/chat" />
      <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'var(--green-bg)' }}>
          <Camera size={36} style={{ color: 'var(--green-primary)' }} />
        </div>
        <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Request proof of life</h3>
        <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
          Ask the finder to take a live photo or video to verify the dog is safe before meeting.
        </p>
        <Banner type="warning" text="Only live captures accepted — gallery photos are not allowed." />
        <div className="w-full flex flex-col gap-2">
          <Btn variant="primary" fullWidth onClick={() => nav('/emg/proof-capture')} icon={<Camera size={18} />}>
            Send Photo Request
          </Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/emg/proof-capture')} icon={<Video size={18} />}>
            Send Video Request
          </Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/emg/safe-point-select')}>
            Skip — Arrange Handoff
          </Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_25
export function EMG_25() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_25_ProofOfLife_LiveCapture" />
      <AppBar title="Live Capture" showBack backTo="/emg/proof-modal" />
      <div className="flex-1 flex flex-col">
        {/* Simulated camera view */}
        <div className="flex-1 flex items-center justify-center relative" style={{ background: 'var(--gray-950)' }}>
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full" style={{ background: 'rgba(220,38,38,0.9)' }}>
            <span className="text-[12px]" style={{ color: 'var(--white)', fontWeight: 600 }}>● LIVE</span>
          </div>
          <div className="w-48 h-48 rounded-2xl border-2 border-dashed flex items-center justify-center" style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
            <span className="text-[14px] text-center" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Position the dog<br />in the frame
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[11px] text-center mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Live capture only — gallery uploads not accepted for proof of life
            </p>
            <div className="flex items-center justify-center gap-8">
              <button className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--white)' }}>
                <Camera size={24} style={{ color: 'var(--gray-900)' }} />
              </button>
              <button onClick={() => nav('/emg/safe-point-select')} className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--red-primary)' }}>
                <Video size={24} style={{ color: 'var(--white)' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
