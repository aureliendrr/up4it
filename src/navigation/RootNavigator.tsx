import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import useSession from '../hooks/useSession';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotifyScreen from '../screens/NotifyScreen';

export type RootStackParamList = {
  Notify: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { session, loading } = useSession();
  console.log('Session:', session);

  // TODO: Add a splash screen or loading indicator
  if (loading) return null;

  return (
    <NavigationContainer>
      {session ? <MainTabNavigator /> : <AuthNavigator />}
      <Stack.Screen name="Notify" component={NotifyScreen} />
    </NavigationContainer>
  );
}