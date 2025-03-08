import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { List } from 'react-native-paper';
import { fetchNoteData, NoteData } from '../utils/fetchData';

export const NotesScreen = ({ navigation }: { navigation: NavigationProp<any>; }) => {
  const [notes, setNotes] = useState<NoteData>([]);

  useEffect(() => {
    const getNotes = async () => {  
      const data : NoteData = await fetchNoteData();
      setNotes(data);
    };
    getNotes();
  }, []);

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <List.Item
          title={item.title}
          description={item.description}
          onPress={() => navigation.navigate('Chat')}
          left={() => <List.Icon icon="note" />}
        />
      )}
    />
  );
};