import React, { useState, useEffect } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { useNavigate } from 'react-router';
import { petApi } from '../../services/api';
import type { Pet } from '../../data/storage';
import { AlertTriangle, Dog, Plus } from 'lucide-react';

export default function EMG_SELECT_PET() {
  const nav = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    petApi.list()
      .then((data) => {
        setPets(data);
        if (data.length === 1) setSelectedId(data[0].id);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleContinue = () => {
    const pet = pets.find((p) => p.id === selectedId);
    nav('/emg/lost-photos', {
      state: { petId: selectedId, petName: pet?.name ?? null, prefilled: !!pet },
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="EMG_SELECT_PET_LostPetSelector" />
        <AppBar title="Report Lost Dog" showBack backTo="/emg/entry" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>Loading your pets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="EMG_SELECT_PET_LostPetSelector" />
        <AppBar title="Report Lost Dog" showBack backTo="/emg/entry" />
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
            Could not load your pets. Please check your connection.
          </p>
          <Btn variant="secondary" onClick={() => { setError(false); setLoading(true); petApi.list().then(d => { setPets(d); if (d.length === 1) setSelectedId(d[0].id); setLoading(false); }).catch(() => { setError(true); setLoading(false); }); }}>
            Retry
          </Btn>
        </div>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="EMG_SELECT_PET_LostPetSelector" />
        <AppBar title="Report Lost Dog" showBack backTo="/emg/entry" />
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--warning-bg)' }}>
            <Dog size={28} style={{ color: 'var(--warning)' }} />
          </div>
          <h3 className="text-[18px] text-center" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>
            No pets in your profile
          </h3>
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
            To report a lost dog, first add your pet to your PETTODO profile so we can include their information in the report.
          </p>
          <Btn variant="primary" fullWidth icon={<Plus size={18} />} onClick={() => nav('/daily/pet-list')}>
            Add a Pet Now
          </Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav('/emg/lost-photos', { state: { petId: null, petName: null, prefilled: false } })}>
            Continue without pet profile
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EMG_SELECT_PET_LostPetSelector" />
      <AppBar title="Report Lost Dog" showBack backTo="/emg/entry" />
      <Banner type="calm" text="Stay calm — we'll guide you step by step" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={18} style={{ color: 'var(--red-primary)' }} />
            <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Which dog is lost?</h3>
          </div>
          <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
            Select the pet you need to report. Their profile info will help with the search.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {pets.map((pet) => {
            const isSelected = selectedId === pet.id;
            return (
              <button
                key={pet.id}
                onClick={() => setSelectedId(pet.id)}
                className="flex items-center gap-3 p-4 rounded-2xl text-left"
                style={{
                  background: isSelected ? 'var(--red-bg)' : 'var(--gray-100)',
                  border: `2px solid ${isSelected ? 'var(--red-primary)' : 'transparent'}`,
                  minHeight: 72,
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: isSelected ? 'var(--red-primary)' : 'var(--gray-300)' }}
                >
                  <Dog size={20} style={{ color: isSelected ? 'var(--white)' : 'var(--gray-600)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px]" style={{ fontWeight: 600, color: isSelected ? 'var(--red-dark)' : 'var(--gray-900)' }}>
                    {pet.name}
                  </p>
                  <p className="text-[12px] mt-0.5" style={{ color: 'var(--gray-500)' }}>
                    {[pet.breed, pet.size].filter(Boolean).join(' · ')}
                  </p>
                </div>
                <div
                  className="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center"
                  style={{ borderColor: isSelected ? 'var(--red-primary)' : 'var(--gray-300)' }}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--red-primary)' }} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <Btn
          variant="ghost"
          fullWidth
          onClick={() => nav('/emg/lost-photos', { state: { petId: null, petName: null, prefilled: false } })}
        >
          My pet is not listed — continue without profile
        </Btn>

        <div className="mt-auto">
          <Btn
            variant="emergency"
            fullWidth
            disabled={!selectedId}
            onClick={handleContinue}
          >
            Continue →
          </Btn>
        </div>
      </div>
    </div>
  );
}
