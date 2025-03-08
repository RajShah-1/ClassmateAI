import React from 'react';
import { View } from 'react-native';
import {
  Button,
  TextInput,
} from 'react-native-paper';


export const ChatScreen = () => (
    <View style={{ flex: 1, padding: 10 }}>
        <TextInput label="Ask a question..." mode="outlined" />
        <Button mode="contained" style={{ marginTop: 10 }}>Send</Button>
    </View>
);
