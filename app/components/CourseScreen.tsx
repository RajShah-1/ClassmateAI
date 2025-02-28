import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {
  Card,
  Title,
  Paragraph,
  Avatar,
  Button,
} from 'react-native-paper';

const courses = [
  {
    id: '1',
    title: 'DSA',
    description: 'Fundamentals of data structures and their role in efficient computing',
    lectures: 3,
    date: 'Today',
  },
  {
    id: '2',
    title: 'OS',
    description: 'Fundamentals of Computer Operating Systems',
    lectures: 5,
    date: '2 days ago',
  },
  {
    id: '3',
    title: 'MAS',
    description: 'Introduction to development of Mobile Applications and Services',
    lectures: 3,
    date: 'Today',
  },
];

export const CourseScreen = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  return (
    <View style={styles.container}>
      {/* Course List */}
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => navigation.navigate('Lectures')}>
            <View style={styles.cardRow}>
              {/* Left icon (placeholder icon) */}
              <Avatar.Icon
                style={styles.courseIcon}
                size={48}
                icon="file-document-outline"
              />
              <View style={styles.textContainer}>
                <Title style={styles.title}>{item.title}</Title>
                <Paragraph style={styles.description}>{item.description}</Paragraph>

                {/* footer: e.g. "Today - 3 Lectures" */}
                <Paragraph style={styles.lectureInfo}>
                  {item.date} • {item.lectures} Lectures
                </Paragraph>
              </View>
            </View>
          </Card>
        )}
      />

    {/* Create new course button */}
      <Button
        mode="contained"
        icon="plus"
        style={styles.createButton}
        labelStyle={styles.createButtonLabel}
        onPress={() => {
          /* Handle create new course */
        }}
      >
        Create New Course
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  courseIcon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  lectureInfo: {
    marginTop: 4,
    fontSize: 13,
    color: '#999',
  },
  createButton: {
    margin: 16,
    borderRadius: 4,
  },
  createButtonLabel: {
    fontSize: 16,
  },
});
