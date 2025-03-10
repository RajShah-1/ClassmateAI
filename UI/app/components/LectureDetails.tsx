// LectureDetails.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import {
  Avatar,
  Card,
  Button,
  Text,
  Title,
  Paragraph,
} from 'react-native-paper';
import { styles } from '../utils/styles';
import { fetchNoteData, fetchNoteListData, NoteListData } from '../utils/fetchData';
import { StackNavigationProp } from '@react-navigation/stack';

type LectureDetailsRouterProp = RouteProp<{ LectureDetails: { lectureId: string, lectureTitle: string } }, 'LectureDetails'>;

export const LectureDetailsScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const route = useRoute<LectureDetailsRouterProp>();

  const { lectureTitle, lectureId } = route.params;
  const [notes, setNotes] = useState<NoteListData>([]);
  const [expandedNotes, setExpandedNotes] = useState<{ [key: string]: boolean }>({});
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      const data: NoteListData = await fetchNoteListData(lectureId);
      setNotes(data);
    };
    getNotes();
  }, []);

  const toggleExpand = (noteId: string) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={[styles.card, styles.headerCard]} key={lectureId}>
          <View style={styles.cardRow}>
            <Avatar.Icon icon="file-document-outline" size={50} style={styles.icon} />
            <View style={styles.textContainer}>
              <Title style={styles.lectureTitle}>{lectureTitle}</Title>
              <View style={styles.lectureDetailsButtonColumn}>
                <Button mode="contained" style={styles.actionButton} onPress={() => { }}>
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
                {isSummaryExpanded 
                ? (notes.length > 0 ? notes[0].summary : 'No summary available.') 
                : (notes.length > 0 && notes[0].summary.length > 0 
                  ? notes[0].summary.length > 100 
                    ? `${notes[0].summary.slice(0, 100)}...` 
                    : notes[0].summary 
                  : 'No summary available.')}
            </Paragraph>
            {notes && notes.length > 0 && notes[0].summary.length > 100 && (
              <Button mode="text" onPress={() => setIsSummaryExpanded(!isSummaryExpanded)}>
                {isSummaryExpanded ? "Show Less" : "Show More"}
              </Button>
            )}
          </View>


        <Title style={styles.sectionTitle}>Saved Notes</Title>
        {notes.map((note) => {
          const isExpanded = expandedNotes[note.id];
          note.description = note.description || "No description available";
          const shortDescription = note.description.length > 100 ? `${note.description.slice(0, 100)}...` : note.description;

          return (
            <Card
              key={note.id}
              style={styles.noteCard}
              onPress={() =>
                navigation.navigate('NoteView', { lectureId: lectureId })
              }
            >
              <Card.Content style={styles.noteCardContent}>
                <Title style={styles.noteTitle}>{note.title}</Title>
                <Paragraph style={styles.noteDescription}>
                  {isExpanded ? note.description : shortDescription}
                </Paragraph>
                {note.description.length > 100 && (
                  <Button mode="text" onPress={() => toggleExpand(note.id)}>
                    {isExpanded ? "Show Less" : "Show More"}
                  </Button>
                )}
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
};
