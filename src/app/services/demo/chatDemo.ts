import type { IChatService } from '../interfaces';
import { generateId } from '../../data/storage';

const SCRIPTED_REPLIES = [
  'Yes, the dog is still here. She seems calm now.',
  'I\'m at the north entrance of the park, near the fountain.',
  'Should I wait here? How long until you arrive?',
  'She ate a small treat I offered. Looks healthy.',
  'I can send a live photo if that helps confirm.',
];

let replyIndex = 0;

const subscribers = new Map<string, Set<(msg: { text: string; sender: string }) => void>>();

export const chatDemoAdapter: IChatService = {
  async createThread(caseId) {
    return { threadId: `thread-${caseId}` };
  },

  async sendMessage(threadId, message) {
    void message;
    setTimeout(() => {
      const reply = SCRIPTED_REPLIES[replyIndex % SCRIPTED_REPLIES.length];
      replyIndex++;
      const subs = subscribers.get(threadId);
      if (subs) {
        subs.forEach(cb => cb({ text: reply, sender: 'other' }));
      }
    }, 1200);
  },

  subscribe(threadId, onMessage) {
    if (!subscribers.has(threadId)) {
      subscribers.set(threadId, new Set());
    }
    subscribers.get(threadId)!.add(onMessage);
    return () => {
      subscribers.get(threadId)?.delete(onMessage);
    };
  },
};

export function getNextScriptedReply(): string {
  const reply = SCRIPTED_REPLIES[replyIndex % SCRIPTED_REPLIES.length];
  replyIndex++;
  return reply;
}

export function makeInboundMessage(threadId: string, caseId: string) {
  return {
    id: generateId('msg'),
    threadId,
    caseId,
    text: getNextScriptedReply(),
    sender: 'other' as const,
    createdAt: Date.now(),
  };
}
