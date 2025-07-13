import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { Message } from '@/types/chat';

const MAX_FILE_SIZE_MB = 25;

export const useSendMessage = (user: User | null, chatPermissionLevel: 'all' | 'authenticated' | 'unauthenticated' | 'none') => {
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canSendMessage = () => {
    if (chatPermissionLevel === 'none') {
      toast.error('Надсилання повідомлень вимкнено.');
      return false;
    }
    if (chatPermissionLevel === 'authenticated' && !user) {
      toast.error('Будь ласка, увійдіть, щоб надсилати повідомлення.');
      return false;
    }
    if (chatPermissionLevel === 'unauthenticated' && user) {
      toast.error('Надсилання повідомлень дозволено лише неавторизованим користувачам.');
      return false;
    }
    return true;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !file) return;
    if (!canSendMessage()) {
      return;
    }

    let messageType: Message['type'] = 'text';
    let fileUrl: string | undefined = undefined;

    if (file) {
      setUploadingFile(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id || 'anonymous'}-${Date.now()}.${fileExt}`;
      const filePath = `chat-files/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('chat-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        toast.error(`Помилка завантаження файлу: ${uploadError.message}`);
        setUploadingFile(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('chat-files')
        .getPublicUrl(filePath);

      if (!publicUrlData || !publicUrlData.publicUrl) {
        toast.error('Не вдалося отримати URL файлу.');
        setUploadingFile(false);
        return;
      }
      fileUrl = publicUrlData.publicUrl;
      messageType = 'file';
    } else if (newMessage.trim().startsWith('http://') || newMessage.trim().startsWith('https://')) {
      messageType = 'link';
      fileUrl = newMessage.trim();
    }

    const { error } = await supabase.from('messages').insert({
      sender_id: user?.id || null,
      content: newMessage.trim(),
      type: messageType,
      file_url: fileUrl,
    });

    if (error) {
      console.error('Error sending message:', error);
      toast.error(`Помилка надсилання повідомлення: ${error.message}`);
    } else {
      setNewMessage('');
      setFile(null);
      fileInputRef.current && (fileInputRef.current.value = '');
    }
    setUploadingFile(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`Розмір файлу перевищує ${MAX_FILE_SIZE_MB}MB.`);
        setFile(null);
        e.target.value = '';
        return;
      }
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  return {
    newMessage,
    setNewMessage,
    file,
    setFile,
    uploadingFile,
    handleSendMessage,
    handleFileSelect,
    fileInputRef,
    canSendMessage,
  };
};