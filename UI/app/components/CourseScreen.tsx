import React, { useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Card, Title, Paragraph, Avatar, Button } from 'react-native-paper';
import { styles } from '../utils/styles';
import { fetchCourseData, CourseData } from '../utils/fetchData';

export const CourseScreen = ({ navigation }: { navigation: NavigationProp<any>; }) => {
  const [courses, setCourses] = useState<CourseData>([]);

  const retryFetchCourses = (retries: number) => {
    setTimeout(async () => {
      try {
        const data: CourseData = await fetchCourseData();
        setCourses(data);
      } catch (error) {
        if (retries > 0) {
          console.error('Retrying to fetch courses', error);
          retryFetchCourses(retries - 1);
        } else {
          console.error('Failed to fetch courses after retries', error);
          Alert.alert('Failed to get the courses!');
        }
      }
    }, 5000);
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data: CourseData = await fetchCourseData();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses', error);
        retryFetchCourses(3); // Retry 3 times upon failure
      }
    };
    getCourses();
  }, []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => navigation.navigate('Lectures', { courseId: item.id })}>
            <View style={styles.cardRow}>
              <Avatar.Icon icon="file-document-outline" size={48} style={styles.icon} />
              <View style={styles.textContainer}>
                <Title>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
                <Paragraph style={styles.meta}>{item.date} • {item.lectures} Lectures</Paragraph>
              </View>
            </View>
          </Card>
        )}
      />
      <Button mode="contained" icon="plus" style={styles.aiButton} onPress={() => {}}>
        Create New Course
      </Button>
    </View>
  );
};
