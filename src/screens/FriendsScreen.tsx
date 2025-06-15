import { Text, View } from "react-native";

export default function FriendsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Friends Screen</Text>
      <Text>This is where you can view and manage your friends list.</Text>
    </View>
  );
}
