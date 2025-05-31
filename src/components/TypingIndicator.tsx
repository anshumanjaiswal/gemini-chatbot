
import { Bot } from 'lucide-react';

export const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-2xl rounded-tl-md shadow-lg">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
