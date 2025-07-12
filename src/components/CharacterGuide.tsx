import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquareText } from 'lucide-react';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { guidePhrases, encouragingPhrases } from '@/data/guidePhrases'; // Імпортуємо фрази
import { cn } from '@/lib/utils';

interface CharacterGuideProps {
  characterType: 'robot' | 'cat' | 'owl';
}

const CharacterGuide: React.FC<CharacterGuideProps> = ({ characterType }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const location = useLocation();

  const getCharacterSVG = useCallback(() => {
    const baseClasses = "w-full h-full object-contain animate-breathe";
    const speakingClass = isSpeaking ? "animate-speak" : "";

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
  }, [characterType, isSpeaking]);

  const showGuideMessage = useCallback(() => {
    setIsSpeaking(true);
    const currentPath = location.pathname;

    // Find phrases specific to the current page
    const pageSpecificPhrases = guidePhrases.find(item => item.pagePath === currentPath)?.phrases;

    let messageToShow: string;
    if (pageSpecificPhrases && pageSpecificPhrases.length > 0) {
      // Pick a random page-specific phrase
      messageToShow = pageSpecificPhrases[Math.floor(Math.random() * pageSpecificPhrases.length)];
    } else {
      // If no page-specific phrases, pick a random encouraging phrase
      messageToShow = encouragingPhrases[Math.floor(Math.random() * encouragingPhrases.length)];
    }

    toast.message(messageToShow, {
      duration: 5000, // Message stays for 5 seconds
      position: 'bottom-right',
      icon: <div className="w-8 h-8">{getCharacterSVG()}</div>, // Use character SVG as icon
      onAutoClose: () => setIsSpeaking(false),
      onDismiss: () => setIsSpeaking(false),
    });
  }, [location.pathname, getCharacterSVG]);

  // Show a message when the page loads/changes
  useEffect(() => {
    // Small delay to ensure toast system is ready and not too intrusive on load
    const timer = setTimeout(() => {
      showGuideMessage();
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname, showGuideMessage]); // Re-run when path changes

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={showGuideMessage}
        className="rounded-full w-20 h-20 shadow-lg bg-primary text-primary-foreground hover:bg-primary/80 flex items-center justify-center p-0 overflow-hidden"
        aria-label="Отримати підказку від помічника"
      >
        <div className="w-full h-full flex items-center justify-center">
          {getCharacterSVG()}
        </div>
      </Button>
    </div>
  );
};

export default CharacterGuide;