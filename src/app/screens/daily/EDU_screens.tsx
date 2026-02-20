import React, { useState } from 'react';
import { ScreenLabel } from '../../components/pettodo/ScreenLabel';
import { AppBar } from '../../components/pettodo/AppBar';
import { Btn } from '../../components/pettodo/Buttons';
import { Banner } from '../../components/pettodo/Banners';
import { useNavigate, useParams } from 'react-router';
import { EDUCATION_ARTICLES } from '../../data/education';
import { BookOpen, ExternalLink, MessageSquare, Play, Image, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const CATEGORIES = ['All', 'Emergency', 'Health', 'Behavior', 'Social'] as const;

// EDU_01
export function EDU_01() {
  const nav = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = activeCategory === 'All'
    ? EDUCATION_ARTICLES
    : EDUCATION_ARTICLES.filter(a => a.category === activeCategory);

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EDU_01_Library_Curated" />
      <AppBar title="Learn" showBack={false} />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <h3 className="text-[17px]" style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Curated library</h3>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className="px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap"
              style={{
                background: activeCategory === c ? 'var(--green-primary)' : 'var(--gray-100)',
                color: activeCategory === c ? 'var(--white)' : 'var(--gray-700)',
                fontWeight: 500, minHeight: 44,
              }}
            >
              {c}
            </button>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="p-4 rounded-xl text-center" style={{ background: 'var(--gray-100)' }}>
            <p className="text-[14px]" style={{ color: 'var(--gray-500)' }}>No articles in this category yet.</p>
          </div>
        )}
        {filtered.map((a) => (
          <button
            key={a.id}
            onClick={() => nav(`/education/article/${a.id}`)}
            className="flex items-start gap-3 p-3 rounded-xl text-left"
            style={{ background: 'var(--gray-100)', minHeight: 48 }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--green-soft)' }}>
              <BookOpen size={20} style={{ color: 'var(--green-dark)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] truncate" style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{a.title}</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--gray-400)' }}>{a.sourceName} · {a.date}</p>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full mt-1 inline-block" style={{ background: 'var(--green-bg)', color: 'var(--green-dark)' }}>{a.category}</span>
            </div>
          </button>
        ))}
        <Btn variant="secondary" fullWidth onClick={() => nav('/education/ai-assistant')}>
          <MessageSquare size={16} /> Ask AI Assistant
        </Btn>
      </div>
    </div>
  );
}

// EDU_02
export function EDU_02() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const article = id ? EDUCATION_ARTICLES.find(a => a.id === id) : EDUCATION_ARTICLES[0];

  if (!article) {
    return (
      <div className="flex flex-col min-h-full">
        <ScreenLabel name="EDU_02_Article_SourceDateBadge" />
        <AppBar title="Article" showBack backTo="/education/library" />
        <div className="flex-1 p-4 flex flex-col gap-4 items-center justify-center">
          <AlertTriangle size={40} style={{ color: 'var(--warning)' }} />
          <h2 className="text-[18px] text-center" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>Article not found</h2>
          <p className="text-[14px] text-center" style={{ color: 'var(--gray-500)' }}>
            This article may have been removed or the link is incorrect.
          </p>
          <Btn variant="secondary" onClick={() => nav('/education/library')}>Back to Library</Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EDU_02_Article_SourceDateBadge" />
      <AppBar title="Article" showBack backTo="/education/library" />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full text-[10px]" style={{ background: 'var(--green-bg)', color: 'var(--green-dark)', fontWeight: 600 }}>{article.category}</span>
          <span className="text-[11px]" style={{ color: 'var(--gray-400)' }}>{article.date}</span>
        </div>
        <h2 className="text-[20px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{article.title}</h2>
        <a
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <ExternalLink size={14} style={{ color: 'var(--info)' }} />
          <span className="text-[13px]" style={{ color: 'var(--info)', fontWeight: 500 }}>Source: {article.sourceName}</span>
        </a>

        <div className="p-3 rounded-xl" style={{ background: 'var(--gray-50)', border: '1px solid var(--gray-200)' }}>
          <p className="text-[13px]" style={{ color: 'var(--gray-600)', fontStyle: 'italic' }}>{article.summary}</p>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          {article.body.map((paragraph, i) => (
            <p key={i} className="text-[14px]" style={{ color: 'var(--gray-700)', lineHeight: 1.6 }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-2 pt-3" style={{ borderTop: '1px solid var(--gray-200)' }}>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ExternalLink size={14} style={{ color: 'var(--info)' }} />
            <span className="text-[13px]" style={{ color: 'var(--info)', fontWeight: 500 }}>Read original on {article.sourceName} ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// EDU_03
export function EDU_03() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EDU_03_AI_Assistant_Guardrails" />
      <AppBar title="AI Assistant" showBack backTo="/education/library" />
      <div className="flex-1 p-4 flex flex-col gap-3">
        <Banner type="warning">
          <span>This AI provides general pet care information only. For medical emergencies, contact your veterinarian immediately.</span>
        </Banner>

        <div className="flex-1 flex flex-col gap-3">
          <div className="flex justify-start">
            <div className="px-3 py-2 rounded-2xl max-w-[80%]" style={{ background: 'var(--gray-100)' }}>
              <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>
                Hello! I can help with general pet care questions. What would you like to know?
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="px-3 py-2 rounded-2xl max-w-[80%]" style={{ background: 'var(--green-primary)' }}>
              <span className="text-[14px]" style={{ color: 'var(--white)' }}>
                What should I feed a medium-sized dog?
              </span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="px-3 py-2 rounded-2xl max-w-[80%]" style={{ background: 'var(--gray-100)' }}>
              <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>
                A medium-sized dog (18–25 kg) typically needs 1.5–2.5 cups of quality dry food per day, split into two meals. Always consult your vet for personalized dietary advice.
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2.5 rounded-xl" style={{ background: 'var(--gray-100)', minHeight: 48 }}>
            <span className="text-[14px]" style={{ color: 'var(--gray-400)' }}>Ask a question...</span>
          </div>
          <Btn variant="daily" onClick={() => toast('Demo only — AI Q&A coming soon.')}>Send</Btn>
        </div>
      </div>
    </div>
  );
}

// EDU_04
export function EDU_04() {
  return (
    <div className="flex flex-col min-h-full">
      <ScreenLabel name="EDU_04_ImageVideo_PracticalGuide" />
      <AppBar title="Practical Guide" showBack backTo="/education/library" />
      <div className="flex-1 p-4 flex flex-col gap-4">
        <h2 className="text-[20px]" style={{ fontWeight: 700, color: 'var(--gray-900)' }}>How to safely introduce dogs</h2>

        <div className="w-full aspect-video rounded-xl flex items-center justify-center relative" style={{ background: 'var(--gray-100)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
            <Play size={24} style={{ color: 'var(--white)' }} fill="white" />
          </div>
          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[11px]" style={{ background: 'rgba(0,0,0,0.6)', color: 'var(--white)' }}>3:42</span>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { step: 1, text: 'Meet in a neutral, public space' },
            { step: 2, text: 'Keep both dogs on leash initially' },
            { step: 3, text: 'Allow sniffing from a distance first' },
            { step: 4, text: 'Watch body language for signs of stress' },
            { step: 5, text: 'Gradually decrease distance if both are calm' },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--gray-100)' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--green-primary)', color: 'var(--white)', fontSize: 12, fontWeight: 700 }}>
                {s.step}
              </div>
              <span className="text-[14px]" style={{ color: 'var(--gray-900)' }}>{s.text}</span>
            </div>
          ))}
        </div>

        <div className="w-full h-32 rounded-xl flex items-center justify-center" style={{ background: 'var(--gray-100)' }}>
          <Image size={24} style={{ color: 'var(--gray-400)' }} />
          <span className="text-[12px] ml-2" style={{ color: 'var(--gray-400)' }}>Infographic: Body language guide</span>
        </div>
      </div>
    </div>
  );
}
