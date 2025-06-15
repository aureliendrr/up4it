import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import { supabase } from '../lib/supabaseClient';

export default function NotifyAllButton() {
  const [loading, setLoading] = useState(false);

  async function notifyAll() {
    setLoading(true);
    try {
      // Appelle ta fonction RPC Postgres ou endpoint REST pour envoyer la notif
      const { data, error } = await supabase.rpc('test-action', {
        title: 'Hello à tous',
        body: 'Notification de test envoyée à tous les utilisateurs!',
      });

      if (error) {
        console.error('Erreur notification:', error);
        Alert.alert('Erreur', error.message);
      } else {
        Alert.alert('Succès', 'Notifications envoyées à tous les utilisateurs !');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Erreur', 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      title={loading ? 'Envoi en cours...' : 'Notify All'}
      onPress={notifyAll}
      disabled={loading}
    />
  );
}
