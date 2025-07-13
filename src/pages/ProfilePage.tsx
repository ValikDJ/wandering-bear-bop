import React, { useEffect, useState } from 'react';
import { useSession } from '@/components/SessionContextProvider';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import AvatarUploader from '@/components/AvatarUploader'; // Import AvatarUploader

// Схема валідації для форми профілю
const profileSchema = z.object({
  first_name: z.string().min(1, 'Ім\'я не може бути порожнім').max(50, 'Ім\'я занадто довге').optional().or(z.literal('')),
  last_name: z.string().min(1, 'Прізвище не може бути порожнім').max(50, 'Прізвище занадто довге').optional().or(z.literal('')),
  avatar_url: z.string().url('Недійсний URL аватара').optional().or(z.literal('')), // Add avatar_url to schema
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// Схема валідації для форми зміни пароля
const passwordChangeSchema = z.object({
  newPassword: z.string()
    .min(6, 'Пароль має бути не менше 6 символів')
    .max(72, 'Пароль занадто довгий'),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Паролі не співпадають',
  path: ['confirmNewPassword'],
});

type PasswordChangeFormValues = z.infer<typeof passwordChangeSchema>;

const ProfilePage: React.FC = () => {
  const { user, isLoading: isSessionLoading } = useSession();
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(null); // State for avatar URL

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    formState: { errors: profileErrors, isDirty: isProfileDirty },
    setValue: setProfileValue, // Add setValue to update form fields
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      avatar_url: '', // Initialize avatar_url
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors, isDirty: isPasswordDirty },
  } = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setIsProfileLoading(false);
        return;
      }

      setIsProfileLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, avatar_url') // Select avatar_url
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found (profile not yet created)
        console.error('Error fetching profile:', error);
        toast.error('Помилка завантаження даних профілю.');
      } else if (data) {
        resetProfile(data); // Set form values from fetched data
        setCurrentAvatarUrl(data.avatar_url || null); // Set current avatar URL
      }
      setIsProfileLoading(false);
    };

    if (!isSessionLoading) {
      fetchProfile();
    }
  }, [user, isSessionLoading, resetProfile]);

  const onSubmitProfile = async (values: ProfileFormValues) => {
    if (!user) {
      toast.error('Користувач не авторизований.');
      return;
    }

    setIsUpdatingProfile(true);
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        first_name: values.first_name,
        last_name: values.last_name,
        avatar_url: currentAvatarUrl, // Use currentAvatarUrl from state
      }, { onConflict: 'id' }); // Use upsert to insert if not exists, update if exists

    if (error) {
      console.error('Error updating profile:', error);
      toast.error(`Помилка оновлення профілю: ${error.message}`);
    } else {
      toast.success('Профіль успішно оновлено!');
      resetProfile(values); // Reset form to mark as not dirty
    }
    setIsUpdatingProfile(false);
  };

  const onSubmitPassword = async (values: PasswordChangeFormValues) => {
    if (!user) {
      toast.error('Користувач не авторизований.');
      return;
    }

    setIsUpdatingPassword(true);
    const { error } = await supabase.auth.updateUser({
      password: values.newPassword,
    });

    if (error) {
      console.error('Error updating password:', error);
      toast.error(`Помилка зміни пароля: ${error.message}`);
    } else {
      toast.success('Пароль успішно змінено!');
      resetPassword(); // Clear password fields
    }
    setIsUpdatingPassword(false);
  };

  const handleAvatarUploadSuccess = (newUrl: string | null) => {
    setCurrentAvatarUrl(newUrl);
    setProfileValue('avatar_url', newUrl || ''); // Update form value for avatar_url
  };

  if (isSessionLoading || isProfileLoading) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center text-foreground">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <p>Завантаження профілю...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center text-foreground">
        <p>Будь ласка, увійдіть, щоб переглянути свій профіль.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">Мій Профіль</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        Тут ти можеш переглянути та оновити свої особисті дані та змінити пароль.
      </p>

      <Card className="w-full max-w-lg mx-auto bg-card shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-card-foreground">Редагувати Профіль</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <AvatarUploader
              user={user}
              initialAvatarUrl={currentAvatarUrl}
              onUploadSuccess={handleAvatarUploadSuccess}
            />
          </div>
          <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                Електронна пошта:
              </Label>
              <Input
                id="email"
                type="email"
                value={user.email || ''}
                disabled
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>

            <div>
              <Label htmlFor="first_name" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                Ім'я:
              </Label>
              <Input
                id="first_name"
                type="text"
                {...registerProfile('first_name')}
                placeholder="Введіть ваше ім'я"
                className={profileErrors.first_name ? 'border-destructive' : ''}
              />
              {profileErrors.first_name && (
                <p className="text-destructive text-sm mt-1">{profileErrors.first_name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="last_name" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                Прізвище:
              </Label>
              <Input
                id="last_name"
                type="text"
                {...registerProfile('last_name')}
                placeholder="Введіть ваше прізвище"
                className={profileErrors.last_name ? 'border-destructive' : ''}
              />
              {profileErrors.last_name && (
                <p className="text-destructive text-sm mt-1">{profileErrors.last_name.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
              disabled={isUpdatingProfile || !isProfileDirty}
            >
              {isUpdatingProfile ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Оновлення профілю...
                </>
              ) : (
                'Зберегти зміни профілю'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-lg mx-auto bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-card-foreground">Змінити Пароль</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-6">
            <div>
              <Label htmlFor="newPassword" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                Новий пароль:
              </Label>
              <Input
                id="newPassword"
                type="password"
                {...registerPassword('newPassword')}
                placeholder="Введіть новий пароль"
                className={passwordErrors.newPassword ? 'border-destructive' : ''}
              />
              {passwordErrors.newPassword && (
                <p className="text-destructive text-sm mt-1">{passwordErrors.newPassword.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmNewPassword" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                Підтвердіть новий пароль:
              </Label>
              <Input
                id="confirmNewPassword"
                type="password"
                {...registerPassword('confirmNewPassword')}
                placeholder="Повторіть новий пароль"
                className={passwordErrors.confirmNewPassword ? 'border-destructive' : ''}
              />
              {passwordErrors.confirmNewPassword && (
                <p className="text-destructive text-sm mt-1">{passwordErrors.confirmNewPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
              disabled={isUpdatingPassword || !isPasswordDirty}
            >
              {isUpdatingPassword ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Зміна пароля...
                </>
              ) : (
                'Змінити пароль'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;