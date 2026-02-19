import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { MapPlaceholder, MapLegend } from '../../components/pettodo/MapComponents';
import { CaseCard, MatchCard } from '../../components/pettodo/Cards';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { StatusChip, FreshnessBadge, ConfidenceBadge, MatchReasonTag, DirectionChip } from '../../components/pettodo/Badges';
import { useNavigate } from 'react-router';
import { Layers, Filter, MapPin, Camera, Clock, MessageSquare, Flag, AlertTriangle, Eye } from 'lucide-react';
import { LOST_CASE, MATCHES, LUNA } from '../../data/demoData';

// EMG_14
export function EMG_14() {
  const nav = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_14_Map_LayersFilters" />
      <AppBar title="Search Map" showBack backTo="/home-emergency" />
      <div className="flex-1 flex flex-col">
        {/* Filters */}
        <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto">
          {['All', 'Lost', 'Found', 'Sighted', 'Safe Points'].map((f) => (
            <button key={f} className="px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap" style={{
              background: activeFilter === f.toLowerCase() ? 'var(--red-primary)' : 'var(--gray-100)',
              color: activeFilter === f.toLowerCase() ? 'var(--white)' : 'var(--gray-700)',
              fontWeight: 500, minHeight: 44,
            }} onClick={() => setActiveFilter(f.toLowerCase())}>{f}</button>
          ))}
        </div>

        <div className="flex-1 relative px-4 pb-4">
          <MapPlaceholder height={340} />
          <div className="absolute bottom-8 left-8 right-8">
            <MapLegend />
          </div>
        </div>

        {/* Bottom hint */}
        <div className="px-4 pb-4 flex flex-col gap-2">
          <Btn variant="secondary" fullWidth onClick={() => nav('/emg/map-pin-detail')}>
            <MapPin size={16} /> View Pin Details
          </Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/emg/heatmap')}>
            <Layers size={16} /> View Heatmap
          </Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_15
export function EMG_15() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_15_Map_PinDetail_BottomSheet" />
      <AppBar title="Pin Detail" showBack backTo="/emg/map-layers" />
      <div className="flex-1 flex flex-col">
        <MapPlaceholder height={240} />

        {/* Bottom sheet */}
        <div className="flex-1 rounded-t-3xl -mt-4 relative z-10 px-4 pt-5 pb-4 flex flex-col gap-3" style={{ background: 'var(--white)', boxShadow: 'var(--shadow-lg)' }}>
          <div className="w-10 h-1 rounded-full mx-auto" style={{ background: 'var(--gray-300)' }} />
          <div className="flex items-center gap-2">
            <StatusChip status="lost" />
            <FreshnessBadge text="Last updated 12 min ago" />
          </div>
          <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Luna — Lost</h3>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>{LOST_CASE.location}</p>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Approximate area only — exact address is hidden.</p>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye size={14} style={{ color: 'var(--warning)' }} />
              <span className="text-[12px]" style={{ color: 'var(--gray-700)' }}>{LOST_CASE.sightings} sightings</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} style={{ color: 'var(--info)' }} />
              <span className="text-[12px]" style={{ color: 'var(--gray-700)' }}>{LOST_CASE.matchCount} matches</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Btn variant="emergency" className="flex-1" onClick={() => nav('/emg/case-detail-lost')}>View Case</Btn>
            <Btn variant="secondary" className="flex-1" onClick={() => nav('/emg/matching-top10')}>Matches</Btn>
          </div>
          <Btn variant="ghost" fullWidth onClick={() => nav('/emg/chat')}>
            <MessageSquare size={16} /> Open Chat
          </Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_16
export function EMG_16() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_16_MatchingIA_Top10" />
      <AppBar title="AI Matches" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <Banner type="warning" text="Possible match (AI doesn't confirm)" />
        <h3 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Top matches for Luna</h3>
        <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Ranked by AI confidence. Tap to compare side by side.</p>

        <div className="flex flex-col gap-2">
          {MATCHES.map((m) => (
            <MatchCard key={m.id} {...m} onClick={() => nav('/emg/matching-compare')} />
          ))}
        </div>

        <div className="mt-4 pb-4">
          <Btn variant="primary" fullWidth onClick={() => nav('/emg/matching-compare')}>
            Compare Side by Side
          </Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_17
export function EMG_17() {
  const nav = useNavigate();
  const m = MATCHES[0];
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_17_Matching_CompareSideBySide" />
      <AppBar title="Compare Match" showBack backTo="/emg/matching-top10" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <Banner type="warning" text="Possible match (AI doesn't confirm)" />

        <div className="flex gap-3">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full aspect-square rounded-xl flex items-center justify-center" style={{ background: 'var(--red-bg)' }}>
              <span className="text-4xl">🐕</span>
            </div>
            <StatusChip status="lost" />
            <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Luna (yours)</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full aspect-square rounded-xl flex items-center justify-center" style={{ background: 'var(--green-bg)' }}>
              <span className="text-4xl">🐕</span>
            </div>
            <StatusChip status="found" />
            <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Match #{m.id}</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ConfidenceBadge value={m.confidence} />
        </div>

        <div className="flex flex-wrap gap-1 justify-center">
          {m.reasons.map((r) => <MatchReasonTag key={r} reason={r} />)}
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
            <strong>Location:</strong> {m.location} · <strong>Seen:</strong> {m.time}
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-auto pb-4">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/chat')}>
            <MessageSquare size={16} /> Contact Finder
          </Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/emg/matching-top10')}>Back to All Matches</Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_18
export function EMG_18() {
  const nav = useNavigate();
  const [showReport, setShowReport] = useState(false);
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_18_CaseDetail_Lost" />
      <AppBar title="Case Detail" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StatusChip status="lost" />
            <span className="text-[11px]" style={{ color: 'var(--gray-400)' }}>Case {LOST_CASE.id}</span>
          </div>
          <button onClick={() => setShowReport(true)} className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ minHeight: 44, color: 'var(--red-primary)' }}>
            <Flag size={14} />
            <span className="text-[11px]" style={{ fontWeight: 500 }}>Report suspicious behavior</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: 'var(--red-bg)' }}>
            <span className="text-3xl">🐕</span>
          </div>
          <div>
            <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Luna</h3>
            <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{LUNA.breed} · {LUNA.description}</p>
            <FreshnessBadge text="Last updated 12 min ago" />
          </div>
        </div>

        <Banner type="activeCase" text={LOST_CASE.headline} />

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <span className="text-[16px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{LOST_CASE.sightings}</span>
            <p className="text-[10px]" style={{ color: 'var(--gray-500)' }}>Sightings</p>
          </div>
          <div className="p-2 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <span className="text-[16px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{LOST_CASE.matchCount}</span>
            <p className="text-[10px]" style={{ color: 'var(--gray-500)' }}>Matches</p>
          </div>
          <div className="p-2 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <span className="text-[16px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{LOST_CASE.followers}</span>
            <p className="text-[10px]" style={{ color: 'var(--gray-500)' }}>Followers</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <DirectionChip direction={LOST_CASE.direction} />
          {LUNA.colors.map((c) => <span key={c} className="px-2 py-1 rounded-full text-[11px]" style={{ background: 'var(--gray-100)', color: 'var(--gray-700)' }}>{c}</span>)}
        </div>

        <div className="flex flex-col gap-2 mt-auto pb-4">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/matching-top10')}>View Matches</Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/emg/chat')}>Open Chat</Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/emg/map-layers')}>View on Map</Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_19
export function EMG_19() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_19_CaseDetail_Found" />
      <AppBar title="Found Dog Detail" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <StatusChip status="found" />
          <button className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ minHeight: 44, color: 'var(--red-primary)' }}>
            <Flag size={14} />
            <span className="text-[11px]" style={{ fontWeight: 500 }}>Report suspicious behavior</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: 'var(--green-bg)' }}>
            <span className="text-3xl">🐕</span>
          </div>
          <div>
            <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Found Dog</h3>
            <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Medium, brown with white chest</p>
            <FreshnessBadge text="Last updated 12 min ago" />
          </div>
        </div>

        <MapPlaceholder height={140} />
        <Banner type="privacy" text="Your exact location is protected" />
        <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Approximate area only — exact address is hidden.</p>

        <div className="flex flex-col gap-2 mt-auto pb-4">
          <Btn variant="primary" fullWidth onClick={() => nav('/emg/matching-top10')}>View Matches</Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/emg/chat')}>Contact Finder</Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_20
export function EMG_20() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_20_CaseDetail_Sighted" />
      <AppBar title="Sighting Detail" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <StatusChip status="sighted" />
          <button className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ minHeight: 44, color: 'var(--red-primary)' }}>
            <Flag size={14} />
            <span className="text-[11px]" style={{ fontWeight: 500 }}>Report suspicious behavior</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: '#FFFBEB' }}>
            <Eye size={28} style={{ color: 'var(--warning)' }} />
          </div>
          <div>
            <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Dog Sighted</h3>
            <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Central Park, West 72nd St</p>
            <FreshnessBadge text="Reported 45 min ago" />
          </div>
        </div>

        <MapPlaceholder height={160} />

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[13px]" style={{ color: 'var(--gray-700)' }}>
            "Medium brown dog, seemed friendly, was heading south near the fountain."
          </p>
          <p className="text-[11px] mt-1" style={{ color: 'var(--gray-400)' }}>Reported by anonymous user</p>
        </div>

        <DirectionChip direction="S" />

        <Btn variant="secondary" fullWidth onClick={() => nav('/emg/map-layers')}>View on Map</Btn>
        <Btn variant="ghost" fullWidth onClick={() => nav('/home-emergency')}>Back to Home</Btn>
      </div>
    </div>
  );
}
