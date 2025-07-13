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

// Схема валідації для форми профілю
const profileSchema = z.object({
  first_name: z.string().min(1, 'Ім\'я не може бути порожнім').max(50, 'Ім\'я занадто довге').optional().or(z.literal('')),
  last_name: z.string().min(1, 'Прізвище не може бути порожнім').max(50, 'Прізвище занадто довге').optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfilePage: React.FC = () => {
  const { user, isLoading: isSessionLoading } = useSession();
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
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
        .select('first_name, last_name')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found (profile not yet created)
        console.error('Error fetching profile:', error);
        toast.error('Помилка завантаження даних профілю.');
      } else if (data) {
        reset(data); // Set form values from fetched data
      }
      setIsProfileLoading(false);
    };

    if (!isSessionLoading) {
      fetchProfile();
    }
  }, [user, isSessionLoading, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) {
      toast.error('Користувач не авторизований.');
      return;
    }

    setIsUpdating(true);
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        first_name: values.first_name,
        last_name: values.last_name,
      }, { onConflict: 'id' }); // Use upsert to insert if not exists, update if exists

    if (error) {
      console.error('Error updating profile:', error);
      toast.error(`Помилка оновлення профілю: ${error.message}`);
    } else {
      toast.success('Профіль успішно оновлено!');
      reset(values); // Reset form to mark as not dirty
    }
    setIsUpdating(false);
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
        Тут ти можеш переглянути та оновити свої особисті дані.
      </p>

      <Card className="w-full max-w-lg mx-auto bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-card-foreground">Редагувати Профіль</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                {...register('first_name')}
                placeholder="Введіть ваше ім'я"
                className={errors.first_name ? 'border-destructive' : ''}
              />
              {errors.first_name && (
                <p className="text-destructive text-sm mt-1">{errors.first_name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="last_name" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                Прізвище:
              </Label>
              <Input
                id="last_name"
                type="text"
                {...register('last_name')}
                placeholder="Введіть ваше прізвище"
                className={errors.last_name ? 'border-destructive' : ''}
              />
              {errors.last_name && (
                <p className="text-destructive text-sm mt-1">{errors.last_name.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
              disabled={isUpdating || !isDirty}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Оновлення...
                </>
              ) : (
                'Зберегти зміни'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;