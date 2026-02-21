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
import { useNavigate, useSearchParams, useLocation } from 'react-router';
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

const CAT_TITLES: Record<string, string> = {
  walkers: 'Dog Walkers',
  grooming: 'Dog Grooming & Baths',
  daycare: 'Dog Daycare',
  training: 'Professional Training',
};

const CAT_PROFILE_TITLE: Record<string, string> = {
  walkers: 'Walker Profile',
  grooming: 'Groomer Profile',
  daycare: 'Daycare Profile',
  training: 'Trainer Profile',
};

const CAT_REQUEST_TITLE: Record<string, string> = {
  walkers: 'Request Walk',
  grooming: 'Book Grooming',
  daycare: 'Book Daycare',
  training: 'Book Training',
};

const CAT_REQUEST_SENT: Record<string, string> = {
  walkers: 'Walk request sent!',
  grooming: 'Grooming booking sent!',
  daycare: 'Daycare booking sent!',
  training: 'Training session request sent!',
};

const CAT_SESSION_TITLE: Record<string, string> = {
  walkers: 'Walk Session',
  grooming: 'Grooming Session',
  daycare: 'Daycare Session',
  training: 'Training Session',
};

const CAT_REVIEW_TITLE: Record<string, string> = {
  walkers: 'Review Walk',
  grooming: 'Review Grooming',
  daycare: 'Review Daycare',
  training: 'Review Training',
};

const CAT_PLACEHOLDER_NOTES: Record<string, string> = {
  walkers: 'Any notes for the walker...',
  grooming: 'Preferred grooming style, allergies, sensitivities...',
  daycare: 'Feeding schedule, temperament notes, pick-up time...',
  training: 'Specific behaviors to work on, goals...',
};

const CAT_RULES: Record<string, string[]> = {
  walkers: [
    'First meeting at a safe point (recommended)',
    'Check-in/out at each walk session',
    'Photo updates during walks',
    'Incident reporting within 24h',
  ],
  grooming: [
    'Review grooming portfolio before booking',
    'Share your dog\'s skin/coat concerns upfront',
    'Arrive on time or cancel 24h in advance',
    'Report any post-grooming issues within 48h',
  ],
  daycare: [
    'First trial day recommended before enrollment',
    'Vaccination records required (up to date)',
    'Drop-off and pick-up within posted hours',
    'Report any behavioral changes to daycare',
  ],
  training: [
    'Positive reinforcement methods only',
    'Attend all scheduled sessions for best results',
    'Practice homework exercises between sessions',
    'Discuss concerns with trainer openly',
  ],
};

const CAT_ROLE_LABEL: Record<string, string> = {
  walkers: 'Walker',
  grooming: 'Groomer',
  daycare: 'Daycare',
  training: 'Trainer',
};

function useCurrentProvider(): { provider: Provider | null; cat: Provider['category'] } {
  const [params] = useSearchParams();
  const { store } = useApp();
  const id = params.get('id');
  const provider = id ? store.providers.find(p => p.id === id) ?? null : null;
  const cat = provider?.category ?? (params.get('cat') as Provider['category']) ?? 'walkers';
  return { provider, cat };
}

function useLocationProvider(): { providerName: string; cat: Provider['category']; providerId: string | null } {
  const loc = useLocation();
  const state = loc.state as { providerName?: string; cat?: Provider['category']; providerId?: string } | null;
  return {
    providerName: state?.providerName ?? WALKER.name,
    cat: state?.cat ?? 'walkers',
    providerId: state?.providerId ?? null,
  };
}

// SRV_01
export function SRV_01() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const { store } = useApp();
  const initialCat = (params.get('cat') ?? 'walkers') as Provider['category'];
  const [cat, setCat] = useState<Provider['category']>(initialCat);

  const providers = store.providers.filter(p => p.category === cat);

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_01_WalkerMarketplace_MapListFilters" />
      <AppBar title={CAT_TITLES[cat] ?? 'Services'} showBack backTo="/home-daily" />
      <div className="flex-1 flex flex-col">

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
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: 'var(--gray-100)' }}>
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
  const { walkerAvailability, setWalkerAvailability, store } = useApp();
  const { provider, cat } = useCurrentProvider();

  const name = provider?.name ?? WALKER.name;
  const rating = provider?.rating ?? WALKER.rating;
  const bio = provider?.shortBio ?? '';
  const zone = provider?.zoneLabel ?? '';
  const verified = provider?.verifiedLevel ?? 'strict';
  const price = provider?.priceHint ?? '';
  const rules = CAT_RULES[cat] ?? CAT_RULES.walkers;
  const roleLabel = CAT_ROLE_LABEL[cat] ?? 'Provider';

  const toggleDay = (d: string) => {
    const days = walkerAvailability.days.includes(d)
      ? walkerAvailability.days.filter(x => x !== d)
      : [...walkerAvailability.days, d];
    setWalkerAvailability({ ...walkerAvailability, days });
  };

  const navState = { providerName: name, cat, providerId: provider?.id };

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_02_ProviderProfile" />
      <AppBar title={CAT_PROFILE_TITLE[cat] ?? 'Provider Profile'} showBack backTo={`/walkers/marketplace?cat=${cat}`} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'var(--gray-100)' }}>
            <span className="text-3xl">👤</span>
          </div>
          <div>
            <h3 className="text-[20px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{name}</h3>
            <VerificationBadge level={verified as 'strict' | 'sms'} />
            {zone && <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>{zone}</p>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star size={16} fill="var(--warning)" style={{ color: 'var(--warning)' }} />
            <span className="text-[16px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{rating}</span>
          </div>
          {price && <span className="text-[13px]" style={{ color: 'var(--gray-500)' }}>{price}</span>}
        </div>

        {bio && (
          <p className="text-[13px]" style={{ color: 'var(--gray-700)' }}>{bio}</p>
        )}

        <NewAccountBadge />

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
          <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{roleLabel} rules</p>
          <ul className="mt-1.5 flex flex-col gap-1">
            {rules.map((r, i) => (
              <li key={i} className="text-[12px]" style={{ color: 'var(--gray-700)' }}>• {r}</li>
            ))}
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

        <Btn variant="primary" fullWidth onClick={() => nav('/walkers/request', { state: navState })}>
          {CAT_REQUEST_TITLE[cat] ?? 'Request Service'}
        </Btn>
      </div>
    </div>
  );
}

// SRV_03
export function SRV_03() {
  const nav = useNavigate();
  const { providerName, cat, providerId } = useLocationProvider();
  const navState = { providerName, cat, providerId };

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_03_RequestService_Form" />
      <AppBar title={CAT_REQUEST_TITLE[cat] ?? 'Request Service'} showBack backTo={providerId ? `/walkers/profile?id=${providerId}` : '/walkers/profile'} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Select pet</label>
          <div className="px-3 py-2.5 rounded-xl flex items-center gap-2" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
            <span>🐕</span>
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>Luna</span>
          </div>
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>
            {cat === 'daycare' ? 'Drop-off date' : 'Date'}
          </label>
          <div className="px-3 py-2.5 rounded-xl flex items-center gap-2" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
            <Calendar size={16} style={{ color: 'var(--gray-400)' }} />
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>Tomorrow — February 22, 2026</span>
          </div>
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>
            {cat === 'daycare' ? 'Drop-off / Pick-up time' : 'Time'}
          </label>
          <div className="px-3 py-2.5 rounded-xl flex items-center gap-2" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
            <Clock size={16} style={{ color: 'var(--gray-400)' }} />
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>
              {cat === 'walkers' ? '9:00 AM — 10:00 AM' : cat === 'daycare' ? '8:00 AM — 5:00 PM' : '10:00 AM'}
            </span>
          </div>
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>
            {cat === 'grooming' ? 'Grooming preferences' : 'Special instructions'}
          </label>
          <textarea
            className="w-full px-3 py-2.5 rounded-xl"
            style={{ background: 'var(--gray-100)', minHeight: 72 }}
            placeholder={CAT_PLACEHOLDER_NOTES[cat] ?? 'Any notes...'}
          />
        </div>

        <Banner type="noPayments" text="PETTODO does not process payments" />

        <Btn variant="primary" fullWidth onClick={() => nav('/walkers/confirmation', { state: navState })}>
          Send Request
        </Btn>
      </div>
    </div>
  );
}

// SRV_04
export function SRV_04() {
  const nav = useNavigate();
  const { providerName, cat, providerId } = useLocationProvider();
  const navState = { providerName, cat, providerId };
  const roleLabel = CAT_ROLE_LABEL[cat] ?? 'Provider';

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_04_RequestConfirmation_ChatEnabled" />
      <AppBar title="Request Sent" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
          <CheckCircle size={32} style={{ color: 'var(--green-primary)' }} />
        </div>
        <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
          {CAT_REQUEST_SENT[cat] ?? 'Request sent!'}
        </h3>
        <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
          {providerName} will respond shortly. Chat is now enabled.
        </p>

        <div className="w-full p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[13px]" style={{ color: 'var(--gray-700)' }}>
            <strong>Luna</strong> · Tomorrow · {roleLabel}: {providerName}
          </p>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Btn variant="primary" fullWidth onClick={() => nav('/walkers/chat', { state: navState })}>
            Open Chat with {providerName}
          </Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav(`/walkers/marketplace?cat=${cat}`)}>
            Back to {CAT_LABELS[cat] ?? 'Services'}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// SRV_05
export function SRV_05() {
  const nav = useNavigate();
  const { providerName, cat, providerId } = useLocationProvider();
  const navState = { providerName, cat, providerId };
  const [showReport, setShowReport] = useState(false);
  const roleLabel = CAT_ROLE_LABEL[cat] ?? 'Provider';
  const msgs = [
    { id: 1, sender: 'system' as const, text: `Chat with ${providerName} — ${CAT_REQUEST_SENT[cat] ?? 'Request confirmed.'} PETTODO does not process payments.` },
    { id: 2, sender: 'other' as const, text: `Hi! I confirmed your request for Luna. Looking forward to it!` },
    { id: 3, sender: 'me' as const, text: 'Great! She gets excited around other dogs, so just a heads up.' },
    { id: 4, sender: 'other' as const, text: 'No worries, I\'m experienced with that. See you soon!' },
  ];
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_05_ProviderChat_NoPaymentsBanner" />
      <div className="flex items-center justify-between px-4 py-2" style={{ background: 'var(--green-bg)', borderBottom: '1px solid var(--green-soft)' }}>
        <button onClick={() => nav(-1)} className="text-[14px]" style={{ color: 'var(--green-primary)', minHeight: 44 }}>← Back</button>
        <span className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{providerName}</span>
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
        <Btn variant="daily" fullWidth onClick={() => nav('/walkers/first-meet', { state: navState })}>
          {cat === 'walkers' || cat === 'daycare' ? 'Arrange First Meet' : 'Confirm Appointment'}
        </Btn>
      </div>
      <ReportSuspiciousModal open={showReport} onClose={() => setShowReport(false)} />
    </div>
  );
}

// SRV_06
export function SRV_06() {
  const nav = useNavigate();
  const { providerName, cat, providerId } = useLocationProvider();
  const navState = { providerName, cat, providerId };
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_06_FirstMeet_SafePointOption" />
      <AppBar title="First Meeting" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
          {cat === 'walkers' || cat === 'daycare'
            ? `First meet with ${providerName}`
            : `Appointment with ${providerName}`}
        </h3>
        <Banner type="info" text={
          cat === 'walkers' || cat === 'daycare'
            ? 'First meetings at a safe point are recommended by default for your safety.'
            : 'Meeting at the provider\'s location. Check reviews and verification status.'
        } />

        {(cat === 'walkers' || cat === 'daycare') && (
          <>
            <SafePointCard name={SAFE_POINT.name} hours={SAFE_POINT.hours} distance={SAFE_POINT.distance} trusted />
            <div className="p-3 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
              <div className="flex items-center gap-2">
                <Shield size={14} style={{ color: 'var(--green-primary)' }} />
                <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Recommended (default)</span>
              </div>
              <p className="text-[12px] mt-1" style={{ color: 'var(--green-dark)' }}>Meet at the safe point first so Luna can get comfortable.</p>
            </div>
          </>
        )}

        {(cat === 'grooming' || cat === 'training') && (
          <div className="p-3 rounded-xl" style={{ background: 'var(--info-bg)', border: '1px solid var(--info-soft, var(--gray-200))' }}>
            <div className="flex items-center gap-2">
              <MapPin size={14} style={{ color: 'var(--info)' }} />
              <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--info-dark)' }}>Provider's location</span>
            </div>
            <p className="text-[12px] mt-1" style={{ color: 'var(--info-dark)' }}>
              {providerName}'s {cat === 'grooming' ? 'salon' : 'training facility'}. Check the address before heading out.
            </p>
          </div>
        )}

        <Btn variant="daily" fullWidth onClick={() => nav('/walkers/walk-session', { state: navState })}>
          {cat === 'walkers' || cat === 'daycare' ? 'Confirm First Meet' : 'Confirm Appointment'}
        </Btn>
        <Btn variant="ghost" fullWidth>Choose different location</Btn>
      </div>
    </div>
  );
}

// SRV_07
export function SRV_07() {
  const nav = useNavigate();
  const { providerName, cat, providerId } = useLocationProvider();
  const navState = { providerName, cat, providerId };
  const sessionLabel = cat === 'walkers' ? 'Walk in progress' : cat === 'grooming' ? 'Grooming in progress' : cat === 'daycare' ? 'Daycare session active' : 'Training in progress';

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_07_ServiceSession_CheckInOut" />
      <AppBar title={CAT_SESSION_TITLE[cat] ?? 'Service Session'} showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="p-4 rounded-xl text-center" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>{sessionLabel}</p>
          <p className="text-[24px] mt-1" style={{ fontWeight: 700, color: 'var(--green-dark)', fontFamily: 'monospace' }}>00:32:15</p>
          <p className="text-[12px] mt-1" style={{ color: 'var(--green-dark)' }}>Luna with {providerName}</p>
        </div>

        {cat === 'walkers' && <MapPlaceholder height={160} />}

        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl text-center" style={{ background: 'var(--gray-100)' }}>
            <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>
              {cat === 'daycare' ? 'Drop-off' : 'Check-in'}
            </p>
            <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--green-primary)' }}>
              {cat === 'daycare' ? '8:00 AM ✓' : '9:00 AM ✓'}
            </p>
          </div>
          <div className="p-3 rounded-xl text-center" style={{ background: 'var(--gray-100)' }}>
            <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>
              {cat === 'daycare' ? 'Expected pick-up' : 'Expected check-out'}
            </p>
            <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
              {cat === 'daycare' ? '5:00 PM' : '10:00 AM'}
            </p>
          </div>
        </div>

        <Btn variant="daily" fullWidth onClick={() => nav('/walkers/post-session', { state: navState })}>
          <CheckCircle size={16} /> {cat === 'daycare' ? 'Pick Up — End Session' : 'Check Out — End Session'}
        </Btn>
      </div>
    </div>
  );
}

// SRV_08
export function SRV_08() {
  const nav = useNavigate();
  const { providerName, cat, providerId } = useLocationProvider();
  const roleLabel = CAT_ROLE_LABEL[cat] ?? 'Provider';

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_08_PostSession_Review" />
      <AppBar title={CAT_REVIEW_TITLE[cat] ?? 'Review Service'} showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="text-center">
          <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
            {cat === 'walkers' ? 'How was the walk?' : cat === 'grooming' ? 'How was the grooming?' : cat === 'daycare' ? 'How was the daycare?' : 'How was the training?'}
          </h3>
          <p className="text-[13px] mt-1" style={{ color: 'var(--gray-500)' }}>
            Rate {providerName}'s service with Luna
          </p>
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
          <Btn variant="primary" fullWidth onClick={() => nav(`/walkers/marketplace?cat=${cat}`)}>Submit Review</Btn>
          <Btn variant="destructive" fullWidth onClick={() => nav('/walkers/incident-report', { state: { providerName, cat, providerId } })}>
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
  const { providerName, cat, providerId } = useLocationProvider();
  const roleLabel = CAT_ROLE_LABEL[cat] ?? 'Provider';

  const incidentOptions: Record<string, string[]> = {
    walkers: ['Dog escaped briefly', 'Dog was injured', 'Walker was late (>15 min)', 'Walker was a no-show', 'Unprofessional behavior', 'Other'],
    grooming: ['Skin irritation after grooming', 'Unwanted haircut style', 'Dog was stressed/scared', 'Groomer was late or no-show', 'Hygiene concerns', 'Other'],
    daycare: ['Dog was injured during play', 'Not enough supervision', 'Feeding instructions ignored', 'Late pick-up not communicated', 'Facility cleanliness issues', 'Other'],
    training: ['Harsh training methods used', 'Trainer was late or no-show', 'No visible progress', 'Dog was stressed during session', 'Unprofessional communication', 'Other'],
  };

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="SRV_09_IncidentReport_Strikes" />
      <AppBar title="Incident Report" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <Banner type="antiscam" text={`Incident reports affect the ${roleLabel.toLowerCase()}'s reputation. Please be accurate.`} />

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>What happened?</label>
          {(incidentOptions[cat] ?? incidentOptions.walkers).map((r) => (
            <button key={r} className="w-full text-left px-3 py-2.5 rounded-xl mb-1 text-[14px]" style={{ background: 'var(--gray-100)', minHeight: 44, color: 'var(--gray-700)' }}>
              {r}
            </button>
          ))}
        </div>

        <textarea className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 72 }} placeholder="Additional details..." />

        <div className="p-3 rounded-xl" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
          <p className="text-[12px]" style={{ color: 'var(--warning)', fontWeight: 500 }}>
            Strike system: {roleLabel}s receive strikes for confirmed incidents. 3 strikes = account suspension.
          </p>
        </div>

        <Btn variant="destructive" fullWidth onClick={() => nav(`/walkers/marketplace?cat=${cat}`)}>Submit Incident Report</Btn>
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
