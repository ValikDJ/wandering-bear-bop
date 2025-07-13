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
import { Slider } from '@/components/ui/slider'; // NEW IMPORT
import { Label } from '@/components/ui/label'; // NEW IMPORT
import { Users, UserCheck, UserX, Lock, Settings, Trash2, Clock } from 'lucide-react';
import DeleteAllMessagesDialog from './DeleteAllMessagesDialog';
import { toast } from 'sonner';
import { MessageExpiryDuration } from '@/types/chat';

interface ChatAdminControlsProps {
  chatPermissionLevel: 'all' | 'authenticated' | 'unauthenticated' | 'none';
  onPermissionChange: (newPermission: 'all' | 'authenticated' | 'unauthenticated' | 'none') => void;
  onDeleteAllMessages: () => Promise<void>;
  messageExpiryDuration: MessageExpiryDuration;
  onMessageExpiryChange: (duration: MessageExpiryDuration) => void;
}

const expiryOptions: { value: MessageExpiryDuration; label: string }[] = [
  { value: 'never', label: 'Ніколи' },
  { value: '15m', label: '15 хвилин' },
  { value: '30m', label: '30 хвилин' },
  { value: '45m', label: '45 хвилин' },
  { value: '1h', label: '1 година' },
  { value: '1.5h', label: '1.5 години' },
  { value: '2h', label: '2 години' },
  { value: '4h', label: '4 години' },
  { value: '8h', label: '8 годин' },
  { value: '24h', label: '24 години' },
  { value: '7d', label: '7 днів' },
];

const ChatAdminControls: React.FC<ChatAdminControlsProps> = ({
  chatPermissionLevel,
  onPermissionChange,
  onDeleteAllMessages,
  messageExpiryDuration,
  onMessageExpiryChange,
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
    const option = expiryOptions.find(opt => opt.value === duration);
    return option ? `Повідомлення видаляються через ${option.label.toLowerCase()}.` : '';
  };

  const currentExpirySliderValue = expiryOptions.findIndex(opt => opt.value === messageExpiryDuration);

  const handleSliderChange = (value: number[]) => {
    const newDuration = expiryOptions[value[0]].value;
    onMessageExpiryChange(newDuration);
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

        {/* NEW: Message Expiry Setting with Slider */}
        <DropdownMenuLabel className="text-sm font-semibold text-muted-foreground mb-2 mt-4">
          Автоматичне видалення повідомлень
        </DropdownMenuLabel>
        <div className="px-2 py-1.5"> {/* Wrap slider in a div to apply padding */}
          <Label htmlFor="message-expiry-slider" className="text-sm font-medium text-secondary-foreground mb-2 block">
            Термін дії: {expiryOptions[currentExpirySliderValue]?.label || 'Невідомо'}
          </Label>
          <Slider
            id="message-expiry-slider"
            min={0}
            max={expiryOptions.length - 1}
            step={1}
            value={[currentExpirySliderValue]}
            onValueChange={handleSliderChange}
            className="w-full"
          />
        </div>
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