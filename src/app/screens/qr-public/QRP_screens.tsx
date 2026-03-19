import React, { useState, useEffect, useCallback } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate, useParams } from 'react-router';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { LUNA } from '../../data/demoData';
import { checkRevealRateLimit, recordReveal } from '../../utils/rateLimit';
import { publicApi, protectedContactApi, type ContactThreadRecord } from '../../services/api';
import { appConfig } from '../../config/appConfig';
import { toast } from 'sonner';
import { Shield, MapPin, Camera, CheckCircle, AlertTriangle, Eye, Lock, Clock3, Search } from 'lucide-react';

const isIntegration = appConfig.mode === 'integration';

interface PublicPetData {
  id: string;
  name: string;
  breed: string;
  size: string;
  colors: string[];
  marks: string;
  collar: string;
  temperament: string;
  age: string;
  microchip: string;
  vaccines: string;
  hasOwner: boolean;
  protectedContactEnabled: boolean;
  contactEntryPoint: string;
  photoUrl: string | null;
  emergencyCase: {
    id: string;
    type: 'lost' | 'found' | 'sighted';
    status: string;
    location: string;
    timeLabel: string;
    description: string;
    colors: string[];
    traits: string[];
    direction: string;
    createdAt: number;
  } | null;
}

function usePublicPet(): { pet: PublicPetData | null; loading: boolean; error: boolean } {
  const { petId } = useParams<{ petId?: string }>();
  const [pet, setPet] = useState<PublicPetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!petId) return;
    setLoading(true);
    publicApi.getPet(petId)
      .then(data => { setPet(data as PublicPetData); setError(false); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [petId]);

  return { pet, loading, error };
}

function getPetDisplay(dbPet: PublicPetData | null) {
  if (dbPet) {
    return {
      name: dbPet.name,
      description: [dbPet.breed, dbPet.size, dbPet.colors.join(', ')].filter(Boolean).join(' / '),
      microchip: dbPet.microchip || 'Unknown',
      vaccines: dbPet.vaccines || 'Unknown',
      hasOwner: dbPet.hasOwner,
      protectedContactEnabled: dbPet.protectedContactEnabled ?? true,
      photoUrl: dbPet.photoUrl,
      emergencyCase: dbPet.emergencyCase,
      marks: dbPet.marks || 'No distinctive marks shared yet',
      collar: dbPet.collar || 'Not specified',
      temperament: dbPet.temperament || 'Not specified',
      age: dbPet.age || 'Unknown',
    };
  }
  return {
    name: '',
    description: '',
    microchip: 'Unknown',
    vaccines: 'Unknown',
    hasOwner: true,
    protectedContactEnabled: true,
    photoUrl: null,
    emergencyCase: null,
    marks: '',
    collar: 'Not specified',
    temperament: 'Not specified',
    age: 'Unknown',
  };
}

function getEmergencyHeading(type: 'lost' | 'found' | 'sighted' | null | undefined): string {
  switch (type) {
    case 'lost':
      return 'Active lost pet report';
    case 'found':
      return 'Active found pet report';
    case 'sighted':
      return 'Recent sighting report';
    default:
      return 'Public pet page';
  }
}

function getEmergencySummary(type: 'lost' | 'found' | 'sighted' | null | undefined, petName: string): string {
  switch (type) {
    case 'lost':
      return `${petName} is being actively searched for. If you saw this pet, report the area and time below.`;
    case 'found':
      return `There is an active report connected to ${petName}. Secure relay keeps owner contact protected while people coordinate safely.`;
    case 'sighted':
      return `Someone recently reported seeing ${petName}. Extra sightings help narrow the search area.`;
    default:
      return `This is the shared public page for ${petName}. Owner contact stays protected through PETTODO relay.`;
  }
}

export function QRP_01() {
  const nav = useNavigate();
  const { petId } = useParams<{ petId?: string }>();
  const { pet: dbPet, loading, error } = usePublicPet();
  const display = getPetDisplay(dbPet);
  const emergencyCase = display.emergencyCase;
  const facts = [
    { label: 'Reported area', value: emergencyCase?.location || 'Public pet page only' },
    { label: 'Reported when', value: emergencyCase?.timeLabel || 'Not shared yet' },
    { label: 'Collar', value: display.collar },
    { label: 'Temperament', value: display.temperament },
    { label: 'Microchip', value: display.microchip },
    { label: 'Vaccines', value: display.vaccines },
  ];
  const traits = Array.from(new Set([
    ...(emergencyCase?.traits ?? []),
    ...(emergencyCase?.colors ?? []),
    display.age !== 'Unknown' ? display.age : '',
  ].filter(Boolean)));

  if (loading) {
    return (
      <div className="flex flex-col min-h-full items-center justify-center" style={{ background: 'var(--white)' }}>
        <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>Loading pet info...</p>
      </div>
    );
  }

  if (!petId) {
    return (
      <div className="flex flex-col min-h-full items-center justify-center p-4 text-center" style={{ background: 'var(--white)' }}>
        <Search size={48} style={{ color: 'var(--gray-400)' }} />
        <h3 className="text-[17px] mt-3" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>No public case selected</h3>
        <p className="text-[13px] mt-1 max-w-[280px]" style={{ color: 'var(--gray-500)' }}>
          This share surface needs a valid QR or public link with a pet reference.
        </p>
      </div>
    );
  }

  if (error && petId) {
    return (
      <div className="flex flex-col min-h-full items-center justify-center p-4" style={{ background: 'var(--white)' }}>
        <AlertTriangle size={48} style={{ color: 'var(--warning)' }} />
        <h3 className="text-[17px] mt-3" style={{ fontWeight: 600 }}>Pet not found</h3>
        <p className="text-[13px] mt-1 text-center" style={{ color: 'var(--gray-500)' }}>This QR code may be invalid or the pet profile is no longer available.</p>
      </div>
    );
  }

  const captchaPath = `/public/qr-captcha/${petId}`;
  const reportPath = `/public/qr-report/${petId}`;

  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="QRP_01_QRPublic_LandingPetCard" />
      <div className="px-4 py-3 text-center" style={{ background: emergencyCase ? 'var(--warning-bg)' : 'var(--green-bg)' }}>
        <p className="text-[11px]" style={{ color: emergencyCase ? 'var(--warning-dark)' : 'var(--green-dark)', fontWeight: 600 }}>
          PETTODO - Shared public pet page
        </p>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #fff7ed 0%, #ffffff 100%)', border: '1px solid var(--gray-200)' }}>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="px-2.5 py-1 rounded-full text-[11px]" style={{ background: emergencyCase ? 'var(--warning-soft)' : 'var(--green-soft)', color: emergencyCase ? 'var(--warning-dark)' : 'var(--green-dark)', fontWeight: 600 }}>
                {getEmergencyHeading(emergencyCase?.type)}
              </div>
              {emergencyCase?.timeLabel && (
                <div className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--gray-500)' }}>
                  <Clock3 size={12} />
                  <span>{emergencyCase.timeLabel}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              {display.photoUrl ? (
                <img
                  src={display.photoUrl}
                  alt={display.name}
                  className="w-full max-w-[260px] h-[220px] rounded-2xl object-cover"
                />
              ) : (
                <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
                  <span className="text-5xl">&#x1F415;</span>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <h2 className="text-[24px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{display.name}</h2>
                <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>{display.description || 'Public pet profile'}</p>
              </div>

              <p className="text-[13px] max-w-[320px]" style={{ color: 'var(--gray-700)' }}>
                {getEmergencySummary(emergencyCase?.type, display.name)}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full p-4 rounded-2xl" style={{ background: emergencyCase ? 'var(--warning-bg)' : 'var(--green-bg)', border: emergencyCase ? '1px solid var(--warning-soft)' : '1px solid var(--green-soft)' }}>
          <p className="text-[15px]" style={{ fontWeight: 700, color: emergencyCase ? 'var(--warning-dark)' : 'var(--green-dark)' }}>
            {emergencyCase?.type === 'lost' ? 'Help this pet get home.' : 'This pet has an owner.'}
          </p>
          <p className="text-[13px] mt-1" style={{ color: emergencyCase ? 'var(--warning-dark)' : 'var(--green-dark)' }}>
            {emergencyCase?.description || 'Use the actions below to securely report a sighting or contact the owner through relay.'}
          </p>
        </div>

        <div className="w-full p-4 rounded-2xl" style={{ background: 'var(--gray-100)' }}>
          <div className="flex flex-col gap-3">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-start justify-between gap-3">
                <span className="text-[13px]" style={{ color: 'var(--gray-500)' }}>{fact.label}</span>
                <span className="text-[13px] text-right" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{fact.value || '-'}</span>
              </div>
            ))}
          </div>
        </div>

        {!!traits.length && (
          <div className="w-full p-4 rounded-2xl" style={{ background: 'var(--gray-100)' }}>
            <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Helpful identification notes</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {traits.map((trait) => (
                <span
                  key={trait}
                  className="px-2.5 py-1 rounded-full text-[12px]"
                  style={{ background: 'var(--white)', color: 'var(--gray-700)', border: '1px solid var(--gray-200)' }}
                >
                  {trait}
                </span>
              ))}
            </div>
            <p className="text-[12px] mt-3" style={{ color: 'var(--gray-500)' }}>
              Marks: {display.marks}
            </p>
          </div>
        )}

        <div className="w-full p-4 rounded-2xl flex items-start gap-3" style={{ background: 'var(--gray-100)' }}>
          <Lock size={16} style={{ color: 'var(--gray-500)', marginTop: 2 }} />
          <div>
            <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Owner contact stays protected</p>
            <p className="text-[12px] mt-1" style={{ color: 'var(--gray-600)' }}>
              PETTODO relays messages without exposing direct owner phone, email, or exact home address.
            </p>
          </div>
        </div>

        <div className="w-full p-4 rounded-2xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>What you can do now</p>
          <div className="mt-3 flex flex-col gap-2">
            <Btn variant="primary" fullWidth onClick={() => nav(reportPath)}>
              <MapPin size={16} /> I found or spotted this pet
            </Btn>
            <Btn variant="secondary" fullWidth onClick={() => nav(captchaPath)}>
              <Shield size={16} /> Contact Owner (Secure Relay)
            </Btn>
          </div>
          <p className="text-[12px] mt-3" style={{ color: 'var(--gray-500)' }}>
            Share only approximate public location details. Use relay or a safe public handoff point for direct coordination.
          </p>
        </div>

        <p className="text-[11px] text-center pb-4" style={{ color: 'var(--gray-400)' }}>
          Powered by PETTODO - Public share surface with protected owner relay
        </p>
      </div>
    </div>
  );
}

export function QRP_02() {
  const nav = useNavigate();
  const { petId } = useParams<{ petId?: string }>();
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaNumbers] = useState(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { a, b, answer: a + b };
  });
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const handleVerify = () => {
    if (!checkRevealRateLimit()) {
      toast.error('Too many attempts. Please wait before trying again.');
      return;
    }
    if (parseInt(captchaInput) === captchaNumbers.answer) {
      setVerified(true);
      recordReveal();
      const contactPath = petId ? `/public/qr-contact/${petId}` : '/public/qr-contact';
      setTimeout(() => nav(contactPath), 1200);
    } else {
      setError(true);
      toast.error('Incorrect answer. Please try again.');
    }
  };

  const landingPath = petId ? `/public/qr-landing/${petId}` : '/public/qr-landing';

  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="QRP_02_QRPublic_ShowContact_Captcha" />
      <div className="px-4 py-3 text-center" style={{ background: 'var(--green-bg)' }}>
        <p className="text-[11px]" style={{ color: 'var(--green-dark)', fontWeight: 500 }}>PETTODO — Verify Human</p>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
        {verified ? (
          <>
            <CheckCircle size={48} style={{ color: 'var(--green-primary)' }} />
            <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Verified!</h3>
            <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Opening secure contact...</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--green-bg)' }}>
              <Shield size={32} style={{ color: 'var(--green-primary)' }} />
            </div>
            <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
              Prove you're human
            </h3>
            <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>
              We protect owner data from scrapers. Solve this captcha to start a secure relay message.
            </p>

            <div className="w-full p-4 rounded-xl flex flex-col gap-3 items-center" style={{ background: 'var(--gray-100)' }}>
              <p className="text-[16px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
                What is {captchaNumbers.a} + {captchaNumbers.b}?
              </p>
              <input
                className="w-24 px-3 py-2 rounded-xl text-center"
                style={{ background: 'var(--white)', border: error ? '2px solid var(--red-primary)' : '2px solid var(--gray-300)', fontSize: 18 }}
                value={captchaInput}
                onChange={e => { setCaptchaInput(e.target.value); setError(false); }}
                type="number"
                inputMode="numeric"
              />
            </div>

            <div className="w-full p-3 rounded-xl flex items-start gap-2" style={{ background: 'var(--gray-100)' }}>
              <Lock size={14} style={{ color: 'var(--gray-500)', marginTop: 2 }} />
              <p className="text-[12px]" style={{ color: 'var(--gray-600)' }}>
                Verification opens a secure relay thread. Owner contact info stays hidden unless the owner chooses to share it.
              </p>
            </div>

            <Btn variant="primary" fullWidth onClick={handleVerify}>Verify &amp; Contact Owner</Btn>
            <button
              className="text-[13px]"
              style={{ color: 'var(--gray-400)' }}
              onClick={() => nav(landingPath)}
            >
              &#x2190; Back to pet profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── QRP_03 — Report sighting/found via QR ───────────────────────────────────
export function QRP_03() {
  const nav = useNavigate();
  const { petId } = useParams<{ petId?: string }>();
  const { addSighting } = useApp();
  const { user } = useAuth();
  const { pet: dbPet } = usePublicPet();
  const petName = dbPet?.name ?? LUNA.name;
  const [reportType, setReportType] = useState<'found' | 'sighted' | null>(null);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSignInGate, setShowSignInGate] = useState(false);
  const [errors, setErrors] = useState<{ location?: string; phone?: string }>({});

  const handleSelectType = (type: 'found' | 'sighted') => {
    setReportType(type);
    setErrors({});
    setShowSignInGate(false);
    if (type === 'found') {
      toast('Great — you have the dog! Fill in the details below and submit.');
    } else {
      toast('Thanks for the sighting! Fill in where you saw the dog and submit.');
    }
  };

  const handleSubmit = async () => {
    if (!reportType) {
      toast('Please select whether you have the dog or spotted it.');
      return;
    }
    const newErrors: { location?: string; phone?: string } = {};
    if (!location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (reportType === 'found' && !phone.trim()) {
      newErrors.phone = 'Phone number is required so the owner can reach you';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fill in the required fields.');
      return;
    }
    setErrors({});

    // Integration mode: use real protected contact thread
    if (isIntegration) {
      if (!user) {
        setShowSignInGate(true);
        return;
      }
      if (!petId) {
        toast.error('Pet ID is missing. Cannot submit report.');
        return;
      }
      setSubmitting(true);
      try {
        const initiatorMessage = reportType === 'found'
          ? `FOUND: I have this dog with me. Location: ${location.trim()}. My phone: ${phone.trim() || 'not provided'}.`
          : `SIGHTED: I spotted this dog near: ${location.trim()}.`;
        const thread = await protectedContactApi.createThread({
          petId,
          initiatorMessage,
          initiatorPhone: phone.trim() || undefined,
        });
        setSubmitted(true);
        // Navigate to the protected contact thread so the owner can be notified
        setTimeout(() => nav(`/public/qr-contact/${petId}`), 1200);
        void thread; // thread is now the active thread (idempotent)
      } catch (err: any) {
        toast.error(err?.message || 'Failed to submit report. Please try again.');
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // Demo mode: local AppContext sighting (unchanged)
    addSighting({
      caseId: 'CASE-2026-0219',
      lat: 40.7741 + (Math.random() - 0.5) * 0.01,
      lng: -73.9715 + (Math.random() - 0.5) * 0.01,
      location: location || 'Near QR scan location',
      time: 'Just now',
      note: reportType === 'found' ? 'Finder has the dog — via QR scan' : 'Sighting reported via QR scan',
    });
    setSubmitted(true);
    const landingPath = petId ? `/public/qr-landing/${petId}` : '/public/qr-landing';
    setTimeout(() => nav(landingPath), 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
        <ScreenLabel name="QRP_03_QRPublic_ReportSeenOrFound" />
        <div className="px-4 py-3 text-center" style={{ background: 'var(--green-bg)' }}>
          <p className="text-[11px]" style={{ color: 'var(--green-dark)', fontWeight: 500 }}>PETTODO — Report Sighting</p>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
          <CheckCircle size={48} style={{ color: 'var(--green-primary)' }} />
          <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Report submitted!</h3>
          <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>The owner has been notified. Thank you for helping.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="QRP_03_QRPublic_ReportSeenOrFound" />
      <div className="px-4 py-3 text-center" style={{ background: 'var(--green-bg)' }}>
        <p className="text-[11px]" style={{ color: 'var(--green-dark)', fontWeight: 500 }}>PETTODO — Report Sighting</p>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Help {petName} get home</h3>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Thank you for scanning the QR code. Please tell us what you saw.</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleSelectType('found')}
            className="flex items-start gap-3 p-4 rounded-xl text-left"
            style={{
              background: reportType === 'found' ? 'var(--green-bg)' : 'var(--gray-100)',
              border: reportType === 'found' ? '2px solid var(--green-primary)' : '2px solid transparent',
              minHeight: 64,
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--green-primary)' }}>
              <CheckCircle size={20} style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>I have this dog</p>
              <p className="text-[12px]" style={{ color: 'var(--green-dark)' }}>The dog is with me and safe.</p>
            </div>
          </button>

          <button
            onClick={() => handleSelectType('sighted')}
            className="flex items-start gap-3 p-4 rounded-xl text-left"
            style={{
              background: reportType === 'sighted' ? 'var(--warning-bg)' : 'var(--gray-100)',
              border: reportType === 'sighted' ? '2px solid var(--warning)' : '2px solid transparent',
              minHeight: 64,
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--warning)' }}>
              <Eye size={20} style={{ color: 'var(--white)' }} />
            </div>
            <div>
              <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--warning)' }}>I spotted this dog</p>
              <p className="text-[12px]" style={{ color: 'var(--warning-dark)' }}>I saw this dog nearby but didn't take it.</p>
            </div>
          </button>
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: errors.location ? 'var(--red-primary)' : 'var(--gray-700)' }}>
            Where? {reportType ? '(required)' : '(optional)'}
          </label>
          <input
            className="w-full px-3 py-2.5 rounded-xl"
            style={{ background: 'var(--gray-100)', minHeight: 48, border: errors.location ? '1px solid var(--red-primary)' : 'none' }}
            placeholder="Location or address"
            value={location}
            onChange={e => { setLocation(e.target.value); setErrors(prev => ({ ...prev, location: undefined })); }}
          />
          {errors.location && <p className="text-[11px] mt-0.5" style={{ color: 'var(--red-primary)' }}>{errors.location}</p>}
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-400)' }}>Photo (not available yet)</label>
          <div className="h-16 rounded-xl flex flex-col items-center justify-center gap-1" style={{ background: 'var(--gray-50)', border: '2px dashed var(--gray-200)' }}>
            <Camera size={18} style={{ color: 'var(--gray-300)' }} />
            <span className="text-[10px]" style={{ color: 'var(--gray-400)' }}>Photo upload not available yet</span>
          </div>
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: errors.phone ? 'var(--red-primary)' : 'var(--gray-700)' }}>
            Your phone {reportType === 'found' ? '(required — so owner can contact you)' : '(optional)'}
          </label>
          <input
            className="w-full px-3 py-2.5 rounded-xl"
            style={{ background: 'var(--gray-100)', minHeight: 48, border: errors.phone ? '1px solid var(--red-primary)' : 'none' }}
            placeholder="+1 (555) ..."
            value={phone}
            onChange={e => { setPhone(e.target.value); setErrors(prev => ({ ...prev, phone: undefined })); }}
          />
          {errors.phone && <p className="text-[11px] mt-0.5" style={{ color: 'var(--red-primary)' }}>{errors.phone}</p>}
        </div>

        {/* Sign-in gate (integration mode, unauthenticated) */}
        {showSignInGate && (
          <div className="p-3 rounded-xl flex flex-col gap-2" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
            <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--warning-dark)' }}>Sign in to submit your report</p>
            <p className="text-[12px]" style={{ color: 'var(--warning-dark)' }}>
              Reporting via PETTODO requires a verified identity so the owner can respond to you securely through our relay.
            </p>
            <Btn variant="primary" fullWidth onClick={() => nav('/auth/sign-in')}>Sign in to continue</Btn>
          </div>
        )}

        <Btn variant="primary" fullWidth onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Report'}
        </Btn>

        <p className="text-[11px] text-center" style={{ color: 'var(--gray-400)' }}>
          Powered by PETTODO &middot; Approximate area only — exact address is hidden.
        </p>
      </div>
    </div>
  );
}

// ─── QRP_04 — Protected contact relay chat ───────────────────────────────────
export function QRP_04() {
  const nav = useNavigate();
  const { petId } = useParams<{ petId?: string }>();
  const { user, isDemo } = useAuth();
  const [threadId, setThreadId] = useState<string | null>(null);
  const [thread, setThread] = useState<ContactThreadRecord | null>(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  const landingPath = petId ? `/public/qr-landing/${petId}` : '/public/qr-landing';

  // Create thread on mount (integration mode, user logged in)
  useEffect(() => {
    if (!petId || !user || isDemo) return;
    setCreating(true);
    protectedContactApi.createThread({ petId })
      .then(t => {
        setThreadId(t.id);
        setThread(t);
      })
      .catch(err => {
        setInitError(err?.message || 'Unable to start contact thread. Please try again.');
      })
      .finally(() => setCreating(false));
  }, [petId, user, isDemo]);

  const loadThread = useCallback(async () => {
    if (!threadId) return;
    try {
      const t = await protectedContactApi.getThread(threadId);
      setThread(t);
    } catch {
      // Silently ignore poll failures
    }
  }, [threadId]);

  // Poll for new messages every 5 seconds
  useEffect(() => {
    if (!threadId) return;
    const interval = setInterval(loadThread, 5000);
    return () => clearInterval(interval);
  }, [threadId, loadThread]);

  const handleSend = async () => {
    if (!threadId || !message.trim()) return;
    setSubmitting(true);
    try {
      await protectedContactApi.sendMessage(threadId, message.trim());
      setMessage('');
      await loadThread();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  // Not logged in — require sign in for relay
  if (!user) {
    return (
      <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
        <ScreenLabel name="QRP_04_ProtectedContact_SignInRequired" />
        <div className="px-4 py-3 text-center" style={{ background: 'var(--green-bg)' }}>
          <p className="text-[11px]" style={{ color: 'var(--green-dark)', fontWeight: 500 }}>PETTODO — Secure Contact</p>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--green-bg)' }}>
            <Lock size={32} style={{ color: 'var(--green-primary)' }} />
          </div>
          <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Sign in to contact the owner</h3>
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
            Protected relay contact requires a verified identity. Sign in to send a message to the owner securely.
          </p>
          <div className="w-full p-3 rounded-xl flex items-start gap-2" style={{ background: 'var(--gray-100)' }}>
            <Shield size={14} style={{ color: 'var(--gray-500)', marginTop: 2 }} />
            <p className="text-[12px]" style={{ color: 'var(--gray-600)' }}>
              Owner contact info stays hidden. Messages go through PETTODO relay — the owner decides whether to share their contact.
            </p>
          </div>
          <Btn variant="primary" fullWidth onClick={() => nav('/auth/sign-in')}>Sign in to continue</Btn>
          <button className="text-[13px]" style={{ color: 'var(--gray-400)' }} onClick={() => nav(landingPath)}>
            ← Back to pet profile
          </button>
        </div>
      </div>
    );
  }

  // Creating thread
  if (creating) {
    return (
      <div className="flex flex-col min-h-full items-center justify-center" style={{ background: 'var(--white)' }}>
        <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>Starting secure contact...</p>
      </div>
    );
  }

  // Error creating thread
  if (initError) {
    return (
      <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
        <ScreenLabel name="QRP_04_ProtectedContact_Thread" />
        <div className="px-4 py-3 text-center" style={{ background: 'var(--warning-bg)' }}>
          <p className="text-[11px]" style={{ color: 'var(--warning-dark)', fontWeight: 500 }}>PETTODO — Secure Contact</p>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
          <AlertTriangle size={48} style={{ color: 'var(--warning)' }} />
          <h3 className="text-[17px] text-center" style={{ fontWeight: 600 }}>Unable to start contact</h3>
          <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>{initError}</p>
          <button className="text-[13px]" style={{ color: 'var(--gray-400)' }} onClick={() => nav(landingPath)}>← Back to pet profile</button>
        </div>
      </div>
    );
  }

  const messages = thread?.messages ?? [];
  const revealState = thread?.revealState ?? 'hidden';

  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="QRP_04_ProtectedContact_Thread" />
      <div className="px-4 py-3 text-center" style={{ background: 'var(--green-bg)' }}>
        <p className="text-[11px]" style={{ color: 'var(--green-dark)', fontWeight: 500 }}>PETTODO — Secure Relay Chat</p>
      </div>

      {/* Relay status notice */}
      <div className="px-4 pt-3">
        <div className="p-3 rounded-xl flex items-start gap-2" style={{ background: revealState === 'revealed' ? 'var(--green-bg)' : 'var(--gray-100)', border: revealState === 'revealed' ? '1px solid var(--green-soft)' : 'none' }}>
          <Lock size={14} style={{ color: revealState === 'revealed' ? 'var(--green-dark)' : 'var(--gray-500)', marginTop: 2 }} />
          <div>
            <p className="text-[12px]" style={{ fontWeight: 600, color: revealState === 'revealed' ? 'var(--green-dark)' : 'var(--gray-900)' }}>
              {revealState === 'revealed' ? 'Owner has shared contact info' : 'Secure relay active'}
            </p>
            <p className="text-[11px]" style={{ color: revealState === 'revealed' ? 'var(--green-dark)' : 'var(--gray-500)' }}>
              {revealState === 'revealed'
                ? 'The owner chose to share their contact details in this thread.'
                : 'Owner contact info is hidden. Messages go through PETTODO relay only.'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto" style={{ minHeight: 200 }}>
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-8">
            <p className="text-[13px] text-center" style={{ color: 'var(--gray-400)' }}>
              Send a message to notify the owner.{'\n'}Your contact info is also protected by the relay.
            </p>
          </div>
        )}
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`p-3 rounded-xl ${msg.isSystem ? 'self-center' : msg.senderUid === user?.uid ? 'self-end' : 'self-start'}`}
            style={{
              maxWidth: msg.isSystem ? '90%' : '80%',
              background: msg.isSystem
                ? 'var(--gray-100)'
                : msg.senderUid === user?.uid
                  ? 'var(--green-bg)'
                  : 'var(--gray-100)',
              border: msg.isSystem ? '1px solid var(--gray-200)' : 'none',
            }}
          >
            {msg.isSystem && (
              <span className="text-[10px] block mb-1" style={{ color: 'var(--gray-400)', textAlign: 'center' }}>System</span>
            )}
            <p className="text-[13px]" style={{ color: 'var(--gray-900)' }}>{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="p-4" style={{ borderTop: '1px solid var(--gray-200)' }}>
        <div className="flex gap-2 mb-2">
          <input
            className="flex-1 px-3 py-2.5 rounded-xl text-[14px]"
            style={{ background: 'var(--gray-100)', minHeight: 44 }}
            placeholder="Type a message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            disabled={submitting || !message.trim()}
            className="px-4 rounded-xl"
            style={{
              background: submitting || !message.trim() ? 'var(--gray-300)' : 'var(--green-primary)',
              color: 'var(--white)',
              minHeight: 44,
              fontWeight: 600,
              fontSize: 14,
              border: 'none',
              cursor: submitting || !message.trim() ? 'default' : 'pointer',
            }}
          >
            {submitting ? '...' : 'Send'}
          </button>
        </div>
        <button
          className="text-[11px] block text-center w-full"
          style={{ color: 'var(--gray-400)' }}
          onClick={() => nav(landingPath)}
        >
          ← Back to pet profile
        </button>
      </div>
    </div>
  );
}
