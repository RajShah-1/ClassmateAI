// LectureDetails.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
  Avatar,
  Card,
  Button,
  Text,
  Title,
  Paragraph,
} from 'react-native-paper';
import { styles } from '../utils/styles';
import { fetchNoteData, NoteData } from '../utils/fetchData';

interface LectureDetailsProps {
  navigation: NavigationProp<any>;
  route: any
}

export const LectureDetailsScreen = ({ navigation, route }: LectureDetailsProps) => {
  const { lectureTitle } = route.params;
  const [notes, setNotes] = useState<NoteData>([]);

  useEffect(() => {
    const getNotes = async () => {
      const data : NoteData = await fetchNoteData();
      setNotes(data);
    };
    getNotes();
  }, []);

  return  (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={[styles.card, styles.headerCard]}>
          <View style={styles.cardRow}>
            <Avatar.Icon icon="file-document-outline" size={50} style={styles.icon} />
            <View style={styles.textContainer}>
              <Title style={styles.lectureTitle}>{lectureTitle}</Title>
              <View style={styles.lectureDetailsButtonColumn}>
                <Button mode="contained" style={styles.actionButton} onPress={() => {}}>
                  Download
                </Button>
                <Button mode="contained" style={styles.actionButton} onPress={() => navigation.navigate('Chat', { lectureTitle })}>
                  Chat with AI
                </Button>
              </View>
            </View>
          </View>
        </Card>

        <View style={styles.summaryContainer}>
          <Title style={styles.sectionTitle}>Summary</Title>
          <Paragraph style={styles.summaryText}>
            This lecture provides an in-depth explanation of {lectureTitle}, covering its fundamental concepts and applications.
          </Paragraph>
        </View>

        <Title style={styles.sectionTitle}>Saved Notes</Title>
        {notes.map((note) => (
          <Card key={note.id} style={styles.noteCard}>
            <Card.Content style={styles.noteCardContent}>
              <Title style={styles.noteTitle}>{note.title}</Title>
              <Paragraph style={styles.noteDescription}>{note.description}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};
