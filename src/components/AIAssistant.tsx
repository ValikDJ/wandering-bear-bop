import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, X, MessageSquareText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client'; // Import Supabase client

interface AIAssistantProps {
  characterType: 'robot' | 'cat' | 'owl';
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ characterType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const getCharacterSVG = useCallback(() => {
    const baseClasses = "w-full h-full object-contain animate-breathe";
    const speakingClass = isTyping ? "animate-speak" : "";

    switch (characterType) {
      case 'robot':
        return (
          <svg className={`${baseClasses} ${speakingClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="60" height="60" rx="10" fill="#60A5FA"/> {/* Body */}
            <circle cx="40" cy="40" r="5" fill="#fff"/> {/* Left Eye */}
            <circle cx="60" cy="40" r="5" fill="#fff"/> {/* Right Eye */}
            <rect x="35" y="60" width="30" height="5" rx="2" fill="#fff"/> {/* Mouth */}
            <rect x="30" y="10" width="5" height="10" fill="#60A5FA"/> {/* Left Antenna */}
            <rect x="65" y="10" width="5" height="10" fill="#60A5FA"/> {/* Right Antenna */}
          </svg>
        );
      case 'cat':
        return (
          <svg className={`${baseClasses} ${speakingClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="55" r="35" fill="#FDBA74"/> {/* Head */}
            <path d="M30 40 L40 20 L50 40 Z" fill="#FDBA74"/> {/* Left Ear */}
            <path d="M70 40 L60 20 L50 40 Z" fill="#FDBA74"/> {/* Right Ear */}
            <circle cx="42" cy="50" r="3" fill="#fff"/> {/* Left Eye */}
            <circle cx="58" cy="50" r="3" fill="#fff"/> {/* Right Eye */}
            <path d="M50 60 Q45 65 50 70 Q55 65 50 60 Z" fill="#fff"/> {/* Mouth */}
            <line x1="40" y1="55" x2="30" y2="50" stroke="#333" strokeWidth="1"/> {/* Whiskers */}
            <line x1="40" y1="58" x2="30" y2="60" stroke="#333" strokeWidth="1"/>
            <line x1="60" y1="55" x2="70" y2="50" stroke="#333" strokeWidth="1"/>
            <line x1="60" y1="58" x2="70" y2="60" stroke="#333" strokeWidth="1"/>
          </svg>
        );
      case 'owl':
        return (
          <svg className={`${baseClasses} ${speakingClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="#A78BFA"/> {/* Body */}
            <circle cx="38" cy="40" r="8" fill="#fff"/> {/* Left Eye */}
            <circle cx="62" cy="40" r="8" fill="#fff"/> {/* Right Eye */}
            <circle cx="38" cy="40" r="3" fill="#333"/> {/* Left Pupil */}
            <circle cx="62" cy="40" r="3" fill="#333"/> {/* Right Pupil */}
            <path d="M50 55 L45 65 L55 65 Z" fill="#FBBF24"/> {/* Beak */}
            <path d="M30 25 Q40 15 50 25 Q60 15 70 25" stroke="#333" strokeWidth="2" fill="none"/> {/* Eyebrows/Feathers */}
          </svg>
        );
      default:
        return null;
    }
  }, [characterType, isTyping]);

  const processAIResponse = useCallback(async (query: string) => {
    setIsTyping(true);
    let aiResponseText = "Вибач, сталася помилка при отриманні відповіді від помічника.";

    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: { query },
      });

      if (error) {
        console.error('Supabase function error:', error);
        aiResponseText = `Вибач, сталася помилка: ${error.message}`;
      } else if (data && data.message) {
        aiResponseText = data.message;
      }
    } catch (e) {
      console.error('Error invoking AI assistant function:', e);
      aiResponseText = `Вибач, не вдалося зв'язатися з помічником.`;
    } finally {
      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponseText }]);
      setIsTyping(false);
    }
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    processAIResponse(userMessage);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 shadow-lg bg-primary text-primary-foreground hover:bg-primary/80 flex items-center justify-center"
          aria-label="Відкрити чат з помічником"
        >
          <MessageSquareText className="w-8 h-8" />
        </Button>
      )}

      {isOpen && (
        <div className="bg-card border border-border rounded-lg shadow-xl flex flex-col w-80 h-96">
          <div className="flex justify-between items-center p-3 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
            <h3 className="font-bold text-lg">Твій Помічник</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
              aria-label="Закрити чат"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-grow p-3 overflow-y-auto custom-scrollbar">
            <ScrollArea className="h-full pr-2">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground mt-4">
                  Привіт! Я твій помічник. Запитай мене про HTML або CSS!
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "mb-2 p-2 rounded-lg max-w-[80%]",
                    msg.sender === 'user'
                      ? "ml-auto bg-blue-500 text-white rounded-br-none"
                      : "mr-auto bg-muted text-muted-foreground rounded-bl-none"
                  )}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="mb-2 p-2 rounded-lg mr-auto bg-muted text-muted-foreground rounded-bl-none animate-pulse">
                  Помічник друкує...
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </div>

          <div className="p-3 border-t border-border flex items-center gap-2">
            <div className="w-12 h-12 flex-shrink-0">
              {getCharacterSVG()}
            </div>
            <form onSubmit={handleSendMessage} className="flex-grow flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Запитай щось..."
                className="flex-grow bg-input text-foreground"
                disabled={isTyping}
              />
              <Button type="submit" size="icon" disabled={isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;