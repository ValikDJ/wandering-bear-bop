export interface Message {
  id: string;
  sender_id: string;
  content: string;
  type: 'text' | 'file' | 'link';
  file_url?: string;
  created_at: string;
  sender_email?: string; // Display name from profile
}