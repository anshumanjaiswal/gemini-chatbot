
import { ChatHeader } from '@/components/ChatHeader';
import { ChatMessages } from '@/components/ChatMessages';
import { ChatInput } from '@/components/ChatInput';
import { useChat } from '@/hooks/useChat';

const Index = () => {
  const {
    messages,
    input,
    isLoading,
    messagesEndRef,
    setInput,
    handleSend,
    handleKeyPress,
    clearChat
  } = useChat();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        <ChatHeader onClearChat={clearChat} />
        
        <ChatMessages 
          messages={messages} 
          isLoading={isLoading} 
          ref={messagesEndRef}
        />
        
        <ChatInput
          input={input}
          onInputChange={setInput}
          onSend={handleSend}
          onKeyPress={handleKeyPress}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
