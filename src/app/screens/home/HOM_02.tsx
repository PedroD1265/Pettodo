import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { CaseCard } from '../../components/pettodo/Cards';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { LOST_CASE } from '../../data/demoData';
import { MapPin, Eye, Users } from 'lucide-react';

export default function HOM_02() {
  const nav = useNavigate();
  const { setMode } = useApp();

  React.useEffect(() => { setMode('emergency'); }, []);

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="HOM_02_Home_Emergency_WithActiveCase" />
      <AppBar title="PETTODO" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <Banner type="activeCase" text="You have 1 active case. Luna is still missing." />

        <CaseCard
          type="lost"
          name="Luna — Lost"
          location={LOST_CASE.location}
          time={LOST_CASE.time}
          matchCount={LOST_CASE.matchCount}
          onClick={() => nav('/emg/case-detail-lost')}
        >
          <div className="flex gap-2 w-full">
            <button
              onClick={(e) => { e.stopPropagation(); nav('/emg/share-flyer'); }}
              className="flex-1 py-2 px-3 rounded-lg text-[12px] font-medium transition-colors"
              style={{ background: 'var(--gray-100)', color: 'var(--gray-900)' }}
            >
              Share Flyer
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nav('/emg/matching-top10'); }}
              className="flex-1 py-2 px-3 rounded-lg text-[12px] font-medium transition-colors"
              style={{ background: 'var(--gray-100)', color: 'var(--gray-900)' }}
            >
              Matches
            </button>
          </div>
        </CaseCard>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-3 rounded-xl" style={{ background: 'var(--red-bg)' }}>
            <Eye size={20} style={{ color: 'var(--red-primary)' }} />
            <span className="text-[18px] mt-1" style={{ fontWeight: 700, color: 'var(--red-dark)' }}>{LOST_CASE.sightings}</span>
            <span className="text-[10px]" style={{ color: 'var(--red-dark)' }}>Sightings</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl" style={{ background: 'var(--red-bg)' }}>
            <MapPin size={20} style={{ color: 'var(--red-primary)' }} />
            <span className="text-[18px] mt-1" style={{ fontWeight: 700, color: 'var(--red-dark)' }}>{LOST_CASE.matchCount}</span>
            <span className="text-[10px]" style={{ color: 'var(--red-dark)' }}>Matches</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl" style={{ background: 'var(--red-bg)' }}>
            <Users size={20} style={{ color: 'var(--red-primary)' }} />
            <span className="text-[18px] mt-1" style={{ fontWeight: 700, color: 'var(--red-dark)' }}>{LOST_CASE.followers}</span>
            <span className="text-[10px]" style={{ color: 'var(--red-dark)' }}>Followers</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/map-layers')}>
            <MapPin size={18} /> Open Map
          </Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/emg/matching-top10')}>
            View Possible Matches
          </Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/emg/heatmap')}>
            Search Heatmap
          </Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/emg/share-flyer')}>
            Share Flyer
          </Btn>
        </div>
      </div>
    </div>
  );
}
