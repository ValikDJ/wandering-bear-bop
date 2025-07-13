import React from 'react';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client'; // Import supabase for updating settings

import { useChatMessages } from '@/hooks/chat/use-chat-messages';
import { useSendMessage } from '@/hooks/chat/use-send-message';
import { useMessageActions } from '@/hooks/chat/use-message-actions';

import MessageList from '@/components/chat/MessageList';
import ChatInput from '@/components/chat/ChatInput';
import DeleteAllMessagesDialog from '@/components/chat/DeleteAllMessagesDialog';
import { toast } from 'sonner';

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const { messages, isSessionLoading, user, isOrganizer, messagesEndRef, setMessages, chatPermissionLevel } = useChatMessages();
  const { newMessage, setNewMessage, file, setFile, uploadingFile, handleSendMessage, handleFileSelect, canSendMessage } = useSendMessage(user, chatPermissionLevel);
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

  const handlePermissionChange = async (newPermission: 'all' | 'authenticated' | 'unauthenticated' | 'none') => {
    if (!isOrganizer) {
      toast.error('У вас немає дозволу змінювати налаштування чату.');
      return;
    }
    const { error } = await supabase
      .from('chat_settings')
      .update({ permission_level: newPermission })
      .eq('id', '00000000-0000-0000-0000-000000000001'); // Fixed ID

    if (error) {
      console.error('Error updating chat permission:', error);
      toast.error(`Помилка оновлення дозволів чату: ${error.message}`);
    } else {
      toast.success(`Дозволи чату оновлено на: ${newPermission}`);
    }
  };

  const getPermissionDescription = (level: 'all' | 'authenticated' | 'unauthenticated' | 'none') => {
    switch (level) {
      case 'all': return 'Всі користувачі можуть писати.';
      case 'authenticated': return 'Лише авторизовані користувачі можуть писати.';
      case 'unauthenticated': return 'Лише неавторизовані користувачі можуть писати.';
      case 'none': return 'Ніхто не може писати.';
      default: return '';
    }
  };

  const showChatInput = () => {
    if (isOrganizer) return true; // Organizer can always write
    if (chatPermissionLevel === 'all') return true;
    if (chatPermissionLevel === 'authenticated' && user) return true;
    if (chatPermissionLevel === 'unauthenticated' && !user) return true;
    return false;
  };

  const getNoPermissionMessage = () => {
    if (chatPermissionLevel === 'none') {
      return 'Надсилання повідомлень вимкнено адміністратором.';
    }
    if (chatPermissionLevel === 'authenticated' && !user) {
      return 'Будь ласка, увійдіть, щоб надсилати повідомлення.';
    }
    if (chatPermissionLevel === 'unauthenticated' && user) {
      return 'Надсилання повідомлень дозволено лише неавторизованим користувачам.';
    }
    return 'У вас немає дозволу надсилати повідомлення.';
  };

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

      {isOrganizer && (
        <div className="p-4 border-t border-border flex flex-col gap-2">
          <div className="mb-4">
            <Label htmlFor="chat-permission" className="text-lg font-semibold text-secondary-foreground mb-2 block">
              Дозволи на надсилання повідомлень:
            </Label>
            <Select value={chatPermissionLevel} onValueChange={handlePermissionChange}>
              <SelectTrigger id="chat-permission" className="w-full">
                <SelectValue placeholder="Виберіть рівень дозволів" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі користувачі</SelectItem>
                <SelectItem value="authenticated">Лише авторизовані</SelectItem>
                <SelectItem value="unauthenticated">Лише неавторизовані</SelectItem>
                <SelectItem value="none">Ніхто</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">{getPermissionDescription(chatPermissionLevel)}</p>
          </div>
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
      {!isOrganizer && showChatInput() && (
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
        </div>
      )}
      {!isOrganizer && !showChatInput() && !isSessionLoading && (
        <div className="p-4 border-t border-border text-center text-muted-foreground text-sm">
          {getNoPermissionMessage()}
        </div>
      )}
      {isSessionLoading && (
        null // Don't show any message while session is loading
      )}
    </div>
  );
};

export default ChatWindow;