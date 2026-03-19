import React, { useState, useRef } from 'react';
import { Btn } from './Buttons';
import { Modal } from './Modals';
import { toast } from 'sonner';
import { Image, FileText, Download, Share2, Copy, Link, Shield, Search } from 'lucide-react';
import { downloadFlyerPNG, downloadFlyerPDF } from '../../utils/flyerDownload';
import { QRCodeSVG } from 'qrcode.react';

export interface FlyerData {
  caseId: string;
  type: 'lost' | 'found' | 'sighted';
  title: string;
  subtitle: string;
  description: string;
  location: string;
  timeLabel: string;
  traits: string[];
  photoUrl?: string | null;
  shareUrl?: string | null;
  shareText: string;
  safetyReminder: string;
}

function getDisplayLink(shareUrl?: string | null): string {
  if (!shareUrl) return '';

  try {
    const url = new URL(shareUrl);
    return `${url.host}${url.pathname}`;
  } catch {
    return shareUrl;
  }
}

export const FlyerPreview = React.forwardRef<HTMLDivElement, { data: FlyerData }>(
  ({ data }, ref) => {
    const isLost = data.type === 'lost';
    const isFound = data.type === 'found';
    const headerBg = isLost ? 'var(--red-primary)' : isFound ? 'var(--green-primary)' : 'var(--warning)';
    const label = isLost ? 'LOST DOG' : isFound ? 'FOUND DOG' : 'DOG SIGHTED';
    const displayLink = getDisplayLink(data.shareUrl);

    return (
      <div ref={ref} className="rounded-2xl overflow-hidden" style={{
        border: `2px solid ${isLost ? 'var(--red-soft)' : isFound ? 'var(--green-soft)' : 'var(--warning-soft)'}`,
        boxShadow: 'var(--shadow-md)',
        background: 'var(--white)',
      }}>
        <div className="p-3 text-center" style={{ background: headerBg }}>
          <p className="text-[22px]" style={{ fontWeight: 800, color: 'var(--white)', letterSpacing: '0.05em' }}>{label}</p>
        </div>

        <div className="p-4 flex flex-col items-center gap-3" style={{ background: 'var(--white)' }}>
          {data.photoUrl ? (
            <img src={data.photoUrl} alt={data.title} className="w-36 h-36 rounded-xl object-cover" style={{ background: 'var(--gray-100)' }} />
          ) : (
            <div className="w-36 h-36 rounded-xl flex items-center justify-center" style={{ background: 'var(--gray-100)' }}>
              <Search size={40} style={{ color: 'var(--gray-400)' }} />
            </div>
          )}

          <p className="text-[20px] text-center" style={{ fontWeight: 800, color: 'var(--gray-900)' }}>{data.title}</p>
          <p className="text-[13px] text-center" style={{ color: 'var(--gray-700)' }}>{data.subtitle}</p>

          {data.description && (
            <p className="text-[12px] text-center" style={{ color: 'var(--gray-600)' }}>{data.description}</p>
          )}

          {data.traits.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-center">
              {data.traits.map((trait) => (
                <span key={trait} className="px-2.5 py-1 rounded-full text-[11px]" style={{
                  background: isLost ? 'var(--red-bg)' : isFound ? 'var(--green-bg)' : 'var(--warning-bg)',
                  color: isLost ? 'var(--red-dark)' : isFound ? 'var(--green-dark)' : 'var(--warning-dark)',
                  fontWeight: 600,
                }}>
                  {trait}
                </span>
              ))}
            </div>
          )}

          <div className="w-full p-3 rounded-xl text-center" style={{
            background: isLost ? 'var(--red-bg)' : isFound ? 'var(--green-bg)' : 'var(--warning-bg)',
          }}>
            <p className="text-[13px]" style={{ fontWeight: 600, color: isLost ? 'var(--red-dark)' : isFound ? 'var(--green-dark)' : 'var(--warning-dark)' }}>
              {data.location || 'Location pending'}
            </p>
            <p className="text-[12px] mt-0.5" style={{ color: isLost ? 'var(--red-dark)' : isFound ? 'var(--green-dark)' : 'var(--warning-dark)' }}>
              {data.timeLabel || 'Time pending'}
            </p>
          </div>

          {data.shareUrl ? (
            <div className="flex flex-col items-center gap-1">
              <div className="w-24 h-24 rounded-xl flex items-center justify-center p-2" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)' }}>
                <QRCodeSVG value={data.shareUrl} size={80} level="M" />
              </div>
              <p className="text-[10px]" style={{ color: 'var(--gray-400)' }}>Scan for the public pet page</p>
              <p className="text-[11px] text-center" style={{ color: 'var(--info)', fontWeight: 500 }}>{displayLink}</p>
            </div>
          ) : (
            <div className="w-full p-3 rounded-xl text-center" style={{ background: 'var(--gray-100)' }}>
              <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>Case reference</p>
              <p className="text-[12px] font-mono" style={{ color: 'var(--gray-700)', fontWeight: 600 }}>{data.caseId}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

FlyerPreview.displayName = 'FlyerPreview';

export function ShareKitActions({ data }: { data: FlyerData }) {
  const [showPreview, setShowPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const flyerRef = useRef<HTMLDivElement>(null);
  const modalFlyerRef = useRef<HTMLDivElement>(null);
  const displayLink = getDisplayLink(data.shareUrl);

  const getFlyerElement = (): HTMLDivElement | null => modalFlyerRef.current || flyerRef.current;

  const handleDownloadPNG = async () => {
    const el = getFlyerElement();
    if (!el) { toast.error('Flyer not ready'); return; }
    setDownloading(true);
    try {
      await downloadFlyerPNG(el, `pettodo-flyer-${data.caseId}.png`);
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
      await downloadFlyerPDF(el, `pettodo-flyer-${data.caseId}.pdf`);
      toast.success('PDF downloaded');
    } catch {
      toast.error('PDF download failed');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard?.writeText?.(data.shareText);
      toast.success('Share text copied to clipboard');
    } catch {
      toast.error('Could not copy share text');
    }
  };

  const handleShareLink = async () => {
    if (!data.shareUrl) {
      toast.error('This report does not have a public link yet');
      return;
    }

    try {
      await navigator.clipboard?.writeText?.(data.shareUrl);
      toast.success(`Share link copied: ${displayLink}`);
    } catch {
      toast.error('Could not copy share link');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <FlyerPreview ref={flyerRef} data={data} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Btn variant="secondary" onClick={handleDownloadPNG} icon={<Image size={16} />} disabled={downloading}>
          {downloading ? 'Wait...' : 'Download PNG'}
        </Btn>
        <Btn variant="secondary" onClick={handleDownloadPDF} icon={<FileText size={16} />} disabled={downloading}>
          {downloading ? 'Wait...' : 'Download PDF'}
        </Btn>
        <Btn variant="secondary" onClick={handleCopyText} icon={<Copy size={16} />}>
          Copy Text
        </Btn>
        <Btn variant="secondary" onClick={handleShareLink} icon={<Link size={16} />} disabled={!data.shareUrl}>
          {data.shareUrl ? 'Copy Link' : 'No Public Link'}
        </Btn>
      </div>

      <div className="p-3 rounded-xl flex flex-col gap-2" style={{ background: 'var(--gray-100)' }}>
        <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Share Kit</p>

        <div className="p-2.5 rounded-lg" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)' }}>
          <p className="text-[11px] whitespace-pre-line" style={{ color: 'var(--gray-700)', fontFamily: 'monospace' }}>
            {data.shareText}
          </p>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg" style={{ background: 'var(--white)', border: '1px solid var(--gray-200)' }}>
          <Link size={14} style={{ color: data.shareUrl ? 'var(--info)' : 'var(--gray-400)' }} />
          <span className="text-[12px] flex-1" style={{ color: data.shareUrl ? 'var(--info)' : 'var(--gray-500)', fontWeight: 500 }}>
            {data.shareUrl ? displayLink : `Case ${data.caseId}`}
          </span>
          <button
            onClick={data.shareUrl ? handleShareLink : handleCopyText}
            className="text-[11px] px-2 py-1 rounded"
            style={{ background: 'var(--info-bg)', color: 'var(--info-dark)', fontWeight: 600, minHeight: 28 }}
          >
            Copy
          </button>
        </div>

        <div className="flex items-start gap-2 px-2.5 py-2 rounded-lg" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
          <Shield size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--warning)' }} />
          <span className="text-[11px]" style={{ color: 'var(--warning-dark)', fontWeight: 500 }}>
            {data.safetyReminder}
          </span>
        </div>
      </div>

      <Btn variant="ghost" onClick={() => setShowPreview(true)} icon={<Image size={16} />}>
        Preview Full Flyer
      </Btn>

      <Modal open={showPreview} onClose={() => setShowPreview(false)} title="Flyer Preview">
        <div className="max-h-[60vh] overflow-y-auto -mx-1">
          <FlyerPreview ref={modalFlyerRef} data={data} />
        </div>
        <div className="mt-3 flex gap-2">
          <Btn variant="secondary" className="flex-1" onClick={handleDownloadPNG} icon={<Download size={14} />} disabled={downloading}>Save</Btn>
          <Btn
            variant="emergency"
            className="flex-1"
            onClick={() => {
              if (data.shareUrl) {
                void handleShareLink();
              } else {
                void handleCopyText();
              }
              setShowPreview(false);
            }}
            icon={<Share2 size={14} />}
          >
            Share
          </Btn>
        </div>
      </Modal>
    </div>
  );
}
