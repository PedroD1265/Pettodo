import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Stepper } from '../../components/pettodo/Stepper';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { MapPlaceholder, RadiusSelector } from '../../components/pettodo/MapComponents';
import { MatchCard } from '../../components/pettodo/Cards';
import { useNavigate } from 'react-router';
import { Camera, Plus, QrCode, CheckCircle, Eye, MapPin } from 'lucide-react';
import { MATCHES, LOST_CASE } from '../../data/demoData';

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
  const [radius, setRadius] = useState(500);
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_09_Found_PrivacyRadius" />
      <AppBar title="Report Found Dog" showBack backTo="/emg/found-photos" />
      <Stepper steps={['Photos', 'Privacy', 'QR Scan', 'Publish']} current={1} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <h3 className="text-[17px] mb-1" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Set privacy area</h3>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Only an approximate area is shown — not your exact address.</p>
        </div>
        <MapPlaceholder height={180} />
        <RadiusSelector value={radius} onChange={setRadius} />
        <Banner type="privacy" text="Your exact location is protected" />
        <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Approximate area only — exact address is hidden.</p>
        <div className="mt-auto">
          <Btn variant="daily" fullWidth onClick={() => nav('/emg/found-qr-scan')}>Next: QR Scan</Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_10
export function EMG_10() {
  const nav = useNavigate();
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
          <Btn variant="primary" fullWidth icon={<QrCode size={18} />}>Scan QR Code</Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/emg/found-published')}>Skip — No QR Found</Btn>
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
      <ScreenLabel name="EMG_11_Found_Published_SuggestedMatches" />
      <AppBar title="Found Report Published" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
            <CheckCircle size={24} style={{ color: 'var(--green-primary)' }} />
          </div>
          <div>
            <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Report Published</h3>
            <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Owners with matching lost dogs will be notified.</p>
          </div>
        </div>

        <div>
          <h3 className="text-[15px] mb-1" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Suggested matches</h3>
          <p className="text-[12px] mb-2 px-2 py-1 rounded-lg inline-block" style={{ background: '#FFFBEB', color: 'var(--warning)', fontWeight: 500 }}>
            Possible match (AI doesn't confirm)
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {MATCHES.slice(0, 3).map((m) => (
            <MatchCard key={m.id} {...m} onClick={() => nav('/emg/matching-top10')} />
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-auto pb-4">
          <Btn variant="primary" fullWidth onClick={() => nav('/emg/matching-top10')}>View All Matches</Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/emg/chat')}>Open Chat</Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/emg/safe-point-select')}>Arrange Safe Handoff</Btn>
        </div>
      </div>
    </div>
  );
}

// EMG_12
export function EMG_12() {
  const nav = useNavigate();
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
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>Central Park, West 72nd St</span>
          </div>
        </div>

        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Description</label>
          <textarea className="w-full px-3 py-2.5 rounded-xl text-[14px]" style={{ background: 'var(--gray-100)', minHeight: 72 }} placeholder="What did the dog look like? Direction heading?" />
        </div>

        <div className="mt-auto pb-4">
          <Btn variant="primary" fullWidth onClick={() => nav('/emg/sighted-success')}>Submit Sighting</Btn>
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
          <Btn variant="primary" fullWidth>Follow Case</Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/emg/case-detail-sighted')}>View Case Details</Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/home-emergency')}>Go Home</Btn>
        </div>
      </div>
    </div>
  );
}
