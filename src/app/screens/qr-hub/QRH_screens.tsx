import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate } from 'react-router';
import { LUNA } from '../../data/demoData';
import { Download, Share2, Printer, Shield, Eye, Lock, AlertTriangle, Copy, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

// QRH_01
export function QRH_01() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="QRH_01_QR_Hub" />
      <AppBar title="QR Identity" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4 items-center">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Luna's QR Tag</h3>
        <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>Anyone who scans this code can see Luna's public profile and help her get home.</p>

        <div className="w-48 h-48 rounded-2xl flex items-center justify-center p-3" style={{ background: 'var(--white)', border: '2px solid var(--gray-200)' }}>
          <QRCodeSVG value="https://pettodo.app/pet/pet-luna-001" size={168} level="M" />
        </div>

        <div className="flex gap-2 w-full">
          <Btn variant="secondary" className="flex-1" icon={<Download size={16} />}></Btn>
          <Btn variant="secondary" className="flex-1" icon={<Share2 size={16} />}>Share</Btn>
          <Btn variant="secondary" className="flex-1" icon={<Printer size={16} />}>Print</Btn>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Btn variant="primary" fullWidth onClick={() => nav('/qr/config')}>Configure Public Profile</Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/qr/anti-scraping')}>Anti-Scraping Settings</Btn>
          <Btn variant="secondary" fullWidth onClick={() => nav('/qr/share-download')}>Share & Download Options</Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/qr/preview')}>Preview Public Page</Btn>
        </div>
      </div>
    </div>
  );
}

// QRH_02
export function QRH_02() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="QRH_02_QR_ConfigPublicProfile" />
      <AppBar title="Public Profile Config" showBack backTo="/qr/hub" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>What strangers can see</h3>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Configure what information is visible when someone scans Luna's QR code.</p>

        {[
          { label: 'Pet name', value: true },
          { label: 'Photo', value: true },
          { label: 'Breed / Description', value: true },
          { label: 'Owner name', value: false },
          { label: 'Phone number', value: false },
          { label: 'Microchip number', value: false },
          { label: 'Vaccination status', value: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--gray-100)' }}>
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>{item.label}</span>
            <div className="w-12 h-7 rounded-full flex items-center px-0.5 cursor-pointer" style={{ background: item.value ? 'var(--green-primary)' : 'var(--gray-300)' }}>
              <div className="w-6 h-6 rounded-full transition-all" style={{ background: 'var(--white)', marginLeft: item.value ? 18 : 0 }} />
            </div>
          </div>
        ))}

        <Banner type="privacy" text="Your exact location is protected" />
        <Btn variant="primary" fullWidth>Save Settings</Btn>
      </div>
    </div>
  );
}

// QRH_03
export function QRH_03() {
  const [exceeded, setExceeded] = useState(false);
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="QRH_03_QR_AntiScraping_CaptchaRateLimit" />
      <AppBar title="Anti-Scraping" showBack backTo="/qr/hub" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Anti-scraping protection</h3>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>These settings protect your information from automated scraping.</p>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} style={{ color: 'var(--info)' }} />
            <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Captcha verification</span>
          </div>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Visitors must pass a captcha before seeing contact info.</p>
          <div className="mt-2 w-12 h-7 rounded-full flex items-center px-0.5" style={{ background: 'var(--green-primary)' }}>
            <div className="w-6 h-6 rounded-full" style={{ background: 'var(--white)', marginLeft: 18 }} />
          </div>
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Lock size={16} style={{ color: 'var(--warning)' }} />
            <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Rate limiting</span>
          </div>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Maximum 5 contact reveals per hour per visitor.</p>
        </div>

        {/* Rate limit exceeded state */}
        <button onClick={() => setExceeded(!exceeded)} className="text-left">
          <div className="p-3 rounded-xl" style={{ background: exceeded ? 'var(--red-bg)' : 'var(--gray-100)', border: exceeded ? '1px solid var(--red-soft)' : '1px solid transparent' }}>
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} style={{ color: exceeded ? 'var(--red-primary)' : 'var(--gray-400)' }} />
              <span className="text-[13px]" style={{ fontWeight: 600, color: exceeded ? 'var(--red-dark)' : 'var(--gray-500)' }}>
                {exceeded ? 'Rate limit exceeded preview' : 'Tap to preview rate limit state'}
              </span>
            </div>
            {exceeded && (
              <p className="text-[12px] mt-1" style={{ color: 'var(--red-dark)' }}>
                Too many attempts. Try again in 60 minutes.
              </p>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

// QRH_04
export function QRH_04() {
  const handleCopy = (text: string) => {
    // navigator.clipboard.writeText(text); // In some environments this fails without permission, but for simulation we just toast
    toast.success('Copied text. Sharing is simulated in this prototype.');
  };

  const shareText = `Help Luna get home!
Breed: Medium mixed-breed
Last seen: Central Park
Contact info is protected. Use the in-app flow:
https://pettodo.app/qr/LUNA123`;

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="QRH_04_QR_ShareDownloadPrint" />
      <AppBar title="Share & Download" showBack backTo="/qr/hub" />
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        <div className="flex flex-col items-center gap-2">
           <div className="w-40 h-40 rounded-2xl flex items-center justify-center p-2" style={{ background: 'var(--white)', border: '2px solid var(--gray-200)' }}>
             <QRCodeSVG value="https://pettodo.app/pet/pet-luna-001" size={136} level="M" />
           </div>
           <p className="text-[11px] text-center px-3 py-1.5 rounded-lg" style={{ background: 'var(--gray-100)', color: 'var(--gray-500)' }}>
             Anti-scrape note: Contact info requires captcha verification
           </p>
        </div>

        {/* Share Text Panel */}
        <div className="p-3 rounded-xl border" style={{ borderColor: 'var(--gray-200)', background: 'var(--gray-50)' }}>
          <p className="text-[13px] font-mono whitespace-pre-wrap" style={{ color: 'var(--gray-700)' }}>
            {shareText}
          </p>
          <button 
            onClick={() => handleCopy(shareText)}
            className="mt-2 flex items-center gap-2 text-[12px] font-medium" 
            style={{ color: 'var(--green-primary)' }}
          >
            <Copy size={14} /> Copy Share Text
          </button>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2">
          <Btn variant="primary" fullWidth icon={<MessageCircle size={16} />} onClick={() => handleCopy(shareText)}>Share to WhatsApp</Btn>
          <Btn variant="secondary" fullWidth icon={<Instagram size={16} />} onClick={() => handleCopy(shareText)}>Share to Instagram</Btn>
          <Btn variant="secondary" fullWidth icon={<Facebook size={16} />} onClick={() => handleCopy(shareText)}>Share to Facebook</Btn>
          
          <div className="h-px w-full my-2" style={{ background: 'var(--gray-200)' }} />
          
          <Btn variant="ghost" fullWidth icon={<Download size={16} />} onClick={() => toast.success('Download simulated')}>Download QR Image (PNG)</Btn>
          <Btn variant="ghost" fullWidth icon={<Printer size={16} />} onClick={() => toast.success('Print simulated')}>Download for Print (PDF)</Btn>
        </div>
      </div>
    </div>
  );
}

// QRH_05
export function QRH_05() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="QRH_05_QR_PublicPreview" />
      <AppBar title="Public Preview" showBack backTo="/qr/hub" />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <Banner type="info" text="This is how strangers will see Luna's public profile when they scan the QR code." />

        <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid var(--gray-200)', boxShadow: 'var(--shadow-md)' }}>
          <div className="p-4 text-center" style={{ background: 'var(--green-bg)' }}>
            <span className="text-4xl">🐕</span>
            <h3 className="text-[18px] mt-2" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{LUNA.name}</h3>
            <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>{LUNA.breed}</p>
          </div>
          <div className="p-4 flex flex-col gap-2" style={{ background: 'var(--white)' }}>
            <p className="text-[13px]" style={{ color: 'var(--gray-700)' }}>{LUNA.description}</p>
            <p className="text-[13px]" style={{ color: 'var(--green-dark)', fontWeight: 600 }}>
              This dog has an owner. Help them get home.
            </p>
          </div>
        </div>

        <Btn variant="secondary" fullWidth onClick={() => nav('/public/qr-landing')}>
          Open Full Public View
        </Btn>
      </div>
    </div>
  );
}
