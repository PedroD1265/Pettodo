import React, { useState, useEffect } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { CaseCard } from '../../components/pettodo/Cards';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { caseApi, type CaseRecord } from '../../services/api';
import { MapPin, Eye, Users, Plus, Search } from 'lucide-react';

export default function HOM_02() {
  const nav = useNavigate();
  const { setMode } = useApp();
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => { setMode('emergency'); }, []);

  useEffect(() => {
    caseApi.list()
      .then((data) => { setCases(data); setLoading(false); })
      .catch(() => { setCases([]); setLoading(false); });
  }, []);

  const activeLost = cases.filter(c => c.type === 'lost' && c.status === 'active');
  const firstActive = activeLost[0] ?? null;

  if (loading) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="HOM_02_Home_Emergency_WithActiveCase" />
        <AppBar title="PETTODO" showBack={false} />
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>Loading your cases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="HOM_02_Home_Emergency_WithActiveCase" />
      <AppBar title="PETTODO" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4">

        {firstActive ? (
          <>
            <Banner type="activeCase" text={`You have ${activeLost.length} active lost case${activeLost.length > 1 ? 's' : ''}.`} />

            <CaseCard
              type="lost"
              name={firstActive.description ? `Lost - ${firstActive.description.slice(0, 30)}` : 'Lost Dog'}
              location={firstActive.location ?? ''}
              time={firstActive.timeLabel ?? ''}
              matchCount={0}
              onClick={() => nav('/emg/cases')}
            >
              <div className="flex gap-2 w-full">
                <button
                  onClick={(e) => { e.stopPropagation(); nav('/emg/cases'); }}
                  className="flex-1 py-2 px-3 rounded-lg text-[12px] font-medium"
                  style={{ background: 'var(--gray-100)', color: 'var(--gray-900)' }}
                >
                  View Report
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nav(`/emg/matching-top10?caseId=${encodeURIComponent(firstActive.id)}`, { state: { caseSummary: firstActive } }); }}
                  className="flex-1 py-2 px-3 rounded-lg text-[12px] font-medium"
                  style={{ background: 'var(--gray-100)', color: 'var(--gray-900)' }}
                >
                  Matches
                </button>
              </div>
            </CaseCard>

            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center p-3 rounded-xl" style={{ background: 'var(--red-bg)' }}>
                <Eye size={20} style={{ color: 'var(--red-primary)' }} />
                <span className="text-[18px] mt-1" style={{ fontWeight: 700, color: 'var(--red-dark)' }}>{activeLost.length}</span>
                <span className="text-[10px]" style={{ color: 'var(--red-dark)' }}>Active</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl" style={{ background: 'var(--red-bg)' }}>
                <MapPin size={20} style={{ color: 'var(--red-primary)' }} />
                <span className="text-[18px] mt-1" style={{ fontWeight: 700, color: 'var(--red-dark)' }}>{cases.length}</span>
                <span className="text-[10px]" style={{ color: 'var(--red-dark)' }}>Total</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl" style={{ background: 'var(--red-bg)' }}>
                <Users size={20} style={{ color: 'var(--red-primary)' }} />
                <span className="text-[18px] mt-1" style={{ fontWeight: 700, color: 'var(--red-dark)' }}>-</span>
                <span className="text-[10px]" style={{ color: 'var(--red-dark)' }}>Followers</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Btn variant="emergency" fullWidth onClick={() => nav('/emg/cases')}>
                <Eye size={18} /> My Reports
              </Btn>
              <Btn
                variant="secondary"
                fullWidth
                onClick={() => nav(`/emg/matching-top10?caseId=${encodeURIComponent(firstActive.id)}`, { state: { caseSummary: firstActive } })}
              >
                <Search size={18} /> View Matches
              </Btn>
              <Btn variant="secondary" fullWidth onClick={() => nav('/emg/map-layers')}>
                <MapPin size={18} /> Open Map
              </Btn>
            </div>
          </>
        ) : (
          <>
            <Banner type="calm" text="No active cases right now." />

            <div className="flex flex-col gap-3 py-4 items-center">
              <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
                {cases.length > 0
                  ? `You have ${cases.length} resolved or archived case${cases.length > 1 ? 's' : ''}.`
                  : "You don't have any emergency reports yet."}
              </p>
              {cases.length > 0 && (
                <Btn variant="secondary" onClick={() => nav('/emg/cases')}>View All Reports</Btn>
              )}
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <Btn variant="emergency" fullWidth icon={<Plus size={18} />} onClick={() => nav('/emg/entry')}>
                Create a Report
              </Btn>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
