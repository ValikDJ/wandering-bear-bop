import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { X, MessageSquareText } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { guideTips, generalTips } from '@/data/guideTips';
import { glossaryData, GlossaryTerm } from '@/data/glossaryData';

interface CharacterGuideProps {
  characterType: 'robot' | 'cat' | 'owl';
}

interface Message {
  sender: 'guide';
  text: string;
}

const CharacterGuide: React.FC<CharacterGuideProps> = ({ characterType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [lastPagePath, setLastPagePath] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const processTipContent = useCallback((tipText: string): string => {
    let processedText = tipText;
    // Simple keyword matching for glossary terms within the tip
    glossaryData.forEach(term => {
      // Use a more robust regex to match whole words and handle punctuation
      const termRegex = new RegExp(`\\b${term.term}\\b`, 'gi');
      if (processedText.match(termRegex)) {
        processedText += `\n\n📖 Що таке ${term.term}? ${term.definition}`;
        if (term.codeExample) {
          processedText += `\n\`\`\`${term.language || 'html'}\n${term.codeExample}\n\`\`\``;
        }
      }
    });
    return processedText;
  }, []);

  const generateInitialTip = useCallback(() => {
    setIsTyping(true);
    let tipText = "Привіт! Я твій помічник. Чим можу допомогти?"; // Default fallback

    const pageTipEntry = guideTips.find(tip => tip.path === location.pathname);
    if (pageTipEntry && pageTipEntry.tips.length > 0) {
      tipText = pageTipEntry.tips[0]; // Get the first tip for the current page
    } else if (generalTips.length > 0) {
      tipText = generalTips[0]; // Fallback to the first general tip
    }

    setTimeout(() => {
      setMessages([{ sender: 'guide', text: processTipContent(tipText) }]);
      setIsTyping(false);
    }, 1000);
  }, [location.pathname, processTipContent]);

  useEffect(() => {
    if (isOpen && location.pathname !== lastPagePath) {
      generateInitialTip();
      setLastPagePath(location.pathname);
    } else if (!isOpen && lastPagePath !== '') {
      // Reset messages when closing or navigating away if not open
      setMessages([]);
      setLastPagePath('');
    }
  }, [isOpen, location.pathname, lastPagePath, generateInitialTip]);

  const handleOpenGuide = () => {
    setIsOpen(true);
    if (messages.length === 0) { // Only generate initial tip if chat is empty
      generateInitialTip();
    }
  };

  const handleNextTip = useCallback(() => {
    setIsTyping(true);
    const randomTipIndex = Math.floor(Math.random() * generalTips.length);
    const nextTipText = generalTips[randomTipIndex];

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'guide', text: processTipContent(nextTipText) }]);
      setIsTyping(false);
    }, 1000);
  }, [processTipContent]);

  const getCharacterSVG = useCallback(() => {
    const baseClasses = "w-full h-full object-contain animate-breathe";
    const speakingClass = isTyping ? "animate-speak" : ""; // Apply speaking animation when typing

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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={handleOpenGuide}
          className="rounded-full w-20 h-20 shadow-lg bg-primary text-primary-foreground hover:bg-primary/80 flex items-center justify-center p-0"
          aria-label="Відкрити чат з помічником"
        >
          <div className="w-16 h-16"> {/* Inner div to control SVG size */}
            {getCharacterSVG()}
          </div>
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
                  Привіт! Я твій помічник. Натисни "Наступна підказка", щоб отримати пораду!
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "mb-2 p-2 rounded-lg mr-auto bg-muted text-muted-foreground rounded-bl-none whitespace-pre-wrap",
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
            <Button onClick={handleNextTip} className="flex-grow" disabled={isTyping}>
              Наступна підказка
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterGuide;