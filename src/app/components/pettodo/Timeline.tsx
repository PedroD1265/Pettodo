import React from 'react';

interface TimelineEntry {
  label: string;
  date: string;
  status: 'completed' | 'pending' | 'active';
  detail?: string;
}

export function TimelineItem({ entry, isLast }: { entry: TimelineEntry; isLast?: boolean }) {
  const colors = {
    completed: 'var(--green-primary)',
    active: 'var(--info)',
    pending: 'var(--gray-300)',
  };
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full mt-1" style={{ background: colors[entry.status] }} />
        {!isLast && <div className="w-0.5 flex-1 min-h-[24px]" style={{ background: 'var(--gray-200)' }} />}
      </div>
      <div className="pb-4">
        <p className="text-[14px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{entry.label}</p>
        <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{entry.date}</p>
        {entry.detail && <p className="text-[12px] mt-0.5" style={{ color: 'var(--gray-400)' }}>{entry.detail}</p>}
      </div>
    </div>
  );
}

export function TimelineView({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="flex flex-col pl-2">
      {entries.map((e, i) => (
        <TimelineItem key={i} entry={e} isLast={i === entries.length - 1} />
      ))}
    </div>
  );
}
