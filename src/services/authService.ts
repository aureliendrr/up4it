import { supabase } from '../lib/supabaseClient';

export async function signIn(email: string, password: string) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string) {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
}
