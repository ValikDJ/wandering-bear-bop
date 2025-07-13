import { supabase } from './client';
import { AuthError } from '@supabase/supabase-js';

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};

export const signUpWithEmail = async (email: string, password: string, options?: { data?: Record<string, any> }) => {
  const { data, error } = await supabase.auth.signUp({ email, password, options });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};

export const getUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const handleAuthError = (error: AuthError | null): string => {
  if (!error) return '';
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Неправильний логін або пароль. Будь ласка, спробуйте ще раз.';
    case 'Email not confirmed':
      return 'Будь ласка, підтвердіть свою електронну пошту, перш ніж увійти.';
    case 'User already registered':
      return 'Користувач з такою електронною поштою вже зареєстрований.';
    default:
      return `Помилка автентифікації: ${error.message}`;
  }
};