import React, { useState, useEffect } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate, useParams } from 'react-router';
import { useApp } from '../../context/AppContext';
import { LUNA } from '../../data/demoData';
import { checkRevealRateLimit, recordReveal } from '../../utils/rateLimit';
import { publicApi } from '../../services/api';
import { toast } from 'sonner';
import { Shield, MapPin, Camera, CheckCircle, AlertTriangle, Eye, Lock } from 'lucide-react';

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
      .then(data => { setPet(data); setError(false); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [petId]);

  return { pet, loading, error };
}

function getPetDisplay(dbPet: PublicPetData | null) {
  if (dbPet) {
    return {
      name: dbPet.name,
      description: [dbPet.breed, dbPet.size, dbPet.colors.join(', ')].filter(Boolean).join(' · '),
      microchip: dbPet.microchip || 'Unknown',
      vaccines: dbPet.vaccines || 'Unknown',
      hasOwner: dbPet.hasOwner,
    };
  }
  return {
    name: LUNA.name,
    description: LUNA.description,
    microchip: 'Yes',
    vaccines: 'Up to date',
    hasOwner: true,
  };
}

// QRP_01 — Public shell, no app chrome
export function QRP_01() {
  const nav = useNavigate();
  const { petId } = useParams<{ petId?: string }>();
  const { contactRevealed } = useApp();
  const { pet: dbPet, loading, error } = usePublicPet();
  const display = getPetDisplay(dbPet);

  if (loading) {
    return (
      <div className="flex flex-col min-h-full items-center justify-center" style={{ background: 'var(--white)' }}>
        <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>Loading pet info...</p>
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

  const captchaPath = petId ? `/public/qr-captcha/${petId}` : '/public/qr-captcha';
  const reportPath = petId ? `/public/qr-report/${petId}` : '/public/qr-report';

  return (
    <div className="flex flex-col min-h-full" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="QRP_01_QRPublic_LandingPetCard" />
      <div className="px-4 py-3 text-center" style={{ background: 'var(--green-bg)' }}>
        <p className="text-[11px]" style={{ color: 'var(--green-dark)', fontWeight: 500 }}>PETTODO — Pet Identity</p>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4 items-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
          <span className="text-5xl">&#x1F415;</span>
        </div>

        <h2 className="text-[22px] text-center" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{display.name}</h2>
        <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>{display.description}</p>

        <div className="w-full p-4 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <p className="text-[15px] text-center" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>
            This dog has an owner. Help them get home.
          </p>
        </div>

        <div className="w-full p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Description</span>
              <span className="text-[13px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{display.description}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Microchip</span>
              <span className="text-[13px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{display.microchip}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Vaccines</span>
              <span className="text-[13px]" style={{ fontWeight: 500, color: 'var(--green-primary)' }}>{display.vaccines}</span>
            </div>
          </div>
        </div>

        {contactRevealed && (
          <div className="w-full p-3 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
            <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Owner contact revealed</p>
            <p className="text-[14px] mt-1" style={{ color: 'var(--green-dark)' }}>&#x1F4DE; +1 (555) 987-6543</p>
            <p className="text-[12px] mt-0.5" style={{ color: 'var(--green-dark)' }}>Alex J.</p>
          </div>
        )}

        <div className="w-full flex flex-col gap-2">
          {!contactRevealed && (
            <Btn variant="primary" fullWidth onClick={() => nav(captchaPath)}>
              <Eye size={16} /> Show Owner Contact
            </Btn>
          )}
          <Btn variant="secondary" fullWidth onClick={() => nav(reportPath)}>
            <MapPin size={16} /> I found/spotted this dog
          </Btn>
        </div>

        <p className="text-[11px] text-center" style={{ color: 'var(--gray-400)' }}>
          Powered by PETTODO &middot; Privacy protected
        </p>
      </div>
    </div>
  );
}

// QRP_02
export function QRP_02() {
  const nav = useNavigate();
  const { petId } = useParams<{ petId?: string }>();
  const { setContactRevealed } = useApp();
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
      setContactRevealed(true);
      recordReveal();
      const landingPath = petId ? `/public/qr-landing/${petId}` : '/public/qr-landing';
      setTimeout(() => nav(landingPath), 1200);
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
            <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Redirecting to pet profile...</p>
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
              We protect owner data from scrapers. Please solve this simple captcha.
            </p>

            <div className="w-full p-4 rounded-xl flex flex-col gap-3 items-center" style={{ background: 'var(--gray-100)' }}>
              <p className="text-[16px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>
                What is {captchaNumbers.a} + {captchaNumbers.b}?
              </p>
              <input
                className="w-24 px-3 py-2 rounded-xl text-center"
                style={{ background: 'var(--white)', border: error ? '2px solid var(--red-primary)' : '2px solid var(--gray-300)', fontSize: 18 }}
                value={captchaInput}
                onChange={(e) => { setCaptchaInput(e.target.value); setError(false); }}
                type="number"
                inputMode="numeric"
              />
            </div>

            <Btn variant="primary" fullWidth onClick={handleVerify}>Verify</Btn>
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

// QRP_03
export function QRP_03() {
  const nav = useNavigate();
  const { petId } = useParams<{ petId?: string }>();
  const { addSighting } = useApp();
  const { pet: dbPet } = usePublicPet();
  const petName = dbPet?.name ?? LUNA.name;
  const [reportType, setReportType] = useState<'found' | 'sighted' | null>(null);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ location?: string; phone?: string }>({});

  const handleSelectType = (type: 'found' | 'sighted') => {
    setReportType(type);
    setErrors({});
    if (type === 'found') {
      toast('Great — you have the dog! Fill in the details below and submit.');
    } else {
      toast('Thanks for the sighting! Fill in where you saw the dog and submit.');
    }
  };

  const handleSubmit = () => {
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
            onChange={(e) => { setLocation(e.target.value); setErrors(prev => ({ ...prev, location: undefined })); }}
          />
          {errors.location && <p className="text-[11px] mt-0.5" style={{ color: 'var(--red-primary)' }}>{errors.location}</p>}
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Photo (optional)</label>
          <div className="h-20 rounded-xl flex items-center justify-center" style={{ background: 'var(--gray-100)', border: '2px dashed var(--gray-300)' }}>
            <Camera size={20} style={{ color: 'var(--gray-400)' }} />
          </div>
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: errors.phone ? 'var(--red-primary)' : 'var(--gray-700)' }}>
            Your phone {reportType === 'found' ? '(required)' : '(optional)'}
          </label>
          <input
            className="w-full px-3 py-2.5 rounded-xl"
            style={{ background: 'var(--gray-100)', minHeight: 48, border: errors.phone ? '1px solid var(--red-primary)' : 'none' }}
            placeholder="+1 (555) ..."
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setErrors(prev => ({ ...prev, phone: undefined })); }}
          />
          {errors.phone && <p className="text-[11px] mt-0.5" style={{ color: 'var(--red-primary)' }}>{errors.phone}</p>}
        </div>

        <Btn variant="primary" fullWidth onClick={handleSubmit}>Submit Report</Btn>

        <p className="text-[11px] text-center" style={{ color: 'var(--gray-400)' }}>
          Powered by PETTODO &middot; Approximate area only — exact address is hidden.
        </p>
      </div>
    </div>
  );
}
