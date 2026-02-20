import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { WalkerCard, SafePointCard } from '../../components/pettodo/Cards';
import { MapPlaceholder } from '../../components/pettodo/MapComponents';
import { ChatView } from '../../components/pettodo/Chat';
import { VerificationBadge, NewAccountBadge } from '../../components/pettodo/Badges';
import { ReportSuspiciousModal } from '../../components/pettodo/Modals';
import { VerificationGate } from '../../components/pettodo/VerificationFlows';
import { useNavigate, useSearchParams } from 'react-router';
import { useApp } from '../../context/AppContext';
import { WALKER, SAFE_POINT } from '../../data/demoData';
import { MapPin, Star, Filter, Flag, Send, Shield, CheckCircle, AlertTriangle, Clock, Calendar, Briefcase, Footprints, Scissors, Home, GraduationCap } from 'lucide-react';
import type { Provider } from '../../data/storage';

const CAT_LABELS: Record<string, string> = {
  walkers: 'Walkers',
  grooming: 'Grooming',
  daycare: 'Daycare',
  training: 'Training',
};

const CAT_ICONS: Record<string, React.ReactNode> = {
  walkers: <Footprints size={14} />,
  grooming: <Scissors size={14} />,
  daycare: <Home size={14} />,
  training: <GraduationCap size={14} />,
};

// SRV_01
export function SRV_01() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const { store } = useApp();
  const initialCat = (params.get('cat') ?? 'walkers') as Provider['category'];
  const [cat, setCat] = useState<Provider['category']>(initialCat);

  const providers = store.providers.filter(p => p.category === cat);

  const catTitle: Record<string, string> = {
    walkers: 'Dog Walkers',
    grooming: 'Dog Grooming & Baths',
    daycare: 'Dog Daycare',
    training: 'Professional Training',
  };

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_01_WalkerMarketplace_MapListFilters" />
      <AppBar title={catTitle[cat] ?? 'Services'} showBack />
      <div className="flex-1 flex flex-col">

        {/* Category tabs */}
        <div className="flex px-4 py-2 gap-1.5 overflow-x-auto" style={{ borderBottom: '1px solid var(--gray-200)' }}>
          {(['walkers', 'grooming', 'daycare', 'training'] as Provider['category'][]).map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] shrink-0"
              style={{
                background: cat === c ? 'var(--gray-900)' : 'var(--gray-100)',
                color: cat === c ? 'var(--white)' : 'var(--gray-700)',
                fontWeight: 600,
                minHeight: 36,
              }}
            >
              {CAT_ICONS[c]}
              {CAT_LABELS[c]}
            </button>
          ))}
        </div>

        <div className="px-4 py-2 flex items-center gap-2">
          <div className="flex-1 px-3 py-2 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 44 }}>
            <span className="text-[14px]" style={{ color: 'var(--gray-400)' }}>Search {CAT_LABELS[cat].toLowerCase()}...</span>
          </div>
          <button className="p-2 rounded-xl" style={{ background: 'var(--gray-100)', minWidth: 44, minHeight: 44 }}>
            <Filter size={18} style={{ color: 'var(--gray-500)' }} />
          </button>
        </div>

        <div className="px-4">
          <MapPlaceholder height={130} />
        </div>

        <div className="flex-1 p-4 flex flex-col gap-2">
          <Banner type="noPayments" text="PETTODO does not process payments. First meet at a safe point is recommended." />

          {providers.length === 0 ? (
            <p className="text-[14px] text-center py-8" style={{ color: 'var(--gray-400)' }}>No providers in this category yet.</p>
          ) : (
            providers.map(p => (
              <button
                key={p.id}
                onClick={() => nav(`/walkers/profile?id=${p.id}`)}
                className="flex items-start gap-3 p-3 rounded-xl text-left"
                style={{ background: 'var(--white)', border: '1px solid var(--gray-200)', minHeight: 72 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: 'var(--gray-100)', shrink: 0 }}>
                  👤
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{p.name}</span>
                    {p.verifiedLevel === 'strict' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: 'var(--green-bg)', color: 'var(--green-dark)', fontWeight: 700 }}>STRICT</span>
                    )}
                    {p.verifiedLevel === 'basic' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px]" style={{ background: 'var(--info-bg)', color: 'var(--info-dark)', fontWeight: 700 }}>BASIC</span>
                    )}
                  </div>
                  <p className="text-[12px] mt-0.5" style={{ color: 'var(--gray-500)' }}>{p.zoneLabel}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-0.5">
                      <Star size={11} fill="var(--warning)" style={{ color: 'var(--warning)' }} />
                      <span className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{p.rating}</span>
                    </div>
                    <span className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{p.priceHint}</span>
                  </div>
                </div>
              </button>
            ))
          )}

          {cat === 'walkers' && (
            <div className="mt-2 pt-3" style={{ borderTop: '1px solid var(--gray-200)' }}>
              <Btn variant="secondary" fullWidth icon={<Briefcase size={16} />} onClick={() => nav('/walkers/onboarding')}>
                Become a Walker
              </Btn>
              <p className="text-[11px] text-center mt-2" style={{ color: 'var(--gray-500)' }}>
                Strict verification required for public listing
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// SRV_02
export function SRV_02() {
  const nav = useNavigate();
  const { walkerAvailability, setWalkerAvailability } = useApp();
  
  const toggleDay = (d: string) => {
    const days = walkerAvailability.days.includes(d) 
      ? walkerAvailability.days.filter(x => x !== d)
      : [...walkerAvailability.days, d];
    setWalkerAvailability({ ...walkerAvailability, days });
  };

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_02_WalkerProfile_BadgesRulesReviews" />
      <AppBar title="Walker Profile" showBack backTo="/walkers/marketplace" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'var(--gray-100)' }}>
            <span className="text-3xl">👤</span>
          </div>
          <div>
            <h3 className="text-[20px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{WALKER.name}</h3>
            <VerificationBadge level="strict" />
            <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>{WALKER.since}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star size={16} fill="var(--warning)" style={{ color: 'var(--warning)' }} />
            <span className="text-[16px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{WALKER.rating}</span>
          </div>
          <span className="text-[13px]" style={{ color: 'var(--gray-500)' }}>{WALKER.walks} walks completed</span>
        </div>

        <NewAccountBadge />
        
        {/* Availability Stub */}
        <div>
          <h4 className="text-[14px] mb-2" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Availability</h4>
          <div className="flex gap-2 flex-wrap mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => {
              const active = walkerAvailability.days.includes(d);
              return (
                <button 
                  key={d}
                  onClick={() => toggleDay(d)}
                  className="px-2 py-1 rounded-lg text-[12px] transition-colors"
                  style={{ 
                    background: active ? 'var(--info-bg)' : 'var(--gray-100)', 
                    color: active ? 'var(--info-dark)' : 'var(--gray-500)',
                    fontWeight: active ? 600 : 400
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>
          <div className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
            Usually available: <span style={{ color: 'var(--gray-900)', fontWeight: 500 }}>Mornings, Afternoons</span>
          </div>
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Walker rules</p>
          <ul className="mt-1.5 flex flex-col gap-1">
            <li className="text-[12px]" style={{ color: 'var(--gray-700)' }}>• First meeting at a safe point (recommended)</li>
            <li className="text-[12px]" style={{ color: 'var(--gray-700)' }}>• Check-in/out at each walk session</li>
            <li className="text-[12px]" style={{ color: 'var(--gray-700)' }}>• Photo updates during walks</li>
            <li className="text-[12px]" style={{ color: 'var(--gray-700)' }}>• Incident reporting within 24h</li>
          </ul>
        </div>

        <h4 className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Reviews</h4>
        {WALKER.reviews.map((r, i) => (
          <div key={i} className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{r.author}</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={10} fill="var(--warning)" style={{ color: 'var(--warning)' }} />
                ))}
              </div>
            </div>
            <p className="text-[12px]" style={{ color: 'var(--gray-700)' }}>{r.text}</p>
          </div>
        ))}

        <Btn variant="primary" fullWidth onClick={() => nav('/walkers/request')}>Request Walk</Btn>
      </div>
    </div>
  );
}

// SRV_03
export function SRV_03() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_03_RequestWalker_Form" />
      <AppBar title="Request Walk" showBack backTo="/walkers/profile" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Select pet</label>
          <div className="px-3 py-2.5 rounded-xl flex items-center gap-2" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
            <span>🐕</span>
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>Luna</span>
          </div>
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Date</label>
          <div className="px-3 py-2.5 rounded-xl flex items-center gap-2" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
            <Calendar size={16} style={{ color: 'var(--gray-400)' }} />
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>Tomorrow — February 20, 2026</span>
          </div>
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Time</label>
          <div className="px-3 py-2.5 rounded-xl flex items-center gap-2" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
            <Clock size={16} style={{ color: 'var(--gray-400)' }} />
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>9:00 AM — 10:00 AM</span>
          </div>
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Special instructions</label>
          <textarea className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 72 }} placeholder="Any notes for the walker..." />
        </div>

        <Banner type="noPayments" text="PETTODO does not process payments" />

        <Btn variant="primary" fullWidth onClick={() => nav('/walkers/confirmation')}>Send Request</Btn>
      </div>
    </div>
  );
}

// SRV_04
export function SRV_04() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_04_RequestConfirmation_ChatEnabled" />
      <AppBar title="Request Sent" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
          <CheckCircle size={32} style={{ color: 'var(--green-primary)' }} />
        </div>
        <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Walk request sent!</h3>
        <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
          {WALKER.name} will respond shortly. Chat is now enabled.
        </p>

        <div className="w-full p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[13px]" style={{ color: 'var(--gray-700)' }}>
            <strong>Luna</strong> · Tomorrow, 9:00–10:00 AM · Walker: {WALKER.name}
          </p>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Btn variant="primary" fullWidth onClick={() => nav('/walkers/chat')}>Open Chat with {WALKER.name}</Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/walkers/marketplace')}>Back to Walkers</Btn>
        </div>
      </div>
    </div>
  );
}

// SRV_05
export function SRV_05() {
  const nav = useNavigate();
  const [showReport, setShowReport] = useState(false);
  const msgs = [
    { id: 1, sender: 'system' as const, text: 'Chat with Carlos R. — Walk request confirmed. PETTODO does not process payments.' },
    { id: 2, sender: 'other' as const, text: 'Hi! I accepted your walk request for Luna tomorrow at 9 AM.' },
    { id: 3, sender: 'me' as const, text: 'Great! She gets excited around other dogs, so keep a firm hold.' },
    { id: 4, sender: 'other' as const, text: 'No worries, I\'m experienced with that. See you tomorrow!' },
  ];
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_05_WalkerChat_NoPaymentsBanner" />
      <div className="flex items-center justify-between px-4 py-2" style={{ background: 'var(--green-bg)', borderBottom: '1px solid var(--green-soft)' }}>
        <button onClick={() => nav(-1)} className="text-[14px]" style={{ color: 'var(--green-primary)', minHeight: 44 }}>← Back</button>
        <span className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{WALKER.name}</span>
        <button onClick={() => setShowReport(true)} style={{ color: 'var(--red-primary)', minHeight: 44, minWidth: 44 }}>
          <Flag size={16} />
        </button>
      </div>
      <Banner type="noPayments" text="PETTODO does not process payments. No upfront payments or deposits." />
      <ChatView messages={msgs} />
      <div className="px-4 pb-3">
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
      <div className="px-4 pb-3">
        <Btn variant="daily" fullWidth onClick={() => nav('/walkers/first-meet')}>Arrange First Meet</Btn>
      </div>
      <ReportSuspiciousModal open={showReport} onClose={() => setShowReport(false)} />
    </div>
  );
}

// SRV_06
export function SRV_06() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_06_FirstMeet_SafePointOption" />
      <AppBar title="First Meeting" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>First meet with {WALKER.name}</h3>
        <Banner type="info" text="First meetings at a safe point are recommended by default for your safety." />

        <SafePointCard name={SAFE_POINT.name} hours={SAFE_POINT.hours} distance={SAFE_POINT.distance} trusted />

        <div className="p-3 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <div className="flex items-center gap-2">
            <Shield size={14} style={{ color: 'var(--green-primary)' }} />
            <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Recommended (default)</span>
          </div>
          <p className="text-[12px] mt-1" style={{ color: 'var(--green-dark)' }}>Meet at the safe point first so Luna can get comfortable.</p>
        </div>

        <Btn variant="daily" fullWidth onClick={() => nav('/walkers/walk-session')}>Confirm First Meet</Btn>
        <Btn variant="ghost" fullWidth>Choose different location</Btn>
      </div>
    </div>
  );
}

// SRV_07
export function SRV_07() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_07_WalkSession_CheckInOut" />
      <AppBar title="Walk Session" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="p-4 rounded-xl text-center" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Walk in progress</p>
          <p className="text-[24px] mt-1" style={{ fontWeight: 700, color: 'var(--green-dark)', fontFamily: 'monospace' }}>00:32:15</p>
          <p className="text-[12px] mt-1" style={{ color: 'var(--green-dark)' }}>Luna with {WALKER.name}</p>
        </div>

        <MapPlaceholder height={160} />

        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl text-center" style={{ background: 'var(--gray-100)' }}>
            <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>Check-in</p>
            <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--green-primary)' }}>9:00 AM ✓</p>
          </div>
          <div className="p-3 rounded-xl text-center" style={{ background: 'var(--gray-100)' }}>
            <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>Expected check-out</p>
            <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>10:00 AM</p>
          </div>
        </div>

        <Btn variant="daily" fullWidth onClick={() => nav('/walkers/post-session')}>
          <CheckCircle size={16} /> Check Out — End Walk
        </Btn>
      </div>
    </div>
  );
}

// SRV_08
export function SRV_08() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_08_PostSession_Review" />
      <AppBar title="Review Walk" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="text-center">
          <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>How was the walk?</h3>
          <p className="text-[13px] mt-1" style={{ color: 'var(--gray-500)' }}>Rate {WALKER.name}'s walk with Luna</p>
        </div>

        <div className="flex items-center justify-center gap-2 py-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} style={{ minWidth: 44, minHeight: 44 }}>
              <Star size={32} fill={s <= 5 ? 'var(--warning)' : 'none'} style={{ color: 'var(--warning)' }} />
            </button>
          ))}
        </div>

        <textarea className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 72 }} placeholder="Write a review (optional)..." />

        <div className="flex flex-col gap-2 mt-auto pb-4">
          <Btn variant="primary" fullWidth onClick={() => nav('/walkers/incident-report')}>Submit Review</Btn>
          <Btn variant="destructive" fullWidth onClick={() => nav('/walkers/incident-report')}>
            <AlertTriangle size={16} /> Report Incident
          </Btn>
        </div>
      </div>
    </div>
  );
}

// SRV_09
export function SRV_09() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_09_IncidentReport_Strikes" />
      <AppBar title="Incident Report" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <Banner type="antiscam" text="Incident reports affect the walker's reputation. Please be accurate." />

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>What happened?</label>
          {['Dog escaped briefly', 'Dog was injured', 'Walker was late (>15 min)', 'Walker was a no-show', 'Unprofessional behavior', 'Other'].map((r) => (
            <button key={r} className="w-full text-left px-3 py-2.5 rounded-xl mb-1 text-[14px]" style={{ background: 'var(--gray-100)', minHeight: 44, color: 'var(--gray-700)' }}>
              {r}
            </button>
          ))}
        </div>

        <textarea className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 72 }} placeholder="Additional details..." />

        <div className="p-3 rounded-xl" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
          <p className="text-[12px]" style={{ color: 'var(--warning)', fontWeight: 500 }}>
            Strike system: Walkers receive strikes for confirmed incidents. 3 strikes = account suspension.
          </p>
        </div>

        <Btn variant="destructive" fullWidth onClick={() => nav('/walkers/marketplace')}>Submit Incident Report</Btn>
      </div>
    </div>
  );
}

// SRV_10
export function SRV_10() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_10_WalkerStrictVerification_OnboardingStatus" />
      <AppBar title="Walker Verification" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Walker onboarding status</h3>

        <VerificationGate requiredLevel="strict" actionLabel="Walker onboarding">
          <div className="flex flex-col gap-3">
            {[
              { step: 'SMS Verification', done: true },
              { step: 'ID + Selfie (Strict)', done: true },
              { step: 'Background acknowledgment', done: true },
              { step: 'Safety rules acceptance', done: false },
              { step: 'First walk completed', done: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: s.done ? 'var(--green-bg)' : 'var(--gray-100)', minHeight: 48 }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: s.done ? 'var(--green-primary)' : 'var(--gray-200)' }}>
                  {s.done ? <CheckCircle size={14} style={{ color: 'var(--white)' }} /> : <span className="text-[12px]" style={{ color: 'var(--gray-400)', fontWeight: 600 }}>{i + 1}</span>}
                </div>
                <span className="text-[14px]" style={{ color: s.done ? 'var(--green-dark)' : 'var(--gray-700)', fontWeight: s.done ? 500 : 400 }}>{s.step}</span>
              </div>
            ))}
            <Banner type="info" text="This action requires Strict verification (ID + Selfie)." />
          </div>
        </VerificationGate>
      </div>
    </div>
  );
}