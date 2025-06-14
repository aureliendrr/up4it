import { View, Text, Button, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "../services/authService";
import useSession from "../hooks/useSession";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AppStackParamList } from "../navigation/AppNavigator";
import { useLayoutEffect } from "react";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const { session, loading } = useSession();

  const navigation = useNavigation<HomeScreenNavigationProp>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 8 }}>
          <Button
            title="Logout"
            onPress={async () => {
              await signOut();
            }}
          />
        </View>
      ),
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Notify all" />
    </View>
  );
}
