import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export async function savePushTokenForMember(
  memberId: string,
  expoPushToken: string
) {
  const { error } = await supabase
    .from("members")
    .update({ expo_push_token: expoPushToken })
    .eq("id", memberId);

  if (error) {
    console.error("Erreur en sauvegardant le token push:", error.message);
  }
}
