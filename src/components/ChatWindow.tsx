import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/components/SessionContextProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, XCircle, Loader2, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


interface Message {
  id: string;
  sender_id: string;
  content: string;
  type: 'text' | 'file' | 'link';
  file_url?: string;
  created_at: string;
  sender_email?: string;
}

interface ChatWindowProps {
  onClose: () => void;
}

const ORGANIZER_EMAIL = 'valik.shevhyk@gmail.com';
const MAX_FILE_SIZE_MB = 25; // New file size limit in MB

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const { user, isLoading: isSessionLoading } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isOrganizer = user?.email === ORGANIZER_EMAIL;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let subscription: any;

    const fetchMessages = async () => {
      if (!user) {
        setMessages([]);
        console.warn('Cannot fetch chat messages: User not authenticated.');
        return;
      }

      const { data, error } = await supabase
        .from('messages')
        .select('*, profiles(first_name, last_name)')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        console.error('Full Supabase error object:', JSON.stringify(error, null, 2));

        if (error.code !== '42501') {
          toast.error('Помилка завантаження повідомлень чату.');
        } else {
          console.warn('RLS error fetching messages, likely due to unauthenticated user trying to access protected data.');
        }
      } else {
        const messagesWithSenderInfo = data.map(msg => ({
          ...msg,
          sender_email: msg.profiles ? `${msg.profiles.first_name || ''} ${msg.profiles.last_name || ''}`.trim() || 'Організатор' : 'Невідомий',
        }));
        setMessages(messagesWithSenderInfo as Message[]);
      }
    };

    if (!isSessionLoading) {
      fetchMessages();

      if (user) {
        subscription = supabase
          .channel('chat_room')
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'messages' },
            async (payload) => {
              console.log('Realtime message received:', payload);
              const newMsg = payload.new as Message;

              let senderDisplayName = 'Невідомий';
              if (user && newMsg.sender_id === user.id) {
                senderDisplayName = 'Ви';
              } else {
                // Attempt to fetch profile data for other users
                const { data: profileData, error: profileError } = await supabase
                  .from('profiles')
                  .select('first_name, last_name')
                  .eq('id', newMsg.sender_id)
                  .single();

                if (profileError && profileError.code !== 'PGRST116') {
                  console.error('Error fetching profile for new message in realtime listener:', profileError);
                  senderDisplayName = 'Інший користувач'; // Fallback on error
                } else if (profileData) {
                  senderDisplayName = `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() || 'Організатор';
                } else {
                  senderDisplayName = 'Інший користувач'; // Fallback if no profile found (PGRST116)
                }
              }

              setMessages((prevMessages) => {
                // Prevent duplicates if subscription fires multiple times
                if (prevMessages.some(m => m.id === newMsg.id)) {
                    return prevMessages;
                }
                return [
                  ...prevMessages,
                  {
                    ...newMsg,
                    sender_email: senderDisplayName,
                  },
                ];
              });
            }
          )
          .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'messages' },
            (payload) => {
              const updatedMsg = payload.new as Message;
              setMessages((prevMessages) =>
                prevMessages.map((msg) => (msg.id === updatedMsg.id ? { ...msg, content: updatedMsg.content, type: updatedMsg.type, file_url: updatedMsg.file_url } : msg))
              );
            }
          )
          .on(
            'postgres_changes',
            { event: 'DELETE', schema: 'public', table: 'messages' },
            (payload) => {
              const deletedMsgId = payload.old.id;
              setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== deletedMsgId));
            }
          )
          .subscribe();
      }
    }

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [user, isSessionLoading]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !file) return;
    if (!user) {
      toast.error('Будь ласка, увійдіть, щоб надсилати повідомлення.');
      return;
    }

    let messageType: Message['type'] = 'text';
    let fileUrl: string | undefined = undefined;

    if (file) {
      setUploadingFile(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
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
      sender_id: user.id,
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
      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) { // Increased limit
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
      .update({ content: editedContent.trim(), type: 'text', file_url: null }) // Reset type to text and clear file_url on edit
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
    const { error } = await supabase.from('messages').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows
    if (error) {
      console.error('Error deleting all messages:', error);
      toast.error(`Помилка видалення всіх повідомлень: ${error.message}`);
    } else {
      toast.success('Всі повідомлення видалено!');
      setMessages([]); // Clear local state
    }
  };

  const renderMessageContent = (message: Message) => {
    if (message.type === 'file' && message.file_url) {
      const fileName = message.file_url.split('/').pop() || 'файл';
      return (
        <div className="flex items-center gap-2">
          <Paperclip className="h-4 w-4" />
          <a href={message.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {message.content || `Завантажений файл: ${fileName}`}
          </a>
        </div>
      );
    } else if (message.type === 'link' && message.file_url) {
      return (
        <a href={message.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">
          {message.content || message.file_url}
        </a>
      );
    }
    return message.content;
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

      <ScrollArea className="flex-1 p-4 custom-scrollbar">
        <div className="flex flex-col space-y-4">
          {isSessionLoading ? (
            <p className="text-center text-muted-foreground">Завантаження чату...</p>
          ) : !user ? (
            <p className="text-center text-muted-foreground">Будь ласка, <Link to="/login" className="text-blue-500 hover:underline" onClick={onClose}>увійдіть</Link>, щоб переглядати та надсилати повідомлення.</p>
          ) : messages.length === 0 ? (
            <p className="text-center text-muted-foreground">Поки що немає повідомлень. {isOrganizer ? 'Надішліть перше!' : 'Чекаємо на повідомлення від організатора.'}</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "relative flex flex-col p-3 rounded-lg max-w-[80%] group", // Added group for hover effects
                  msg.sender_id === user?.id
                    ? "self-end bg-primary text-primary-foreground rounded-br-none"
                    : "self-start bg-muted text-muted-foreground rounded-bl-none"
                )}
              >
                {/* Header for sender and timestamp */}
                <div className={cn(
                  "flex items-baseline gap-2 mb-1",
                  msg.sender_id === user?.id ? "justify-end" : "justify-start"
                )}>
                  <span className="text-xs font-semibold">
                    {msg.sender_id === user?.id ? 'Ви' : msg.sender_email || 'Організатор'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {/* Message content */}
                <div className="text-sm break-words">
                  {editingMessageId === msg.id ? (
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      onBlur={() => handleSaveEdit(msg.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSaveEdit(msg.id);
                        }
                        if (e.key === 'Escape') {
                          setEditingMessageId(null);
                          setEditedContent('');
                        }
                      }}
                      autoFocus
                      className="min-h-[unset] bg-background text-foreground border-border"
                    />
                  ) : (
                    renderMessageContent(msg)
                  )}
                </div>
                {isOrganizer && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover text-popover-foreground">
                      <DropdownMenuItem onClick={() => handleEditClick(msg)} className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" /> Редагувати
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteMessage(msg.id)} className="cursor-pointer text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Видалити
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {user && isOrganizer && (
        <div className="p-4 border-t border-border flex flex-col gap-2">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={file ? file.name : "Напишіть повідомлення або вставте посилання..."}
              className="flex-1"
              disabled={uploadingFile}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploadingFile}
            />
            {file ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                className="text-destructive hover:bg-destructive/10"
                disabled={uploadingFile}
              >
                <XCircle className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingFile}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
            )}
            <Button type="submit" disabled={uploadingFile || (!newMessage.trim() && !file)}>
              {uploadingFile ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </form>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full mt-2">
                Видалити всі повідомлення
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card text-card-foreground">
              <AlertDialogHeader>
                <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
                <AlertDialogDescription>
                  Ця дія видалить всі повідомлення з чату назавжди. Цю дію неможливо скасувати.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-muted text-muted-foreground hover:bg-muted/80">Скасувати</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAllMessages} className="bg-destructive text-destructive-foreground hover:bg-destructive/80">
                  Видалити все
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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