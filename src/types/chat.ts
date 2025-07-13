export interface Message {
  id: string;
  sender_id: string | null;
  content: string;
  type: 'text' | 'file' | 'link';
  file_url?: string;
  created_at: string;
  sender_email?: string | null;
}