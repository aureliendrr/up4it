import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Profile Screen</Text>
      <Text>his is where you can view and edit your profile.</Text>
    </View>
  );
}
