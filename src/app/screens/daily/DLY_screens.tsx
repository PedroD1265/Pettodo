import React from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { PetCard } from '../../components/pettodo/Cards';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { TimelineView } from '../../components/pettodo/Timeline';
import { FreshnessBadge, VerificationBadge } from '../../components/pettodo/Badges';
import { useNavigate } from 'react-router';
import { LUNA, VACCINES, FEEDING } from '../../data/demoData';
import { toast } from 'sonner';
import { PawPrint, QrCode, Syringe, FileText, Calendar, Clock, Check, AlertTriangle, ChevronRight, Utensils } from 'lucide-react';

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
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="DLY_02_PetList" />
      <AppBar title="My Pets" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <PetCard name={LUNA.name} breed={LUNA.breed} hasQR vaccineStatus="Up to date" onClick={() => nav('/daily/pet-profile')} />
        <PetCard name="Max" breed="Golden Retriever" hasQR={false} vaccineStatus="Due soon" onClick={() => nav('/daily/pet-profile')} />
        <Btn variant="secondary" fullWidth icon={<PawPrint size={16} />} onClick={() => toast('Demo only — pet registration form coming soon.')}>Add Pet</Btn>
      </div>
    </div>
  );
}

// DLY_03
export function DLY_03() {
  const nav = useNavigate();
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

        <Btn variant="destructive" fullWidth onClick={() => nav('/daily/report-lost', { state: { prefilled: true } })} icon={<AlertTriangle size={16} />}>
          Report Luna as Lost
        </Btn>
      </div>
    </div>
  );
}

// DLY_04
export function DLY_04() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="DLY_04_DocumentVault" />
      <AppBar title="Document Vault" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Luna's documents</h3>
        {[
          { name: 'Vaccination Certificate', type: 'PDF', date: 'Jan 15, 2026' },
          { name: 'Microchip Registration', type: 'PDF', date: 'Dec 1, 2024' },
          { name: 'Adoption Certificate', type: 'Image', date: 'Jun 10, 2023' },
          { name: 'Veterinary Records', type: 'PDF', date: 'Feb 1, 2026' },
        ].map((doc) => (
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
        <Btn variant="secondary" fullWidth onClick={() => toast('Demo only — document upload coming soon.')}>Upload Document</Btn>
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
