import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Stepper } from '../../components/pettodo/Stepper';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { MapPlaceholder, RadiusSelector } from '../../components/pettodo/MapComponents';
import { useNavigate } from 'react-router';
import { Camera, Plus, QrCode, CheckCircle, Eye, MapPin, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../../context/AppContext';

// EMG_08
export function EMG_08() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_08_Found_EvidenceMultiPhoto" />
      <AppBar title="Report Found Dog" showBack backTo="/emg/entry" />
      <Stepper steps={['Photos', 'Privacy', 'QR Scan', 'Publish']} current={0} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <h3 className="text-[17px] mb-1" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Take photos of the dog</h3>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Multiple angles help match this dog with their owner.</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Front', 'Side', 'Collar/Tags'].map((label) => (
            <div key={label} className="aspect-square rounded-xl flex flex-col items-center justify-center gap-1" style={{ background: 'var(--gray-100)', border: '2px dashed var(--gray-300)' }}>
              <Camera size={20} style={{ color: 'var(--gray-400)' }} />
              <span className="text-[9px]" style={{ color: 'var(--gray-400)' }}>{label}</span>
            </div>
          ))}
        </div>
        <Banner type="info" text="Better photos improve match accuracy" />
        <div className="mt-auto">
          <Btn variant="daily" fullWidth onClick={() => nav('/emg/found-radius')}>Next: Set Privacy Area</Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_09
export function EMG_09() {
  const nav = useNavigate();
  const [radius, setRadius] = useState(300);

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_09_Found_PrivacyRadius" />
      <AppBar title="Report Found Dog" showBack backTo="/emg/found-photos" />
      <Stepper steps={['Photos', 'Privacy', 'QR Scan', 'Publish']} current={1} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <h3 className="text-[17px] mb-1" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Set privacy area</h3>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
            Only an approximate area is shown — not your exact address.
          </p>
        </div>

        {/* Map Preview with Dynamic Radius */}
        <div 
          className="relative rounded-xl overflow-hidden flex items-center justify-center w-full" 
          style={{ background: 'var(--gray-100)', height: 200, border: '1px solid var(--gray-200)' }}
        >
          {/* Map Texture Simulation */}
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'radial-gradient(var(--gray-400) 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }} />
          <MapPin size={48} className="absolute opacity-20" style={{ color: 'var(--gray-400)' }} />

          {/* Privacy Circle Overlay */}
          <div 
            className="absolute rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-300"
            style={{
              width: radius === 300 ? '120px' : radius === 500 ? '160px' : '220px',
              height: radius === 300 ? '120px' : radius === 500 ? '160px' : '220px',
              borderColor: 'var(--green-primary)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)', // green-500 equivalent opacity
            }}
          >
             {/* Center indicator (hidden for privacy or generic dot) */}
             <div className="w-2 h-2 rounded-full" style={{ background: 'var(--green-primary)' }} />
          </div>
        </div>

        {/* Segmented Control */}
        <div className="flex flex-col gap-2">
          <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Privacy radius</span>
          <div className="flex gap-2">
            {[300, 500, 1000].map((r) => {
              const isSelected = radius === r;
              const label = r === 1000 ? '1km' : `${r}m`;
              return (
                <button
                  key={r}
                  onClick={() => setRadius(r)}
                  className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all border"
                  style={{
                    background: isSelected ? 'var(--green-soft)' : 'var(--white)',
                    borderColor: isSelected ? 'var(--green-primary)' : 'var(--gray-200)',
                    minHeight: 56
                  }}
                >
                  <span className="text-[14px]" style={{ fontWeight: isSelected ? 700 : 500, color: isSelected ? 'var(--green-dark)' : 'var(--gray-900)' }}>
                    {label}
                  </span>
                  {r === 300 && (
                    <span className="text-[10px]" style={{ color: isSelected ? 'var(--green-dark)' : 'var(--gray-500)' }}>
                      (recommended)
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <Banner type="privacy" text="Your exact location is protected. Only an approximate area is shown to protect your privacy." />
        
        <div className="mt-auto">
          <Btn variant="daily" fullWidth onClick={() => nav('/emg/found-qr-scan')}>Continue</Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_10
export function EMG_10() {
  const nav = useNavigate();
  const { createCase } = useApp();
  const [publishing, setPublishing] = useState(false);

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const created = await createCase({ type: 'found' });
      nav('/emg/found-published', { state: { caseId: created.id } });
    } catch (err: any) {
      console.error('[EMG_10] createCase failed:', err);
      toast.error(err?.message || 'Failed to publish report. Please try again.');
      setPublishing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_10_Found_QRScanOption" />
      <AppBar title="Report Found Dog" showBack backTo="/emg/found-radius" />
      <Stepper steps={['Photos', 'Privacy', 'QR Scan', 'Publish']} current={2} />
      <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'var(--gray-100)' }}>
          <QrCode size={40} style={{ color: 'var(--info)' }} />
        </div>
        <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Does the dog have a QR tag?</h3>
        <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>
          If the dog has a PETTODO QR tag, scan it to instantly connect with the owner.
        </p>
        <div className="w-full flex flex-col gap-2">
          <Btn variant="primary" fullWidth icon={<QrCode size={18} />} onClick={handlePublish} disabled={publishing}>
            {publishing ? 'Publishing...' : 'Scan QR Code'}
          </Btn>
          <Btn variant="secondary" fullWidth onClick={handlePublish} disabled={publishing}>
            {publishing ? 'Publishing...' : 'Skip — No QR Found'}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_11
export function EMG_11() {
  const nav = useNavigate();


  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_11_Found_Published" />
      <AppBar title="Found Report Published" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-3 pt-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
            <CheckCircle size={32} style={{ color: 'var(--green-primary)' }} />
          </div>
          <h2 className="text-[20px] text-center" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Report Published!</h2>
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>Your found dog report is now live. Owners with matching lost dogs will be notified.</p>
        </div>

        <div className="p-4 rounded-xl flex flex-col items-center gap-2" style={{ background: 'var(--gray-100)' }}>
          <Search size={20} style={{ color: 'var(--gray-400)' }} />
          <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>AI matching is not yet available. Matches will appear here once the feature is active.</p>
        </div>

        <div className="flex flex-col gap-2 mt-auto pb-4">
          <Btn variant="primary" fullWidth onClick={() => nav('/emg/cases')}>My Reports</Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/home-emergency')}>Go Home</Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_12
export function EMG_12() {
  const nav = useNavigate();
  const { createCase } = useApp();
  const [description, setDescription] = useState('');
  const [location] = useState('Central Park, West 72nd St');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const created = await createCase({
        type: 'sighted',
        location,
        description,
      });
      nav('/emg/sighted-success', { state: { caseId: created.id } });
    } catch (err: any) {
      console.error('[EMG_12] createCase failed:', err);
      toast.error(err?.message || 'Failed to submit sighting. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_12_Sighted_Report" />
      <AppBar title="Report Sighting" showBack backTo="/emg/entry" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px] mb-1" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Report a dog sighting</h3>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Your sighting can help reunite a dog with their family.</p>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Photo (optional but helpful)</label>
          <div className="h-28 rounded-xl flex items-center justify-center" style={{ background: 'var(--gray-100)', border: '2px dashed var(--gray-300)' }}>
            <Camera size={24} style={{ color: 'var(--gray-400)' }} />
          </div>
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Where did you see the dog?</label>
          <MapPlaceholder height={120} />
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl mt-2" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
            <MapPin size={16} style={{ color: 'var(--gray-400)' }} />
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>{location}</span>
          </div>
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Description</label>
          <textarea
            className="w-full px-3 py-2.5 rounded-xl text-[14px]"
            style={{ background: 'var(--gray-100)', minHeight: 72, resize: 'none' }}
            placeholder="What did the dog look like? Direction heading?"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="mt-auto pb-4">
          <Btn variant="primary" fullWidth onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Sighting'}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_13
export function EMG_13() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_13_Sighted_Success_FollowCase" />
      <AppBar title="Sighting Reported" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
          <CheckCircle size={32} style={{ color: 'var(--green-primary)' }} />
        </div>
        <h2 className="text-[20px] text-center" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Thank you!</h2>
        <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
          Your sighting has been added to the case and the owner has been notified.
        </p>

        <div className="w-full p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <div className="flex items-center gap-2">
            <Eye size={16} style={{ color: 'var(--warning)' }} />
            <span className="text-[13px]" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Follow this case?</span>
          </div>
          <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>Get notifications when there are updates.</p>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Btn variant="primary" fullWidth onClick={() => toast('You are now following this case. Notifications will be sent for updates.')}>Follow Case</Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/emg/case-detail-sighted')}>View Case Details</Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/home-emergency')}>Go Home</Btn>
        </div>
      </div>
    </div>
  );
}
