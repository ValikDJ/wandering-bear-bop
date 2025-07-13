import React from 'react';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

import { useChatMessages } from '@/hooks/chat/use-chat-messages';
import { useSendMessage } from '@/hooks/chat/use-send-message';
import { useMessageActions } from '@/hooks/chat/use-message-actions';

import MessageList from '@/components/chat/MessageList';
import ChatInput from '@/components/chat/ChatInput';
import DeleteAllMessagesDialog from '@/components/chat/DeleteAllMessagesDialog';

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const { messages, isSessionLoading, user, isOrganizer, messagesEndRef, setMessages } = useChatMessages();
  const { newMessage, setNewMessage, file, setFile, uploadingFile, handleSendMessage, handleFileSelect } = useSendMessage(user);
  const {
    editingMessageId,
    setEditingMessageId,
    editedContent,
    setEditedContent,
    handleDeleteMessage,
    handleEditClick,
    handleSaveEdit,
    handleDeleteAllMessages,
  } = useMessageActions(user, isOrganizer, setMessages);

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <SheetHeader className="p-4 border-b border-border flex flex-row justify-between items-center">
        <SheetTitle className="text-xl font-bold">Спільний Чат</SheetTitle>
        <SheetDescription className="sr-only">Чат для спілкування з організатором та іншими учасниками.</SheetDescription>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <XCircle className="h-5 w-5" />
        </Button>
      </SheetHeader>

      <MessageList
        messages={messages}
        isSessionLoading={isSessionLoading}
        currentUser={user}
        isOrganizer={isOrganizer}
        messagesEndRef={messagesEndRef}
        editingMessageId={editingMessageId}
        editedContent={editedContent}
        onEditClick={handleEditClick}
        onSaveEdit={handleSaveEdit}
        onSetEditedContent={setEditedContent}
        onSetEditingMessageId={setEditingMessageId}
        onDeleteMessage={handleDeleteMessage}
      />

      {user && isOrganizer && (
        <div className="p-4 border-t border-border flex flex-col gap-2">
          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            file={file}
            setFile={setFile}
            uploadingFile={uploadingFile}
            handleSendMessage={handleSendMessage}
            handleFileSelect={handleFileSelect}
          />
          <DeleteAllMessagesDialog onDeleteAllMessages={handleDeleteAllMessages} />
        </div>
      )}
      {user && !isOrganizer && (
        <div className="p-4 border-t border-border text-center text-muted-foreground text-sm">
          Ви можете лише переглядати повідомлення в цьому чаті.
        </div>
      )}
      {!user && !isSessionLoading && (
        null
      )}
    </div>
  );
};

export default ChatWindow;