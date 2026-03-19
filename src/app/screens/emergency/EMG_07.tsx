import React, { useEffect, useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Btn } from '../../components/pettodo/Buttons';
import { FlyerPreview, ShareKitActions, type FlyerData } from '../../components/pettodo/FlyerShareKit';
import { useNavigate, useLocation } from 'react-router';
import { caseApi, imageApi, petApi, type CaseRecord } from '../../services/api';
import type { Pet } from '../../data/storage';
import type { ImageRef } from '../../services/api';
import { AlertTriangle, Search } from 'lucide-react';

const FLYER_SAFETY_REMINDER =
  'Do not put your home address on public flyers. Use the QR/public pet page or arrange handoff at a safe public point.';

function buildShareUrl(caseRecord: CaseRecord): string | null {
  if (!caseRecord.petId) return null;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return origin ? `${origin}/public/qr-landing/${caseRecord.petId}` : `/public/qr-landing/${caseRecord.petId}`;
}

function pickPrimaryImage(images: ImageRef[]): string | null {
  const primary = images.find((image) => image.isPrimary) ?? images[0];
  return primary?.url ?? null;
}

function buildFlyerData(caseRecord: CaseRecord, pet: Pet | null, photoUrl: string | null): FlyerData {
  const shareUrl = buildShareUrl(caseRecord);
  const petName = pet?.name?.trim() || (caseRecord.type === 'lost' ? 'Lost pet' : caseRecord.type === 'found' ? 'Found dog' : 'Dog sighted');
  const subtitleParts = [
    pet?.breed,
    caseRecord.size,
    caseRecord.colors?.length ? caseRecord.colors.join(', ') : '',
  ].filter(Boolean);
  const subtitle = subtitleParts.join(' · ') || 'Emergency report';
  const description = caseRecord.description || 'Help us identify this report and share it safely.';
  const traits = Array.from(new Set([
    pet?.size,
    caseRecord.size,
    ...(caseRecord.colors ?? []),
    ...(pet?.colors ?? []),
    pet?.collar ? 'Collar' : '',
    caseRecord.direction ? `Direction ${caseRecord.direction}` : '',
  ].filter(Boolean) as string[])).slice(0, 6);

  const shareTextLines = [
    caseRecord.type === 'lost' ? `LOST DOG: ${petName}` : caseRecord.type === 'found' ? `FOUND DOG REPORT: ${petName}` : `DOG SIGHTED: ${petName}`,
    subtitle,
    description,
    caseRecord.location ? `Area: ${caseRecord.location}` : '',
    caseRecord.timeLabel || caseRecord.time ? `When: ${caseRecord.timeLabel || caseRecord.time}` : '',
    shareUrl ? `Public pet page: ${shareUrl}` : `Case reference: ${caseRecord.id}`,
  ].filter(Boolean);

  return {
    caseId: caseRecord.id,
    type: caseRecord.type,
    title: petName,
    subtitle,
    description,
    location: caseRecord.location || 'Approximate area only',
    timeLabel: caseRecord.timeLabel || caseRecord.time || 'Recently reported',
    traits,
    photoUrl,
    shareUrl,
    shareText: shareTextLines.join('\n'),
    safetyReminder: FLYER_SAFETY_REMINDER,
  };
}

export default function EMG_07() {
  const nav = useNavigate();
  const location = useLocation();
  const [caseRecord, setCaseRecord] = useState<CaseRecord | null>(() => {
    const state = location.state as { caseSummary?: CaseRecord } | null;
    return state?.caseSummary ?? null;
  });
  const [flyerData, setFlyerData] = useState<FlyerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const caseIdFromSearch = new URLSearchParams(location.search).get('caseId');

  useEffect(() => {
    let cancelled = false;

    async function loadShareSurface() {
      setLoading(true);
      setError(null);
      setFlyerData(null);

      try {
        let selectedCase = caseRecord;

        if (caseIdFromSearch) {
          selectedCase = await caseApi.get(caseIdFromSearch);
        } else if (!selectedCase) {
          const cases = await caseApi.list();
          selectedCase = cases.find((item) => item.type === 'lost' && item.status === 'active')
            ?? cases.find((item) => item.type === 'lost')
            ?? cases.find((item) => item.status === 'active')
            ?? cases[0]
            ?? null;
        }

        if (!selectedCase) {
          if (!cancelled) {
            setCaseRecord(null);
            setError('Create a report first to generate a share flyer.');
          }
          return;
        }

        const petPromise = selectedCase.petId ? petApi.get(selectedCase.petId).catch(() => null) : Promise.resolve(null);
        const caseImagesPromise = imageApi.listCaseImages(selectedCase.id).catch(() => [] as ImageRef[]);

        const [pet, caseImages] = await Promise.all([petPromise, caseImagesPromise]);
        const casePhotoUrl = pickPrimaryImage(caseImages);

        let photoUrl = casePhotoUrl;
        if (!photoUrl && selectedCase.petId) {
          const petImages = await imageApi.listPetImages(selectedCase.petId).catch(() => [] as ImageRef[]);
          photoUrl = pickPrimaryImage(petImages);
        }

        if (!cancelled) {
          setCaseRecord(selectedCase);
          setFlyerData(buildFlyerData(selectedCase, pet, photoUrl));
        }
      } catch (err) {
        if (!cancelled) {
          setCaseRecord(null);
          setError(err instanceof Error ? err.message : 'Could not load the share surface');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadShareSurface();
    return () => {
      cancelled = true;
    };
  }, [caseIdFromSearch]);

  const backToPublished = caseRecord ? '/emg/lost-published' : '/emg/entry';
  const matchingHref = caseRecord ? `/emg/matching-top10?caseId=${encodeURIComponent(caseRecord.id)}` : '/emg/matching-top10';

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_07_Lost_ShareKit_FlyerPNG_PDF" />
      <AppBar title="Share Kit" showBack backTo={backToPublished} />
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-red-200 border-t-red-500 animate-spin" />
            <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Loading flyer data...</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12 text-center">
            <AlertTriangle size={32} style={{ color: 'var(--red-primary)' }} />
            <div>
              <p className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Could not load the share kit</p>
              <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>{error}</p>
            </div>
            <Btn variant="secondary" onClick={() => nav('/emg/cases')}>Go to My Reports</Btn>
          </div>
        )}

        {!loading && !error && !flyerData && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12 text-center">
            <Search size={32} style={{ color: 'var(--gray-400)' }} />
            <div>
              <p className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>No report selected</p>
              <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>Choose a real report first to generate a flyer.</p>
            </div>
            <Btn variant="secondary" onClick={() => nav('/emg/cases')}>Open My Reports</Btn>
          </div>
        )}

        {!loading && flyerData && (
          <>
            <div>
              <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Share {flyerData.title}'s flyer</h3>
              <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
                Real share surface based on case {flyerData.caseId}.
              </p>
            </div>

            <FlyerPreview data={flyerData} />
            <ShareKitActions data={flyerData} />
          </>
        )}

        <div className="mt-auto pb-4 flex flex-col gap-3">
          <Btn variant="primary" fullWidth onClick={() => nav(matchingHref, caseRecord ? { state: { caseSummary: caseRecord } } : undefined)}>
            View Possible Matches
          </Btn>
          <button
            onClick={() => nav(backToPublished)}
            className="text-[13px] font-medium text-center py-2"
            style={{ color: 'var(--gray-500)' }}
          >
            Back to Report Published
          </button>
        </div>
      </div>
    </div>
  );
}
