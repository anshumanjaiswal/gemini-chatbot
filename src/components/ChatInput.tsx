
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

export const ChatInput = ({ 
  input, 
  onInputChange, 
  onSend, 
  onKeyPress, 
  isLoading 
}: ChatInputProps) => {
  return (
    <div className="sticky bottom-0 bg-slate-900/80 backdrop-blur-xl border-t border-slate-700/50 p-4">
      <Card className="bg-slate-800/50 border-slate-700/50 p-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Ask Gemini anything..."
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 pr-12 focus:border-blue-500 transition-all duration-200"
              disabled={isLoading}
            />
            <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
          <Button
            onClick={onSend}
            disabled={!input.trim() || isLoading}
            className="chat-gradient hover:opacity-90 transition-all duration-200 px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-subtle"></div>
          <span>AI is ready • Press Enter to send</span>
        </div>
      </Card>
    </div>
  );
};
