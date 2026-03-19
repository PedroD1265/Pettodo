import React, { useState, useEffect } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { MapPlaceholder, MapLegend } from '../../components/pettodo/MapComponents';
import { CaseCard, MatchCard } from '../../components/pettodo/Cards';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { StatusChip, FreshnessBadge, ConfidenceBadge, MatchReasonTag, DirectionChip } from '../../components/pettodo/Badges';
import { useNavigate, useLocation } from 'react-router';
import { Layers, MapPin, MessageSquare, Flag, AlertTriangle, Eye, Search } from 'lucide-react';
import { LOST_CASE, LUNA } from '../../data/demoData';
import { useServices } from '../../services';
import type { MatchResult } from '../../services/interfaces';
import { caseApi, type CaseRecord } from '../../services/api';
import { getDogPhoto } from '../../data/dogPhotos';

// EMG_14
export function EMG_14() {
  const nav = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_14_Map_LayersFilters" />
      <AppBar title="Search Map" showBack backTo="/home-emergency" />
      <div className="flex-1 flex flex-col">
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

        <div className="flex-1 rounded-t-3xl -mt-4 relative z-10 px-4 pt-5 pb-4 flex flex-col gap-3" style={{ background: 'var(--white)', boxShadow: 'var(--shadow-lg)' }}>
          <div className="w-10 h-1 rounded-full mx-auto" style={{ background: 'var(--gray-300)' }} />
          <div className="flex items-center gap-2">
            <StatusChip status="lost" />
            <FreshnessBadge text="Last updated 12 min ago" />
          </div>
          <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Luna - Lost</h3>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>{LOST_CASE.location}</p>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Approximate area only - exact address is hidden.</p>

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
  const location = useLocation();
  const { matching } = useServices();
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(() => {
    const state = location.state as { caseSummary?: CaseRecord } | null;
    return state?.caseSummary ?? null;
  });
  const [caseLoading, setCaseLoading] = useState(true);
  const [caseError, setCaseError] = useState<string | null>(null);
  const [matches, setMatches] = useState<MatchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const caseIdFromSearch = new URLSearchParams(location.search).get('caseId');

  useEffect(() => {
    let cancelled = false;

    async function loadSelectedCase() {
      setCaseLoading(true);
      setCaseError(null);
      setMatches(null);

      try {
        if (caseIdFromSearch) {
          const found = await caseApi.get(caseIdFromSearch);
          if (!cancelled) {
            setSelectedCase(found);
          }
          return;
        }

        const cases = await caseApi.list();
        const preferred = cases.find((c) => c.type === 'lost' && c.status === 'active')
          ?? cases.find((c) => c.type === 'lost')
          ?? cases.find((c) => c.status === 'active')
          ?? cases[0]
          ?? null;

        if (!cancelled) {
          setSelectedCase(preferred);
          if (!preferred) {
            setCaseError('Create a report first to start checking possible matches.');
          }
        }
      } catch (err) {
        if (!cancelled) {
          setSelectedCase(null);
          setCaseError(err instanceof Error ? err.message : 'Could not load your report');
        }
      } finally {
        if (!cancelled) {
          setCaseLoading(false);
        }
      }
    }

    loadSelectedCase();
    return () => {
      cancelled = true;
    };
  }, [caseIdFromSearch]);

  useEffect(() => {
    if (!selectedCase) return;
    setLoading(true);
    setError(null);
    matching.rankMatches(selectedCase.id)
      .then((results) => setMatches(results))
      .catch((err) => setError(err?.message ?? 'Could not load matches'))
      .finally(() => setLoading(false));
  }, [matching, selectedCase?.id]);

  const caseTitle = selectedCase?.type === 'lost'
    ? 'possible reports for your lost pet'
    : selectedCase?.type === 'found'
      ? 'lost-pet reports near your found report'
      : 'related reports near your sighting';

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_16_MatchingIA_Top10" />
      <AppBar title="Possible Matches" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <Banner type="warning" text="Ranked by distance, recency, and traits - not a confirmed match" />

        {selectedCase && (
          <>
            <h3 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Top matches for {caseTitle}</h3>
            <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
              Report {selectedCase.id}{selectedCase.location ? ` - ${selectedCase.location}` : ''}
            </p>
            <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Tap a result to compare and decide whether to contact the reporter.</p>
          </>
        )}

        {caseLoading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-red-200 border-t-red-500 animate-spin" />
            <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Loading the report for matching...</p>
          </div>
        )}

        {!caseLoading && caseError && (
          <div className="p-4 rounded-xl" style={{ background: 'var(--red-bg)' }}>
            <p className="text-[13px] font-medium" style={{ color: 'var(--red-primary)' }}>Could not prepare matching</p>
            <p className="text-[12px] mt-1" style={{ color: 'var(--gray-600)' }}>{caseError}</p>
            <Btn variant="secondary" className="mt-3" onClick={() => nav('/emg/cases')}>Go to My Reports</Btn>
          </div>
        )}

        {!caseLoading && !caseError && loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-red-200 border-t-red-500 animate-spin" />
            <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Searching active reports...</p>
          </div>
        )}

        {!caseLoading && !loading && error && (
          <div className="p-4 rounded-xl" style={{ background: 'var(--red-bg)' }}>
            <p className="text-[13px] font-medium" style={{ color: 'var(--red-primary)' }}>Could not load matches</p>
            <p className="text-[12px] mt-1" style={{ color: 'var(--gray-600)' }}>{error}</p>
            <Btn variant="secondary" className="mt-3" onClick={() => {
              if (!selectedCase) return;
              setLoading(true);
              setError(null);
              matching.rankMatches(selectedCase.id)
                .then(setMatches)
                .catch((e) => setError(e?.message ?? 'Error'))
                .finally(() => setLoading(false));
            }}>Retry</Btn>
          </div>
        )}

        {!caseLoading && !loading && !error && matches !== null && matches.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
            <Eye size={32} style={{ color: 'var(--gray-400)' }} />
            <p className="text-[14px] font-medium" style={{ color: 'var(--gray-700)' }}>No matches found yet</p>
            <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>There are no active related reports nearby. Check back soon.</p>
          </div>
        )}

        {!caseLoading && !loading && !error && matches && matches.length > 0 && (
          <div className="flex flex-col gap-2">
            {matches.map((m) => (
              <MatchCard
                key={m.caseId}
                confidence={m.confidence}
                reasons={m.reasons}
                location={m.location}
                time={m.time}
                candidateType={m.candidateType}
                description={m.description}
                onClick={() => nav(`/emg/matching-compare?caseId=${encodeURIComponent(selectedCase?.id ?? '')}`, {
                  state: { match: m, caseSummary: selectedCase },
                })}
              />
            ))}
          </div>
        )}

        {!caseLoading && selectedCase && (
          <div className="mt-2 pb-4 flex flex-col gap-3">
            <div className="pt-2 border-t border-gray-200">
              <p className="text-[11px] mb-2 font-medium text-gray-500">Case Actions</p>
              <div className="flex gap-2">
                <Btn variant="secondary" className="flex-1" onClick={() => nav('/emg/share-flyer')}>Share Flyer</Btn>
                <Btn variant="secondary" className="flex-1" onClick={() => nav('/emg/lost-published')}>Report Published</Btn>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// EMG_17
export function EMG_17() {
  const nav = useNavigate();
  const location = useLocation();
  const queryCaseId = new URLSearchParams(location.search).get('caseId');
  const state = location.state as { match?: MatchResult; caseSummary?: CaseRecord } | null;
  const match = state?.match ?? null;
  const selectedCase = state?.caseSummary ?? null;

  if (!match) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="EMG_17_Matching_CompareSideBySide" />
        <AppBar title="Compare Match" showBack />
        <div className="flex-1 p-4 flex flex-col items-center justify-center gap-3 text-center">
          <Search size={32} style={{ color: 'var(--gray-400)' }} />
          <p className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>No match selected</p>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
            Open a candidate from the Possible Matches screen to compare it here.
          </p>
          <Btn
            variant="secondary"
            onClick={() => nav(queryCaseId ? `/emg/matching-top10?caseId=${encodeURIComponent(queryCaseId)}` : '/emg/matching-top10')}
          >
            Back to Possible Matches
          </Btn>
        </div>
      </div>
    );
  }

  const confidence = match.confidence;
  const reasons = match.reasons;
  const candidateType = match.candidateType ?? 'found';
  const caution = match.caution ?? 'Suggestion based on location, size, and traits. Visual confirmation is required before any action.';
  const nextAction = match.nextAction ?? 'contact_finder';
  const matchLabel = candidateType === 'found' ? 'Found report' : candidateType === 'lost' ? 'Lost report' : 'Sighting report';

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_17_Matching_CompareSideBySide" />
      <AppBar title="Compare Match" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <Banner type="warning" text={caution} />

        <div className="flex gap-3">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full aspect-square rounded-xl flex items-center justify-center" style={{ background: 'var(--red-bg)' }}>
              <AlertTriangle size={36} style={{ color: 'var(--red-dark)' }} />
            </div>
            <StatusChip status={selectedCase?.type === 'found' || selectedCase?.type === 'sighted' ? selectedCase.type : 'lost'} />
            <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Your report</span>
            <p className="text-[12px] text-center" style={{ color: 'var(--gray-500)' }}>
              {selectedCase?.description || selectedCase?.location || 'Selected report'}
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full aspect-square rounded-xl flex items-center justify-center" style={{
              background: candidateType === 'sighted' ? 'var(--warning-bg)' : candidateType === 'lost' ? 'var(--red-bg)' : 'var(--green-bg)',
            }}>
              {candidateType === 'sighted' ? (
                <Eye size={36} style={{ color: 'var(--warning-dark)' }} />
              ) : candidateType === 'lost' ? (
                <AlertTriangle size={36} style={{ color: 'var(--red-dark)' }} />
              ) : (
                <MapPin size={36} style={{ color: 'var(--green-dark)' }} />
              )}
            </div>
            <StatusChip status={candidateType as 'found' | 'sighted' | 'lost'} />
            <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{matchLabel}</span>
            <p className="text-[12px] text-center" style={{ color: 'var(--gray-500)' }}>
              {match.description || 'Candidate report'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ConfidenceBadge value={confidence} />
        </div>

        <div className="flex flex-wrap gap-1 justify-center">
          {reasons.map((r) => <MatchReasonTag key={r} reason={r} />)}
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
            <strong>Location:</strong> {match.location || 'Unknown'} · <strong>Reported:</strong> {match.time}
          </p>
          {match.size && (
            <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>
              <strong>Size:</strong> {match.size}
            </p>
          )}
          {match.colors && match.colors.length > 0 && (
            <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>
              <strong>Colors:</strong> {match.colors.join(', ')}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-auto pb-4">
          {nextAction === 'contact_finder' ? (
            <Btn variant="emergency" fullWidth onClick={() => nav('/emg/chat')}>
              <MessageSquare size={16} /> Contact Finder (Protected)
            </Btn>
          ) : (
            <Btn variant="primary" fullWidth onClick={() => nav('/emg/map-pin-detail')}>
              <MapPin size={16} /> View Sighting Location
            </Btn>
          )}
          <Btn
            variant="secondary"
            fullWidth
            onClick={() => nav(queryCaseId ? `/emg/matching-top10?caseId=${encodeURIComponent(queryCaseId)}` : '/emg/matching-top10')}
          >
            Back to All Matches
          </Btn>

          <div className="pt-3 mt-1 border-t border-gray-200">
            <p className="text-[11px] mb-2 font-medium text-gray-500">Case Actions</p>
            <div className="flex gap-2">
              <Btn variant="ghost" className="flex-1" onClick={() => nav('/emg/share-flyer')}>Share Flyer</Btn>
              <Btn variant="ghost" className="flex-1" onClick={() => nav('/emg/lost-published')}>Report Published</Btn>
            </div>
          </div>
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
          <img src={getDogPhoto('luna')} alt="Luna" className="w-16 h-16 rounded-xl object-cover" style={{ background: 'var(--red-bg)' }} />
          <div>
            <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Luna</h3>
            <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{LUNA.breed} - {LUNA.description}</p>
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
          <img src={getDogPhoto('found')} alt="Found dog" className="w-16 h-16 rounded-xl object-cover" style={{ background: 'var(--green-bg)' }} />
          <div>
            <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Found Dog</h3>
            <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Medium, brown with white chest</p>
            <FreshnessBadge text="Last updated 12 min ago" />
          </div>
        </div>

        <MapPlaceholder height={140} />
        <Banner type="privacy" text="Your exact location is protected" />
        <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Approximate area only - exact address is hidden.</p>

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
          <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: 'var(--warning-bg)' }}>
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
