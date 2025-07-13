import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import { User } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import { Message } from '@/types/chat';

interface MessageListProps {
  messages: Message[];
  isSessionLoading: boolean;
  currentUser: User | null;
  isOrganizer: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  editingMessageId: string | null;
  editedContent: string;
  onEditClick: (message: Message) => void;
  onSaveEdit: (messageId: string) => void;
  onSetEditedContent: (content: string) => void;
  onSetEditingMessageId: (id: string | null) => void;
  onDeleteMessage: (messageId: string) => void;
  chatPermissionLevel: 'all' | 'authenticated' | 'unauthenticated' | 'none';
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isSessionLoading,
  currentUser,
  isOrganizer,
  messagesEndRef,
  editingMessageId,
  editedContent,
  onEditClick,
  onSaveEdit,
  onSetEditedContent,
  onSetEditingMessageId,
  onDeleteMessage,
  chatPermissionLevel,
}) => {
  const showLoginPrompt = chatPermissionLevel === 'authenticated' && !currentUser;
  const showNoMessagesYet = messages.length === 0 && !isSessionLoading && !showLoginPrompt;

  return (
    <ScrollArea className="flex-1 p-4 custom-scrollbar">
      <div className="flex flex-col space-y-4">
        {isSessionLoading ? (
          <p className="text-center text-muted-foreground">Завантаження чату...</p>
        ) : showLoginPrompt ? (
          <p className="text-center text-muted-foreground">Будь ласка, <Link to="/login" className="text-blue-500 hover:underline">увійдіть</Link>, щоб переглядати та надсилати повідомлення.</p>
        ) : showNoMessagesYet ? (
          <p className="text-center text-muted-foreground">Поки що немає повідомлень. {isOrganizer ? 'Надішліть перше!' : 'Чекаємо на повідомлення від організатора.'}</p>
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              currentUser={currentUser}
              isOrganizer={isOrganizer}
              editingMessageId={editingMessageId}
              editedContent={editedContent}
              onEditClick={onEditClick}
              onSaveEdit={onSaveEdit}
              onSetEditedContent={onSetEditedContent}
              onSetEditingMessageId={onSetEditingMessageId}
              onDeleteMessage={onDeleteMessage}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessageList;