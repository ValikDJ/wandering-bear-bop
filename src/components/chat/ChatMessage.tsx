import React from 'react';
import { User } from '@supabase/supabase-js';
import { Paperclip, MoreHorizontal, Edit, Trash2, Copy, User as UserIcon, Eraser } from 'lucide-react'; // Додано Eraser
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  const senderDisplayName = message.sender_display_name || 'Невідомий';
  const senderAvatarUrl = message.sender_profile?.avatar_url;
  const senderInitials = (message.sender_profile?.first_name?.[0] || '') + (message.sender_profile?.last_name?.[0] || '');

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
        "flex gap-2 items-start group max-w-[75%]",
        isMyMessage ? "flex-row-reverse self-end" : "flex-row self-start"
      )}
    >
      <Avatar className="h-8 w-8 border-2 border-border flex-shrink-0">
        {senderAvatarUrl ? (
          <AvatarImage src={senderAvatarUrl} alt={senderDisplayName} className="object-cover" />
        ) : (
          <AvatarFallback className="bg-muted text-muted-foreground text-xs flex items-center justify-center">
            {senderInitials || <UserIcon className="h-4 w-4" />}
          </AvatarFallback>
        )}
      </Avatar>
      <div
        className={cn(
          "relative flex flex-col p-3 rounded-lg flex-grow",
          isMyMessage
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted text-muted-foreground rounded-bl-none"
        )}
      >
        <div className={cn(
          "flex items-baseline gap-2 mb-1",
          isMyMessage ? "justify-end" : "justify-start"
        )}>
          <span className="text-xs font-semibold">
            {senderDisplayName}
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
        {isOrganizer && ( // Show Eraser icon only for organizer
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteMessage(message.id)}
            className={cn(
              "absolute top-1",
              isMyMessage ? "left-1" : "right-1", // Position based on message alignment
              "h-6 w-6 text-destructive hover:bg-destructive/10 transition-opacity opacity-0 group-hover:opacity-100"
            )}
            aria-label="Видалити повідомлення"
          >
            <Eraser className="h-4 w-4" />
          </Button>
        )}
        {(isOrganizer || isMyMessage) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute top-1",
                  isMyMessage ? "right-1" : "left-1", // Position based on message alignment
                  "h-6 w-6 transition-opacity",
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
                <DropdownMenuItem onClick={() => onEditClick(message)} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" /> Редагувати
                </DropdownMenuItem>
                // Removed Delete option from dropdown as Eraser icon provides direct delete
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;