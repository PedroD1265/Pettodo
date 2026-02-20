import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Banner } from '../../components/pettodo/Banners';
import { Btn } from '../../components/pettodo/Buttons';
import { EventCard } from '../../components/pettodo/Cards';
import { EventTrustBadge, VerificationBadge } from '../../components/pettodo/Badges';
import { VerificationGate } from '../../components/pettodo/VerificationFlows';
import { useNavigate } from 'react-router';
import { COMMUNITY, EVENT } from '../../data/demoData';
import { Users, Plus, MessageSquare, Shield, Phone, Flag, AlertTriangle, CheckCircle, Star, MapPin, Calendar, ExternalLink, Download } from 'lucide-react';
import { toast } from 'sonner';

// COM_01
export function COM_01() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="COM_01_CommunityHome" />
      <AppBar title="Communities" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Your Communities</h3>
        <button onClick={() => nav('/communities/detail')} className="flex items-center gap-3 p-3 rounded-xl text-left" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--green-soft)' }}>
            <Users size={20} style={{ color: 'var(--green-dark)' }} />
          </div>
          <div className="flex-1">
            <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{COMMUNITY.name}</p>
            <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>{COMMUNITY.members} members · {COMMUNITY.posts} posts</p>
          </div>
        </button>
        <button className="flex items-center gap-3 p-3 rounded-xl text-left" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--info-soft)' }}>
            <Users size={20} style={{ color: 'var(--info)' }} />
          </div>
          <div className="flex-1">
            <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Riverside Dog Owners</p>
            <p className="text-[11px]" style={{ color: 'var(--gray-500)' }}>128 members · 34 posts</p>
          </div>
        </button>
        <Btn variant="secondary" fullWidth onClick={() => nav('/communities/create')} icon={<Plus size={16} />}>
          Create Community
        </Btn>
        <Btn variant="ghost" fullWidth onClick={() => nav('/events/list')}>
          Browse Events
        </Btn>
      </div>
    </div>
  );
}

// COM_02
export function COM_02() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="COM_02_CreateCommunity_SMSGate" />
      <AppBar title="Create Community" showBack backTo="/communities/home" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Community Name</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="e.g., Downtown Dog Parents" />
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Description</label>
          <textarea className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 72 }} placeholder="What is this community about?" />
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Location / Area</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="e.g., Central Park area" />
        </div>

        <Banner type="info" text="Creating a community requires SMS verification to prevent spam." />

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <div className="flex items-center gap-2">
            <Phone size={16} style={{ color: 'var(--gray-400)' }} />
            <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>+1 (555) 987-6543</span>
          </div>
          <Btn variant="primary" fullWidth className="mt-3">Send Verification Code</Btn>
        </div>

        <Btn variant="daily" fullWidth onClick={() => nav('/communities/home')}>Create Community</Btn>
      </div>
    </div>
  );
}

// COM_03
export function COM_03() {
  const nav = useNavigate();
  const [tab, setTab] = useState('posts');
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="COM_03_CommunityDetail_Tabs" />
      <AppBar title={COMMUNITY.name} showBack backTo="/communities/home" />
      <div className="flex-1 flex flex-col">
        <div className="px-4 py-3" style={{ background: 'var(--green-bg)' }}>
          <p className="text-[13px]" style={{ color: 'var(--green-dark)' }}>{COMMUNITY.description}</p>
          <p className="text-[11px] mt-1" style={{ color: 'var(--green-dark)' }}>{COMMUNITY.members} members</p>
        </div>

        <div className="flex border-b" style={{ borderColor: 'var(--gray-200)' }}>
          {['Posts', 'Events', 'Members'].map((t) => (
            <button key={t} onClick={() => setTab(t.toLowerCase())} className="flex-1 py-3 text-[13px]" style={{
              borderBottom: tab === t.toLowerCase() ? '2px solid var(--green-primary)' : '2px solid transparent',
              color: tab === t.toLowerCase() ? 'var(--green-primary)' : 'var(--gray-500)',
              fontWeight: tab === t.toLowerCase() ? 600 : 400, minHeight: 44,
            }}>{t}</button>
          ))}
        </div>

        <div className="flex-1 p-4 flex flex-col gap-3">
          {tab === 'posts' && (
            <>
              {[
                { author: 'Maria G.', text: 'Has anyone seen a brown dog near the fountain today? Looks lost.', time: '2 hours ago' },
                { author: 'James T.', text: 'Reminder: Community walk this Saturday at 10 AM! Meet at the main entrance.', time: '5 hours ago' },
                { author: 'Sofia L.', text: 'Great tips from the vet talk yesterday. Luna loved meeting everyone!', time: '1 day ago' },
              ].map((p, i) => (
                <div key={i} className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{p.author}</span>
                    <span className="text-[11px]" style={{ color: 'var(--gray-400)' }}>{p.time}</span>
                  </div>
                  <p className="text-[13px]" style={{ color: 'var(--gray-700)' }}>{p.text}</p>
                </div>
              ))}
              <Btn variant="secondary" fullWidth onClick={() => nav('/communities/create-post')} icon={<Plus size={16} />}>
                Create Post
              </Btn>
            </>
          )}
          {tab === 'events' && (
            <>
              <EventCard name={EVENT.name} date={EVENT.date} source={EVENT.source} verified="ai" communityScore={EVENT.communityScore} onClick={() => nav('/events/detail')} />
              <Btn variant="ghost" fullWidth onClick={() => nav('/events/list')}>View All Events</Btn>
            </>
          )}
          {tab === 'members' && (
            <div className="flex flex-col gap-2">
              {['Maria G.', 'James T.', 'Sofia L.', 'Carlos R.', 'Emily K.'].map((m) => (
                <div key={m} className="flex items-center gap-3 p-2 rounded-xl" style={{ minHeight: 48 }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gray-100)' }}>👤</div>
                  <span className="text-[14px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{m}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// COM_04
export function COM_04() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="COM_04_CreatePost_AntiPhishing" />
      <AppBar title="Create Post" showBack backTo="/communities/detail" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <Banner type="antiscam">
          <span>Posts containing suspicious links, phone numbers, or payment requests may be flagged and quarantined.</span>
        </Banner>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Your post</label>
          <textarea className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 120 }} placeholder="Share something with the community..." />
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary" icon={<span>📷</span>}>Photo</Btn>
          <Btn variant="secondary" icon={<MapPin size={16} />}>Location</Btn>
        </div>
        <div className="mt-auto pb-4">
          <Btn variant="daily" fullWidth onClick={() => nav('/communities/detail')}>Publish Post</Btn>
        </div>
      </div>
    </div>
  );
}

// COM_05
export function COM_05() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="COM_05_ModerationQueue_Quarantine" />
      <AppBar title="Moderation Queue" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Flagged posts</h3>
        <p className="text-[12px]" style={{ color: 'var(--gray-500)' }}>These posts were auto-flagged and need review.</p>

        {[
          { author: 'Unknown User', text: 'Send money to get your dog back! Visit bit.ly/xxx', reason: 'Suspicious link + payment language' },
          { author: 'New Account', text: "DM me your address and I'll bring the dog", reason: 'Requesting private address' },
        ].map((p, i) => (
          <div key={i} className="p-3 rounded-xl" style={{ background: 'var(--red-bg)', border: '1px solid var(--red-soft)' }}>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={14} style={{ color: 'var(--red-primary)' }} />
              <span className="text-[12px]" style={{ fontWeight: 600, color: 'var(--red-dark)' }}>Quarantined</span>
            </div>
            <p className="text-[13px]" style={{ color: 'var(--gray-900)' }}>{p.text}</p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--red-dark)' }}>Reason: {p.reason}</p>
            <div className="flex gap-2 mt-2">
              <Btn variant="ghost" className="flex-1">Approve</Btn>
              <Btn variant="destructive" className="flex-1">Remove</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// EVT_01
export function EVT_01() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EVT_01_EventList_WithTrust" />
      <AppBar title="Events" showBack />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="text-[15px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Upcoming events</h3>
        <EventCard name={EVENT.name} date={EVENT.date} source={EVENT.source} verified="ai" communityScore={EVENT.communityScore} onClick={() => nav('/events/detail')} />
        <EventCard name="Puppy socialization meetup" date="Sunday, Feb 23, 2026 — 2:00 PM" source="Facebook: Dog Lovers NYC" verified="community" communityScore={67} onClick={() => nav('/events/detail')} />
        <EventCard name="Free vet check-up day" date="Saturday, Mar 1, 2026 — 9:00 AM" source="Official: City Animal Services" verified="ai" onClick={() => nav('/events/detail')} />
        <Btn variant="secondary" fullWidth onClick={() => nav('/events/create')} icon={<Plus size={16} />}>
          Create Event
        </Btn>
      </div>
    </div>
  );
}

// EVT_02
export function EVT_02() {
  const nav = useNavigate();
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const handleCalendar = (type: 'google' | 'ics') => {
    if (type === 'google') {
      // transform date string to ISO-like for google
      // Demo: just open google calendar create link
      window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(EVENT.name) + '&location=' + encodeURIComponent(EVENT.location), '_blank');
    } else {
      toast.success('Downloaded .ics file (simulated)');
    }
    setShowCalendarModal(false);
  };

  return (
    <div className="flex flex-col min-h-full relative">
      <ScreenLabel name="EVT_02_EventDetail_SourceMapTicks" />
      <AppBar title="Event Detail" showBack backTo="/events/list" />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <EventTrustBadge type="ai" />
          <span className="text-[11px]" style={{ color: 'var(--gray-400)' }}>Score: {EVENT.communityScore}%</span>
        </div>
        <h2 className="text-[20px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{EVENT.name}</h2>
        <div className="flex items-center gap-2">
          <Calendar size={14} style={{ color: 'var(--gray-400)' }} />
          <span className="text-[13px]" style={{ color: 'var(--gray-700)' }}>{EVENT.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} style={{ color: 'var(--gray-400)' }} />
          <span className="text-[13px]" style={{ color: 'var(--gray-700)' }}>{EVENT.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <ExternalLink size={14} style={{ color: 'var(--info)' }} />
          <span className="text-[13px]" style={{ color: 'var(--info)' }}>Event source: {EVENT.source}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={14} style={{ color: 'var(--gray-400)' }} />
          <span className="text-[13px]" style={{ color: 'var(--gray-700)' }}>{EVENT.attendees} attending</span>
        </div>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
          <p className="text-[13px]" style={{ color: 'var(--gray-700)' }}>Organized by: {EVENT.organizer}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full" style={{ background: 'var(--gray-200)' }}>
            <div className="h-full rounded-full" style={{ width: `${EVENT.communityScore}%`, background: 'var(--green-primary)' }} />
          </div>
          <span className="text-[12px]" style={{ color: 'var(--gray-500)' }}>Community Verified (weighted) {EVENT.communityScore}%</span>
        </div>

        <div className="flex gap-2 mt-auto pb-4">
          <Btn variant="daily" className="flex-1" onClick={() => nav('/events/ia-verification')}>Attend</Btn>
          <Btn variant="secondary" className="flex-1" icon={<Calendar size={16} />} onClick={() => setShowCalendarModal(true)}>Calendar</Btn>
        </div>
      </div>

      {showCalendarModal && (
        <div className="absolute inset-0 z-50 flex items-end justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full bg-white rounded-t-2xl p-4 flex flex-col gap-4 animate-in slide-in-from-bottom duration-300">
             <h3 className="text-[17px] font-semibold text-center">Add to Calendar</h3>
             <Btn variant="secondary" fullWidth onClick={() => handleCalendar('google')}>Google Calendar</Btn>
             <Btn variant="secondary" fullWidth onClick={() => handleCalendar('ics')}>Download .ics File</Btn>
             <Btn variant="ghost" fullWidth onClick={() => setShowCalendarModal(false)}>Cancel</Btn>
             <p className="text-[11px] text-center text-gray-400">Calendar integration is simulated in this prototype.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// EVT_03
export function EVT_03() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EVT_03_CreateEvent_WithSource" />
      <AppBar title="Create Event" showBack backTo="/events/list" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Event Name</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="e.g., Dog training session" />
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Date & Time</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="Select date and time" />
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Location</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="e.g., Riverside Park" />
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Event source (URL or text)</label>
          <input className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }} placeholder="e.g., Instagram: @dogs_nyc" />
          <p className="text-[11px] mt-1" style={{ color: 'var(--gray-400)' }}>Providing a verifiable source increases trust score.</p>
        </div>
        <div>
          <label className="text-[13px] mb-1 block" style={{ fontWeight: 500, color: 'var(--gray-700)' }}>Description</label>
          <textarea className="w-full px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 72 }} placeholder="Describe the event..." />
        </div>
        <Btn variant="daily" fullWidth onClick={() => nav('/events/list')}>Create Event</Btn>
      </div>
    </div>
  );
}

// EVT_04
export function EVT_04() {
  const nav = useNavigate();
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EVT_04_IA_VerificationResult" />
      <AppBar title="AI Verification" showBack backTo="/events/detail" />
      <div className="flex-1 p-4 flex flex-col gap-4 items-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--info-soft)' }}>
          <CheckCircle size={32} style={{ color: 'var(--info)' }} />
        </div>
        <h3 className="text-[17px] text-center" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>AI Verified</h3>
        <p className="text-[13px] text-center" style={{ color: 'var(--gray-500)' }}>
          This event's source has been verified by our AI system.
        </p>

        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <CheckCircle size={14} style={{ color: 'var(--green-primary)' }} />
            <span className="text-[13px]" style={{ color: 'var(--gray-700)' }}>Source URL is active and matches event details</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <CheckCircle size={14} style={{ color: 'var(--green-primary)' }} />
            <span className="text-[13px]" style={{ color: 'var(--gray-700)' }}>Organizer account is established (2+ years)</span>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
            <CheckCircle size={14} style={{ color: 'var(--green-primary)' }} />
            <span className="text-[13px]" style={{ color: 'var(--gray-700)' }}>No suspicious patterns detected</span>
          </div>
        </div>

        <Btn variant="daily" fullWidth onClick={() => nav('/events/community-confirmation')}>View Community Score</Btn>
      </div>
    </div>
  );
}

// EVT_05
export function EVT_05() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EVT_05_CommunityConfirmation_Weighted" />
      <AppBar title="Community Score" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Community Verified (weighted)</h3>
        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>Community members have confirmed this event. Scores are weighted by member reputation.</p>

        <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'var(--green-bg)', border: '1px solid var(--green-soft)' }}>
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--gray-200)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--green-primary)" strokeWidth="3" strokeDasharray={`${EVENT.communityScore} ${100 - EVENT.communityScore}`} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[16px]" style={{ fontWeight: 700, color: 'var(--green-dark)' }}>{EVENT.communityScore}%</span>
            </div>
          </div>
          <div>
            <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>High confidence</p>
            <p className="text-[12px]" style={{ color: 'var(--green-dark)' }}>14 confirmations from verified members</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { name: 'Maria G.', weight: 'High', reputation: '4.9' },
            { name: 'James T.', weight: 'Medium', reputation: '4.2' },
            { name: 'Emily K.', weight: 'High', reputation: '4.8' },
          ].map((m) => (
            <div key={m.name} className="flex items-center justify-between p-2.5 rounded-xl" style={{ background: 'var(--gray-100)' }}>
              <span className="text-[13px]" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{m.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px]" style={{ color: 'var(--gray-400)' }}>★ {m.reputation}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: m.weight === 'High' ? 'var(--green-soft)' : 'var(--warning-bg)', color: m.weight === 'High' ? 'var(--green-dark)' : 'var(--warning)', fontWeight: 600 }}>
                  {m.weight} weight
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// EVT_06
export function EVT_06() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EVT_06_OfficialOrganizer_StrictVerification" />
      <AppBar title="Official Organizer" showBack />
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'var(--info-bg)', border: '1px solid var(--info-soft)' }}>
          <Shield size={24} style={{ color: 'var(--info)' }} />
          <div>
            <p className="text-[14px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Official Organizer</p>
            <p className="text-[12px]" style={{ color: 'var(--info-dark)' }}>This action requires Strict verification (ID + Selfie).</p>
          </div>
        </div>

        <p className="text-[13px]" style={{ color: 'var(--gray-500)' }}>
          To become an official event organizer, you must complete Strict verification. This adds a verified badge to all your events.
        </p>

        <VerificationGate requiredLevel="strict" actionLabel="Becoming an official organizer">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'var(--green-bg)' }}>
              <CheckCircle size={14} style={{ color: 'var(--green-primary)' }} />
              <span className="text-[13px]" style={{ color: 'var(--green-dark)' }}>SMS verification complete</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'var(--green-bg)' }}>
              <CheckCircle size={14} style={{ color: 'var(--green-primary)' }} />
              <span className="text-[13px]" style={{ color: 'var(--green-dark)' }}>ID + Selfie verification complete</span>
            </div>
            <Banner type="success" text="You are now eligible to be an official organizer!" />
            <Btn variant="daily" fullWidth>Apply as Official Organizer</Btn>
          </div>
        </VerificationGate>
      </div>
    </div>
  );
}