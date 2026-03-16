import type { IMatchingService, MatchResult } from '../interfaces';
import { matchingApi } from '../api';

export const matchingRealAdapter: IMatchingService = {
  async rankMatches(caseId: string): Promise<MatchResult[]> {
    return matchingApi.run(caseId);
  },
};
