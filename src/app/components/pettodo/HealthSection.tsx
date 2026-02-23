import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modals';
import { Btn } from './Buttons';
import { toast } from 'sonner';
import { parseQrPayload, decodeQrFromImage, createQrScanner } from '../../utils/qrDecode';
import type { QrParsedResult } from '../../utils/qrDecode';
import type QrScanner from 'qr-scanner';
import {
  Syringe, Pill, Heart, FileText, Plus, Camera, ImageIcon, Upload,
  AlertTriangle, CheckCircle, Clock, Shield, Pencil, Trash2, Scale,
} from 'lucide-react';

const LUNA_PET_ID = 'pet-luna-001';

function vaccineStatusChip(nextDueISO?: string) {
  if (!nextDueISO) return { label: 'No due date', color: 'var(--gray-500)', bg: 'var(--gray-100)' };
  const now = new Date();
  const due = new Date(nextDueISO);
  const daysUntil = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntil < 0) return { label: 'Overdue', color: 'var(--red-dark)', bg: 'var(--red-bg)' };
  if (daysUntil <= 14) return { label: 'Due soon', color: 'var(--warning-dark, #92400e)', bg: 'var(--warning-bg, #fffbeb)' };
  return { label: 'Up to date', color: 'var(--green-dark)', bg: 'var(--green-bg)' };
}

export function HealthSection() {
  const {
    store, addVaccineRecord, addMedicationRecord, addHealthCondition, addHealthDocument,
    updateHealthCondition, deleteHealthCondition, deleteHealthDocument,
    deleteMedicationRecord, deleteVaccineRecord, addWeightLog,
  } = useApp();

  const [showVaxModal, setShowVaxModal] = useState(false);
  const [showMedModal, setShowMedModal] = useState(false);
  const [showCondModal, setShowCondModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showQrCamera, setShowQrCamera] = useState(false);
  const [qrPreview, setQrPreview] = useState<QrParsedResult | null>(null);
  const [showQrPreview, setShowQrPreview] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);

  const [editingCondId, setEditingCondId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeleteType, setConfirmDeleteType] = useState<'cond' | 'doc' | 'med' | 'vax'>('cond');

  const [vaxForm, setVaxForm] = useState({ name: '', dateGiven: '', nextDue: '', notes: '' });
  const [medForm, setMedForm] = useState({ name: '', dosage: '', startDate: '', endDate: '', notes: '' });
  const [condForm, setCondForm] = useState({ name: '', notes: '' });
  const [weightForm, setWeightForm] = useState({ weightKg: '', date: new Date().toISOString().slice(0, 10), note: '' });

  const fileRef = useRef<HTMLInputElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const qrImageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const petVaxRecords = store.vaccineRecords.filter(r => r.petId === LUNA_PET_ID);
  const petMedRecords = store.medicationRecords.filter(r => r.petId === LUNA_PET_ID);
  const petConditions = store.healthConditions.filter(r => r.petId === LUNA_PET_ID);
  const petDocuments = store.healthDocuments.filter(r => r.petId === LUNA_PET_ID);
  const petWeightLogs = store.weightLogs.filter(w => w.petId === LUNA_PET_ID).sort((a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime());

  const handleAddVaccine = () => {
    if (!vaxForm.name.trim() || !vaxForm.dateGiven) { toast.error('Vaccine name and date given are required.'); return; }
    addVaccineRecord({ petId: LUNA_PET_ID, name: vaxForm.name.trim(), dateGivenISO: vaxForm.dateGiven, nextDueISO: vaxForm.nextDue || undefined, notes: vaxForm.notes || undefined });
    toast.success(`Vaccine "${vaxForm.name}" added.`);
    setVaxForm({ name: '', dateGiven: '', nextDue: '', notes: '' });
    setShowVaxModal(false);
  };

  const handleAddMed = () => {
    if (!medForm.name.trim() || !medForm.startDate) { toast.error('Medication name and start date are required.'); return; }
    addMedicationRecord({ petId: LUNA_PET_ID, name: medForm.name.trim(), dosageOrInstructions: medForm.dosage || undefined, startDateISO: medForm.startDate, endDateISO: medForm.endDate || undefined, notes: medForm.notes || undefined });
    toast.success(`Medication "${medForm.name}" added.`);
    setMedForm({ name: '', dosage: '', startDate: '', endDate: '', notes: '' });
    setShowMedModal(false);
  };

  const handleSaveCondition = () => {
    if (!condForm.name.trim()) { toast.error('Condition name is required.'); return; }
    if (editingCondId) {
      updateHealthCondition(editingCondId, { name: condForm.name.trim(), notes: condForm.notes || undefined });
      toast.success('Condition updated.');
      setEditingCondId(null);
    } else {
      addHealthCondition({ petId: LUNA_PET_ID, name: condForm.name.trim(), notes: condForm.notes || undefined });
      toast.success(`Condition "${condForm.name}" added.`);
    }
    setCondForm({ name: '', notes: '' });
    setShowCondModal(false);
  };

  const openEditCondition = (id: string) => {
    const c = petConditions.find(x => x.id === id);
    if (!c) return;
    setEditingCondId(id);
    setCondForm({ name: c.name, notes: c.notes || '' });
    setShowCondModal(true);
  };

  const requestDelete = (id: string, type: 'cond' | 'doc' | 'med' | 'vax') => {
    setConfirmDeleteId(id);
    setConfirmDeleteType(type);
  };

  const confirmDelete = () => {
    if (!confirmDeleteId) return;
    if (confirmDeleteType === 'cond') { deleteHealthCondition(confirmDeleteId); toast.success('Condition deleted.'); }
    if (confirmDeleteType === 'doc') { deleteHealthDocument(confirmDeleteId); toast.success('Document deleted.'); }
    if (confirmDeleteType === 'med') { deleteMedicationRecord(confirmDeleteId); toast.success('Medication deleted.'); }
    if (confirmDeleteType === 'vax') { deleteVaccineRecord(confirmDeleteId); toast.success('Vaccine deleted.'); }
    setConfirmDeleteId(null);
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const url = URL.createObjectURL(file);
    addHealthDocument({ petId: LUNA_PET_ID, title: file.name, kind: 'photo', url, sizeKB: Math.round(file.size / 1024) });
    toast.success(`Photo "${file.name}" saved.`);
    if (photoRef.current) photoRef.current.value = '';
    setShowDocModal(false);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const url = URL.createObjectURL(file);
    addHealthDocument({ petId: LUNA_PET_ID, title: file.name, kind: 'file', url, sizeKB: Math.round(file.size / 1024) });
    toast.success(`File "${file.name}" saved.`);
    if (fileRef.current) fileRef.current.value = '';
    setShowDocModal(false);
  };

  const handleQrFromPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    try {
      const raw = await decodeQrFromImage(file);
      const parsed = parseQrPayload(raw);
      setQrPreview(parsed); setShowQrPreview(true); setShowDocModal(false);
    } catch { toast.error('No QR code found in this image.'); }
    if (qrImageRef.current) qrImageRef.current.value = '';
  };

  const startCameraQr = async () => {
    setShowDocModal(false); setShowQrCamera(true);
    await new Promise(r => setTimeout(r, 100));
    if (videoRef.current) {
      scannerRef.current = createQrScanner(videoRef.current, (raw) => {
        scannerRef.current?.stop(); scannerRef.current?.destroy(); scannerRef.current = null;
        setShowQrCamera(false);
        const parsed = parseQrPayload(raw);
        setQrPreview(parsed); setShowQrPreview(true);
      }, () => {});
      try { await scannerRef.current.start(); }
      catch { toast.error('Camera access denied or not available.'); setShowQrCamera(false); }
    }
  };

  const stopCameraQr = () => {
    scannerRef.current?.stop(); scannerRef.current?.destroy(); scannerRef.current = null;
    setShowQrCamera(false);
  };

  const saveQrDocument = () => {
    if (!qrPreview) return;
    addHealthDocument({ petId: LUNA_PET_ID, title: qrPreview.type === 'url' ? `QR: ${qrPreview.host}` : 'QR Certificate', kind: 'qr', qrRaw: qrPreview.raw, qrParsed: qrPreview.type === 'json' ? qrPreview.json : { type: qrPreview.type, value: qrPreview.url || qrPreview.text } });
    toast.success('QR certificate saved.');
    setQrPreview(null); setShowQrPreview(false);
  };

  const handleAddWeight = () => {
    const kg = parseFloat(weightForm.weightKg);
    if (!kg || kg <= 0) { toast.error('Please enter a valid weight.'); return; }
    addWeightLog({ petId: LUNA_PET_ID, dateISO: weightForm.date, weightKg: kg, note: weightForm.note || undefined });
    toast.success('Weight logged.');
    setWeightForm({ weightKg: '', date: new Date().toISOString().slice(0, 10), note: '' });
    setShowWeightModal(false);
  };

  const weightTrend = (() => {
    if (petWeightLogs.length < 3) return null;
    const last3 = petWeightLogs.slice(-3);
    const diff = last3[2].weightKg - last3[0].weightKg;
    if (diff > 0.3) return { label: 'Trending up', color: 'var(--warning-dark, #92400e)' };
    if (diff < -0.3) return { label: 'Trending down', color: 'var(--info, #2563eb)' };
    return { label: 'Stable', color: 'var(--green-dark)' };
  })();

  const inputStyle = { background: 'var(--gray-100)', border: '1px solid var(--gray-200)', minHeight: 44 };

  return (
    <div className="flex flex-col gap-3">
      {/* Vaccines */}
      <div className="flex items-center justify-between">
        <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>
          <Syringe size={14} className="inline mr-1" /> Vaccines
        </span>
        <button onClick={() => setShowVaxModal(true)} className="flex items-center gap-1 text-[12px]" style={{ color: 'var(--green-primary)', fontWeight: 600 }}>
          <Plus size={12} /> Add
        </button>
      </div>
      {petVaxRecords.length === 0 && <p className="text-[12px]" style={{ color: 'var(--gray-400)' }}>No vaccines recorded yet.</p>}
      {petVaxRecords.map(v => {
        const status = vaccineStatusChip(v.nextDueISO);
        return (
          <div key={v.id} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <div className="flex-1">
              <p className="text-[13px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{v.name}</p>
              <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>Given: {v.dateGivenISO}{v.nextDueISO ? ` · Due: ${v.nextDueISO}` : ''}</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: status.bg, color: status.color, fontWeight: 600 }}>{status.label}</span>
            <button onClick={() => requestDelete(v.id, 'vax')} style={{ color: 'var(--gray-400)' }}><Trash2 size={14} /></button>
          </div>
        );
      })}

      {/* Medications */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>
          <Pill size={14} className="inline mr-1" /> Medications
        </span>
        <button onClick={() => setShowMedModal(true)} className="flex items-center gap-1 text-[12px]" style={{ color: 'var(--green-primary)', fontWeight: 600 }}>
          <Plus size={12} /> Add
        </button>
      </div>
      {petMedRecords.length === 0 && <p className="text-[12px]" style={{ color: 'var(--gray-400)' }}>No medications recorded.</p>}
      {petMedRecords.map(m => (
        <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <div className="flex-1">
            <p className="text-[13px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{m.name}</p>
            <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>{m.dosageOrInstructions ? `${m.dosageOrInstructions} · ` : ''}Started: {m.startDateISO}</p>
          </div>
          <button onClick={() => requestDelete(m.id, 'med')} style={{ color: 'var(--gray-400)' }}><Trash2 size={14} /></button>
        </div>
      ))}

      {/* Conditions */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>
          <AlertTriangle size={14} className="inline mr-1" /> Conditions
        </span>
        <button onClick={() => { setEditingCondId(null); setCondForm({ name: '', notes: '' }); setShowCondModal(true); }} className="flex items-center gap-1 text-[12px]" style={{ color: 'var(--green-primary)', fontWeight: 600 }}>
          <Plus size={12} /> Add
        </button>
      </div>
      {petConditions.length === 0 && <p className="text-[12px]" style={{ color: 'var(--gray-400)' }}>No conditions recorded.</p>}
      {petConditions.map(c => (
        <div key={c.id} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <div className="flex-1">
            <p className="text-[13px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{c.name}</p>
            {c.notes && <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>{c.notes}</p>}
          </div>
          <button onClick={() => openEditCondition(c.id)} style={{ color: 'var(--gray-400)' }}><Pencil size={14} /></button>
          <button onClick={() => requestDelete(c.id, 'cond')} style={{ color: 'var(--gray-400)' }}><Trash2 size={14} /></button>
        </div>
      ))}

      {/* Certificates & Documents */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>
          <FileText size={14} className="inline mr-1" /> Certificates & Documents
        </span>
        <button onClick={() => setShowDocModal(true)} className="flex items-center gap-1 text-[12px]" style={{ color: 'var(--green-primary)', fontWeight: 600 }}>
          <Plus size={12} /> Add
        </button>
      </div>
      {petDocuments.length === 0 && <p className="text-[12px]" style={{ color: 'var(--gray-400)' }}>No documents added yet.</p>}
      {petDocuments.map(d => (
        <div key={d.id} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          {d.kind === 'qr' ? <Shield size={16} style={{ color: 'var(--info)' }} /> : <FileText size={16} style={{ color: 'var(--info)' }} />}
          <div className="flex-1">
            <p className="text-[13px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{d.title}</p>
            <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>
              {d.kind === 'qr' ? 'QR Import' : d.kind === 'photo' ? 'Photo' : 'File'}
              {d.sizeKB ? ` · ${d.sizeKB} KB` : ''}
            </p>
          </div>
          <button onClick={() => requestDelete(d.id, 'doc')} style={{ color: 'var(--gray-400)' }}><Trash2 size={14} /></button>
        </div>
      ))}

      {/* Weight Advisor */}
      <div className="mt-2 p-3 rounded-xl" style={{ background: 'var(--info-bg, #eff6ff)', border: '1px solid var(--info-soft, #dbeafe)' }}>
        <div className="flex items-center justify-between">
          <p className="text-[13px] flex items-center gap-1" style={{ fontWeight: 600, color: 'var(--info, #2563eb)' }}>
            <Scale size={14} /> Weight Advisor
          </p>
          <button onClick={() => setShowWeightModal(true)} className="flex items-center gap-1 text-[12px]" style={{ color: 'var(--info, #2563eb)', fontWeight: 600 }}>
            <Plus size={12} /> Log
          </button>
        </div>

        {petWeightLogs.length === 0 ? (
          <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>Add a few weigh-ins to see trends.</p>
        ) : petWeightLogs.length < 3 ? (
          <div className="mt-2">
            <p className="text-[12px]" style={{ color: 'var(--gray-600)' }}>
              Latest: <strong>{petWeightLogs[petWeightLogs.length - 1].weightKg} kg</strong> ({petWeightLogs[petWeightLogs.length - 1].dateISO})
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--gray-400)' }}>Add {3 - petWeightLogs.length} more weigh-in{3 - petWeightLogs.length > 1 ? 's' : ''} to see trends.</p>
          </div>
        ) : (
          <div className="mt-2 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              {petWeightLogs.slice(-5).map((w, i, arr) => {
                const min = Math.min(...arr.map(x => x.weightKg));
                const max = Math.max(...arr.map(x => x.weightKg));
                const range = max - min || 1;
                const heightPct = 20 + ((w.weightKg - min) / range) * 60;
                return (
                  <div key={w.id} className="flex flex-col items-center flex-1 gap-0.5">
                    <div className="w-full rounded-t" style={{ background: 'var(--info, #2563eb)', height: `${heightPct}px`, opacity: 0.7 + (i / arr.length) * 0.3 }} />
                    <span className="text-[9px]" style={{ color: 'var(--gray-500)' }}>{w.weightKg}</span>
                    <span className="text-[8px]" style={{ color: 'var(--gray-400)' }}>{w.dateISO.slice(5)}</span>
                  </div>
                );
              })}
            </div>
            {weightTrend && (
              <p className="text-[12px]" style={{ fontWeight: 600, color: weightTrend.color }}>{weightTrend.label}</p>
            )}
            <p className="text-[10px]" style={{ color: 'var(--gray-400)' }}>Slow, gradual change is safer. Consult a vet if rapid changes occur.</p>
          </div>
        )}
      </div>

      {/* Hidden file inputs */}
      <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handleUploadPhoto} />
      <input ref={fileRef} type="file" accept="application/pdf,image/*" className="hidden" onChange={handleUploadFile} />
      <input ref={qrImageRef} type="file" accept="image/*" className="hidden" onChange={handleQrFromPhoto} />

      {/* Add Vaccine Modal */}
      <Modal open={showVaxModal} onClose={() => setShowVaxModal(false)} title="Add Vaccine">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Vaccine name *</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="e.g. Rabies" value={vaxForm.name} onChange={e => setVaxForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Date given *</label>
            <input type="date" className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} value={vaxForm.dateGiven} onChange={e => setVaxForm(f => ({ ...f, dateGiven: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Next due date</label>
            <input type="date" className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} value={vaxForm.nextDue} onChange={e => setVaxForm(f => ({ ...f, nextDue: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Notes</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="Optional notes" value={vaxForm.notes} onChange={e => setVaxForm(f => ({ ...f, notes: e.target.value }))} />
          </div>
          <Btn variant="primary" fullWidth onClick={handleAddVaccine}>Save Vaccine</Btn>
        </div>
      </Modal>

      {/* Add Medication Modal */}
      <Modal open={showMedModal} onClose={() => setShowMedModal(false)} title="Add Medication">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Medication name *</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="e.g. Heartguard Plus" value={medForm.name} onChange={e => setMedForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Dosage / Instructions</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="e.g. 1 tablet daily" value={medForm.dosage} onChange={e => setMedForm(f => ({ ...f, dosage: e.target.value }))} />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Start date *</label>
              <input type="date" className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} value={medForm.startDate} onChange={e => setMedForm(f => ({ ...f, startDate: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>End date</label>
              <input type="date" className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} value={medForm.endDate} onChange={e => setMedForm(f => ({ ...f, endDate: e.target.value }))} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Notes</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="Optional notes" value={medForm.notes} onChange={e => setMedForm(f => ({ ...f, notes: e.target.value }))} />
          </div>
          <Btn variant="primary" fullWidth onClick={handleAddMed}>Save Medication</Btn>
        </div>
      </Modal>

      {/* Add/Edit Condition Modal */}
      <Modal open={showCondModal} onClose={() => { setShowCondModal(false); setEditingCondId(null); }} title={editingCondId ? 'Edit Condition' : 'Add Condition'}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Condition name *</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="e.g. Hip dysplasia" value={condForm.name} onChange={e => setCondForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Notes</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="Optional notes" value={condForm.notes} onChange={e => setCondForm(f => ({ ...f, notes: e.target.value }))} />
          </div>
          <Btn variant="primary" fullWidth onClick={handleSaveCondition}>{editingCondId ? 'Update Condition' : 'Save Condition'}</Btn>
        </div>
      </Modal>

      {/* Add Document Modal */}
      <Modal open={showDocModal} onClose={() => setShowDocModal(false)} title="Add Certificate / Document">
        <div className="flex flex-col gap-3">
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Choose how to add a certificate or document:</p>
          <Btn variant="secondary" fullWidth icon={<Camera size={16} />} onClick={startCameraQr}>Scan QR with camera</Btn>
          <Btn variant="secondary" fullWidth icon={<ImageIcon size={16} />} onClick={() => qrImageRef.current?.click()}>Scan QR from photo</Btn>
          <Btn variant="secondary" fullWidth icon={<ImageIcon size={16} />} onClick={() => photoRef.current?.click()}>Upload photo</Btn>
          <Btn variant="secondary" fullWidth icon={<Upload size={16} />} onClick={() => fileRef.current?.click()}>Upload file (PDF / image)</Btn>
        </div>
      </Modal>

      {/* QR Camera Modal */}
      <Modal open={showQrCamera} onClose={stopCameraQr} title="Scan QR Code">
        <div className="flex flex-col gap-3 items-center">
          <video ref={videoRef} className="w-full rounded-xl" style={{ maxHeight: 300 }} />
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Point camera at a QR code</p>
          <Btn variant="secondary" fullWidth onClick={stopCameraQr}>Cancel</Btn>
        </div>
      </Modal>

      {/* QR Preview Modal */}
      <Modal open={showQrPreview} onClose={() => { setShowQrPreview(false); setQrPreview(null); }} title="QR Code Preview">
        <div className="flex flex-col gap-3">
          <div className="p-3 rounded-xl" style={{ background: 'var(--warning-bg, #fffbeb)', border: '1px solid var(--warning-soft, #fef3c7)' }}>
            <p className="text-[12px] flex items-center gap-1" style={{ color: 'var(--warning-dark, #92400e)', fontWeight: 600 }}><Shield size={14} /> Security Notice</p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--warning-dark, #92400e)' }}>QR content is shown for review only. URLs are never opened automatically.</p>
          </div>
          {qrPreview && (
            <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
              <p className="text-[11px]" style={{ color: 'var(--gray-500)', fontWeight: 600 }}>Type: {qrPreview.type}</p>
              <p className="text-[13px] mt-1 break-all" style={{ color: 'var(--gray-900)', fontFamily: 'monospace' }}>{qrPreview.raw.length > 500 ? qrPreview.raw.slice(0, 500) + '...' : qrPreview.raw}</p>
              {qrPreview.type === 'url' && <p className="text-[11px] mt-1" style={{ color: 'var(--info)' }}>Host: {qrPreview.host}</p>}
            </div>
          )}
          <Btn variant="primary" fullWidth icon={<CheckCircle size={16} />} onClick={saveQrDocument}>Save as Certificate</Btn>
          <Btn variant="ghost" fullWidth onClick={() => { setShowQrPreview(false); setQrPreview(null); }}>Discard</Btn>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)} title="Confirm Delete">
        <div className="flex flex-col gap-3">
          <p className="text-[13px]" style={{ color: 'var(--gray-700)' }}>Are you sure you want to delete this {confirmDeleteType === 'cond' ? 'condition' : confirmDeleteType === 'doc' ? 'document' : confirmDeleteType === 'med' ? 'medication' : 'vaccine'}? This cannot be undone.</p>
          <Btn variant="destructive" fullWidth onClick={confirmDelete}>Delete</Btn>
          <Btn variant="ghost" fullWidth onClick={() => setConfirmDeleteId(null)}>Cancel</Btn>
        </div>
      </Modal>

      {/* Weight Log Modal */}
      <Modal open={showWeightModal} onClose={() => setShowWeightModal(false)} title="Log Weight">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Weight (kg) *</label>
            <input type="number" step="0.1" className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="e.g. 18.0" value={weightForm.weightKg} onChange={e => setWeightForm(f => ({ ...f, weightKg: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Date</label>
            <input type="date" className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} value={weightForm.date} onChange={e => setWeightForm(f => ({ ...f, date: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Note</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="Optional" value={weightForm.note} onChange={e => setWeightForm(f => ({ ...f, note: e.target.value }))} />
          </div>
          <Btn variant="primary" fullWidth onClick={handleAddWeight}>Save Weight</Btn>
        </div>
      </Modal>
    </div>
  );
}
