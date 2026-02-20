import React, { useState } from 'react';
import { Camera, Plus, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { scorePhoto, PHOTO_GUIDANCE, type PhotoScore, type PhotoQuality } from '../../data/demoData';

interface PhotoSlot {
  id: number;
  filled: boolean;
  score: PhotoScore | null;
  label: string;
}

interface PhotoUploadGridProps {
  onQualitiesChange?: (qualities: PhotoQuality[]) => void;
}

export function PhotoUploadGrid({ onQualitiesChange }: PhotoUploadGridProps) {
  const [slots, setSlots] = useState<PhotoSlot[]>([
    { id: 0, filled: false, score: null, label: 'Main photo' },
    { id: 1, filled: false, score: null, label: '' },
    { id: 2, filled: false, score: null, label: '' },
  ]);

  const handleAddPhoto = (index: number) => {
    const score = scorePhoto();
    const updated = [...slots];
    updated[index] = { ...updated[index], filled: true, score };
    setSlots(updated);
    const qualities = updated.filter(s => s.filled && s.score).map(s => s.score!.quality);
    onQualitiesChange?.(qualities);
  };

  const filledCount = slots.filter(s => s.filled).length;

  return (
    <div className="flex flex-col gap-3">
      {/* Grid */}
      <div className="grid grid-cols-3 gap-2">
        {slots.map((slot, i) => (
          <button
            key={slot.id}
            onClick={() => !slot.filled && handleAddPhoto(i)}
            className="aspect-square rounded-xl flex flex-col items-center justify-center gap-1 relative overflow-hidden"
            style={{
              background: slot.filled
                ? (slot.score?.quality === 'good' ? 'var(--green-bg)' : slot.score?.quality === 'ok' ? 'var(--warning-bg)' : 'var(--red-bg)')
                : 'var(--gray-100)',
              border: slot.filled
                ? `2px solid ${slot.score?.quality === 'good' ? 'var(--green-soft)' : slot.score?.quality === 'ok' ? 'var(--warning-soft)' : 'var(--red-soft)'}`
                : '2px dashed var(--gray-300)',
              minHeight: 44,
            }}
          >
            {slot.filled ? (
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-2xl">🐕</span>
                <QualityIndicator quality={slot.score!.quality} />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-0.5">
                {i === 0 ? <Camera size={24} style={{ color: 'var(--gray-400)' }} /> : <Plus size={20} style={{ color: 'var(--gray-400)' }} />}
                {slot.label && <span className="text-[10px]" style={{ color: 'var(--gray-400)' }}>{slot.label}</span>}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Per-photo quality details */}
      {slots.filter(s => s.filled && s.score).map((slot, i) => (
        <div key={slot.id} className="flex items-start gap-2 px-3 py-2 rounded-xl" style={{
          background: slot.score!.quality === 'good' ? 'var(--green-bg)' : slot.score!.quality === 'ok' ? 'var(--warning-bg)' : 'var(--red-bg)',
        }}>
          <QualityIndicator quality={slot.score!.quality} />
          <div className="flex-1">
            <span className="text-[12px]" style={{
              fontWeight: 500,
              color: slot.score!.quality === 'good' ? 'var(--green-dark)' : slot.score!.quality === 'ok' ? 'var(--warning-dark)' : 'var(--red-dark)',
            }}>
              Photo {i + 1}: {slot.score!.reasons.join(' · ')}
            </span>
            {slot.score!.tips.length > 0 && (
              <p className="text-[11px] mt-0.5" style={{
                color: slot.score!.quality === 'ok' ? 'var(--warning-dark)' : 'var(--red-dark)',
              }}>
                Tip: {slot.score!.tips[0]}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Warning if poor quality photos */}
      {slots.some(s => s.score?.quality === 'poor') && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-soft)' }}>
          <AlertTriangle size={14} style={{ color: 'var(--warning)' }} />
          <span className="text-[12px]" style={{ color: 'var(--warning-dark)', fontWeight: 500 }}>
            Better photos improve match accuracy
          </span>
        </div>
      )}

      {/* Guidance cards */}
      {filledCount === 0 && (
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Photo tips</span>
          <div className="flex gap-2">
            {PHOTO_GUIDANCE.map(g => (
              <div key={g.label} className="flex-1 flex flex-col items-center gap-1 p-2.5 rounded-xl" style={{ background: 'var(--info-bg)', border: '1px solid var(--info-soft)' }}>
                <span className="text-lg">{g.icon}</span>
                <span className="text-[11px] text-center" style={{ fontWeight: 600, color: 'var(--info-dark)' }}>{g.label}</span>
                <span className="text-[9px] text-center" style={{ color: 'var(--info-dark)' }}>{g.desc}</span>
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
    good: { bg: 'var(--green-soft)', color: 'var(--green-dark)', label: 'Good', icon: <CheckCircle size={10} /> },
    ok: { bg: 'var(--warning-soft)', color: 'var(--warning-dark)', label: 'OK', icon: <Info size={10} /> },
    poor: { bg: 'var(--red-soft)', color: 'var(--red-dark)', label: 'Poor', icon: <AlertTriangle size={10} /> },
  };
  const c = cfg[quality];
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px]" style={{ background: c.bg, color: c.color, fontWeight: 700 }}>
      {c.icon} {c.label}
    </span>
  );
}
