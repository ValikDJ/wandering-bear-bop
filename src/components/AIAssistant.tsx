import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, X, MessageSquareText } from 'lucide-react';
import { searchIndex, SearchItem } from '@/data/searchIndex'; // Import SearchItem type
import { glossaryData, GlossaryTerm } from '@/data/glossaryData'; // Import GlossaryTerm type
import { expandQueryWithSynonyms } from '@/data/synonymMap';
import Fuse from 'fuse.js';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface AIAssistantProps {
  characterType: 'robot' | 'cat' | 'owl';
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

// Helper function for emojis
const getEmojiForType = (type: SearchItem['type']) => {
  switch (type) {
    case 'lesson': return '📚';
    case 'example': return '💡';
    case 'quiz': return '🎮';
    case 'project-template': return '🚀';
    case 'glossary': return '📖';
    default: return '';
  }
};

// Fuse.js options for searching the knowledge base
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'description', weight: 0.5 },
    { name: 'keywords', weight: 0.9 },
  ],
  threshold: 0.3, // Increased threshold for broader matches
  distance: 100,
  ignoreLocation: true,
  minMatchCharLength: 1, // Added for better short-word/typo matching
};

const fuse = new Fuse(searchIndex, fuseOptions);

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

  const processAIResponse = useCallback((query: string) => {
    setIsTyping(true);
    const lowerCaseQuery = query.toLowerCase();
    const expandedQuery = expandQueryWithSynonyms(lowerCaseQuery).join(' ');

    let response = "Вибач, я не зовсім зрозумів твоє запитання. Спробуй перефразувати або запитати про щось інше з HTML/CSS.";

    // 1. Try to find direct glossary term match (exact match for the term itself)
    const directGlossaryMatch = glossaryData.find(term => term.term.toLowerCase() === lowerCaseQuery);
    if (directGlossaryMatch) {
      response = `📖 ${directGlossaryMatch.term}: ${directGlossaryMatch.definition}`;
      if (directGlossaryMatch.codeExample) {
        response += `\n\nПриклад:\n\`\`\`${directGlossaryMatch.language || 'html'}\n${directGlossaryMatch.codeExample}\n\`\`\``;
      }
      setTimeout(() => { setMessages((prev) => [...prev, { sender: 'ai', text: response }]); setIsTyping(false); }, 1500);
      return; // Exit early if direct match found
    }

    // 2. Use Fuse.js for broader search in searchIndex (lessons, examples, other glossary terms)
    const results = fuse.search(expandedQuery);

    if (results.length > 0) {
      const bestMatch = results[0].item;
      let typeEmoji = getEmojiForType(bestMatch.type);
      response = `Здається, ти питаєш про "${bestMatch.title}" ${typeEmoji}. ${bestMatch.description}`;

      // If the best match is a glossary term, include its code example
      if (bestMatch.type === 'glossary') {
          // Find the original glossary item from glossaryData using its term
          const glossaryItem = glossaryData.find(g => g.term === bestMatch.title.replace('Словник Термінів: ', ''));
          if (glossaryItem && glossaryItem.codeExample) {
              response += `\n\nПриклад:\n\`\`\`${glossaryItem.language || 'html'}\n${glossaryItem.codeExample}\n\`\`\``;
          }
      }

      if (bestMatch.path) {
        response += ` Ти можеш дізнатися більше тут: ${bestMatch.path}`;
      }
    } else {
      // 3. Fallback and simple ambiguity handling if no strong Fuse.js match
      if (lowerCaseQuery.includes("back")) {
        response = "Ти мав на увазі 'background-color' (колір тла) чи 'back-end' (серверну частину)?";
      } else if (lowerCaseQuery.includes("color") || lowerCaseQuery.includes("colar")) {
        response = "Ти питаєш про `color` (колір тексту) чи `background-color` (колір фону)?";
      } else if (lowerCaseQuery.includes("padin") || lowerCaseQuery.includes("padding")) {
        response = "Ти питаєш про `padding` (внутрішній відступ) чи `margin` (зовнішній відступ)?";
      } else if (lowerCaseQuery.includes("привіт") || lowerCaseQuery.includes("як справи")) {
        response = "Привіт! Я твій помічник з HTML та CSS. Чим можу допомогти?";
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'ai', text: response }]);
      setIsTyping(false);
    }, 1500); // Simulate AI thinking time
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