export interface Message {
  id: string;
  sender_id: string | null;
  content: string;
  type: 'text' | 'file' | 'link';
  file_url?: string;
  created_at: string;
  expires_at?: string; // NEW: Optional expiry timestamp
  sender_display_name?: string | null; // Змінено з sender_email на sender_display_name
  sender_profile?: { // Нове поле для даних профілю
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  } | null;
}

export type MessageExpiryDuration = 'never' | '1h' | '24h' | '7d'; // NEW TYPE