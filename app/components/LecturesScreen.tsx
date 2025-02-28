import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {
  Appbar,
  Card,
  Title,
  Paragraph,
  Avatar,
  Button,
  IconButton,
} from 'react-native-paper';

const lectures = [
  {
    id: '1',
    title: 'Time Complexity',
    description: 'How to analyze the time complexity of algorithms',
    duration: '23 min',
    date: 'Today',
  },
  {
    id: '2',
    title: 'Arrays, Linked lists',
    description: 'When and how to use arrays and linked lists',
    duration: '23 min',
    date: 'Today',
  },
  {
    id: '3',
    title: 'Stacks, Queues',
    description: 'How stacks (LIFO) and queues (FIFO) help manage data efficiently',
    duration: '23 min',
    date: 'Today',
  },
];

export const LecturesScreen = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  // Renders each lecture card
  const renderLectureItem = ({ item }: any) => (
    <Card style={styles.card} onPress={() => navigation.navigate('LectureDetails')}>
      <View style={styles.cardRow}>
        {/* Placeholder icon on the left */}
        <Avatar.Icon
          icon="file-document-outline"
          size={48}
          style={styles.lectureIcon}
        />
        <View style={styles.textContainer}>
          <Title style={styles.lectureTitle}>{item.title}</Title>
          <Paragraph style={styles.lectureDescription}>{item.description}</Paragraph>
          <Paragraph style={styles.lectureMeta}>
            {item.date} • {item.duration}
          </Paragraph>
        </View>
        {/* Right arrow icon */}
        <IconButton
          icon="chevron-right"
          onPress={() => navigation.navigate('LectureDetails')}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Custom Paper header */}
      {/* <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Lectures in DSA" />
      </Appbar.Header> */}

      {/* The FlatList includes a header (Chat button) and footer (upload box) */}
      <FlatList
        data={lectures}
        keyExtractor={(item) => item.id}
        renderItem={renderLectureItem}
        ListHeaderComponent={
          <Button
            mode="contained"
            icon="robot"
            style={styles.aiButton}
            labelStyle={styles.aiButtonLabel}
            onPress={() => navigation.navigate('Chat')}
          >
            Chat with AI (All Lectures)
          </Button>
        }
        ListFooterComponent={
          <View style={styles.uploadBox}>
            <Avatar.Icon
              icon="cloud-upload-outline"
              size={40}
              style={styles.uploadIcon}
            />
            <Paragraph style={styles.uploadText}>Drag & drop files or Browse</Paragraph>
            <Paragraph style={styles.uploadFormats}>Supported formats: MP3, MP4</Paragraph>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  aiButton: {
    margin: 16,
    borderRadius: 4,
  },
  aiButtonLabel: {
    fontSize: 15,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  lectureIcon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  lectureTitle: {
    marginBottom: 2,
  },
  lectureDescription: {
    fontSize: 14,
    color: '#666',
  },
  lectureMeta: {
    marginTop: 4,
    fontSize: 13,
    color: '#999',
  },
  uploadBox: {
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    backgroundColor: 'transparent',
  },
  uploadText: {
    marginTop: 12,
    fontSize: 15,
  },
  uploadFormats: {
    marginTop: 4,
    fontSize: 13,
    color: '#999',
  },
});
