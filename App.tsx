import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import { supabase } from "./src/lib/supabaseClient";
import { registerForPushNotificationsAsync } from "./src/lib/notifications";
import { ActivityIndicator, View } from "react-native";

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function registerToken(userId: string) {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        await supabase
          .from("members")
          .update({ push_token: token })
          .eq("user_id", userId);
      }
    }

    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      setLoading(false);

      if (data.session) {
        await registerToken(data.session.user.id);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, sess) => {
        setSession(sess);

        if (sess) {
          await registerToken(sess.user.id);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {session?.user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
