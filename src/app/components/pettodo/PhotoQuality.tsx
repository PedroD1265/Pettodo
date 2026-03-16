import React, { useRef, useState } from 'react';
import { Camera, Plus, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { PHOTO_GUIDANCE } from '../../data/demoData';

export type PhotoQuality = 'good' | 'ok' | 'poor';

interface PhotoSlot {
  id: number;
  label: string;
  file: File | null;
  previewUrl: string | null;
}

interface PhotoUploadGridProps {
  onQualitiesChange?: (qualities: PhotoQuality[]) => void;
  onFilesChange?: (files: File[]) => void;
  maxPhotos?: number;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function guessQuality(file: File): PhotoQuality {
  if (file.size > 500 * 1024) return 'good';
  if (file.size > 80 * 1024) return 'ok';
  return 'poor';
}

export function PhotoUploadGrid({ onQualitiesChange, onFilesChange, maxPhotos = 3 }: PhotoUploadGridProps) {
  const [slots, setSlots] = useState<PhotoSlot[]>(
    Array.from({ length: maxPhotos }, (_, i) => ({ id: i, label: i === 0 ? 'Main photo' : '', file: null, previewUrl: null })),
  );
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const filledSlots = slots.filter(s => s.file !== null);

  const triggerPick = (index: number) => {
    if (slots[index].file) return;
    setActiveSlot(index);
    fileRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || activeSlot === null) return;

    const previewUrl = await readFileAsDataUrl(file);
    const updated = slots.map((s, i) =>
      i === activeSlot ? { ...s, file, previewUrl } : s,
    );
    setSlots(updated);
    setActiveSlot(null);

    const files = updated.map(s => s.file).filter(Boolean) as File[];
    const qualities = files.map(f => guessQuality(f));
    onFilesChange?.(files);
    onQualitiesChange?.(qualities);
  };

  const handleRemove = (index: number) => {
    const updated = slots.map((s, i) =>
      i === index ? { ...s, file: null, previewUrl: null } : s,
    );
    setSlots(updated);
    const files = updated.map(s => s.file).filter(Boolean) as File[];
    const qualities = files.map(f => guessQuality(f));
    onFilesChange?.(files);
    onQualitiesChange?.(qualities);
  };

  const filledCount = filledSlots.length;

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="grid grid-cols-3 gap-2">
        {slots.map((slot, i) => (
          <div key={slot.id} className="relative aspect-square">
            <button
              onClick={() => triggerPick(i)}
              disabled={!!slot.file}
              className="w-full h-full rounded-xl flex flex-col items-center justify-center gap-1 overflow-hidden"
              style={{
                background: slot.file ? 'transparent' : 'var(--gray-100)',
                border: slot.file ? 'none' : '2px dashed var(--gray-300)',
                minHeight: 44,
                padding: 0,
              }}
            >
              {slot.previewUrl ? (
                <img
                  src={slot.previewUrl}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center gap-0.5">
                  {i === 0 ? (
                    <Camera size={24} style={{ color: 'var(--gray-400)' }} />
                  ) : (
                    <Plus size={20} style={{ color: 'var(--gray-400)' }} />
                  )}
                  {slot.label && (
                    <span className="text-[10px]" style={{ color: 'var(--gray-400)' }}>
                      {slot.label}
                    </span>
                  )}
                </div>
              )}
            </button>

            {slot.file && (
              <button
                onClick={() => handleRemove(i)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.55)' }}
                title="Remove photo"
              >
                <X size={10} style={{ color: '#fff' }} />
              </button>
            )}
          </div>
        ))}
      </div>

      {filledSlots.map((slot, i) => {
        const quality = guessQuality(slot.file!);
        return (
          <div
            key={slot.id}
            className="flex items-start gap-2 px-3 py-2 rounded-xl"
            style={{
              background:
                quality === 'good' ? 'var(--green-bg)' : quality === 'ok' ? 'var(--warning-bg)' : 'var(--red-bg)',
            }}
          >
            <QualityIndicator quality={quality} />
            <span
              className="text-[12px]"
              style={{
                fontWeight: 500,
                color:
                  quality === 'good'
                    ? 'var(--green-dark)'
                    : quality === 'ok'
                    ? 'var(--warning-dark)'
                    : 'var(--red-dark)',
              }}
            >
              Photo {i + 1}:{' '}
              {quality === 'good'
                ? 'Good quality'
                : quality === 'ok'
                ? 'Acceptable quality'
                : 'Low quality — retake if possible'}
            </span>
          </div>
        );
      })}

      {filledSlots.some(s => guessQuality(s.file!) === 'poor') && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}
        >
          <AlertTriangle size={14} style={{ color: 'var(--warning)' }} />
          <span className="text-[12px]" style={{ color: 'var(--warning-dark)', fontWeight: 500 }}>
            Better photos improve match accuracy
          </span>
        </div>
      )}

      {filledCount === 0 && (
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>
            Photo tips
          </span>
          <div className="flex gap-2">
            {PHOTO_GUIDANCE.map(g => (
              <div
                key={g.label}
                className="flex-1 flex flex-col items-center gap-1 p-2.5 rounded-xl"
                style={{ background: 'var(--info-bg)', border: '1px solid var(--info-soft)' }}
              >
                <span className="text-lg">{g.icon}</span>
                <span className="text-[11px] text-center" style={{ fontWeight: 600, color: 'var(--info-dark)' }}>
                  {g.label}
                </span>
                <span className="text-[9px] text-center" style={{ color: 'var(--info-dark)' }}>
                  {g.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function QualityIndicator({ quality }: { quality: PhotoQuality }) {
  const cfg = {
    good: {
      bg: 'var(--green-soft)',
      color: 'var(--green-dark)',
      label: 'Good',
      icon: <CheckCircle size={10} />,
    },
    ok: {
      bg: 'var(--warning-soft)',
      color: 'var(--warning-dark)',
      label: 'OK',
      icon: <Info size={10} />,
    },
    poor: {
      bg: 'var(--red-soft)',
      color: 'var(--red-dark)',
      label: 'Poor',
      icon: <AlertTriangle size={10} />,
    },
  };
  const c = cfg[quality];
  return (
    <span
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px]"
      style={{ background: c.bg, color: c.color, fontWeight: 700 }}
    >
      {c.icon} {c.label}
    </span>
  );
}
