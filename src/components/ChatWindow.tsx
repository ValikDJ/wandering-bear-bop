import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/components/SessionContextProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, XCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom'; // Додано імпорт Link

interface Message {
  id: string;
  sender_id: string;
  content: string;
  type: 'text' | 'file' | 'link';
  file_url?: string;
  created_at: string;
  sender_email?: string; // To display sender's email
}

interface ChatWindowProps {
  onClose: () => void;
}

// Hardcode the organizer's email for frontend UI logic
const ORGANIZER_EMAIL = 'valik.shevhyk@gmail.com';

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const { user, isLoading: isSessionLoading } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isOrganizer = user?.email === ORGANIZER_EMAIL;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch initial messages and subscribe to real-time updates
  useEffect(() => {
    let subscription: any;

    const fetchMessages = async () => {
      // Only fetch if user is authenticated
      if (!user) {
        setMessages([]); // Clear messages if user logs out or is not authenticated
        console.warn('Cannot fetch chat messages: User not authenticated.');
        return;
      }

      const { data, error } = await supabase
        .from('messages')
        .select('*, profiles(first_name, last_name)') // Fetch sender's profile info
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        // Логуємо повний об'єкт помилки для детальної діагностики
        console.error('Full Supabase error object:', JSON.stringify(error, null, 2));

        // Only show toast error if it's not an RLS permission error (code '42501')
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

    // Call fetchMessages only when session loading is complete and user status is known
    if (!isSessionLoading) {
      fetchMessages();

      // Realtime subscription should also depend on user being present
      if (user) {
        subscription = supabase
          .channel('chat_room')
          .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'messages' },
            async (payload) => {
              const newMsg = payload.new as Message;
              // Fetch sender's profile for the new message
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('first_name, last_name')
                .eq('id', newMsg.sender_id)
                .single();

              if (profileError && profileError.code !== 'PGRST116') {
                console.error('Error fetching profile for new message:', profileError);
              }

              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  ...newMsg,
                  sender_email: profileData ? `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() || 'Організатор' : 'Невідомий',
                },
              ]);
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
  }, [user, isSessionLoading]); // Add user and isSessionLoading to dependencies

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
      fileUrl = newMessage.trim(); // Store link in file_url for consistency
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
      fileInputRef.current && (fileInputRef.current.value = ''); // Clear file input
    }
    setUploadingFile(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit for chat files
        toast.error('Розмір файлу перевищує 10MB.');
        setFile(null);
        e.target.value = ''; // Clear input
        return;
      }
      setFile(selectedFile);
    } else {
      setFile(null);
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
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h2 className="text-xl font-bold">Спільний Чат</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <XCircle className="h-5 w-5" />
        </Button>
      </div>

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
                  "flex flex-col p-3 rounded-lg max-w-[80%]",
                  msg.sender_id === user?.id
                    ? "self-end bg-primary text-primary-foreground rounded-br-none"
                    : "self-start bg-muted text-muted-foreground rounded-bl-none"
                )}
              >
                <span className="text-xs font-semibold mb-1">
                  {msg.sender_id === user?.id ? 'Ви' : msg.sender_email || 'Організатор'}
                </span>
                <div className="text-sm break-words">
                  {renderMessageContent(msg)}
                </div>
                <span className="text-xs text-muted-foreground mt-1 self-end">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {user && isOrganizer && (
        <form onSubmit={handleSendMessage} className="p-4 border-t border-border flex items-center gap-2">
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
      )}
      {user && !isOrganizer && (
        <div className="p-4 border-t border-border text-center text-muted-foreground text-sm">
          Ви можете лише переглядати повідомлення в цьому чаті.
        </div>
      )}
      {!user && !isSessionLoading && (
        // Якщо користувач не авторизований, поле введення не відображається,
        // а повідомлення про вхід відображається у ScrollArea.
        null
      )}
    </div>
  );
};

export default ChatWindow;