import React, { useState, useRef } from 'react';
import { LUNA, LOST_CASE, FLYER_SHARE_TEXT, FLYER_SAFETY_REMINDER } from '../../data/demoData';
import { Btn } from './Buttons';
import { Banner } from './Banners';
import { Modal } from './Modals';
import { toast } from 'sonner';
import { Image, FileText, Download, Share2, Copy, Link, Shield, X } from 'lucide-react';
import { downloadFlyerPNG, downloadFlyerPDF } from '../../utils/flyerDownload';
import { QRCodeSVG } from 'qrcode.react';

const QR_URL = `https://pettodo.app/case/${LOST_CASE.id}`;

export const FlyerPreview = React.forwardRef<HTMLDivElement, { type?: 'lost' | 'found' }>(
  ({ type = 'lost' }, ref) => {
  const isLost = type === 'lost';
  const headerBg = isLost ? 'var(--red-primary)' : 'var(--green-primary)';
  const label = isLost ? 'LOST DOG' : 'FOUND DOG';
  const traits = [LUNA.size, ...LUNA.colors, LUNA.collar ? 'Collar' : ''].filter(Boolean);

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden" style={{ border: `2px solid ${isLost ? 'var(--red-soft)' : 'var(--green-soft)'}`, boxShadow: 'var(--shadow-md)' }}>
      {/* Header */}
      <div className="p-3 text-center" style={{ background: headerBg }}>
        <p className="text-[22px]" style={{ fontWeight: 800, color: 'var(--white)', letterSpacing: '0.05em' }}>{label}</p>
      </div>
      
      {/* Body */}
      <div className="p-4 flex flex-col items-center gap-3" style={{ background: 'var(--white)' }}>
        {/* Photo */}
        <div className="w-36 h-36 rounded-xl flex items-center justify-center" style={{ background: 'var(--gray-100)' }}>
          <span className="text-6xl">🐕</span>
        </div>

        {/* Name */}
        <p className="text-[20px]" style={{ fontWeight: 800, color: 'var(--gray-900)' }}>{LUNA.name}</p>
        
        {/* Description */}
        <p className="text-[13px] text-center" style={{ color: 'var(--gray-700)' }}>
          {LUNA.breed} · {LUNA.description}
        </p>

        {/* Trait chips */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {traits.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full text-[11px]" style={{
              background: isLost ? 'var(--red-bg)' : 'var(--green-bg)',
              color: isLost ? 'var(--red-dark)' : 'var(--green-dark)',
              fontWeight: 600,
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Location + Time */}
        <div className="w-full p-3 rounded-xl text-center" style={{ background: isLost ? 'var(--red-bg)' : 'var(--green-bg)' }}>
          <p className="text-[13px]" style={{ fontWeight: 600, color: isLost ? 'var(--red-dark)' : 'var(--green-dark)' }}>
            Last seen: {LOST_CASE.location}
          </p>
          <p className="text-[12px] mt-0.5" style={{ color: isLost ? 'var(--red-dark)' : 'var(--green-dark)' }}>
            {LOST_CASE.time}
          </p>
        </div>

        {/* Real QR Code */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-24 h-24 rounded-xl flex items-center justify-center p-2" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)' }}>
            <QRCodeSVG value={QR_URL} size={80} level="M" />
          </div>
          <p className="text-[10px]" style={{ color: 'var(--gray-400)' }}>Scan to report a sighting</p>
          <p className="text-[11px]" style={{ color: 'var(--info)', fontWeight: 500 }}>pettodo.app/case/{LOST_CASE.id}</p>
        </div>
      </div>
    </div>
  );
});

export function ShareKitActions() {
  const [showPreview, setShowPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const flyerRef = useRef<HTMLDivElement>(null);
  const modalFlyerRef = useRef<HTMLDivElement>(null);

  const getFlyerElement = (): HTMLDivElement | null => modalFlyerRef.current || flyerRef.current;

  const handleDownloadPNG = async () => {
    const el = getFlyerElement();
    if (!el) { toast.error('Flyer not ready'); return; }
    setDownloading(true);
    try {
      await downloadFlyerPNG(el, `pettodo-flyer-${LOST_CASE.id}.png`);
      toast.success('PNG downloaded');
    } catch {
      toast.error('PNG download failed');
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadPDF = async () => {
    const el = getFlyerElement();
    if (!el) { toast.error('Flyer not ready'); return; }
    setDownloading(true);
    try {
      await downloadFlyerPDF(el, `pettodo-flyer-${LOST_CASE.id}.pdf`);
      toast.success('PDF downloaded');
    } catch {
      toast.error('PDF download failed');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard?.writeText?.(FLYER_SHARE_TEXT).catch(() => {});
    toast.success('Share text copied to clipboard');
  };

  const handleShareLink = () => {
    navigator.clipboard?.writeText?.('pettodo.app/case/' + LOST_CASE.id).catch(() => {});
    toast.success('Share link copied: pettodo.app/case/' + LOST_CASE.id);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden flyer for capture when modal is closed */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <FlyerPreview ref={flyerRef} />
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Btn variant="secondary" onClick={handleDownloadPNG} icon={<Image size={16} />} disabled={downloading}>
          {downloading ? 'Wait…' : 'Download PNG'}
        </Btn>
        <Btn variant="secondary" onClick={handleDownloadPDF} icon={<FileText size={16} />} disabled={downloading}>
          {downloading ? 'Wait…' : 'Download PDF'}
        </Btn>
        <Btn variant="secondary" onClick={handleCopyText} icon={<Copy size={16} />}>
          Copy Text
        </Btn>
        <Btn variant="secondary" onClick={handleShareLink} icon={<Link size={16} />}>
          Share Link
        </Btn>
      </div>

      {/* Share Kit Panel */}
      <div className="p-3 rounded-xl flex flex-col gap-2" style={{ background: 'var(--gray-100)' }}>
        <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Share Kit</p>
        
        {/* Suggested text */}
        <div className="p-2.5 rounded-lg" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)' }}>
          <p className="text-[11px] whitespace-pre-line" style={{ color: 'var(--gray-700)', fontFamily: 'monospace' }}>
            {FLYER_SHARE_TEXT}
          </p>
        </div>

        {/* Short link */}
        <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)' }}>
          <Link size={14} style={{ color: 'var(--info)' }} />
          <span className="text-[12px] flex-1" style={{ color: 'var(--info)', fontWeight: 500 }}>
            pettodo.app/case/{LOST_CASE.id}
          </span>
          <button onClick={handleShareLink} className="text-[11px] px-2 py-1 rounded" style={{ background: 'var(--info-bg)', color: 'var(--info-dark)', fontWeight: 600, minHeight: 28 }}>
            Copy
          </button>
        </div>

        {/* Safety reminder */}
        <div className="flex items-start gap-2 px-2.5 py-2 rounded-lg" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
          <Shield size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--warning)' }} />
          <span className="text-[11px]" style={{ color: 'var(--warning-dark)', fontWeight: 500 }}>
            {FLYER_SAFETY_REMINDER}
          </span>
        </div>
      </div>

      {/* Preview modal button */}
      <Btn variant="ghost" onClick={() => setShowPreview(true)} icon={<Image size={16} />}>
        Preview Full Flyer
      </Btn>

      {/* Preview Modal */}
      <Modal open={showPreview} onClose={() => setShowPreview(false)} title="Flyer Preview">
        <div className="max-h-[60vh] overflow-y-auto -mx-1">
          <FlyerPreview ref={modalFlyerRef} />
        </div>
        <div className="mt-3 flex gap-2">
          <Btn variant="secondary" className="flex-1" onClick={handleDownloadPNG} icon={<Download size={14} />} disabled={downloading}>Save</Btn>
          <Btn variant="emergency" className="flex-1" onClick={() => { handleShareLink(); setShowPreview(false); }} icon={<Share2 size={14} />}>Share</Btn>
        </div>
      </Modal>
    </div>
  );
}
