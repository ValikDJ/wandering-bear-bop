import React from 'react';
import { User } from '@supabase/supabase-js';
import { Paperclip, MoreHorizontal, Edit, Trash2, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Message } from '@/types/chat';
import { toast } from 'sonner';

interface ChatMessageProps {
  message: Message;
  currentUser: User | null;
  isOrganizer: boolean;
  editingMessageId: string | null;
  editedContent: string;
  onEditClick: (message: Message) => void;
  onSaveEdit: (messageId: string) => void;
  onSetEditedContent: (content: string) => void;
  onSetEditingMessageId: (id: string | null) => void;
  onDeleteMessage: (messageId: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  currentUser,
  isOrganizer,
  editingMessageId,
  editedContent,
  onEditClick,
  onSaveEdit,
  onSetEditedContent,
  onSetEditingMessageId,
  onDeleteMessage,
}) => {
  const isMyMessage = message.sender_id === currentUser?.id;

  const renderMessageContent = (msg: Message) => {
    if (msg.type === 'file' && msg.file_url) {
      const fileName = msg.file_url.split('/').pop() || 'файл';
      return (
        <div className="flex items-center gap-2">
          <Paperclip className="h-4 w-4" />
          <a href={msg.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {msg.content || `Завантажений файл: ${fileName}`}
          </a>
        </div>
      );
    } else if (msg.type === 'link' && msg.file_url) {
      return (
        <a href={msg.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">
          {msg.content || msg.file_url}
        </a>
      );
    }
    return msg.content;
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content);
    toast.success('Повідомлення скопійовано!');
  };

  return (
    <div
      className={cn(
        "relative flex flex-col p-3 rounded-lg max-w-[80%] group",
        isMyMessage
          ? "self-end bg-primary text-primary-foreground rounded-br-none"
          : "self-start bg-muted text-muted-foreground rounded-bl-none"
      )}
    >
      <div className={cn(
        "flex items-baseline gap-2 mb-1",
        isMyMessage ? "justify-end" : "justify-start"
      )}>
        <span className="text-xs font-semibold">
          {isMyMessage ? 'Ви' : message.sender_email || 'Анонімний користувач'}
        </span>
        <span className="text-xs text-muted-foreground">
          {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className="text-sm break-words">
        {editingMessageId === message.id ? (
          <Textarea
            value={editedContent}
            onChange={(e) => onSetEditedContent(e.target.value)}
            onBlur={() => onSaveEdit(message.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSaveEdit(message.id);
              }
              if (e.key === 'Escape') {
                onSetEditingMessageId(null);
                onSetEditedContent('');
              }
            }}
            autoFocus
            className="min-h-[unset] bg-background text-foreground border-border"
          />
        ) : (
          renderMessageContent(message)
        )}
      </div>
      {(isOrganizer || isMyMessage) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-1 right-1 h-6 w-6 transition-opacity",
                isOrganizer ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover text-popover-foreground">
            <DropdownMenuItem onClick={handleCopyMessage} className="cursor-pointer">
              <Copy className="mr-2 h-4 w-4" /> Копіювати
            </DropdownMenuItem>
            {isOrganizer && (
              <>
                <DropdownMenuItem onClick={() => onEditClick(message)} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" /> Редагувати
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDeleteMessage(message.id)} className="cursor-pointer text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Видалити
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ChatMessage;