import { Text, View } from "react-native";
import NotifyAllButton from "../components/NotifyAllButton";

export default function NotifyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <NotifyAllButton />
    </View>
  );
}