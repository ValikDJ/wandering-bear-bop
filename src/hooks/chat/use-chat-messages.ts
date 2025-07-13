import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/components/SessionContextProvider';
import { toast } from 'sonner';
import { Message } from '@/types/chat';

const ORGANIZER_EMAIL = 'valik.shevhyk@gmail.com';

export const useChatMessages = () => {
  const { user, isLoading: isSessionLoading } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatPermissionLevel, setChatPermissionLevel] = useState<'all' | 'authenticated' | 'unauthenticated' | 'none'>('all'); // New state
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isOrganizer = user?.email === ORGANIZER_EMAIL;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let subscription: any;
    let settingsSubscription: any; // New subscription for settings

    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('chat_settings')
        .select('permission_level')
        .eq('id', '00000000-0000-0000-0000-000000000001') // Fixed ID for the single settings row
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching chat settings:', error);
        toast.error('Помилка завантаження налаштувань чату.');
      } else if (data) {
        setChatPermissionLevel(data.permission_level as 'all' | 'authenticated' | 'unauthenticated' | 'none');
      }
    };

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
      fetchSettings(); // Fetch settings on load
      fetchMessages();

      // Subscribe to chat messages
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
                const { data: profileData, error: profileError } = await supabase
                  .from('profiles')
                  .select('first_name, last_name')
                  .eq('id', newMsg.sender_id)
                  .single();

                if (profileError && profileError.code !== 'PGRST116') {
                  console.error('Error fetching profile for new message in realtime listener:', profileError);
                  senderDisplayName = 'Інший користувач';
                } else if (profileData) {
                  senderDisplayName = `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() || 'Організатор';
                } else {
                  senderDisplayName = 'Інший користувач';
                }
              }

              setMessages((prevMessages) => {
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

      // Subscribe to chat settings changes
      settingsSubscription = supabase
        .channel('chat_settings_channel')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'chat_settings', filter: `id=eq.00000000-0000-0000-0000-000000000001` },
          (payload) => {
            const updatedSettings = payload.new as { permission_level: 'all' | 'authenticated' | 'unauthenticated' | 'none' };
            setChatPermissionLevel(updatedSettings.permission_level);
            toast.info(`Налаштування чату оновлено: ${updatedSettings.permission_level}`);
          }
        )
        .subscribe();
    }

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
      if (settingsSubscription) {
        supabase.removeChannel(settingsSubscription);
      }
    };
  }, [user, isSessionLoading]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return { messages, isSessionLoading, user, isOrganizer, messagesEndRef, scrollToBottom, setMessages, chatPermissionLevel };
};