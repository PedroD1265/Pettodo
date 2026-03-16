import React, { useState, useRef, useEffect } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { PetCard } from '../../components/pettodo/Cards';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { Modal } from '../../components/pettodo/Modals';
import { TimelineView } from '../../components/pettodo/Timeline';
import { FreshnessBadge } from '../../components/pettodo/Badges';
import { useNavigate, useSearchParams, useParams } from 'react-router';
import { useApp } from '../../context/AppContext';
import { LUNA, VACCINES, FEEDING } from '../../data/demoData';
import { toast } from 'sonner';
import { appConfig } from '../../config/appConfig';
import { useServices } from '../../services/index';
import { PawPrint, QrCode, Syringe, FileText, Calendar, Clock, Check, AlertTriangle, ChevronRight, Utensils, Upload } from 'lucide-react';
import { HealthSection } from '../../components/pettodo/HealthSection';
import { FeedingSection } from '../../components/pettodo/FeedingSection';
import type { Pet } from '../../data/storage';
import { petApi } from '../../services/api';
import { PetImageSection } from '../../components/pettodo/PetImageSection';

// DLY_01
export function DLY_01() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="DLY_01_HomeDaily_Resumen" />
      <AppBar title="Daily Summary" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h2 className="text-[20px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Good evening! 🐾</h2>

        <PetCard name={LUNA.name} breed={LUNA.breed} hasQR vaccineStatus="Up to date" onClick={() => nav('/daily/pet-profile')} />

        <div className="p-3 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <p className="text-[13px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Today's tasks</p>
          <div className="mt-2 flex flex-col gap-1.5">
            {FEEDING.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: f.done ? 'var(--green-primary)' : 'var(--gray-200)' }}>
                  {f.done && <Check size={12} style={{ color: 'var(--white)' }} />}
                </div>
                <span className="text-[12px]" style={{ color: f.done ? 'var(--gray-400)' : 'var(--gray-700)', textDecoration: f.done ? 'line-through' : 'none' }}>
                  {f.time} — {f.meal}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--info-bg)', border: '1px solid var(--info-soft)' }}>
          <p className="text-[12px]" style={{ color: 'var(--info)', fontWeight: 500 }}>
            <Syringe size={12} className="inline mr-1" />
            Next vaccine: Distemper booster — Mar 20, 2026
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Btn variant="secondary" onClick={() => nav('/daily/feeding')}>
            <Utensils size={16} /> Feeding
          </Btn>
          <Btn variant="secondary" onClick={() => nav('/daily/vaccines')}>
            <Syringe size={16} /> Vaccines
          </Btn>
          <Btn variant="secondary" onClick={() => nav('/daily/documents')}>
            <FileText size={16} /> Documents
          </Btn>
          <Btn variant="secondary" onClick={() => nav('/daily/calendar')}>
            <Calendar size={16} /> Calendar
          </Btn>
        </div>
      </div>
    </div>
  );
}

// DLY_02
export function DLY_02() {
  const nav = useNavigate();
  const { store, addPet } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', breed: '', size: 'Medium' as 'Small'|'Medium'|'Large', age: '', colors: '' });

  const [saving, setSaving] = useState(false);

  const handleAddPet = async () => {
    if (!form.name.trim() || !form.breed.trim()) {
      toast.error('Name and breed are required.');
      return;
    }
    setSaving(true);
    try {
      await addPet({
        name: form.name.trim(),
        breed: form.breed.trim(),
        size: form.size,
        age: form.age.trim() || '?',
        colors: form.colors ? form.colors.split(',').map(c => c.trim()) : [],
        marks: '',
        collar: '',
        temperament: '',
        weight: '',
        microchip: '',
        vaccines: '',
        lastVaccine: '',
        nextVaccine: '',
      });
      toast.success(`${form.name} added to your pets!`);
      setForm({ name: '', breed: '', size: 'Medium', age: '', colors: '' });
      setShowModal(false);
    } catch (err: any) {
      console.error('[DLY_02] Failed to add pet:', err);
      toast.error(err?.message || 'Failed to save pet. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="DLY_02_PetList" />
      <AppBar title="My Pets" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        {store.pets.map(p => (
          <PetCard key={p.id} name={p.name} breed={p.breed} hasQR={p.id === 'pet-luna-001'} vaccineStatus={p.vaccines || 'Unknown'} onClick={() => nav(`/daily/pet/${p.id}`)} />
        ))}
        <Btn variant="secondary" fullWidth icon={<PawPrint size={16} />} onClick={() => setShowModal(true)}>Add Pet</Btn>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add a New Pet">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Name *</label>
            <input
              className="px-3 py-2 rounded-xl text-[14px]"
              style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)', minHeight: 44 }}
              placeholder="e.g. Max"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Breed *</label>
            <input
              className="px-3 py-2 rounded-xl text-[14px]"
              style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)', minHeight: 44 }}
              placeholder="e.g. Golden Retriever"
              value={form.breed}
              onChange={e => setForm(f => ({ ...f, breed: e.target.value }))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Size</label>
            <select
              className="px-3 py-2 rounded-xl text-[14px]"
              style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)', minHeight: 44 }}
              value={form.size}
              onChange={e => setForm(f => ({ ...f, size: e.target.value as any }))}
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Age</label>
              <input
                className="px-3 py-2 rounded-xl text-[14px]"
                style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)', minHeight: 44 }}
                placeholder="e.g. 2 years"
                value={form.age}
                onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Colors</label>
              <input
                className="px-3 py-2 rounded-xl text-[14px]"
                style={{ background: 'var(--gray-100)', border: '1px solid var(--gray-200)', minHeight: 44 }}
                placeholder="Brown, White"
                value={form.colors}
                onChange={e => setForm(f => ({ ...f, colors: e.target.value }))}
              />
            </div>
          </div>
          <Btn variant="primary" fullWidth onClick={handleAddPet} disabled={saving}>{saving ? 'Saving…' : 'Save Pet'}</Btn>
        </div>
      </Modal>
    </div>
  );
}

// DLY_03
export function DLY_03() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const autoExpandFeeding = searchParams.get('expandFeeding') === '1';
  const [feedingOpen, setFeedingOpen] = useState(autoExpandFeeding);
  const [healthOpen, setHealthOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="DLY_03_PetProfile_Complete" />
      <AppBar title="Pet Profile" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
            <span className="text-4xl">🐕</span>
          </div>
          <div>
            <h3 className="text-[20px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{LUNA.name}</h3>
            <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>{LUNA.breed}</p>
            <FreshnessBadge text="Profile updated today" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Size', value: LUNA.size },
            { label: 'Age', value: LUNA.age },
            { label: 'Weight', value: LUNA.weight },
            { label: 'Microchip', value: 'Yes' },
          ].map((item) => (
            <div key={item.label} className="p-2.5 rounded-xl" style={{ background: 'var(--gray-100)' }}>
              <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>{item.label}</p>
              <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{item.value}</p>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[13px]" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>{LUNA.description}</p>
          <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>Temperament: {LUNA.temperament}</p>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Collar: {LUNA.collar}</p>
        </div>

        <div className="flex items-center gap-2">
          <QrCode size={16} style={{ color: 'var(--info)' }} />
          <span className="text-[13px]" style={{ color: 'var(--info)', fontWeight: 500 }}>QR Tag Active</span>
          <span className="text-[13px] ml-auto" style={{ color: 'var(--green-primary)', fontWeight: 500 }}>
            <Syringe size={14} className="inline mr-1" />Vaccines up to date
          </span>
        </div>

        {/* Collapsible Feeding (first) */}
        <div className="border-t mt-1" style={{ borderColor: 'var(--gray-200)' }}>
          <button onClick={() => setFeedingOpen(!feedingOpen)} className="w-full flex items-center justify-between py-3">
            <span className="text-[15px] flex items-center gap-2" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>
              <Utensils size={16} style={{ color: 'var(--green-primary)' }} /> Feeding
            </span>
            <ChevronRight size={18} style={{ color: 'var(--gray-400)', transform: feedingOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          {feedingOpen && <FeedingSection />}
        </div>

        {/* Collapsible Health (second) */}
        <div className="border-t mt-1" style={{ borderColor: 'var(--gray-200)' }}>
          <button onClick={() => setHealthOpen(!healthOpen)} className="w-full flex items-center justify-between py-3">
            <span className="text-[15px] flex items-center gap-2" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>
              <Syringe size={16} style={{ color: 'var(--red-dark)' }} /> Health
            </span>
            <ChevronRight size={18} style={{ color: 'var(--gray-400)', transform: healthOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          {healthOpen && <HealthSection />}
        </div>

        <Btn variant="destructive" fullWidth onClick={() => nav('/daily/report-lost', { state: { prefilled: true } })} icon={<AlertTriangle size={16} />}>
          Report Luna as Lost
        </Btn>
      </div>
    </div>
  );
}

// DLY_04
export function DLY_04() {
  const { store, addDocument } = useApp();
  const services = useServices();
  const fileRef = useRef<HTMLInputElement>(null);
  const isDemo = appConfig.mode === 'demo';

  const SEED_DOCS = [
    { name: 'Vaccination Certificate', type: 'PDF', date: 'Jan 15, 2026' },
    { name: 'Microchip Registration', type: 'PDF', date: 'Dec 1, 2024' },
    { name: 'Adoption Certificate', type: 'Image', date: 'Jun 10, 2023' },
    { name: 'Veterinary Records', type: 'PDF', date: 'Feb 1, 2026' },
  ];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await services.storage.uploadDocument(file, `docs/${file.name}`);
      addDocument({ name: file.name, url, size: file.size });
      toast.success(`"${file.name}" uploaded and saved.`);
    } catch (err: any) {
      if (err?.message?.includes('Not configured') || err?.message?.includes('storage_not_configured')) {
        toast.error('Storage is not configured — contact admin.');
      } else {
        toast.error('Upload failed. Try a smaller file.');
      }
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="DLY_04_DocumentVault" />
      <AppBar title="Document Vault" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Luna's documents</h3>
        {SEED_DOCS.map((doc) => (
          <button
            key={doc.name}
            onClick={() => toast(`Demo only — document viewer for "${doc.name}" coming soon.`)}
            className="flex items-center gap-3 p-3 rounded-xl text-left w-full"
            style={{ background: 'var(--gray-100)', minHeight: 48 }}
          >
            <FileText size={20} style={{ color: 'var(--info)' }} />
            <div className="flex-1">
              <p className="text-[14px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{doc.name}</p>
              <p className="text-[11px]" style={{ color: 'var(--gray-400)' }}>{doc.type} · {doc.date}</p>
            </div>
            <ChevronRight size={16} style={{ color: 'var(--gray-400)' }} />
          </button>
        ))}
        {store.documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => window.open(doc.url, '_blank')}
            className="flex items-center gap-3 p-3 rounded-xl text-left w-full"
            style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)', minHeight: 48 }}
          >
            <FileText size={20} style={{ color: 'var(--green-primary)' }} />
            <div className="flex-1">
              <p className="text-[14px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{doc.name}</p>
              <p className="text-[11px]" style={{ color: 'var(--gray-400)' }}>{(doc.size / 1024).toFixed(0)} KB · Uploaded</p>
            </div>
            <ChevronRight size={16} style={{ color: 'var(--gray-400)' }} />
          </button>
        ))}
        <input ref={fileRef} type="file" accept="application/pdf,image/*" className="hidden" onChange={handleUpload} />
        <Btn variant="secondary" fullWidth icon={<Upload size={16} />} onClick={() => fileRef.current?.click()}>
          Upload Document
        </Btn>
      </div>
    </div>
  );
}

// DLY_05
export function DLY_05() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="DLY_05_FeedingRoutine_Checklist" />
      <AppBar title="Feeding Routine" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Today's meals for Luna</h3>
        {FEEDING.map((f, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: f.done ? 'var(--green-bg)' : 'var(--gray-100)', minHeight: 48 }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: f.done ? 'var(--green-primary)' : 'var(--gray-200)', minWidth: 44, minHeight: 44 }}>
              {f.done ? <Check size={16} style={{ color: 'var(--white)' }} /> : <Clock size={16} style={{ color: 'var(--gray-400)' }} />}
            </div>
            <div className="flex-1">
              <p className="text-[14px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{f.meal} — {f.time}</p>
              <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{f.food}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// DLY_06
export function DLY_06() {
  const entries = VACCINES.map((v) => ({
    label: v.name,
    date: v.date || 'Not yet administered',
    status: v.status,
    detail: v.next ? `Next: ${v.next}` : undefined,
  }));
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="DLY_06_Vaccines_Timeline_Reminders" />
      <AppBar title="Vaccines" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Luna's vaccination timeline</h3>
        <TimelineView entries={entries} />
        <Banner type="info" text="Reminders are sent 7 days before each due date." />
      </div>
    </div>
  );
}

// DLY_07
export function DLY_07() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="DLY_07_AddToCalendar_Google_Apple_ICS" />
      <AppBar title="Add to Calendar" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
        <Calendar size={48} style={{ color: 'var(--green-primary)' }} />
        <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Add reminders to your calendar</h3>
        <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>Never miss a vaccine or vet appointment.</p>

        <div className="w-full p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[14px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>Distemper booster</p>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>March 20, 2026</p>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Btn variant="primary" fullWidth onClick={() => toast('Demo only — Google Calendar integration coming soon.')}>Add to Google Calendar</Btn>
          <Btn variant="secondary" fullWidth onClick={() => toast('Demo only — Apple Calendar integration coming soon.')}>Add to Apple Calendar</Btn>
          <Btn variant="secondary" fullWidth onClick={() => toast('Demo only — .ICS download coming soon.')}>Download .ICS File</Btn>
        </div>
      </div>
    </div>
  );
}

// DLY_08
export function DLY_08() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="DLY_08_ReportLost_PreFilled" />
      <AppBar title="Report Lost" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <Banner type="prefilled" text="Prefilled from Luna's profile" />

        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--red-bg)', border: '1px solid var(--red-soft)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--red-soft)' }}>
            <span className="text-2xl">🐕</span>
          </div>
          <div>
            <p className="text-[15px]" style={{ fontWeight: 600, color: 'var(--red-dark)' }}>{LUNA.name}</p>
            <p className="text-[12px]" style={{ color: 'var(--red-dark)' }}>{LUNA.breed} · {LUNA.description}</p>
          </div>
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
            Luna's traits, photos, and microchip info have been prefilled. You only need to add location and time.
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-auto pb-4">
          <Btn variant="emergency" fullWidth onClick={() => nav('/emg/lost-traits', { state: { prefilled: true } })}>
            Continue to Report — Add Location & Time
          </Btn>
          <Btn variant="ghost" fullWidth onClick={() => nav(-1)}>Cancel</Btn>
        </div>
      </div>
    </div>
  );
}

// PetDetail — dynamic pet profile loaded by ID
export function PetDetail() {
  const nav = useNavigate();
  const { petId } = useParams<{ petId: string }>();
  const { store, updatePet, deletePet } = useApp();
  const isIntegration = appConfig.mode === 'integration';

  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '', breed: '', size: 'Medium' as 'Small' | 'Medium' | 'Large',
    age: '', weight: '', colorsStr: '', marks: '', collar: '',
    temperament: '', microchip: '', vaccines: '', nextVaccine: '', lastVaccine: '',
  });
  const [saving, setSaving] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!petId) {
      setLoadError('Invalid pet link.');
      setLoading(false);
      return;
    }
    if (isIntegration) {
      setLoading(true);
      setLoadError(null);
      petApi.get(petId)
        .then(p => { setPet(p); setLoading(false); })
        .catch((err: any) => {
          if (err.status === 404) setLoadError('Pet not found.');
          else if (err.status === 401 || err.status === 403) setLoadError('Not authorized to view this pet.');
          else setLoadError('Failed to load pet. Please try again.');
          setLoading(false);
        });
    } else {
      const found = store.pets.find(p => p.id === petId) ?? null;
      setPet(found);
      setLoadError(found ? null : 'Pet not found.');
      setLoading(false);
    }
  }, [petId, isIntegration]);

  const openEdit = () => {
    if (!pet) return;
    setEditForm({
      name: pet.name,
      breed: pet.breed,
      size: pet.size,
      age: pet.age || '',
      weight: pet.weight || '',
      colorsStr: (pet.colors || []).join(', '),
      marks: pet.marks || '',
      collar: pet.collar || '',
      temperament: pet.temperament || '',
      microchip: pet.microchip || '',
      vaccines: pet.vaccines || '',
      nextVaccine: pet.nextVaccine || '',
      lastVaccine: pet.lastVaccine || '',
    });
    setShowEdit(true);
  };

  const handleSave = async () => {
    if (!pet || !petId) return;
    if (!editForm.name.trim() || !editForm.breed.trim()) {
      toast.error('Name and breed are required.');
      return;
    }
    setSaving(true);
    try {
      const patch: Partial<Pet> = {
        name: editForm.name.trim(),
        breed: editForm.breed.trim(),
        size: editForm.size,
        age: editForm.age.trim(),
        weight: editForm.weight.trim(),
        colors: editForm.colorsStr ? editForm.colorsStr.split(',').map(c => c.trim()).filter(Boolean) : [],
        marks: editForm.marks.trim(),
        collar: editForm.collar.trim(),
        temperament: editForm.temperament.trim(),
        microchip: editForm.microchip.trim(),
        vaccines: editForm.vaccines.trim(),
        nextVaccine: editForm.nextVaccine.trim(),
        lastVaccine: editForm.lastVaccine.trim(),
      };
      await updatePet(petId, patch);
      setPet(prev => prev ? { ...prev, ...patch } : prev);
      toast.success('Pet updated!');
      setShowEdit(false);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!petId) return;
    setDeleting(true);
    try {
      await deletePet(petId);
      toast.success(`${pet?.name ?? 'Pet'} deleted.`);
      nav('/daily/pet-list');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to delete. Please try again.');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const inputStyle: React.CSSProperties = { background: 'var(--gray-100)', border: '1px solid var(--gray-200)', minHeight: 44 };
  const labelStyle: React.CSSProperties = { fontWeight: 600, color: 'var(--gray-700)' };

  if (loading) {
    return (
      <div className="flex flex-col min-h-full">
        <AppBar title="Pet Profile" showBack />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>Loading…</p>
        </div>
      </div>
    );
  }

  if (loadError || !pet) {
    return (
      <div className="flex flex-col min-h-full">
        <AppBar title="Pet Profile" showBack />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
          <AlertTriangle size={36} style={{ color: 'var(--red-dark)' }} />
          <p className="text-[15px] text-center" style={{ color: 'var(--gray-700)', fontWeight: 500 }}>
            {loadError ?? 'Pet not found.'}
          </p>
          <Btn variant="secondary" onClick={() => nav('/daily/pet-list')}>Back to Pet List</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="DLY_03_PetProfile_Dynamic" />
      <AppBar title="Pet Profile" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--green-soft)' }}>
            <span className="text-4xl">🐕</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[20px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{pet.name}</h3>
            <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>{pet.breed}</p>
            {pet.colors?.length > 0 && (
              <p className="text-[12px]" style={{ color: 'var(--gray-400)' }}>{pet.colors.join(', ')}</p>
            )}
          </div>
          <Btn variant="secondary" onClick={openEdit}>Edit</Btn>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Size', value: pet.size || '—' },
            { label: 'Age', value: pet.age || '—' },
            { label: 'Weight', value: pet.weight || '—' },
            { label: 'Microchip', value: pet.microchip ? 'Yes' : '—' },
          ].map(item => (
            <div key={item.label} className="p-2.5 rounded-xl" style={{ background: 'var(--gray-100)' }}>
              <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>{item.label}</p>
              <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Photos */}
        {isIntegration && petId && (
          <PetImageSection petId={petId} />
        )}

        {/* Additional details */}
        {(pet.temperament || pet.collar || pet.marks || pet.vaccines || pet.nextVaccine) && (
          <div className="p-3 rounded-xl flex flex-col gap-1" style={{ background: 'var(--gray-100)' }}>
            {pet.temperament && <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Temperament: {pet.temperament}</p>}
            {pet.collar && <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Collar: {pet.collar}</p>}
            {pet.marks && <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Marks: {pet.marks}</p>}
            {pet.vaccines && <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Vaccines: {pet.vaccines}</p>}
            {pet.nextVaccine && (
              <p className="text-[12px]" style={{ color: 'var(--info)', fontWeight: 500 }}>
                <Syringe size={12} className="inline mr-1" />Next vaccine: {pet.nextVaccine}
              </p>
            )}
          </div>
        )}

        {/* Report Lost */}
        <Btn
          variant="destructive"
          fullWidth
          icon={<AlertTriangle size={16} />}
          onClick={() => nav('/daily/report-lost', { state: { petId: pet.id, prefilled: true } })}
        >
          Report {pet.name} as Lost
        </Btn>

        {/* Delete link */}
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-[13px] text-center py-2"
          style={{ color: 'var(--red-dark)', fontWeight: 500 }}
        >
          Delete pet
        </button>
      </div>

      {/* Edit Modal */}
      <Modal open={showEdit} onClose={() => { if (!saving) setShowEdit(false); }} title={`Edit ${pet.name}`}>
        <div className="flex flex-col gap-3" style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: 4 }}>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={labelStyle}>Name *</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle}
              value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={labelStyle}>Breed *</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle}
              value={editForm.breed} onChange={e => setEditForm(f => ({ ...f, breed: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={labelStyle}>Size</label>
            <select className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle}
              value={editForm.size} onChange={e => setEditForm(f => ({ ...f, size: e.target.value as any }))}>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[12px]" style={labelStyle}>Age</label>
              <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle}
                placeholder="e.g. 2 years" value={editForm.age} onChange={e => setEditForm(f => ({ ...f, age: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[12px]" style={labelStyle}>Weight</label>
              <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle}
                placeholder="e.g. 12 kg" value={editForm.weight} onChange={e => setEditForm(f => ({ ...f, weight: e.target.value }))} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={labelStyle}>Colors (comma-separated)</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle}
              placeholder="Brown, White" value={editForm.colorsStr} onChange={e => setEditForm(f => ({ ...f, colorsStr: e.target.value }))} />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[12px]" style={labelStyle}>Temperament</label>
              <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle}
                placeholder="e.g. Friendly" value={editForm.temperament} onChange={e => setEditForm(f => ({ ...f, temperament: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[12px]" style={labelStyle}>Collar</label>
              <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle}
                placeholder="e.g. Red collar" value={editForm.collar} onChange={e => setEditForm(f => ({ ...f, collar: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[12px]" style={labelStyle}>Marks</label>
              <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle}
                placeholder="e.g. White spot on chest" value={editForm.marks} onChange={e => setEditForm(f => ({ ...f, marks: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[12px]" style={labelStyle}>Microchip #</label>
              <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle}
                placeholder="e.g. 900123456" value={editForm.microchip} onChange={e => setEditForm(f => ({ ...f, microchip: e.target.value }))} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={labelStyle}>Vaccine notes</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle}
              placeholder="e.g. Up to date" value={editForm.vaccines} onChange={e => setEditForm(f => ({ ...f, vaccines: e.target.value }))} />
          </div>
          <Btn variant="primary" fullWidth onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </Btn>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={showDeleteConfirm} onClose={() => { if (!deleting) setShowDeleteConfirm(false); }} title="Delete Pet">
        <div className="flex flex-col gap-4">
          <p className="text-[14px]" style={{ color: 'var(--gray-700)' }}>
            Are you sure you want to delete <strong>{pet.name}</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-2">
            <Btn variant="ghost" fullWidth onClick={() => setShowDeleteConfirm(false)} disabled={deleting}>Cancel</Btn>
            <Btn variant="destructive" fullWidth onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Deleting…' : 'Delete'}
            </Btn>
          </div>
        </div>
      </Modal>
    </div>
  );
}
