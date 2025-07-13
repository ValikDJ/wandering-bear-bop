import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase URL or Anon Key is missing. Please check your .env file.');
    } else {
      // Тимчасовий console.log для перевірки
      console.log('Supabase URL:', supabaseUrl);
      console.log('Supabase Anon Key (first 5 chars):', supabaseAnonKey.substring(0, 5) + '...');
    }

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);