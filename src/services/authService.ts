import { supabase } from "../lib/supabaseClient";

export async function signIn(email: string, password: string) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signUp(pseudonym: string, email: string, password: string) {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  const user = data.user;

  if (!user) {
    throw new Error("User not created");
  }

  const { error: memberError, data: memberData } = await supabase.from("members").insert([
    {
      pseudonym: pseudonym,
      user_id: user.id,
    },
  ]).select().single();

  if (memberError) throw memberError;

  return { ...data, member: memberData };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}
