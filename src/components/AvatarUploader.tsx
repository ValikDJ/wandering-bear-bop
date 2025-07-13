import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Camera, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvatarUploaderProps {
  user: User;
  initialAvatarUrl: string | null;
  onUploadSuccess: (newUrl: string) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ user, initialAvatarUrl, onUploadSuccess }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAvatarUrl(initialAvatarUrl);
  }, [initialAvatarUrl]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Розмір файлу перевищує 5MB.');
      return;
    }

    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars') // 'avatars' is the bucket name
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError);
      toast.error(`Помилка завантаження аватара: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      toast.error('Не вдалося отримати URL аватара.');
      setUploading(false);
      return;
    }

    const newPublicUrl = publicUrlData.publicUrl;

    // Update user profile in database
    const { error: updateError } = await supabase
      .from('profiles')
      .upsert({ id: user.id, avatar_url: newPublicUrl }, { onConflict: 'id' });

    if (updateError) {
      console.error('Error updating profile with avatar URL:', updateError);
      toast.error(`Помилка оновлення профілю: ${updateError.message}`);
    } else {
      setAvatarUrl(newPublicUrl);
      onUploadSuccess(newPublicUrl);
      toast.success('Аватар успішно оновлено!');
    }
    setUploading(false);
  };

  const handleRemoveAvatar = async () => {
    if (!avatarUrl) return;

    setUploading(true);

    // Extract file path from URL (assuming it's in 'avatars/...')
    const urlParts = avatarUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `avatars/${fileName}`;

    const { error: deleteError } = await supabase.storage
      .from('avatars')
      .remove([filePath]);

    if (deleteError) {
      console.error('Error deleting old avatar:', deleteError);
      toast.error(`Помилка видалення аватара: ${deleteError.message}`);
      setUploading(false);
      return;
    }

    // Update user profile in database to null
    const { error: updateError } = await supabase
      .from('profiles')
      .upsert({ id: user.id, avatar_url: null }, { onConflict: 'id' });

    if (updateError) {
      console.error('Error clearing avatar URL in profile:', updateError);
      toast.error(`Помилка оновлення профілю: ${updateError.message}`);
    } else {
      setAvatarUrl(null);
      onUploadSuccess(null);
      toast.success('Аватар успішно видалено!');
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border border-border rounded-lg bg-background shadow-sm">
      <Avatar className="h-24 w-24 border-2 border-primary shadow-md">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt="Аватар користувача" className="object-cover" />
        ) : (
          <AvatarFallback className="bg-muted text-muted-foreground text-4xl font-bold">
            <UserIcon className="h-12 w-12" />
          </AvatarFallback>
        )}
      </Avatar>

      <Label htmlFor="avatar-upload" className="sr-only">Завантажити аватар</Label>
      <Input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden" // Hide the default file input
        disabled={uploading}
      />
      <div className="flex gap-2">
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="bg-accent text-accent-foreground hover:bg-accent/80"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Завантаження...
            </>
          ) : (
            <>
              <Camera className="mr-2 h-4 w-4" />
              Змінити аватар
            </>
          )}
        </Button>
        {avatarUrl && (
          <Button
            variant="outline"
            onClick={handleRemoveAvatar}
            disabled={uploading}
            className="text-destructive hover:bg-destructive/10 border-destructive"
          >
            Видалити аватар
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">Макс. розмір: 5MB. Формати: JPG, PNG, GIF.</p>
    </div>
  );
};

export default AvatarUploader;