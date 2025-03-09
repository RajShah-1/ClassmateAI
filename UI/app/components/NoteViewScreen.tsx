import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import { Card, Title, ActivityIndicator } from 'react-native-paper';
import { styles } from '../utils/styles';
import { fetchNoteData } from '../utils/fetchData';

type NoteViewRouterProps = RouteProp<{ NoteView: { lectureId: string } }, 'NoteView'>;

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
                    Alert.alert('No Summary Found', 'This lecture does not have a summary.');
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
                            <Title style={styles.noteTitle}>No Summary Available</Title>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container}>
                <Card style={styles.noteCard}>
                    <Card.Content>
                        <Title style={styles.noteTitle}>Organized Notes</Title>
                        <Markdown>{note.content}</Markdown>
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
};
