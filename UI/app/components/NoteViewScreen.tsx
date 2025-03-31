import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Alert, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useRoute, useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import { Card, Title, ActivityIndicator, FAB } from 'react-native-paper';
import { styles } from '../utils/styles';
import { fetchNoteData } from '../utils/fetchData';
import analytics from '@react-native-firebase/analytics';

type NoteViewRouterProps = RouteProp<{ NoteView: { lectureId: string, noteId: string } }, 'NoteView'>;

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
    const { lectureId, noteId } = route.params;
    const navigation = useNavigation<NavigationProp<any>>();

    const [note, setNote] = useState<{ id: string; content: string } | null>(null);
    const [loading, setLoading] = useState(true);

    const startTimeRef = useRef<number>(Date.now());
    const maxScrollPercentRef = useRef<number>(0);

    useEffect(() => {
        const getNote = async () => {
            try {
                const data = await fetchNoteData(lectureId, noteId);
                if (data) setNote(data);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch note.');
            } finally {
                setLoading(false);
            }
        };

        getNote();

        return () => {
            const endTime = Date.now();
            const timeSpent = Math.floor((endTime - startTimeRef.current) / 1000); // in seconds
            const bounce = timeSpent < 5;

            analytics().logEvent('note_view_stats', {
                lecture_id: lectureId,
                note_id: noteId,
                time_spent_seconds: timeSpent,
                scroll_depth_percent: Math.floor(maxScrollPercentRef.current),
                bounced: bounce,
            });
        };
    }, [lectureId, noteId]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        const visibleHeight = layoutMeasurement.height;
        const totalHeight = contentSize.height;

        const currentBottom = contentOffset.y + visibleHeight;
        const scrollPercent = Math.min((currentBottom / totalHeight) * 100, 100);

        if (scrollPercent > maxScrollPercentRef.current) {
            maxScrollPercentRef.current = scrollPercent;
        }
    };

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
            <ScrollView
                contentContainerStyle={styles.noteContainer}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <Markdown style={markdownStyles}>{note.content}</Markdown>
            </ScrollView>
            <FAB
                style={{ position: 'absolute', margin: 16, right: 16, bottom: 16 }}
                icon="chat-question-outline"
                onPress={() => navigation.navigate('Chat', { lectureId })}
                label='Chat with AI'
            />
        </View>
    );
};

export default NoteViewScreen;
