import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { CommunityDogCard } from '../../components/pettodo/Cards';
import { MapPlaceholder } from '../../components/pettodo/MapComponents';
import { TimelineView } from '../../components/pettodo/Timeline';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { COMMUNITY_DOGS } from '../../data/demoData';
import { MapPin, Plus, Camera, AlertTriangle, Clock, FileText, Shield, X, CheckCircle, Syringe, Utensils } from 'lucide-react';
import { getCommunityDogPhoto } from '../../data/dogPhotos';
import { toast } from 'sonner';

// CMT_01
export function CMT_01() {
  const nav = useNavigate();
  const [view, setView] = useState<'map' | 'list'>('list');
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

        {COMMUNITY_DOGS.map((d) => (
          <CommunityDogCard key={d.name} name={d.name} lastSeen={d.lastSeen} location={d.location} onClick={() => nav('/community-dogs/detail')} />
        ))}

        <Btn variant="secondary" fullWidth onClick={() => nav('/community-dogs/create')} icon={<Plus size={16} />}>
          Add Community Dog Record
        </Btn>
      </div>
    </div>
  );
}

// CMT_02
export function CMT_02() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="CMT_02_CreateCommunityDog_Record" />
      <AppBar title="Add Community Dog" showBack backTo="/community-dogs/map-list" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Nickname</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="e.g., Buddy" />
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Photo</label>
          <div className="h-28 rounded-xl flex items-center justify-center" style={{ background: 'var(--gray-100)', border: '2px dashed var(--gray-300)' }}>
            <Camera size={24} style={{ color: 'var(--gray-400)' }} />
          </div>
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Usual location</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="Where is this dog usually seen?" />
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Description</label>
          <textarea className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 72 }} placeholder="Size, color, temperament..." />
        </div>
        <Btn variant="primary" fullWidth onClick={() => nav('/community-dogs/map-list')}>Save Record</Btn>
      </div>
    </div>
  );
}

// CMT_03
export function CMT_03() {
  const { communityDogSightings, addCommunityDogSighting, communityDogCareRecords, addCommunityDogCareRecord } = useApp();
  const [showSightingModal, setShowSightingModal] = useState(false);
  const [showCareModal, setShowCareModal] = useState<'feeding' | 'vaccine' | 'note' | null>(null);
  
  // Sighting state
  const [sightingNote, setSightingNote] = useState('');
  
  // Care state
  const [careDetail, setCareDetail] = useState('');
  const [careDate, setCareDate] = useState('Today at 8:00 AM'); // Demo default
  const [hasPhoto, setHasPhoto] = useState(false);

  // Filter sightings for this dog (using 'cd1' as demo ID for Buddy)
  const sightings = communityDogSightings.filter(s => s.dogId === 'cd1');
  const careRecords = communityDogCareRecords.filter(r => r.dogId === 'cd1');
  
  // Convert sightings to timeline format
  const timelineEntries = sightings.map(s => ({
    label: s.location,
    date: s.date,
    status: 'active' as const,
    detail: `${s.note} — by ${s.author}`
  }));

  const handleSightingSubmit = () => {
    addCommunityDogSighting({
      id: Date.now(),
      dogId: 'cd1',
      date: 'Just now',
      location: 'Current Location',
      note: sightingNote || 'Sighted',
      author: 'You'
    });
    setShowSightingModal(false);
    setSightingNote('');
  };

  const handleCareSubmit = () => {
    if (!showCareModal) return;
    
    addCommunityDogCareRecord({
      id: Date.now(),
      dogId: 'cd1',
      type: showCareModal,
      date: careDate,
      detail: careDetail || (showCareModal === 'feeding' ? 'Fed' : showCareModal === 'vaccine' ? 'Vaccinated' : 'Note'),
      author: 'You' + (hasPhoto ? ' (w/ Photo)' : '')
    });
    
    setShowCareModal(null);
    setCareDetail('');
    setHasPhoto(false);
  };

  const getCareIcon = (type: string) => {
    switch (type) {
      case 'feeding': return <Utensils size={14} style={{ color: 'var(--green-dark)' }} />;
      case 'vaccine': return <Syringe size={14} style={{ color: 'var(--info-dark)' }} />;
      default: return <FileText size={14} style={{ color: 'var(--gray-700)' }} />;
    }
  };

  const getCareColor = (type: string) => {
    switch (type) {
      case 'feeding': return 'var(--green-bg)';
      case 'vaccine': return 'var(--info-bg)';
      default: return 'var(--gray-100)';
    }
  };

  return (
    <div className="flex flex-col min-h-full relative">
      <ScreenLabel name="CMT_03_CommunityDog_DetailTimeline" />
      <AppBar title="Community Dog Detail" showBack />
      <div className="flex-1 p-4 flex flex-col gap-6 pb-20">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <img src={getCommunityDogPhoto('Buddy')} alt="Buddy" className="w-16 h-16 rounded-xl object-cover" style={{ background: 'var(--warning-bg)' }} />
          <div>
            <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Buddy</h3>
            <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Medium, brown, friendly · Central Park East</p>
          </div>
        </div>
        
        <Banner type="warning" text="Community dogs are shown with lower priority than emergencies." />

        {/* Sightings */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Sightings timeline</h4>
            <span className="text-[11px]" style={{ color: 'var(--gray-500)' }}>Most recent first</span>
          </div>
          <TimelineView entries={timelineEntries} />
        </div>

        {/* Care & Records (Task 2) */}
        <div>
           <div className="flex items-center justify-between mb-3">
             <h4 className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Care & Records</h4>
           </div>

           {/* Quick Actions */}
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

           {/* Records List */}
           <div className="flex flex-col gap-2">
             {careRecords.map((r: any) => (
               <div key={r.id} className="p-3 rounded-xl flex gap-3" style={{ background: getCareColor(r.type) }}>
                 <div className="mt-0.5">{getCareIcon(r.type)}</div>
                 <div>
                   <div className="flex items-center gap-2">
                     <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{r.type.charAt(0).toUpperCase() + r.type.slice(1)}</span>
                     <span className="text-[11px]" style={{ color: 'var(--gray-500)' }}>{r.date}</span>
                   </div>
                   <p className="text-[12px]" style={{ color: 'var(--gray-700)' }}>{r.detail}</p>
                   <p className="text-[10px] mt-0.5" style={{ color: 'var(--gray-500)' }}>By {r.author}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Floating Action Button for Sighting */}
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
                <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Current Location</p>
                <p className="text-[11px]" style={{ color: 'var(--green-dark)' }}>Using GPS (Simulated)</p>
              </div>
            </div>

            <div>
              <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Note (optional)</label>
              <textarea 
                className="w-full px-3 py-2.5 rounded-xl text-[14px]" 
                style={{ background: 'var(--gray-100)', minHeight: 80 }} 
                placeholder="What was the dog doing?"
                value={sightingNote}
                onChange={(e) => setSightingNote(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Photo (optional)</label>
              <div className="h-20 rounded-xl flex items-center justify-center" style={{ background: 'var(--gray-100)', border: '2px dashed var(--gray-300)' }}>
                <Camera size={20} style={{ color: 'var(--gray-400)' }} />
              </div>
            </div>

            <Btn variant="primary" fullWidth onClick={handleSightingSubmit}>Submit Sighting</Btn>
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
                onChange={(e) => setCareDetail(e.target.value)}
              />
            </div>

            <div onClick={() => setHasPhoto(!hasPhoto)} className="p-3 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors" style={{ borderColor: hasPhoto ? 'var(--green-primary)' : 'var(--gray-300)', background: hasPhoto ? 'var(--green-bg)' : 'transparent' }}>
              <div className="flex items-center gap-2">
                <Camera size={16} style={{ color: hasPhoto ? 'var(--green-dark)' : 'var(--gray-400)' }} />
                <span className="text-[13px]" style={{ color: hasPhoto ? 'var(--green-dark)' : 'var(--gray-500)' }}>{hasPhoto ? 'Proof photo added (simulated)' : 'Add proof photo'}</span>
              </div>
            </div>

            <Btn variant="primary" fullWidth onClick={handleCareSubmit}>Save Record</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// CMT_04
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

// CMT_05
export function CMT_05() {
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
          <Btn variant="secondary" fullWidth onClick={() => toast('Demo only — community dog record view coming soon.')}>View community dog record</Btn>
          <Btn variant="ghost" fullWidth onClick={() => toast('Report cancelled.')}>Cancel report</Btn>
        </div>
      </div>
    </div>
  );
}

// CMT_06
export function CMT_06() {
  const nav = useNavigate();
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
          <Btn variant="destructive" fullWidth onClick={() => nav('/community-dogs/dispute-evidence')}>
            Start Dispute Process
          </Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav(-1)}>Cancel</Btn>
        </div>
      </div>
    </div>
  );
}

// CMT_07
export function CMT_07() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="CMT_07_OwnershipDispute_Evidence" />
      <AppBar title="Submit Evidence" showBack backTo="/community-dogs/dispute-start" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Provide evidence of ownership</h3>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Upload documents, photos, or records that prove ownership.</p>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Photos with the dog</label>
          <div className="h-20 rounded-xl flex items-center justify-center" style={{ background: 'var(--gray-100)', border: '2px dashed var(--gray-300)' }}>
            <Camera size={20} style={{ color: 'var(--gray-400)' }} />
          </div>
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Veterinary records</label>
          <div className="h-16 rounded-xl flex items-center justify-center" style={{ background: 'var(--gray-100)', border: '2px dashed var(--gray-300)' }}>
            <FileText size={20} style={{ color: 'var(--gray-400)' }} />
          </div>
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Microchip registration</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="Microchip number" />
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Additional details</label>
          <textarea className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 72 }} placeholder="Any additional information..." />
        </div>

        <Btn variant="primary" fullWidth onClick={() => nav('/community-dogs/dispute-resolution')}>Submit Evidence</Btn>
      </div>
    </div>
  );
}

// CMT_08
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
            Both parties have submitted evidence. Our team is reviewing.
          </p>
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <div className="flex items-center gap-2">
            <Clock size={14} style={{ color: 'var(--warning)' }} />
            <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>SLA: Resolution within 48 hours</span>
          </div>
          <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>Submitted: Today at 4:30 PM · Deadline: Feb 21, 2026 at 4:30 PM</p>
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
