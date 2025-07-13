import React, { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from '@/components/SessionContextProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login: React.FC = () => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session && !isLoading) {
      // Redirect authenticated users to the home page
      navigate('/');
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <Card className="w-full max-w-md bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-card-foreground">Вхід / Реєстрація</CardTitle>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark" // Use dark theme for Auth UI to match our dark mode
            providers={['google']} // Додано Google як провайдера
            redirectTo={window.location.origin} // Redirect to home after auth
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Електронна пошта',
                  password_label: 'Пароль',
                  email_input_placeholder: 'Ваша електронна пошта',
                  password_input_placeholder: 'Ваш пароль',
                  button_label: 'Увійти',
                  social_provider_text: 'Увійти за допомогою {{provider}}',
                  link_text: 'Вже маєте акаунт? Увійдіть',
                },
                sign_up: {
                  email_label: 'Електронна пошта',
                  password_label: 'Пароль',
                  email_input_placeholder: 'Ваша електронна пошта',
                  password_input_placeholder: 'Створіть пароль',
                  button_label: 'Зареєструватися',
                  social_provider_text: 'Зареєструватися за допомогою {{provider}}',
                  link_text: 'Не маєте акаунту? Зареєструйтесь',
                },
                forgotten_password: {
                  email_label: 'Електронна пошта',
                  password_label: 'Ваш пароль',
                  email_input_placeholder: 'Ваша електронна пошта',
                  button_label: 'Надіслати інструкції для скидання пароля',
                  link_text: 'Забули пароль?',
                },
                update_password: {
                  password_label: 'Новий пароль',
                  password_input_placeholder: 'Ваш новий пароль',
                  button_label: 'Оновити пароль',
                },
                magic_link: {
                  email_input_placeholder: 'Ваша електронна пошта',
                  button_label: 'Надіслати магічне посилання',
                  link_text: 'Надіслати магічне посилання',
                },
                verify_otp: {
                  email_input_placeholder: 'Ваша електронна пошта',
                  phone_input_placeholder: 'Ваш номер телефону',
                  token_input_placeholder: 'Ваш OTP',
                  button_label: 'Підтвердити OTP',
                  link_text: 'Вже маєте OTP?',
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;