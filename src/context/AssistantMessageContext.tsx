import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

interface AssistantMessageContextType {
  sendMessage: (message: string, duration?: number) => void;
  currentMessage: string | null;
  isMessageActive: boolean;
}

const AssistantMessageContext = createContext<AssistantMessageContextType | undefined>(undefined);

const DEFAULT_MESSAGE_DURATION = 5000; // 5 секунд

export const AssistantMessageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [isMessageActive, setIsMessageActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sendMessage = useCallback((message: string, duration: number = DEFAULT_MESSAGE_DURATION) => {
    // Очищаємо попередній таймер, якщо він існує
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setCurrentMessage(message);
    setIsMessageActive(true);

    // Встановлюємо новий таймер для очищення повідомлення
    timeoutRef.current = setTimeout(() => {
      setIsMessageActive(false);
      // Даємо час для анімації зникнення, потім очищаємо текст
      setTimeout(() => setCurrentMessage(null), 300); // 300ms - тривалість анімації fade-out
    }, duration);
  }, []);

  // Очищення таймера при розмонтуванні компонента
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <AssistantMessageContext.Provider value={{ sendMessage, currentMessage, isMessageActive }}>
      {children}
    </AssistantMessageContext.Provider>
  );
};

export const useAssistantMessage = () => {
  const context = useContext(AssistantMessageContext);
  if (context === undefined) {
    throw new Error('useAssistantMessage must be used within an AssistantMessageProvider');
  }
  return context;
};