
import { forwardRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ messages, isLoading }, ref) => {
    return (
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={ref} />
        </div>
      </div>
    );
  }
);

ChatMessages.displayName = 'ChatMessages';
