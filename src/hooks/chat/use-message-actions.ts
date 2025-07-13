import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { Message } from '@/types/chat';

export const useMessageActions = (user: User | null, isOrganizer: boolean, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState('');

  const handleDeleteMessage = async (messageId: string) => {
    if (!isOrganizer) {
      toast.error('У вас немає дозволу на видалення повідомлень.');
      return;
    }
    const { error } = await supabase.from('messages').delete().eq('id', messageId);
    if (error) {
      console.error('Error deleting message:', error);
      toast.error(`Помилка видалення повідомлення: ${error.message}`);
    } else {
      toast.success('Повідомлення видалено!');
    }
  };

  const handleEditClick = (message: Message) => {
    if (!isOrganizer) {
      toast.error('У вас немає дозволу на редагування повідомлень.');
      return;
    }
    setEditingMessageId(message.id);
    setEditedContent(message.content);
  };

  const handleSaveEdit = async (messageId: string) => {
    if (!isOrganizer) {
      toast.error('У вас немає дозволу на редагування повідомлень.');
      return;
    }
    if (!editedContent.trim()) {
      toast.error('Повідомлення не може бути порожнім.');
      return;
    }

    const { error } = await supabase
      .from('messages')
      .update({ content: editedContent.trim(), type: 'text', file_url: null })
      .eq('id', messageId);

    if (error) {
      console.error('Error updating message:', error);
      toast.error(`Помилка оновлення повідомлення: ${error.message}`);
    } else {
      toast.success('Повідомлення оновлено!');
      setEditingMessageId(null);
      setEditedContent('');
    }
  };

  const handleDeleteAllMessages = async () => {
    if (!isOrganizer) {
      toast.error('У вас немає дозволу на видалення всіх повідомлень.');
      return;
    }
    const { error } = await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) {
      console.error('Error deleting all messages:', error);
      toast.error(`Помилка видалення всіх повідомлень: ${error.message}`);
    } else {
      toast.success('Всі повідомлення видалено!');
      setMessages([]);
    }
  };

  return {
    editingMessageId,
    setEditingMessageId,
    editedContent,
    setEditedContent,
    handleDeleteMessage,
    handleEditClick,
    handleSaveEdit,
    handleDeleteAllMessages,
  };
};