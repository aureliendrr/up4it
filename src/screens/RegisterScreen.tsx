import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthNavigator";
import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { signUp } from "../services/authService";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [pseudonym, setPseudonym] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      await signUp(pseudonym, email, password);
      Alert.alert("Registered! Check your email.");
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Register failed", error.message);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Pseudonym</Text>
      <TextInput
        onChangeText={setPseudonym}
        autoCapitalize="none"
        style={{ marginBottom: 10 }}
      />
      <Text>Email</Text>
      <TextInput onChangeText={setEmail} autoCapitalize="none" style={{ marginBottom: 10 }} />
      <Text>Password</Text>
      <TextInput onChangeText={setPassword} secureTextEntry style={{ marginBottom: 10 }}/>
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
