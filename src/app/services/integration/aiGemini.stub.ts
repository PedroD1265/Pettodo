import type { IAiAssistantService, IMatchingService, MatchResult } from '../interfaces';

export const aiGeminiStub: IAiAssistantService = {
  async answer(question, context) {
    // TODO: Implement via backend proxy (NEVER put GEMINI_API_KEY in client)
    // POST /api/ai/answer  body: { question, context }
    // Backend uses @google/generative-ai:
    //   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    //   const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    //   const result = await model.generateContent(prompt);
    //   const text = result.response.text();
    throw new Error(`[Gemini AI] Not implemented. question=${question} context=${context}`);
  },
};

export const matchingGeminiStub: IMatchingService = {
  async rankMatches(lostCaseId): Promise<MatchResult[]> {
    // TODO: Implement embedding-based matching via backend
    // POST /api/ai/rank-matches  body: { lostCaseId }
    // Backend: generate text embeddings for lost case + candidate cases
    // Compute cosine similarity → sort by score
    // Return top N with confidence scores
    throw new Error(`[Gemini Matching] Not implemented. lostCaseId=${lostCaseId}`);
  },
};
