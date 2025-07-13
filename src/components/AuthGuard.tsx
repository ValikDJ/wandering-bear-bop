import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionContextProvider';
import { toast } from 'sonner';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !session) {
      // User is not authenticated, redirect to login
      toast.info('Будь ласка, увійдіть, щоб отримати доступ до цієї сторінки.');
      navigate('/login');
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    // Optionally show a loading spinner or message while checking session
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center text-foreground">
        <p>Завантаження...</p>
      </div>
    );
  }

  // If session exists, render the children (protected content)
  return session ? <>{children}</> : null;
};

export default AuthGuard;