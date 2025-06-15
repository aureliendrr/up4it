import { Text, View } from "react-native";

export default function NotifyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Notify Screen</Text>
      <Text>This is where you can view your notifications.</Text>
    </View>
  );
}