import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  onClick: () => void;
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick, className }) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 rounded-full p-4 shadow-lg z-50",
        "bg-brand-primary text-primary-foreground hover:bg-brand-primary-hover",
        className
      )}
      size="icon"
      aria-label="Відкрити чат"
    >
      <MessageSquare className="h-6 w-6" />
    </Button>
  );
};

export default ChatBubble;