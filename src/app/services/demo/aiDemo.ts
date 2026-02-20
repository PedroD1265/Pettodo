import type { IAiAssistantService, IMatchingService, MatchResult } from '../interfaces';
import { EDUCATION_ARTICLES } from '../../data/education';

const SAFETY_DISCLAIMER =
  'This information is for educational purposes only. Always consult a licensed veterinarian for medical advice.';

export const aiDemoAdapter: IAiAssistantService = {
  async answer(question) {
    const q = question.toLowerCase();
    const matches = EDUCATION_ARTICLES.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.body.some(p => p.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      return {
        answer: `I don't have specific information about that in my knowledge base. ${SAFETY_DISCLAIMER}`,
        citations: [],
      };
    }

    const best = matches[0];
    const excerpt = best.body[0] ?? best.summary;

    return {
      answer: `${excerpt}\n\n${SAFETY_DISCLAIMER}`,
      citations: [
        {
          title: best.title,
          url: best.sourceUrl,
        },
      ],
    };
  },
};

export const matchingDemoAdapter: IMatchingService = {
  async rankMatches(lostCaseId): Promise<MatchResult[]> {
    void lostCaseId;
    return [
      {
        caseId: 'FOUND-001',
        confidence: 91,
        reasons: ['Brown coloring', 'White chest', 'Red collar', 'Medium size', 'Central Park area'],
        location: '0.4 km NE from Bethesda',
        time: '2 hours ago',
      },
      {
        caseId: 'SIGHT-001',
        confidence: 74,
        reasons: ['Brown coloring', 'Medium size', 'Running NE'],
        location: '0.8 km N',
        time: '5 hours ago',
      },
      {
        caseId: 'FOUND-002',
        confidence: 58,
        reasons: ['Brown coloring', 'Medium size'],
        location: '1.2 km SE',
        time: '1 day ago',
      },
    ];
  },
};
