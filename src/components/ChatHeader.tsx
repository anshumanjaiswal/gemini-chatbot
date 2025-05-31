
import { Bot, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  onClearChat: () => void;
}

export const ChatHeader = ({ onClearChat }: ChatHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gemini AI Chat
            </h1>
            <p className="text-xs text-slate-400">Powered by Google Gemini</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearChat}
          className="border-slate-600 hover:border-red-500 hover:text-red-400 transition-all duration-200"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>
    </div>
  );
};
