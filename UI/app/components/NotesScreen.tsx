import React from 'react';
import { FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { List } from 'react-native-paper';

const notes = [
    { id: '1', title: 'Binary Tree Notes', description: 'Introduction to binary trees and notes on terminologies used' },
    { id: '2', title: 'Doubts on Dijkstra', description: 'Explanation on when Dijkstra fails and what are the common use cases' },
    { id: '3', title: 'Insertion time complexity', description: '' },
];

export const NotesScreen = ({ navigation }: { navigation: NavigationProp<any>; }) => (
    <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <List.Item
                title={item.title}
                description={item.description}
                onPress={() => navigation.navigate('Chat')}
                left={() => <List.Icon icon="note" />} />
        )} />
);
