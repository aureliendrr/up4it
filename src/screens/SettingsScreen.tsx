import { Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Settings Screen</Text>
      <Text>his is where you can view and edit your settings.</Text>
    </View>
  );
}
