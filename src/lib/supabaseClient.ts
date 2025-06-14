import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

export async function savePushTokenForMember(memberId: string, expoPushToken: string) {
  const { error } = await supabase
    .from('members')
    .update({ expo_push_token: expoPushToken })
    .eq('id', memberId);

  if (error) {
    console.error('Erreur en sauvegardant le token push:', error.message);
  }
}