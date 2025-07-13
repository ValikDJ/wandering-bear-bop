import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserCheck, UserX, Lock, Settings, Trash2, Clock } from 'lucide-react'; // Import Clock
import DeleteAllMessagesDialog from './DeleteAllMessagesDialog';
import { toast } from 'sonner';
import { MessageExpiryDuration } from '@/types/chat'; // NEW IMPORT

interface ChatAdminControlsProps {
  chatPermissionLevel: 'all' | 'authenticated' | 'unauthenticated' | 'none';
  onPermissionChange: (newPermission: 'all' | 'authenticated' | 'unauthenticated' | 'none') => void;
  onDeleteAllMessages: () => Promise<void>;
  messageExpiryDuration: MessageExpiryDuration; // NEW PROP
  onMessageExpiryChange: (duration: MessageExpiryDuration) => void; // NEW PROP
}

const ChatAdminControls: React.FC<ChatAdminControlsProps> = ({
  chatPermissionLevel,
  onPermissionChange,
  onDeleteAllMessages,
  messageExpiryDuration, // NEW
  onMessageExpiryChange, // NEW
}) => {
  const getPermissionDescription = (level: 'all' | 'authenticated' | 'unauthenticated' | 'none') => {
    switch (level) {
      case 'all': return 'Всі користувачі можуть писати.';
      case 'authenticated': return 'Лише авторизовані користувачі можуть писати.';
      case 'unauthenticated': return 'Лише неавторизовані користувачі можуть писати.';
      case 'none': return 'Ніхто не може писати.';
      default: return '';
    }
  };

  const getPermissionIcon = (level: 'all' | 'authenticated' | 'unauthenticated' | 'none') => {
    switch (level) {
      case 'all': return <Users className="mr-2 h-4 w-4" />;
      case 'authenticated': return <UserCheck className="mr-2 h-4 w-4" />;
      case 'unauthenticated': return <UserX className="mr-2 h-4 w-4" />;
      case 'none': return <Lock className="mr-2 h-4 w-4" />;
      default: return null;
    }
  };

  const getExpiryDescription = (duration: MessageExpiryDuration) => {
    switch (duration) {
      case 'never': return 'Повідомлення не видаляються автоматично.';
      case '1h': return 'Повідомлення видаляються через 1 годину.';
      case '24h': return 'Повідомлення видаляються через 24 години.';
      case '7d': return 'Повідомлення видаляються через 7 днів.';
      default: return '';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted/10" aria-label="Налаштування чату">
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-popover text-popover-foreground p-2">
        <DropdownMenuLabel className="text-sm font-semibold text-muted-foreground mb-2">
          Налаштування чату
        </DropdownMenuLabel>
        <DropdownMenuItem className="p-0 focus:bg-transparent focus:text-popover-foreground">
          <Select value={chatPermissionLevel} onValueChange={onPermissionChange}>
            <SelectTrigger className="w-full text-left flex items-center justify-between px-2 py-1.5 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
              <div className="flex items-center">
                {getPermissionIcon(chatPermissionLevel)}
                <SelectValue placeholder="Дозволи на надсилання" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="all" className="flex items-center">
                {getPermissionIcon('all')} Всі користувачі
              </SelectItem>
              <SelectItem value="authenticated" className="flex items-center">
                {getPermissionIcon('authenticated')} Лише авторизовані
              </SelectItem>
              <SelectItem value="unauthenticated" className="flex items-center">
                {getPermissionIcon('unauthenticated')} Лише неавторизовані
              </SelectItem>
              <SelectItem value="none" className="flex items-center">
                {getPermissionIcon('none')} Ніхто
              </SelectItem>
            </SelectContent>
          </Select>
        </DropdownMenuItem>
        <p className="text-xs text-muted-foreground px-2 py-1">{getPermissionDescription(chatPermissionLevel)}</p>

        <DropdownMenuSeparator className="my-2 bg-border" />

        {/* NEW: Message Expiry Setting */}
        <DropdownMenuLabel className="text-sm font-semibold text-muted-foreground mb-2 mt-4">
          Автоматичне видалення повідомлень
        </DropdownMenuLabel>
        <DropdownMenuItem className="p-0 focus:bg-transparent focus:text-popover-foreground">
          <Select value={messageExpiryDuration} onValueChange={onMessageExpiryChange}>
            <SelectTrigger className="w-full text-left flex items-center justify-between px-2 py-1.5 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Виберіть термін" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="never">Ніколи</SelectItem>
              <SelectItem value="1h">Через 1 годину</SelectItem>
              <SelectItem value="24h">Через 24 години</SelectItem>
              <SelectItem value="7d">Через 7 днів</SelectItem>
            </SelectContent>
          </Select>
        </DropdownMenuItem>
        <p className="text-xs text-muted-foreground px-2 py-1">{getExpiryDescription(messageExpiryDuration)}</p>

        <DropdownMenuSeparator className="my-2 bg-border" />

        <DropdownMenuItem className="p-0 focus:bg-transparent focus:text-popover-foreground">
          <DeleteAllMessagesDialog onDeleteAllMessages={onDeleteAllMessages} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatAdminControls;