import React from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {
  Appbar,
  Avatar,
  Card,
  Button,
  Text,
  TextInput,
  Title,
  Paragraph,
} from 'react-native-paper';

export const LectureDetailsScreen = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  // Example hard-coded notes for "Saved Notes"
  const notes = [
    {
      id: '1',
      title: 'Binary Tree Notes',
      description: 'Notes on terminologies used in binary trees',
    },
    {
      id: '2',
      title: 'Doubts on Dijkstra',
      description: 'Explanation on where Dijkstra fails and tips',
    },
    {
      id: '3',
      title: 'Insertion time complexity',
      description: 'How insertion time changes in different data structures',
    },
  ];

  return (
    <View style={styles.screen}>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Lecture info card */}
        <Card style={styles.lectureCard}>
          <View style={styles.lectureRow}>
            <Avatar.Icon
              icon="file-document-outline"
              size={48}
              style={styles.lectureIcon}
            />
            <View style={{ flex: 1 }}>
              <Title style={styles.lectureTitle}>Trees, Graphs</Title>
              <View style={styles.buttonRow}>
                <Button
                  mode="contained"
                  style={styles.actionButton}
                  onPress={() => {
                    /* Handle download */
                  }}
                >
                  Download
                </Button>
                <Button
                  mode="contained"
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('Chat')}
                >
                  Chat with AI
                </Button>
              </View>
            </View>
          </View>
        </Card>

        {/* "Summary" label row */}
        <View style={styles.summaryHeader}>
          <Text variant="labelLarge" style={styles.summaryTitle}>
            Summary
          </Text>
          <Text variant="bodySmall" style={styles.generatedInfo}>
            Generated 1 day ago
          </Text>
        </View>

        {/* Summary text */}
        <Paragraph style={styles.summaryText}>
          The lecture provides an introduction to hierarchical and non-linear data
          structures like trees and graphs, explaining their role in efficient
          data organization and traversal. It covers BFS, DFS, adjacency matrices,
          and adjacency lists.
        </Paragraph>

        {/* Saved Notes */}
        <Title style={styles.notesHeading}>Saved Notes</Title>
        {notes.map((note) => (
          <Card key={note.id} style={styles.noteCard}>
            <Card.Content>
              <Title style={styles.noteTitle}>{note.title}</Title>
              <Paragraph style={styles.noteDescription}>
                {note.description}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  lectureCard: {
    marginBottom: 16,
  },
  lectureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  lectureIcon: {
    marginRight: 12,
  },
  lectureTitle: {
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 8,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  summaryTitle: {
    marginRight: 16,
    fontWeight: 'bold',
  },
  generatedInfo: {
    color: '#999',
  },
  summaryText: {
    marginBottom: 16,
    lineHeight: 20,
  },
  notesHeading: {
    marginTop: 8,
    marginBottom: 8,
  },
  noteCard: {
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  noteDescription: {
    fontSize: 14,
    color: '#666',
  },
});


export const ChatScreen = () => (
    <View style={{ flex: 1, padding: 10 }}>
        <TextInput label="Ask a question..." mode="outlined" />
        <Button mode="contained" style={{ marginTop: 10 }}>Send</Button>
    </View>
);
