import React, { useEffect, useState } from 'react';
import { FlatList, View, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { NavigationProp } from '@react-navigation/native';
import { Card, Title, Paragraph, Avatar, IconButton, Button, ActivityIndicator } from 'react-native-paper';
import { styles } from '../utils/styles';
import { fetchLectureData, LectureData } from '../utils/fetchData';
import { uploadAudioFile } from '../utils/uploadAudio';

export const LecturesScreen = ({ navigation, route }: { navigation: NavigationProp<any>; route: any; }) => {
  const [lectures, setLectures] = useState<LectureData>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getLectures = async () => {
      const data: LectureData = await fetchLectureData();
      setLectures(data);
    };
    getLectures();
  }, []);

  const handleUpload = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });

      if (file.canceled) return;
      
      const { size, uri, mimeType, name } = file.assets[0] as { size: number; uri: string; mimeType: string; name: string };

      if (size > 100 * 1024 * 1024) {
        Alert.alert('File too large', 'Please select an audio file smaller than 100MB.');
        return;
      }

      setUploading(true);
      const response = await uploadAudioFile(uri, 1, 1);
      setUploading(false);

      if (response.success) {
        Alert.alert('Upload successful', 'Your audio file has been uploaded successfully.');
      } else {
        Alert.alert('Upload failed', 'Something went wrong while uploading the file.');
      }
    } catch (error) {
      setUploading(false);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
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
              <IconButton icon="chevron-right" onPress={() => navigation.navigate('LectureDetails', { lectureId: item.id })} />
            </View>
          </Card>
        )}
      />
      <View style={styles.uploadContainer}>
        <Button mode="contained" icon="upload" onPress={handleUpload} disabled={uploading}>
          {uploading ? <ActivityIndicator animating={true} size="small" color="#fff" /> : 'Upload Files'}
        </Button>
      </View>
    </View>
  );
};
