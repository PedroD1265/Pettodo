import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { StatusChip, FreshnessBadge, ConfidenceBadge, VerificationBadge, EventTrustBadge, MatchReasonTag, NewAccountBadge } from './Badges';
import { MapPin, Camera, Clock, Users, QrCode, Syringe, Shield, Star, AlertTriangle, Eye, Search } from 'lucide-react';
import { getCommunityDogPhoto } from '../../data/dogPhotos';

function CardShell({ children, onClick, className = '' }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-4 ${onClick ? 'cursor-pointer active:scale-[0.98] transition-all' : ''} ${className}`}
      style={{
        background: 'var(--white)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--gray-200)',
        ...(onClick ? { cursor: 'pointer' } : {}),
      }}
      onMouseEnter={onClick ? (e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand-primary-soft)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'; } : undefined}
      onMouseLeave={onClick ? (e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gray-200)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'; } : undefined}
    >
      {children}
    </div>
  );
}

export function CaseCard({ type, name, location, time, matchCount, onClick, children }: {
  type: 'lost' | 'found' | 'sighted';
  name: string;
  location: string;
  time: string;
  matchCount?: number;
  onClick?: () => void;
  children?: ReactNode;
}) {
  return (
    <CardShell onClick={onClick}>
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--gray-100)' }}>
          <Camera size={24} style={{ color: 'var(--gray-400)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <StatusChip status={type} />
            <FreshnessBadge />
          </div>
          <p className="text-[15px] truncate" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={12} style={{ color: 'var(--gray-400)' }} />
            <span className="text-[12px] truncate" style={{ color: 'var(--gray-500)' }}>{location}</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Clock size={12} style={{ color: 'var(--gray-400)' }} />
            <span className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{time}</span>
          </div>
          {matchCount !== undefined && matchCount > 0 && (
            <span className="text-[11px] mt-1 inline-block" style={{ color: 'var(--brand-primary)', fontWeight: 500 }}>
              {matchCount} possible matches
            </span>
          )}
        </div>
      </div>
      {children && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
          {children}
        </div>
      )}
    </CardShell>
  );
}

export function PetCard({ name, breed, hasQR, vaccineStatus, onClick }: {
  name: string;
  breed: string;
  hasQR?: boolean;
  vaccineStatus?: string;
  onClick?: () => void;
}) {
  return (
    <CardShell onClick={onClick}>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--brand-secondary-soft)' }}>
          <span className="text-2xl">🐕</span>
        </div>
        <div className="flex-1">
          <p className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{name}</p>
          <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{breed}</p>
          <div className="flex items-center gap-2 mt-1">
            {hasQR && (
              <span className="inline-flex items-center gap-0.5 text-[10px]" style={{ color: 'var(--brand-primary)' }}>
                <QrCode size={11} /> QR Active
              </span>
            )}
            {vaccineStatus && (
              <span className="inline-flex items-center gap-0.5 text-[10px]" style={{ color: 'var(--brand-secondary-dark)' }}>
                <Syringe size={11} /> {vaccineStatus}
              </span>
            )}
          </div>
        </div>
      </div>
    </CardShell>
  );
}

export function EventCard({ name, date, source, verified, communityScore, onClick }: {
  name: string;
  date: string;
  source: string;
  verified: 'ai' | 'community' | 'none';
  communityScore?: number;
  onClick?: () => void;
}) {
  return (
    <CardShell onClick={onClick}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {verified !== 'none' && <EventTrustBadge type={verified === 'ai' ? 'ai' : 'community'} />}
        </div>
        <p className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{name}</p>
        <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{date}</p>
        <div className="flex items-center gap-1">
          <span className="text-[11px]" style={{ color: 'var(--gray-500)' }}>Event source:</span>
          <span className="text-[11px]" style={{ color: 'var(--brand-primary)', fontWeight: 500 }}>{source}</span>
        </div>
        {communityScore !== undefined && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--gray-200)' }}>
              <div className="h-full rounded-full" style={{ width: `${communityScore}%`, background: 'var(--brand-secondary-dark)' }} />
            </div>
            <span className="text-[11px]" style={{ color: 'var(--gray-500)' }}>{communityScore}%</span>
          </div>
        )}
      </div>
    </CardShell>
  );
}

export function WalkerCard({ name, verified, rating, walks, onClick }: {
  name: string;
  verified: 'sms' | 'strict';
  rating: number;
  walks: number;
  onClick?: () => void;
}) {
  return (
    <CardShell onClick={onClick}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--gray-100)' }}>
          <span className="text-xl">👤</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{name}</p>
            <VerificationBadge level={verified} />
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="inline-flex items-center gap-0.5 text-[12px]" style={{ color: 'var(--warning)' }}>
              <Star size={12} fill="currentColor" /> {rating}
            </span>
            <span className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{walks} walks</span>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

export function PlayDateCard({ title, participants, location, onClick }: {
  title: string;
  participants: number;
  location: string;
  onClick?: () => void;
}) {
  return (
    <CardShell onClick={onClick}>
      <div className="flex flex-col gap-1.5">
        <p className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{title}</p>
        <div className="flex items-center gap-1">
          <MapPin size={12} style={{ color: 'var(--gray-400)' }} />
          <span className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={12} style={{ color: 'var(--gray-400)' }} />
          <span className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{participants} dogs attending</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <Shield size={12} style={{ color: 'var(--brand-secondary-dark)' }} />
          <span className="text-[11px]" style={{ color: 'var(--brand-secondary-dark)', fontWeight: 500 }}>Public place · Safety tips shared</span>
        </div>
      </div>
    </CardShell>
  );
}

export function CommunityDogCard({ name, lastSeen, location, onClick }: {
  name: string;
  lastSeen: string;
  location: string;
  onClick?: () => void | Promise<void>;
}) {
  const photoUrl = getCommunityDogPhoto(name);
  return (
    <CardShell onClick={onClick}>
      <div className="flex items-center gap-3">
        <img src={photoUrl} alt={name} className="w-11 h-11 rounded-full object-cover shrink-0" style={{ background: 'var(--warning-bg)' }} />
        <div className="flex-1">
          <p className="text-[14px]" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>{name}</p>
          <span className="text-[11px]" style={{ color: 'var(--gray-400)' }}>Last seen: {lastSeen} · {location}</span>
        </div>
      </div>
    </CardShell>
  );
}

export function SafePointCard({ name, hours, distance, trusted, onClick }: {
  name: string;
  hours: string;
  distance: string;
  trusted?: boolean;
  onClick?: () => void;
}) {
  return (
    <CardShell onClick={onClick}>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--brand-secondary-soft)' }}>
          <span className="text-lg">🏥</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{name}</p>
            {trusted && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'var(--brand-secondary-soft)', color: 'var(--brand-secondary-dark)', fontWeight: 600 }}>
                Trusted Ally
              </span>
            )}
          </div>
          <p className="text-[12px] mt-0.5" style={{ color: 'var(--gray-500)' }}>{hours} · {distance}</p>
        </div>
      </div>
    </CardShell>
  );
}

export function MatchCard({ confidence, reasons, location, time, onClick, candidateType = 'found', description }: {
  confidence: number;
  reasons: string[];
  location: string;
  time: string;
  onClick?: () => void | Promise<void>;
  candidateType?: 'found' | 'sighted' | 'lost';
  description?: string;
}) {
  const candidateVisual = candidateType === 'sighted'
    ? { icon: <Eye size={24} style={{ color: 'var(--warning-dark)' }} />, bg: 'var(--warning-bg)' }
    : candidateType === 'lost'
      ? { icon: <AlertTriangle size={24} style={{ color: 'var(--red-dark)' }} />, bg: 'var(--red-bg)' }
      : { icon: <Search size={24} style={{ color: 'var(--green-dark)' }} />, bg: 'var(--green-bg)' };

  return (
    <CardShell onClick={onClick}>
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0" style={{ background: candidateVisual.bg }}>
          {candidateVisual.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <ConfidenceBadge value={confidence} />
            <FreshnessBadge text={time} />
          </div>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={12} style={{ color: 'var(--gray-400)' }} />
            <span className="text-[12px]" style={{ color: 'var(--gray-500)' }}>{location}</span>
          </div>
          {description && (
            <p className="text-[12px] mt-1 line-clamp-2" style={{ color: 'var(--gray-600)' }}>{description}</p>
          )}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {reasons.map((r) => <MatchReasonTag key={r} reason={r} />)}
          </div>
        </div>
      </div>
    </CardShell>
  );
}
