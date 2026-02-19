import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { ModeSwitch } from '../../components/pettodo/ModeSwitch';
import { Btn } from '../../components/pettodo/Buttons';
import { Banner } from '../../components/pettodo/Banners';
import { StatusChip, ConfidenceBadge, VerificationBadge, EventTrustBadge, FreshnessBadge, PhotoQualityBadge, DirectionChip, NewAccountBadge, MatchReasonTag } from '../../components/pettodo/Badges';
import { MapLegend, RadiusSelector } from '../../components/pettodo/MapComponents';
import { Stepper } from '../../components/pettodo/Stepper';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function DS_01() {
  const nav = useNavigate();
  const [radius, setRadius] = useState(500);
  return (
    <div className="flex flex-col min-h-full pb-8" style={{ background: 'var(--white)' }}>
      <ScreenLabel name="01_Design_System" />
      <div className="p-4 flex flex-col gap-6">
        <button onClick={() => nav('/')} className="flex items-center gap-1" style={{ minHeight: 44, color: 'var(--gray-500)' }}>
          <ChevronLeft size={20} /> Home
        </button>

        <h1 className="text-[22px]" style={{ fontWeight: 700 }}>PETTODO Design System</h1>

        {/* Colors */}
        <section>
          <h2 className="text-[17px] mb-3" style={{ fontWeight: 600 }}>Colors</h2>
          <div className="grid grid-cols-4 gap-2">
            {[
              { name: 'Red Primary', var: '--red-primary' },
              { name: 'Red Dark', var: '--red-dark' },
              { name: 'Red Soft', var: '--red-soft' },
              { name: 'Red BG', var: '--red-bg' },
              { name: 'Green Primary', var: '--green-primary' },
              { name: 'Green Dark', var: '--green-dark' },
              { name: 'Green Soft', var: '--green-soft' },
              { name: 'Green BG', var: '--green-bg' },
              { name: 'Gray 900', var: '--gray-900' },
              { name: 'Gray 500', var: '--gray-500' },
              { name: 'Gray 200', var: '--gray-200' },
              { name: 'Gray 100', var: '--gray-100' },
              { name: 'Info', var: '--info' },
              { name: 'Warning', var: '--warning' },
              { name: 'White', var: '--white' },
            ].map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-lg" style={{ background: `var(${c.var})`, border: '1px solid var(--gray-200)' }} />
                <span className="text-[9px] text-center" style={{ color: 'var(--gray-500)' }}>{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mode Switch */}
        <section>
          <h2 className="text-[17px] mb-3" style={{ fontWeight: 600 }}>Mode Switch</h2>
          <ModeSwitch />
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-[17px] mb-3" style={{ fontWeight: 600 }}>Buttons</h2>
          <div className="flex flex-col gap-2">
            <Btn variant="primary">Primary</Btn>
            <Btn variant="secondary">Secondary</Btn>
            <Btn variant="destructive">Destructive</Btn>
            <Btn variant="emergency">Emergency</Btn>
            <Btn variant="daily">Daily</Btn>
            <Btn variant="ghost">Ghost</Btn>
            <Btn variant="disabled">Disabled</Btn>
            <Btn variant="loading">Loading</Btn>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-[17px] mb-3" style={{ fontWeight: 600 }}>Badges & Chips</h2>
          <div className="flex flex-wrap gap-2">
            <StatusChip status="lost" />
            <StatusChip status="found" />
            <StatusChip status="sighted" />
            <StatusChip status="resolved" />
            <ConfidenceBadge value={87} />
            <ConfidenceBadge value={65} />
            <ConfidenceBadge value={35} />
            <VerificationBadge level="sms" />
            <VerificationBadge level="strict" />
            <EventTrustBadge type="ai" />
            <EventTrustBadge type="community" />
            <FreshnessBadge />
            <DirectionChip direction="SE" />
            <NewAccountBadge />
            <MatchReasonTag reason="similar color" />
            <MatchReasonTag reason="near your area" />
          </div>
        </section>

        {/* Photo Quality */}
        <section>
          <h2 className="text-[17px] mb-3" style={{ fontWeight: 600 }}>Photo Quality</h2>
          <div className="flex flex-col gap-2">
            <PhotoQualityBadge quality="good" />
            <PhotoQualityBadge quality="ok" />
            <PhotoQualityBadge quality="poor" />
          </div>
        </section>

        {/* Banners */}
        <section>
          <h2 className="text-[17px] mb-3" style={{ fontWeight: 600 }}>Banners</h2>
          <div className="flex flex-col gap-2">
            <Banner type="info" text="Your exact location is protected" />
            <Banner type="warning" text="Possible match (AI doesn't confirm)" />
            <Banner type="antiscam" text="Do not share your address" />
            <Banner type="activeCase" text="You have 1 active case. Luna is still missing." />
            <Banner type="privacy" text="Approximate area only — exact address is hidden." />
            <Banner type="success" text="Case resolved — Luna is home!" />
            <Banner type="noPayments" text="PETTODO does not process payments" />
            <Banner type="calm" text="Stay calm — we'll guide you step by step" />
          </div>
        </section>

        {/* Stepper */}
        <section>
          <h2 className="text-[17px] mb-3" style={{ fontWeight: 600 }}>Stepper</h2>
          <Stepper steps={['Photos', 'Location', 'Time', 'Traits', 'Publish']} current={2} />
        </section>

        {/* Map components */}
        <section>
          <h2 className="text-[17px] mb-3" style={{ fontWeight: 600 }}>Map Components</h2>
          <MapLegend />
          <div className="mt-3">
            <RadiusSelector value={radius} onChange={setRadius} />
          </div>
        </section>
      </div>
    </div>
  );
}
