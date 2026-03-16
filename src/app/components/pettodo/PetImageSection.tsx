import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera, Trash2, Star, AlertTriangle, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { imageApi, type ImageRef } from '../../services/api';
import { getUploadPackage, putToBlob } from '../../services/integration/storageAzure';
import { appConfig } from '../../config/appConfig';

interface PetImageSectionProps {
  petId: string;
  readOnly?: boolean;
}

const ACCEPTED = 'image/jpeg,image/png,image/webp';
const MAX_BYTES = 8 * 1024 * 1024;

function isStorageEnabled(): boolean {
  return appConfig.mode === 'integration' && appConfig.storageProvider === 'azure';
}

export function PetImageSection({ petId, readOnly = false }: PetImageSectionProps) {
  const [images, setImages] = useState<ImageRef[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const storageOn = isStorageEnabled();

  const loadImages = useCallback(async () => {
    if (!storageOn) { setLoading(false); return; }
    try {
      const list = await imageApi.listPetImages(petId);
      setImages(list);
    } catch {
      // Not critical — images just won't show
    } finally {
      setLoading(false);
    }
  }, [petId, storageOn]);

  useEffect(() => { loadImages(); }, [loadImages]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    if (file.size > MAX_BYTES) {
      toast.error(`Image too large (max 8 MB). Your file: ${(file.size / 1024 / 1024).toFixed(1)} MB`);
      return;
    }

    setUploading(true);
    try {
      const { uploadUrl, blobPath, readUrl } = await getUploadPackage(file.name, file.type || 'image/jpeg');
      await putToBlob(uploadUrl, file);

      const isPrimary = images.length === 0;
      const saved = await imageApi.savePetImage(petId, {
        blobPath,
        mimeType: file.type || 'image/jpeg',
        originalFilename: file.name,
        sizeBytes: file.size,
        isPrimary,
      });

      if (isPrimary) {
        setImages(prev => prev.map(img => ({ ...img, isPrimary: false })));
      }
      setImages(prev => [...prev, { ...saved, url: readUrl }]);
      toast.success('Photo uploaded.');
    } catch (err: any) {
      console.error('[PetImageSection] upload failed', err);
      toast.error(err?.message?.includes('Not configured')
        ? 'Storage is not configured — contact admin.'
        : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSetPrimary = async (imageId: string) => {
    const img = images.find(i => i.id === imageId);
    if (!img || img.isPrimary) return;
    try {
      await imageApi.savePetImage(petId, {
        blobPath: img.blobPath,
        mimeType: img.mimeType,
        originalFilename: img.originalFilename,
        sizeBytes: img.sizeBytes,
        isPrimary: true,
      });
      setImages(prev => prev.map(i => ({ ...i, isPrimary: i.id === imageId })));
      toast.success('Set as primary photo.');
    } catch {
      toast.error('Could not update primary photo.');
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      await imageApi.deletePetImage(petId, imageId);
      setImages(prev => prev.filter(i => i.id !== imageId));
      toast.success('Photo removed.');
    } catch {
      toast.error('Could not delete photo.');
    }
  };

  if (!storageOn) {
    return (
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[12px]" style={{ background: 'var(--gray-100)', color: 'var(--gray-500)' }}>
        <AlertTriangle size={14} />
        Photo storage is not configured (set VITE_STORAGE_PROVIDER=azure to enable).
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Photos</span>
        {!readOnly && (
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[12px]"
            style={{ background: 'var(--primary-bg)', color: 'var(--primary)', fontWeight: 600, minHeight: 36 }}
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? <Upload size={14} className="animate-bounce" /> : <Camera size={14} />}
            {uploading ? 'Uploading…' : 'Add Photo'}
          </button>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept={ACCEPTED}
        className="hidden"
        onChange={handleFileChange}
      />

      {loading ? (
        <div className="text-[12px]" style={{ color: 'var(--gray-400)' }}>Loading photos…</div>
      ) : images.length === 0 ? (
        <button
          className="flex flex-col items-center justify-center gap-2 rounded-xl py-6 w-full"
          style={{ border: '2px dashed var(--gray-300)', color: 'var(--gray-400)', background: 'var(--gray-50)' }}
          onClick={() => !readOnly && fileRef.current?.click()}
          disabled={readOnly}
        >
          <Camera size={28} />
          <span className="text-[12px]">
            {readOnly ? 'No photos yet' : 'Tap to add a photo'}
          </span>
        </button>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {images.map(img => (
            <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden" style={{ background: 'var(--gray-100)' }}>
              <img
                src={img.url}
                alt="Pet photo"
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/120x120/e5e7eb/9ca3af?text=🐾'; }}
              />
              {img.isPrimary && (
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px]" style={{ background: 'var(--primary)', color: 'var(--white)', fontWeight: 700 }}>
                  Main
                </div>
              )}
              {!readOnly && (
                <div className="absolute top-1 right-1 flex flex-col gap-1">
                  {!img.isPrimary && (
                    <button
                      onClick={() => handleSetPrimary(img.id)}
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.85)' }}
                      title="Set as main photo"
                    >
                      <Star size={12} style={{ color: 'var(--warning)' }} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.85)' }}
                    title="Delete photo"
                  >
                    <Trash2 size={12} style={{ color: 'var(--red-primary)' }} />
                  </button>
                </div>
              )}
            </div>
          ))}

          {!readOnly && (
            <button
              className="aspect-square rounded-xl flex flex-col items-center justify-center gap-1"
              style={{ border: '2px dashed var(--gray-300)', background: 'var(--gray-50)', color: 'var(--gray-400)' }}
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
            >
              <Camera size={20} />
              <span className="text-[10px]">Add</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
