
import { Copy, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast({
        title: "Copied!",
        description: "Message copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy message to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex items-start gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
          message.role === 'user' 
            ? 'message-user text-white' 
            : 'bg-gradient-to-br from-emerald-500 to-blue-600 text-white'
        }`}>
          {message.role === 'user' ? (
            <User className="w-4 h-4" />
          ) : (
            <Bot className="w-4 h-4" />
          )}
        </div>
        
        <div className={`group relative ${
          message.role === 'user' 
            ? 'message-user text-white px-4 py-3 rounded-2xl rounded-tr-md shadow-lg' 
            : 'message-ai px-4 py-3 rounded-2xl rounded-tl-md shadow-lg'
        }`}>
          <div className={`text-sm leading-relaxed ${
            message.role === 'user' ? 'text-white' : 'text-slate-200'
          }`}>
            {message.content}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-6 h-6 p-1 ${
              message.role === 'user' 
                ? 'hover:bg-white/20 text-white' 
                : 'hover:bg-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
