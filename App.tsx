import React, { useEffect, useState } from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "./src/lib/supabaseClient";

export default function App() {

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Au démarrage, on récupère la session persistée
    const initSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log("Initial session data:", data);
      if (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
        return;
      }
      setSession(data?.session ?? null);
      setLoading(false);
    };

    initSession();

    // Abonnement aux changements de session
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <RootNavigator />;
}
