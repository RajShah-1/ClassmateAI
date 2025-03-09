import React, { useEffect, useState } from 'react';
import { FlatList, View, Alert, TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { Card, Title, Paragraph, Avatar, IconButton, Button, ActivityIndicator, Dialog, Portal } from 'react-native-paper';
import { styles } from '../utils/styles';
import { fetchLectureData, createLecture, LectureData, deleteLecture} from '../utils/fetchData';
import { uploadAudioFile } from '../utils/uploadAudio';

type LectureScreenRouteProp = RouteProp<{ Lectures: { courseId: string } }, 'Lectures'>;

export const LecturesScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const route = useRoute<LectureScreenRouteProp>();
  const { courseId } = route.params;

  const [lectures, setLectures] = useState<LectureData>([]);
  const [uploading, setUploading] = useState(false);
  const [lectureTitle, setLectureTitle] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  const getLectures = async () => {
    try {
      const data: LectureData = await fetchLectureData(courseId);
      setLectures(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch lectures.');
    }
  };

  useEffect(() => {
    getLectures();
  }, []);

  const handleCreateLecture = async () => {
    if (!lectureTitle.trim()) {
      Alert.alert('Invalid Input', 'Please enter a lecture title.');
      return;
    }

    try {
      setDialogVisible(false);
      setUploading(true);
      const newLecture = await createLecture(courseId, lectureTitle);

      Alert.alert('Lecture Created', 'Now select an audio file to upload.');
      handleUploadAudio(newLecture.lectureID);
    } catch (error) {
      setUploading(false);
      Alert.alert('Error', 'Failed to create the lecture.');
    }
  };

  const handleUploadAudio = async (lectureId: string) => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });

      if (file.canceled) {
        setUploading(false);
        return;
      }

      const { size, uri } = file.assets[0] as { size: number; uri: string };

      if (size > 100 * 1024 * 1024) {
        Alert.alert('File too large', 'Please select an audio file smaller than 100MB.');
        setUploading(false);
        return;
      }

      const response = await uploadAudioFile(uri, courseId, lectureId);
      setUploading(false);

      if (response.success) {
        Alert.alert('Upload successful', 'Your audio file has been uploaded successfully.');
      } else {
        Alert.alert('Upload failed', 'Something went wrong while uploading the file.');
        deleteLecture(lectureId);
      }
    } catch (error) {
      setUploading(false);
      deleteLecture(lectureId);
      Alert.alert('Error', 'An unexpected error occurred.');
    }

    getLectures();
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={lectures}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => navigation.navigate('LectureDetails', { lectureId: item.id, lectureTitle: item.title })}>
            <View style={styles.cardRow}>
              <Avatar.Icon icon="file-document-outline" size={48} style={styles.icon} />
              <View style={styles.textContainer}>
                <Title>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
                <Paragraph style={styles.meta}>{item.date} • {item.duration}</Paragraph>
              </View>
              <IconButton icon="chevron-right" onPress={() => navigation.navigate('LectureDetails', { lectureId: item.id, lectureTitle: item.title })} />
            </View>
          </Card>
        )}
      />

      <View style={styles.uploadContainer}>
        <Button mode="contained" icon="upload" onPress={() => setDialogVisible(true)} disabled={uploading}>
          {uploading ? <ActivityIndicator animating={true} size="small" color="#fff" /> : 'Upload Files'}
        </Button>
      </View>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Enter Lecture Title</Dialog.Title>
          <Dialog.Content>
            <TextInput
              placeholder="Lecture Title"
              value={lectureTitle}
              onChangeText={setLectureTitle}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleCreateLecture}>Create</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
