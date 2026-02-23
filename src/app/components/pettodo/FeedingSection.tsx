import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modals';
import { Btn } from './Buttons';
import { toast } from 'sonner';
import { Utensils, Plus, Clock, AlertTriangle, Info, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router';

const LUNA_PET_ID = 'pet-luna-001';

function parseWeight(weightStr: string): number | null {
  const m = weightStr.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : null;
}

export function FeedingSection() {
  const { store, upsertFeedingPreset, addFeedingLog, addFeedingReminder, updateFeedingReminder } = useApp();
  const nav = useNavigate();
  const [showLogModal, setShowLogModal] = useState(false);
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);

  const pet = store.pets.find(p => p.id === LUNA_PET_ID);
  const preset = store.feedingPresets.find(p => p.petId === LUNA_PET_ID);
  const petLogs = store.feedingLogs.filter(l => l.petId === LUNA_PET_ID).sort((a, b) => b.createdAt - a.createdAt);
  const petReminders = store.feedingReminders.filter(r => r.petId === LUNA_PET_ID);

  const [logForm, setLogForm] = useState({ foodName: preset?.foodName || '', grams: '', notes: '' });
  const [presetForm, setPresetForm] = useState({ foodName: preset?.foodName || '', kcal: preset?.kcalPer100g?.toString() || '', notes: preset?.notes || '' });
  const [reminderForm, setReminderForm] = useState('08:00');
  const [advisorFactor, setAdvisorFactor] = useState(1.6);

  const weightKg = pet ? parseWeight(pet.weight) : null;

  const advisor = useMemo(() => {
    if (!weightKg || weightKg <= 0) return null;
    const rer = 70 * Math.pow(weightKg, 0.75);
    const dailyCal = rer * advisorFactor;
    const gramsPerDay = preset?.kcalPer100g ? Math.round((dailyCal / preset.kcalPer100g) * 100) : null;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayLogs = petLogs.filter(l => new Date(l.timeISO).getTime() >= todayStart.getTime());
    const todayGrams = todayLogs.reduce((sum, l) => sum + (l.grams || 0), 0);

    let status: 'under' | 'healthy' | 'over' = 'healthy';
    let recommendation = '';
    if (gramsPerDay && todayGrams > 0) {
      const ratio = todayGrams / gramsPerDay;
      if (ratio > 1.1) {
        status = 'over';
        recommendation = 'Consider a lighter next meal or extra activity.';
      } else if (ratio < 0.6 && new Date().getHours() >= 16) {
        status = 'under';
        recommendation = 'Luna might need an extra small meal this evening.';
      } else if (ratio >= 0.8 && ratio <= 1.1) {
        recommendation = 'Intake looks good today.';
      } else {
        recommendation = 'On track for the day.';
      }
    }

    return { dailyCal: Math.round(dailyCal), gramsPerDay, todayGrams, status, recommendation };
  }, [weightKg, advisorFactor, preset, petLogs]);

  const handleSavePreset = () => {
    if (!presetForm.foodName.trim()) { toast.error('Food name is required.'); return; }
    upsertFeedingPreset(LUNA_PET_ID, { foodName: presetForm.foodName.trim(), kcalPer100g: presetForm.kcal ? parseFloat(presetForm.kcal) : undefined, notes: presetForm.notes || undefined });
    toast.success('Feeding preset saved.');
    setShowPresetModal(false);
  };

  const handleLogFeeding = () => {
    if (!logForm.foodName.trim()) { toast.error('Food name is required.'); return; }
    addFeedingLog({ petId: LUNA_PET_ID, timeISO: new Date().toISOString(), foodName: logForm.foodName.trim(), grams: logForm.grams ? parseFloat(logForm.grams) : undefined, notes: logForm.notes || undefined });
    toast.success('Feeding logged.');
    setLogForm({ foodName: preset?.foodName || '', grams: '', notes: '' });
    setShowLogModal(false);
  };

  const handleAddReminder = () => {
    addFeedingReminder({ petId: LUNA_PET_ID, timeHHMM: reminderForm, enabled: true });
    toast.success(`Reminder set for ${reminderForm}.`);
    setShowReminderModal(false);
  };

  const inputStyle = { background: 'var(--gray-100)', border: '1px solid var(--gray-200)', minHeight: 44 };

  const gaugeColors = { under: '#f59e0b', healthy: '#22c55e', over: '#ef4444' };
  const gaugeLabels = { under: 'Under target', healthy: 'Healthy range', over: 'Over target' };

  return (
    <div className="flex flex-col gap-3">
      {/* Preset */}
      <div className="p-3 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
        <div className="flex items-center justify-between">
          <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>Default food</span>
          <button onClick={() => { setPresetForm({ foodName: preset?.foodName || '', kcal: preset?.kcalPer100g?.toString() || '', notes: preset?.notes || '' }); setShowPresetModal(true); }} className="text-[12px]" style={{ color: 'var(--green-primary)', fontWeight: 600 }}>
            {preset ? 'Edit' : 'Set'}
          </button>
        </div>
        {preset ? (
          <div className="mt-1">
            <p className="text-[13px]" style={{ color: 'var(--gray-900)' }}>{preset.foodName}</p>
            {preset.kcalPer100g && <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>{preset.kcalPer100g} kcal/100g</p>}
          </div>
        ) : (
          <p className="text-[12px] mt-1" style={{ color: 'var(--gray-400)' }}>No preset set. Tap "Set" to configure.</p>
        )}
      </div>

      {/* Log feeding */}
      <Btn variant="secondary" fullWidth icon={<Plus size={16} />} onClick={() => { setLogForm({ foodName: preset?.foodName || '', grams: '', notes: '' }); setShowLogModal(true); }}>
        Log feeding now
      </Btn>

      {/* Recent logs */}
      {petLogs.length > 0 && (
        <div>
          <p className="text-[12px] mb-1" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Recent logs</p>
          {petLogs.slice(0, 5).map(l => (
            <div key={l.id} className="flex items-center gap-2 py-1.5">
              <Clock size={12} style={{ color: 'var(--gray-400)' }} />
              <span className="text-[12px]" style={{ color: 'var(--gray-700)' }}>
                {new Date(l.timeISO).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="text-[12px]" style={{ color: 'var(--gray-500)' }}>
                {l.foodName}{l.grams ? ` · ${l.grams}g` : ''}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Reminders */}
      <div className="flex items-center justify-between mt-1">
        <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>
          <Clock size={14} className="inline mr-1" /> Reminders
        </span>
        <button onClick={() => setShowReminderModal(true)} className="flex items-center gap-1 text-[12px]" style={{ color: 'var(--green-primary)', fontWeight: 600 }}>
          <Plus size={12} /> Add
        </button>
      </div>
      {petReminders.length === 0 && <p className="text-[12px]" style={{ color: 'var(--gray-400)' }}>No reminders set.</p>}
      {petReminders.map(r => (
        <div key={r.id} className="flex items-center justify-between py-1.5">
          <span className="text-[13px]" style={{ color: 'var(--gray-700)' }}>{r.timeHHMM}</span>
          <button onClick={() => updateFeedingReminder(r.id, { enabled: !r.enabled })} className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: r.enabled ? 'var(--green-bg)' : 'var(--gray-100)', color: r.enabled ? 'var(--green-dark)' : 'var(--gray-400)', fontWeight: 600 }}>
            {r.enabled ? 'On' : 'Off'}
          </button>
        </div>
      ))}

      {/* Feeding Advisor — Gauge design */}
      <div className="p-3 rounded-xl mt-2" style={{ background: 'var(--info-bg, #eff6ff)', border: '1px solid var(--info-soft, #dbeafe)' }}>
        <div className="flex items-center justify-between">
          <p className="text-[13px] flex items-center gap-1" style={{ fontWeight: 600, color: 'var(--info, #2563eb)' }}>
            <Utensils size={14} /> Feeding Advisor
          </p>
          <div className="flex items-center gap-2">
            <select
              className="text-[11px] px-1.5 py-0.5 rounded-lg"
              style={{ background: 'var(--white, #fff)', border: '1px solid var(--gray-200)' }}
              value={advisorFactor}
              onChange={e => setAdvisorFactor(parseFloat(e.target.value))}
            >
              <option value={1.0}>Weight loss</option>
              <option value={1.6}>Normal</option>
              <option value={2.0}>Active</option>
            </select>
            <button onClick={() => nav('/education/article/feeding-basics?petId=' + LUNA_PET_ID)} style={{ color: 'var(--info, #2563eb)' }}>
              <BookOpen size={16} />
            </button>
          </div>
        </div>

        {!weightKg ? (
          <p className="text-[12px] mt-1" style={{ color: 'var(--gray-500)' }}>Add weight to Luna's profile to get calorie estimates.</p>
        ) : advisor ? (
          <div className="mt-2 flex flex-col gap-2">
            {/* Gauge bar */}
            {advisor.gramsPerDay ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-[12px]" style={{ color: 'var(--gray-700)' }}>
                    <strong>{advisor.todayGrams}g</strong> today / <strong>{advisor.gramsPerDay}g</strong> target
                  </span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'var(--gray-200)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min((advisor.todayGrams / advisor.gramsPerDay) * 100, 100)}%`,
                      background: gaugeColors[advisor.status],
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px]" style={{ fontWeight: 600, color: gaugeColors[advisor.status] }}>
                    {gaugeLabels[advisor.status]}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--gray-400)' }}>
                    {Math.round((advisor.todayGrams / advisor.gramsPerDay) * 100)}%
                  </span>
                </div>
              </>
            ) : (
              <p className="text-[12px]" style={{ color: 'var(--gray-600)' }}>
                Target: ~<strong>{advisor.dailyCal} kcal/day</strong>. Set food kcal/100g in preset for gram targets.
              </p>
            )}

            {advisor.recommendation && (
              <p className="text-[11px]" style={{ color: 'var(--gray-600)' }}>{advisor.recommendation}</p>
            )}

            {advisor.status !== 'healthy' && advisor.gramsPerDay && (
              <div className="p-2 rounded-lg" style={{ background: advisor.status === 'over' ? 'var(--red-bg)' : 'var(--warning-bg, #fffbeb)' }}>
                <p className="text-[12px] flex items-center gap-1" style={{ fontWeight: 600, color: advisor.status === 'over' ? 'var(--red-dark)' : 'var(--warning-dark, #92400e)' }}>
                  <AlertTriangle size={12} /> {advisor.status === 'over' ? 'Likely over target today' : 'Low intake today'}
                </p>
              </div>
            )}

            <p className="text-[10px] flex items-center gap-1" style={{ color: 'var(--gray-400)' }}>
              <Info size={10} /> Estimate only. Consult a vet for medical concerns.
            </p>
          </div>
        ) : null}
      </div>

      {/* Log Modal */}
      <Modal open={showLogModal} onClose={() => setShowLogModal(false)} title="Log Feeding">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Food *</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="e.g. Kibble" value={logForm.foodName} onChange={e => setLogForm(f => ({ ...f, foodName: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Grams</label>
            <input type="number" className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="e.g. 150" value={logForm.grams} onChange={e => setLogForm(f => ({ ...f, grams: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Notes</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="Optional" value={logForm.notes} onChange={e => setLogForm(f => ({ ...f, notes: e.target.value }))} />
          </div>
          <Btn variant="primary" fullWidth onClick={handleLogFeeding}>Log Feeding</Btn>
        </div>
      </Modal>

      {/* Preset Modal */}
      <Modal open={showPresetModal} onClose={() => setShowPresetModal(false)} title="Set Feeding Preset">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Food name *</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="e.g. Premium Kibble" value={presetForm.foodName} onChange={e => setPresetForm(f => ({ ...f, foodName: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>kcal per 100g</label>
            <input type="number" className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="e.g. 350" value={presetForm.kcal} onChange={e => setPresetForm(f => ({ ...f, kcal: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Notes</label>
            <input className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} placeholder="Optional" value={presetForm.notes} onChange={e => setPresetForm(f => ({ ...f, notes: e.target.value }))} />
          </div>
          <Btn variant="primary" fullWidth onClick={handleSavePreset}>Save Preset</Btn>
        </div>
      </Modal>

      {/* Reminder Modal */}
      <Modal open={showReminderModal} onClose={() => setShowReminderModal(false)} title="Add Feeding Reminder">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[12px]" style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Time</label>
            <input type="time" className="px-3 py-2 rounded-xl text-[14px]" style={inputStyle} value={reminderForm} onChange={e => setReminderForm(e.target.value)} />
          </div>
          <p className="text-[11px]" style={{ color: 'var(--gray-400)' }}>Reminders are stored locally. OS notifications are not available yet.</p>
          <Btn variant="primary" fullWidth onClick={handleAddReminder}>Save Reminder</Btn>
        </div>
      </Modal>
    </div>
  );
}
