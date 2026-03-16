import React, { useState, useEffect, useCallback } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { CommunityDogCard } from '../../components/pettodo/Cards';
import { MapPlaceholder } from '../../components/pettodo/MapComponents';
import { TimelineView } from '../../components/pettodo/Timeline';
import { useNavigate, useParams } from 'react-router';
import { useApp } from '../../context/AppContext';
import { COMMUNITY_DOGS } from '../../data/demoData';
import { communityDogApi, evidenceApi, type CommunityDogRecord } from '../../services/api';
import { appConfig } from '../../config/appConfig';
import { MapPin, Plus, Camera, AlertTriangle, Clock, FileText, Shield, X, CheckCircle, Syringe, Utensils } from 'lucide-react';
import { getCommunityDogPhoto } from '../../data/dogPhotos';
import { toast } from 'sonner';

const isIntegration = appConfig.mode === 'integration';

// ─── CMT_01 ──────────────────────────────────────────────────────────────────
export function CMT_01() {
  const nav = useNavigate();
  const [view, setView] = useState<'map' | 'list'>('list');
  const [dogs, setDogs] = useState<CommunityDogRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    if (!isIntegration) return;
    setLoading(true);
    communityDogApi.list()
      .then(data => {
        setDogs(data.filter(d => d.reviewState === 'approved'));
        setApiError(false);
      })
      .catch(() => setApiError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleDogClick = (dogId: string) => {
    nav(isIntegration ? `/community-dogs/detail/${dogId}` : '/community-dogs/detail');
  };

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="CMT_01_CommunityDogs_MapList_LowPriorityVisual" />
      <AppBar title="Community Dogs" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Known community/street dogs</h3>
          <div className="flex gap-1">
            <button onClick={() => setView('list')} className="px-3 py-1.5 rounded-lg text-[12px]" style={{ background: view === 'list' ? 'var(--gray-900)' : 'var(--gray-100)', color: view === 'list' ? 'var(--white)' : 'var(--gray-700)', minHeight: 44 }}>List</button>
            <button onClick={() => setView('map')} className="px-3 py-1.5 rounded-lg text-[12px]" style={{ background: view === 'map' ? 'var(--gray-900)' : 'var(--gray-100)', color: view === 'map' ? 'var(--white)' : 'var(--gray-700)', minHeight: 44 }}>Map</button>
          </div>
        </div>

        <Banner type="info" text="Community dog pins have lower visual priority on the map to avoid confusion with lost/found cases." />

        {view === 'map' && <MapPlaceholder height={200} />}

        {/* Integration mode: real data */}
        {isIntegration && (
          <>
            {loading && (
              <div className="flex items-center justify-center py-8">
                <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>Loading community dogs...</p>
              </div>
            )}
            {apiError && !loading && (
              <Banner type="warning" text="Unable to load community dogs. Please try again later." />
            )}
            {!loading && !apiError && dogs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 gap-2">
                <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>No approved community dogs yet.</p>
                <p className="text-[12px]" style={{ color: 'var(--gray-400)' }}>Be the first to add one!</p>
              </div>
            )}
            {!loading && dogs.map(d => (
              <CommunityDogCard
                key={d.id}
                name={d.nickname}
                lastSeen=""
                location={d.approximateArea || '—'}
                onClick={() => handleDogClick(d.id)}
              />
            ))}
          </>
        )}

        {/* Demo mode: demo array */}
        {!isIntegration && COMMUNITY_DOGS.map(d => (
          <CommunityDogCard
            key={d.name}
            name={d.name}
            lastSeen={d.lastSeen}
            location={d.location}
            onClick={() => nav('/community-dogs/detail')}
          />
        ))}

        <Btn variant="secondary" fullWidth onClick={() => nav('/community-dogs/create')} icon={<Plus size={16} />}>
          Add Community Dog Record
        </Btn>
      </div>
    </div>
  );
}

// ─── CMT_02 ──────────────────────────────────────────────────────────────────
export function CMT_02() {
  const nav = useNavigate();
  const [nickname, setNickname] = useState('');
  const [approximateArea, setApproximateArea] = useState('');
  const [description, setDescription] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reviewState, setReviewState] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      toast.error('Nickname is required.');
      return;
    }

    if (!isIntegration) {
      nav('/community-dogs/map-list');
      return;
    }

    setSubmitting(true);
    try {
      const result = await communityDogApi.create({
        nickname: nickname.trim(),
        breed: breed.trim() || undefined,
        size: size.trim() || undefined,
        approximateArea: approximateArea.trim() || undefined,
        healthNotes: description.trim() || undefined,
      });
      setReviewState(result.reviewState ?? 'pending_review');
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to submit record. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="CMT_02_CreateCommunityDog_Record" />
        <AppBar title="Add Community Dog" showBack backTo="/community-dogs/map-list" />
        <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--green-bg)' }}>
            <CheckCircle size={32} style={{ color: 'var(--green-primary)' }} />
          </div>
          <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Record submitted</h3>
          <div className="w-full p-3 rounded-xl" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
            <p className="text-[13px] text-center" style={{ color: 'var(--warning-dark)', fontWeight: 600 }}>
              Pending review before public visibility
            </p>
            <p className="text-[12px] text-center mt-1" style={{ color: 'var(--warning-dark)' }}>
              A moderator will review this record before it appears publicly.
              {reviewState && reviewState !== 'approved' && ` Status: ${reviewState.replace('_', ' ')}`}
            </p>
          </div>
          <Btn variant="primary" fullWidth onClick={() => nav('/community-dogs/map-list')}>Back to list</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="CMT_02_CreateCommunityDog_Record" />
      <AppBar title="Add Community Dog" showBack backTo="/community-dogs/map-list" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Nickname <span style={{ color: 'var(--red-primary)' }}>*</span></label>
          <input
            className="w-full px-3 py-2.5 rounded-xl"
            style={{ background: 'var(--gray-100)', minHeight: 48 }}
            placeholder="e.g., Buddy"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
        </div>

        {/* Photo — disabled, not available yet */}
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-400)' }}>Photo</label>
          <div className="h-28 rounded-xl flex flex-col items-center justify-center gap-1" style={{ background: 'var(--gray-50)', border: '2px dashed var(--gray-200)' }}>
            <Camera size={24} style={{ color: 'var(--gray-300)' }} />
            <span className="text-[11px]" style={{ color: 'var(--gray-400)' }}>Photo upload not available yet</span>
          </div>
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Breed</label>
          <input
            className="w-full px-3 py-2.5 rounded-xl"
            style={{ background: 'var(--gray-100)', minHeight: 48 }}
            placeholder="e.g., Mixed, Labrador..."
            value={breed}
            onChange={e => setBreed(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Size</label>
          <select
            className="w-full px-3 py-2.5 rounded-xl"
            style={{ background: 'var(--gray-100)', minHeight: 48 }}
            value={size}
            onChange={e => setSize(e.target.value)}
          >
            <option value="">Select size...</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Usual area</label>
          <input
            className="w-full px-3 py-2.5 rounded-xl"
            style={{ background: 'var(--gray-100)', minHeight: 48 }}
            placeholder="Where is this dog usually seen?"
            value={approximateArea}
            onChange={e => setApproximateArea(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Health / description notes</label>
          <textarea
            className="w-full px-3 py-2.5 rounded-xl"
            style={{ background: 'var(--gray-100)', minHeight: 72 }}
            placeholder="Color, temperament, health observations..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        {isIntegration && (
          <div className="p-3 rounded-xl" style={{ background: 'var(--warning-bg)' }}>
            <p className="text-[12px]" style={{ color: 'var(--warning-dark)' }}>
              Records are reviewed before becoming publicly visible.
            </p>
          </div>
        )}

        <Btn variant="primary" fullWidth onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Save Record'}
        </Btn>
      </div>
    </div>
  );
}

// ─── CMT_03 ──────────────────────────────────────────────────────────────────
export function CMT_03() {
  const { communityDogSightings, addCommunityDogSighting, communityDogCareRecords, addCommunityDogCareRecord } = useApp();
  const { dogId } = useParams<{ dogId?: string }>();
  const [showSightingModal, setShowSightingModal] = useState(false);
  const [showCareModal, setShowCareModal] = useState<'feeding' | 'vaccine' | 'note' | null>(null);
  const [sightingNote, setSightingNote] = useState('');
  const [careDetail, setCareDetail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Real dog data (integration mode)
  const [dog, setDog] = useState<CommunityDogRecord | null>(null);
  const [dogLoading, setDogLoading] = useState(false);
  const [dogError, setDogError] = useState(false);

  // Real sightings/actions feed (integration mode)
  const [realSightings, setRealSightings] = useState<Array<{ id: string; locationLabel?: string; notes?: string; createdAt: number }>>([]);
  const [realActions, setRealActions] = useState<Array<{ id: string; actionType: string; notes?: string; createdAt: number }>>([]);

  const loadDog = useCallback(async () => {
    if (!isIntegration || !dogId) return;
    setDogLoading(true);
    try {
      const data = await communityDogApi.get(dogId);
      setDog(data);
      setDogError(false);
      // Load existing history (approved dogs only — API returns [] for non-approved)
      const [sightingsData, actionsData] = await Promise.all([
        communityDogApi.getSightings(dogId),
        communityDogApi.getActions(dogId),
      ]);
      setRealSightings(sightingsData);
      setRealActions(actionsData);
    } catch {
      setDogError(true);
    } finally {
      setDogLoading(false);
    }
  }, [dogId]);

  useEffect(() => {
    loadDog();
  }, [loadDog]);

  // Demo fallback: use 'cd1' sightings/care
  const demoSightings = communityDogSightings.filter(s => s.dogId === 'cd1');
  const demoCareRecords = communityDogCareRecords.filter(r => r.dogId === 'cd1');

  const timelineEntries = isIntegration
    ? realSightings.map(s => ({
        label: s.locationLabel || 'Unknown area',
        date: new Date(s.createdAt).toLocaleDateString(),
        status: 'active' as const,
        detail: s.notes || 'Sighted',
      }))
    : demoSightings.map(s => ({
        label: s.location,
        date: s.date,
        status: 'active' as const,
        detail: `${s.note} — by ${s.author}`,
      }));

  const handleSightingSubmit = async () => {
    if (isIntegration && dogId) {
      setSubmitting(true);
      try {
        await communityDogApi.addSighting(dogId, {
          notes: sightingNote || undefined,
        });
        toast.success('Sighting recorded.');
        setRealSightings(prev => [{ id: Date.now().toString(), notes: sightingNote || 'Sighted', createdAt: Date.now() }, ...prev]);
      } catch (err: any) {
        toast.error(err?.message || 'Failed to record sighting.');
      } finally {
        setSubmitting(false);
      }
    } else {
      addCommunityDogSighting({
        id: Date.now(),
        dogId: 'cd1',
        date: 'Just now',
        location: 'Current Location',
        note: sightingNote || 'Sighted',
        author: 'You',
      });
    }
    setShowSightingModal(false);
    setSightingNote('');
  };

  const handleCareSubmit = async () => {
    if (!showCareModal) return;

    if (isIntegration && dogId) {
      setSubmitting(true);
      try {
        const actionType = showCareModal === 'vaccine' ? 'medical' : showCareModal === 'note' ? 'other' : 'feeding';
        await communityDogApi.addAction(dogId, {
          actionType,
          notes: careDetail || undefined,
        });
        toast.success('Record saved.');
        setRealActions(prev => [{ id: Date.now().toString(), actionType, notes: careDetail, createdAt: Date.now() }, ...prev]);
      } catch (err: any) {
        toast.error(err?.message || 'Failed to save record.');
      } finally {
        setSubmitting(false);
      }
    } else {
      addCommunityDogCareRecord({
        id: Date.now(),
        dogId: 'cd1',
        type: showCareModal,
        date: 'Just now',
        detail: careDetail || (showCareModal === 'feeding' ? 'Fed' : showCareModal === 'vaccine' ? 'Vaccinated' : 'Note'),
        author: 'You',
      });
    }

    setShowCareModal(null);
    setCareDetail('');
  };

  const getCareIcon = (type: string) => {
    switch (type) {
      case 'feeding': return <Utensils size={14} style={{ color: 'var(--green-dark)' }} />;
      case 'vaccine': case 'medical': return <Syringe size={14} style={{ color: 'var(--info-dark)' }} />;
      default: return <FileText size={14} style={{ color: 'var(--gray-700)' }} />;
    }
  };

  const getCareColor = (type: string) => {
    switch (type) {
      case 'feeding': return 'var(--green-bg)';
      case 'vaccine': case 'medical': return 'var(--info-bg)';
      default: return 'var(--gray-100)';
    }
  };

  // Loading state (integration)
  if (isIntegration && dogLoading) {
    return (
      <div className="flex flex-col min-h-full items-center justify-center">
        <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>Loading dog info...</p>
      </div>
    );
  }

  // Error state (integration)
  if (isIntegration && dogError) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="CMT_03_CommunityDog_DetailTimeline" />
        <AppBar title="Community Dog Detail" showBack />
        <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
          <AlertTriangle size={48} style={{ color: 'var(--warning)' }} />
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>Could not load dog record.</p>
        </div>
      </div>
    );
  }

  const displayName = isIntegration ? (dog?.nickname ?? '—') : 'Buddy';
  const displaySub = isIntegration
    ? [dog?.breed, dog?.size, dog?.approximateArea].filter(Boolean).join(' · ')
    : 'Medium, brown, friendly · Central Park East';

  const careRecordsToShow = isIntegration ? realActions : demoCareRecords;

  return (
    <div className="flex flex-col min-h-full relative">
      <ScreenLabel name="CMT_03_CommunityDog_DetailTimeline" />
      <AppBar title="Community Dog Detail" showBack />
      <div className="flex-1 p-4 flex flex-col gap-6 pb-20">

        {/* Review state banner */}
        {isIntegration && dog && dog.reviewState === 'pending_review' && (
          <Banner type="warning" text="This record is pending review and not yet publicly visible." />
        )}
        {isIntegration && dog && dog.reviewState === 'rejected' && (
          <Banner type="antiscam" text="This record was rejected by a moderator and is not publicly visible." />
        )}

        {/* Header */}
        <div className="flex items-center gap-3">
          {!isIntegration && (
            <img src={getCommunityDogPhoto('Buddy')} alt="Buddy" className="w-16 h-16 rounded-xl object-cover" style={{ background: 'var(--warning-bg)' }} />
          )}
          {isIntegration && (
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl" style={{ background: 'var(--warning-bg)' }}>🐕</div>
          )}
          <div>
            <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{displayName}</h3>
            <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{displaySub || '—'}</p>
          </div>
        </div>

        <Banner type="warning" text="Community dogs are shown with lower priority than emergencies." />

        {/* Sightings */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Sightings timeline</h4>
            <span className="text-[11px]" style={{ color: 'var(--gray-500)' }}>Most recent first</span>
          </div>
          {timelineEntries.length > 0
            ? <TimelineView entries={timelineEntries} />
            : <p className="text-[13px]" style={{ color: 'var(--gray-400)' }}>No sightings recorded yet.</p>
          }
        </div>

        {/* Care & Records */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Care & Records</h4>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            <button onClick={() => setShowCareModal('feeding')} className="flex flex-col items-center gap-1 p-2 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
              <Utensils size={18} style={{ color: 'var(--green-dark)' }} />
              <span className="text-[11px]" style={{ color: 'var(--green-dark)', fontWeight: 600 }}>Log Feeding</span>
            </button>
            <button onClick={() => setShowCareModal('vaccine')} className="flex flex-col items-center gap-1 p-2 rounded-xl" style={{ background: 'var(--info-bg)', border: '1px solid var(--info-soft)' }}>
              <Syringe size={18} style={{ color: 'var(--info-dark)' }} />
              <span className="text-[11px]" style={{ color: 'var(--info-dark)', fontWeight: 600 }}>Log Vaccine</span>
            </button>
            <button onClick={() => setShowCareModal('note')} className="flex flex-col items-center gap-1 p-2 rounded-xl" style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)' }}>
              <FileText size={18} style={{ color: 'var(--gray-700)' }} />
              <span className="text-[11px]" style={{ color: 'var(--gray-700)', fontWeight: 600 }}>Add Note</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {careRecordsToShow.map((r: any) => (
              <div key={r.id} className="p-3 rounded-xl flex gap-3" style={{ background: getCareColor(r.type || r.actionType) }}>
                <div className="mt-0.5">{getCareIcon(r.type || r.actionType)}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
                      {(r.type || r.actionType || '').charAt(0).toUpperCase() + (r.type || r.actionType || '').slice(1)}
                    </span>
                    <span className="text-[11px]" style={{ color: 'var(--gray-500)' }}>
                      {r.date || (r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '')}
                    </span>
                  </div>
                  <p className="text-[12px]" style={{ color: 'var(--gray-700)' }}>{r.detail || r.notes || '—'}</p>
                  {r.author && <p className="text-[10px] mt-0.5" style={{ color: 'var(--gray-500)' }}>By {r.author}</p>}
                </div>
              </div>
            ))}
            {careRecordsToShow.length === 0 && (
              <p className="text-[13px]" style={{ color: 'var(--gray-400)' }}>No records yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0">
        <Btn variant="primary" fullWidth icon={<MapPin size={16} />} onClick={() => setShowSightingModal(true)}>
          I saw this dog today
        </Btn>
      </div>

      {/* Sighting Modal */}
      {showSightingModal && (
        <div className="absolute inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full bg-white rounded-t-2xl p-4 flex flex-col gap-4 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px]" style={{ fontWeight: 600 }}>Report Sighting</h3>
              <button onClick={() => setShowSightingModal(false)}><X size={24} style={{ color: 'var(--gray-500)' }} /></button>
            </div>

            <div className="p-3 rounded-xl flex items-center gap-3" style={{ background: 'var(--green-bg)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
                <MapPin size={16} style={{ color: 'var(--green-primary)' }} />
              </div>
              <div>
                <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Approximate Location</p>
                <p className="text-[11px]" style={{ color: 'var(--green-dark)' }}>General area only — no exact GPS stored</p>
              </div>
            </div>

            <div>
              <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Note (optional)</label>
              <textarea
                className="w-full px-3 py-2.5 rounded-xl text-[14px]"
                style={{ background: 'var(--gray-100)', minHeight: 80 }}
                placeholder="What was the dog doing?"
                value={sightingNote}
                onChange={e => setSightingNote(e.target.value)}
              />
            </div>

            {/* Photo — disabled */}
            <div>
              <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-400)' }}>Photo (not available yet)</label>
              <div className="h-16 rounded-xl flex flex-col items-center justify-center gap-1" style={{ background: 'var(--gray-50)', border: '2px dashed var(--gray-200)' }}>
                <Camera size={18} style={{ color: 'var(--gray-300)' }} />
                <span className="text-[10px]" style={{ color: 'var(--gray-400)' }}>Photo upload not available yet</span>
              </div>
            </div>

            <Btn variant="primary" fullWidth onClick={handleSightingSubmit} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Sighting'}
            </Btn>
          </div>
        </div>
      )}

      {/* Care Modal */}
      {showCareModal && (
        <div className="absolute inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full bg-white rounded-t-2xl p-4 flex flex-col gap-4 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px]" style={{ fontWeight: 600 }}>Log {showCareModal.charAt(0).toUpperCase() + showCareModal.slice(1)}</h3>
              <button onClick={() => setShowCareModal(null)}><X size={24} style={{ color: 'var(--gray-500)' }} /></button>
            </div>

            <div>
              <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Details</label>
              <input
                className="w-full px-3 py-2.5 rounded-xl text-[14px]"
                style={{ background: 'var(--gray-100)' }}
                placeholder={showCareModal === 'feeding' ? 'What food?' : showCareModal === 'vaccine' ? 'Which vaccine?' : 'Note details...'}
                value={careDetail}
                onChange={e => setCareDetail(e.target.value)}
              />
            </div>

            {/* Photo proof — disabled */}
            <div className="p-3 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1" style={{ borderColor: 'var(--gray-200)', background: 'var(--gray-50)' }}>
              <Camera size={16} style={{ color: 'var(--gray-300)' }} />
              <span className="text-[11px]" style={{ color: 'var(--gray-400)' }}>Proof photo not available yet</span>
            </div>

            <Btn variant="primary" fullWidth onClick={handleCareSubmit} disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Record'}
            </Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CMT_04 ──────────────────────────────────────────────────────────────────
export function CMT_04() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="CMT_04_CommunityDog_DedupSuggestion" />
      <AppBar title="Duplicate Detected" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <Banner type="warning" text="This dog may already be recorded in the system." />

        <div className="flex gap-3">
          <div className="flex-1 p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <p className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>New entry</p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--gray-500)' }}>Medium brown dog, East side</p>
          </div>
          <div className="flex-1 p-3 rounded-xl" style={{ background: 'var(--warning-bg)' }}>
            <p className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Existing: Buddy</p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--gray-500)' }}>Medium brown, Central Park East</p>
          </div>
        </div>

        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
          These records look similar. Would you like to merge them or keep as separate entries?
        </p>

        <Btn variant="primary" fullWidth onClick={() => toast('Records merged successfully.')}>Merge Records</Btn>
        <Btn variant="secondary" fullWidth onClick={() => toast('Records kept separate.')}>Keep Separate</Btn>
      </div>
    </div>
  );
}

// ─── CMT_05 ──────────────────────────────────────────────────────────────────
export function CMT_05() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="CMT_05_Found_vs_CommunityDog_Warning" />
      <AppBar title="Important Notice" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4 items-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--warning-bg)' }}>
          <AlertTriangle size={32} style={{ color: 'var(--warning)' }} />
        </div>
        <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>This may be a community dog</h3>
        <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
          The dog you found matches a known community/street dog in our records. Community dogs are cared for by local volunteers and may not be lost.
        </p>

        <Banner type="warning">
          <span>This dog has an owner. Help them get home.</span>
        </Banner>

        <div className="w-full flex flex-col gap-2">
          <Btn variant="primary" fullWidth onClick={() => toast('Continuing Found report for this dog.')}>It's a different dog — continue Found report</Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/community-dogs/map-list')}>View community dog records</Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav(-1)}>Cancel report</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── CMT_06 ──────────────────────────────────────────────────────────────────
export function CMT_06() {
  const nav = useNavigate();
  const { dogId } = useParams<{ dogId?: string }>();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="CMT_06_OwnershipDispute_Start" />
      <AppBar title="Ownership Dispute" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <Banner type="antiscam" text="Ownership disputes have a 48-hour resolution SLA." />

        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Report ownership dispute</h3>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
          If you believe someone is claiming a dog that belongs to you, start a dispute process.
        </p>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <div className="flex items-center gap-2">
            <Clock size={14} style={{ color: 'var(--warning)' }} />
            <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>SLA: 48 hours</span>
          </div>
          <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>
            Both parties will be asked to provide evidence. The case will be reviewed within 48 hours.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Btn
            variant="destructive"
            fullWidth
            onClick={() => nav(dogId ? `/community-dogs/dispute-evidence/${dogId}` : '/community-dogs/dispute-evidence')}
          >
            Start Dispute Process
          </Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav(-1)}>Cancel</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── CMT_07 ──────────────────────────────────────────────────────────────────
export function CMT_07() {
  const nav = useNavigate();
  const { dogId } = useParams<{ dogId?: string }>();
  const [description, setDescription] = useState('');
  const [microchip, setMicrochip] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim() && !microchip.trim()) {
      toast.error('Please provide at least a description or microchip number.');
      return;
    }

    if (!isIntegration) {
      nav('/community-dogs/dispute-resolution');
      return;
    }

    if (!dogId) {
      toast.error('Dog ID not found. Please navigate from the dog detail page.');
      return;
    }

    setSubmitting(true);
    try {
      await evidenceApi.submit({
        targetEntityType: 'community_dog',
        targetEntityId: dogId,
        evidenceType: microchip.trim() ? 'veterinary_record' : 'witness',
        description: [
          description.trim(),
          microchip.trim() ? `Microchip: ${microchip.trim()}` : '',
        ].filter(Boolean).join('\n'),
        metadata: microchip.trim() ? { microchip: microchip.trim() } : undefined,
      });
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to submit evidence. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="CMT_07_OwnershipDispute_Evidence" />
        <AppBar title="Submit Evidence" showBack backTo="/community-dogs/dispute-start" />
        <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--green-bg)' }}>
            <CheckCircle size={32} style={{ color: 'var(--green-primary)' }} />
          </div>
          <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Evidence submitted</h3>
          <div className="w-full p-3 rounded-xl" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
            <p className="text-[13px] text-center" style={{ color: 'var(--warning-dark)', fontWeight: 600 }}>Pending review</p>
            <p className="text-[12px] text-center mt-1" style={{ color: 'var(--warning-dark)' }}>
              A moderator will review your evidence and follow up within 48 hours.
            </p>
          </div>
          <Btn variant="secondary" fullWidth onClick={() => nav('/community-dogs/dispute-resolution')}>
            View dispute status
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="CMT_07_OwnershipDispute_Evidence" />
      <AppBar title="Submit Evidence" showBack backTo="/community-dogs/dispute-start" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Provide evidence of ownership</h3>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
          Describe your evidence. Photo and document upload will be available in a future update.
        </p>

        {/* Photos — disabled */}
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-400)' }}>Photos with the dog</label>
          <div className="h-16 rounded-xl flex flex-col items-center justify-center gap-1" style={{ background: 'var(--gray-50)', border: '2px dashed var(--gray-200)' }}>
            <Camera size={18} style={{ color: 'var(--gray-300)' }} />
            <span className="text-[10px]" style={{ color: 'var(--gray-400)' }}>Photo upload not available yet</span>
          </div>
        </div>

        {/* Veterinary records — disabled */}
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-400)' }}>Veterinary records (document upload)</label>
          <div className="h-14 rounded-xl flex flex-col items-center justify-center gap-1" style={{ background: 'var(--gray-50)', border: '2px dashed var(--gray-200)' }}>
            <FileText size={16} style={{ color: 'var(--gray-300)' }} />
            <span className="text-[10px]" style={{ color: 'var(--gray-400)' }}>Document upload not available yet</span>
          </div>
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Microchip number</label>
          <input
            className="w-full px-3 py-2.5 rounded-xl"
            style={{ background: 'var(--gray-100)', minHeight: 48 }}
            placeholder="e.g., 985112006012345"
            value={microchip}
            onChange={e => setMicrochip(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Description of ownership evidence</label>
          <textarea
            className="w-full px-3 py-2.5 rounded-xl"
            style={{ background: 'var(--gray-100)', minHeight: 80 }}
            placeholder="Describe when/how you acquired this dog, vet visits, distinctive markings you know about..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        {isIntegration && !dogId && (
          <Banner type="warning" text="No dog ID found. Please navigate from a specific dog record to submit evidence." />
        )}

        <Btn
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={submitting || (isIntegration && !dogId)}
        >
          {submitting ? 'Submitting...' : 'Submit Evidence'}
        </Btn>
      </div>
    </div>
  );
}

// ─── CMT_08 ──────────────────────────────────────────────────────────────────
export function CMT_08() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="CMT_08_OwnershipDispute_Resolution_LinkToLostCase" />
      <AppBar title="Dispute Resolution" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="p-4 rounded-xl text-center" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <Shield size={32} style={{ color: 'var(--green-primary)' }} className="mx-auto mb-2" />
          <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Dispute Under Review</h3>
          <p className="text-[13px] mt-1" style={{ color: 'var(--green-dark)' }}>
            Your evidence has been submitted. Our team is reviewing it.
          </p>
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <div className="flex items-center gap-2">
            <Clock size={14} style={{ color: 'var(--warning)' }} />
            <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>SLA: Resolution within 48 hours</span>
          </div>
          <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>
            A moderator will review and follow up via notifications.
          </p>
        </div>

        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
          If this dog is linked to an existing lost case, the dispute will reference that case for cross-verification.
        </p>

        <Btn variant="secondary" fullWidth onClick={() => nav('/emg/case-detail-lost')}>
          View Linked Lost Case
        </Btn>
      </div>
    </div>
  );
}
