import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface Group {
    id: string;
    name: string;
}

const groupsMock: Group[] = [
    { id: '1', name: 'Groupe 1' },
    { id: '2', name: 'Groupe 2' },
    { id: '3', name: 'Groupe 3' },
]

export default function GroupsList() {
  const navigation = useNavigation();

  const handleCreateGroup = () => {
    // navigation.navigate('CreateGroup');
    console.log("Créer un groupe");
  };

  const renderEmptyState = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tu n’as encore aucun groupe</Text>
      <TouchableOpacity
        onPress={handleCreateGroup}
        style={{
          marginTop: 20,
          padding: 12,
          backgroundColor: '#007AFF',
          borderRadius: 8,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Ionicons name="add" size={20} color="white" />
        <Text style={{ color: 'white', marginLeft: 8 }}>Créer un groupe</Text>
      </TouchableOpacity>
    </View>
  );

  const renderGroup = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => console.log('Voir groupe', item)}
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {groupsMock.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          <FlatList
            data={groupsMock}
            renderItem={renderGroup}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
          <TouchableOpacity
            onPress={handleCreateGroup}
            style={{
              position: 'absolute',
              right: 16,
              bottom: 16,
              backgroundColor: '#007AFF',
              padding: 10,
              borderRadius: 24,
            }}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
