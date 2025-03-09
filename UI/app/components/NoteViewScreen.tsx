import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import { Card, Title, ActivityIndicator } from 'react-native-paper';
import { styles } from '../utils/styles';
import { fetchNoteData } from '../utils/fetchData';

type NoteViewRouterProps = RouteProp<{ NoteView: { lectureId: string } }, 'NoteView'>;

const markdownStyles = {
    body: { fontSize: 16, lineHeight: 24, paddingHorizontal: 10 },
    heading1: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
    heading2: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
    heading3: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
    paragraph: { fontSize: 16, marginBottom: 10 },
    list_item: { fontSize: 16, marginVertical: 5 },
    code_block: { backgroundColor: '#f4f4f4', padding: 10, borderRadius: 5 },
    hr: { backgroundColor: '#ccc', height: 1, marginVertical: 10 },
};

export const NoteViewScreen = () => {
    const route = useRoute<NoteViewRouterProps>();
    const { lectureId } = route.params;

    const [note, setNote] = useState<{ id: string; content: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNote = async () => {
            try {
                const data = await fetchNoteData(lectureId);
                if (data) {
                    setNote(data);
                } else {
                    // Alert.alert('Notes are still being generated. Try again later.');
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch note.');
            } finally {
                setLoading(false);
            }
        };
        getNote();
    }, [lectureId]);

    if (loading) {
        return <ActivityIndicator animating={true} size="large" style={styles.loadingIndicator} />;
    }

    if (!note) {
        return (
            <View style={styles.screen}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Card style={styles.noteCard}>
                        <Card.Content>
                            <Title style={styles.noteTitle}>Notes are not ready yet! Please try again later.</Title>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container}>
                <Markdown style={markdownStyles}>{note.content}</Markdown>
            </ScrollView>
        </View>
    );
};
