import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAssistantMessage } from '@/context/AssistantMessageContext'; // Імпорт хука контексту

interface LessonGuideCharacterProps {
  characterType: 'robot' | 'cat' | 'owl';
}

// Мапа повідомлень для різних сторінок (буде використовуватися як резервна)
const pageMessages: { [key: string]: string } = {
  '/html-tags': 'Привіт! Сьогодні ми вивчаємо HTML-теги. Це як будівельні блоки для твого сайту!',
  '/css-properties': 'Час зробити твій сайт красивим! CSS властивості допоможуть тобі в цьому.',
  '/css-selectors': 'Знайди потрібні елементи! CSS селектори - це твої інструменти для точного стилю.',
  '/examples': 'Практика - ключ до успіху! Спробуй свої сили в цих прикладах.',
  '/project-template': 'Готовий створити свій проект? Цей шаблон допоможе тобі почати!',
  '/quiz': 'Перевір свої знання! Давай подивимося, що ти вже вивчив.',
  '/glossary': 'Загубився в термінах? Зазирни до словника, я допоможу знайти відповідь!',
  '/': 'Ласкаво просимо до Веб-Майстерні! Обери урок, щоб почати.',
  default: 'Продовжуй досліджувати світ веб-розробки! Ти чудово справляєшся!',
};

const LessonGuideCharacter: React.FC<LessonGuideCharacterProps> = ({ characterType }) => {
  const location = useLocation();
  const { currentMessage: dynamicMessage, isMessageActive } = useAssistantMessage(); // Отримуємо повідомлення з контексту
  const [displayMessage, setDisplayMessage] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;
    const showOnPaths = ['/html-tags', '/css-properties', '/css-selectors', '/examples', '/project-template', '/quiz', '/glossary'];
    setIsVisible(showOnPaths.includes(currentPath));
  }, [location.pathname]);

  useEffect(() => {
    // Пріоритет: динамічне повідомлення > повідомлення сторінки
    if (dynamicMessage && isMessageActive) {
      setDisplayMessage(dynamicMessage);
    } else {
      setDisplayMessage(pageMessages[location.pathname] || pageMessages.default);
    }
  }, [dynamicMessage, isMessageActive, location.pathname]);

  const getCharacterSVG = useCallback(() => {
    const baseClasses = "w-full h-full object-contain animate-breathe";

    switch (characterType) {
      case 'robot':
        return (
          <svg className={`${baseClasses}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <svg className={`${baseClasses}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <svg className={`${baseClasses}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  }, [characterType]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <div className={cn(
        "bg-card border border-border rounded-lg shadow-xl p-3 mb-2 max-w-xs text-right relative",
        "transition-opacity duration-300 ease-in-out",
        displayMessage ? "opacity-100" : "opacity-0 pointer-events-none" // Анімація
      )}>
        <p className="text-sm text-muted-foreground">{displayMessage}</p>
        {/* Трикутник для бульбашки */}
        <div className="absolute bottom-0 right-4 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-card transform translate-y-full"></div>
      </div>
      <div className="w-20 h-20 flex-shrink-0">
        {getCharacterSVG()}
      </div>
    </div>
  );
};

export default LessonGuideCharacter;