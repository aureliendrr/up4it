import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signIn } from '../services/authService';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput onChangeText={setEmail} autoCapitalize="none" />
      <Text>Password</Text>
      <TextInput onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate('Register')}>No account? Register</Text>
    </View>
  );
}
