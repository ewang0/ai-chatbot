'use client';

import { Message, useChat } from '@ai-sdk/react';
import { createIdGenerator } from 'ai';
import { ChatMessage } from './chat-message';
import { MessageInput } from './message-input';

export default function Chat({
  id,
  initialMessages,
}: { id?: string | undefined; initialMessages?: Message[] } = {}) {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    id,
    initialMessages, 
    sendExtraMessageFields: true,
    generateId: createIdGenerator({
      prefix: 'msgc',
      size: 16,
    }),
    onFinish: (message) => {
      console.log('onFinish', message);
    },
  });

  return (
      <div className="flex flex-col p-4 max-w-[736px] w-full mx-auto h-screen justify-between">
        {/* messages container */}
        <div className="overflow-y-auto flex flex-col gap-4 p-4 max-w-[736px] w-full">
          {messages.map(m => (
            <ChatMessage key={m.id} role={m.role} content={m.content}id={m.id} />
          ))}
        </div>
        {/* input container */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
          <MessageInput value={input} onChange={handleInputChange} isGenerating={false} allowAttachments={false} />
          <span className="text-sm text-gray-500">Deep work is valuable.</span>
        </form>
      </div>
  );
}