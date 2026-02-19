import React from 'react';
import { Shield } from 'lucide-react';

interface Message {
  id: number;
  sender: 'me' | 'other' | 'system';
  text: string;
}

export function ChatBubble({ msg }: { msg: Message }) {
  if (msg.sender === 'system') {
    return (
      <div className="flex justify-center my-2">
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl max-w-[90%]" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
          <Shield size={13} style={{ color: 'var(--warning)' }} />
          <span className="text-[12px]" style={{ color: 'var(--warning)', fontWeight: 500 }}>{msg.text}</span>
        </div>
      </div>
    );
  }

  const isMe = msg.sender === 'me';
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} my-1`}>
      <div
        className="px-3 py-2 rounded-2xl max-w-[75%]"
        style={{
          background: isMe ? 'var(--gray-900)' : 'var(--gray-100)',
          color: isMe ? 'var(--white)' : 'var(--gray-900)',
          borderBottomRightRadius: isMe ? 4 : 16,
          borderBottomLeftRadius: isMe ? 16 : 4,
        }}
      >
        <span className="text-[14px]">{msg.text}</span>
      </div>
    </div>
  );
}

export function ChatView({ messages }: { messages: Message[] }) {
  return (
    <div className="flex flex-col gap-0.5 px-4 py-3 flex-1 overflow-y-auto">
      {messages.map((m) => (
        <ChatBubble key={m.id} msg={m} />
      ))}
    </div>
  );
}
