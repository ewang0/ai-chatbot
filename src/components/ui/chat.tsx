'use client';

import { Message, useChat } from '@ai-sdk/react';
import { createIdGenerator } from 'ai';
import { ChatMessage } from './chat-message';
import { MessageInput } from './message-input';
import ChatHeader from './chat-header';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

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
      <div className="max-h-screen h-full">
        {/* messages container */}
          <div className="flex flex-col h-full w-full ">
            <div className='flex items-center px-4'>            
              <ChatHeader />
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto py-4 max-w-[736px] h-full w-full mx-auto">
              {messages.map(m => (
                <ChatMessage key={m.id} role={m.role} content={m.content}id={m.id} />
              ))}
            </div>
            {/* input container */}
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 max-w-[768px] mx-auto w-full bg-white mb-4">
                <MessageInput value={input} onChange={handleInputChange} isGenerating={false} allowAttachments={false} />
              <span className="text-sm text-gray-500">Deep work is valuable.</span>
            </form>
          </div>
      </div>
  );
}