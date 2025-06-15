import React, { useEffect, useState } from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { ActivityIndicator, View } from "react-native";
import { savePushTokenForMember, supabase } from "./src/lib/supabaseClient";
import { registerForPushNotificationsAsync } from "./src/lib/notifications";

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Au démarrage, on récupère la session persistée
    const initSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data?.session ?? null);
      setLoading(false);

      if (data.session) {
        registerPushToken(data.session.user.id);
      }
    };

    initSession();

    // Abonnement aux changements de session
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, sess) => {
        setSession(sess);

        if (session) {
          registerPushToken(session.user.id);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function registerPushToken(userId: string) {
    const token = await registerForPushNotificationsAsync();
    if (!token) return;
    console.log("Push token:", token);
    savePushTokenForMember(userId, token);
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <RootNavigator />;
}
