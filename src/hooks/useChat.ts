
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(API_KEY);

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant powered by Google Gemini. I'm here to help you with questions, creative tasks, analysis, and much more. What would you like to explore today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      role: 'assistant',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are a helpful AI assistant. Respond to the following message in a friendly and informative way: ${userMessage.content}`;

      const result = await model.generateContentStream(prompt);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === assistantMessage.id
                ? { ...msg, content: msg.content + chunkText }
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      });
      
      // Remove the empty assistant message on error
      setMessages(prev => prev.filter(msg => msg.id !== assistantMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your AI assistant powered by Google Gemini. I'm here to help you with questions, creative tasks, analysis, and much more. What would you like to explore today?",
        role: 'assistant',
        timestamp: new Date()
      }
    ]);
    toast({
      title: "Chat cleared",
      description: "All messages have been cleared.",
    });
  };

  return {
    messages,
    input,
    isLoading,
    messagesEndRef,
    setInput,
    handleSend,
    handleKeyPress,
    clearChat
  };
};
