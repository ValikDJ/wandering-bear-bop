import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, XCircle, Loader2 } from 'lucide-react';

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  uploadingFile: boolean;
  handleSendMessage: (e: React.FormEvent) => Promise<void>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  newMessage,
  setNewMessage,
  file,
  setFile,
  uploadingFile,
  handleSendMessage,
  handleFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
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
  );
};

export default ChatInput;