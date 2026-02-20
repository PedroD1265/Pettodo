import type { IChatService } from '../interfaces';

export const chatAblyStub: IChatService = {
  async createThread(caseId) {
    // TODO: Implement Ably channel creation
    // Channel name pattern: case:{caseId}
    // Use Ably Token Auth: GET /api/chat/token to get a short-lived token
    // NEVER use the master Ably API key in the client.
    // npm install ably
    // const ably = new Ably.Realtime({ authUrl: '/api/chat/token' });
    return { threadId: `case:${caseId}` };
  },

  async sendMessage(threadId, message) {
    // TODO: Implement Ably message publish
    // const channel = ably.channels.get(threadId);
    // await channel.publish('message', { text: message, sender: 'user', createdAt: Date.now() });
    throw new Error(`[Ably] Not implemented. threadId=${threadId} message=${message}`);
  },

  subscribe(threadId, onMessage) {
    // TODO: Implement Ably channel subscription
    // const channel = ably.channels.get(threadId);
    // channel.subscribe('message', (msg) => onMessage(msg.data));
    // return () => channel.unsubscribe();
    console.warn(`[Ably] subscribe not implemented. threadId=${threadId}`);
    void onMessage;
    return () => {};
  },
};
