import React, { useState } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform, TextInput as RNTextInput } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { IconButton } from 'react-native-paper';
import { chatStyles, chatMarkdownStyles } from '../utils/styles';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const MESSAGES: Message[] = [
  {
    id: '1',
    text: `**BST vs. AVL Trees – When to Choose What?**\n• **BST**: Faster for frequent insertions/deletions but can become unbalanced (O(n) search in the worst case).\n• **AVL Tree**: Always balanced, ensuring O(log n) search time but with higher update costs.\n• Use **BST** for dynamic, frequently changing data where occasional imbalance is acceptable.\n• Use **AVL** when fast and consistent search performance is a priority.`,
    isUser: false,
  },
  {
    id: '2',
    text: '*What if I need both fast insertions and guaranteed balance?*',
    isUser: true,
  },
  {
    id: '3',
    text: `Consider using a **Red-Black Tree**, which provides a balance between BST and AVL by ensuring approximate balancing while keeping insertion and deletion operations efficient.`,
    isUser: false,
  },
];

export const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };
    setMessages((prev) => [newMessage, ...prev]);
    setInput('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={item.isUser ? chatStyles.chatBubbleUser : chatStyles.chatBubbleAI}>
      <Markdown style={item.isUser ? chatMarkdownStyles.user : chatMarkdownStyles.ai}>
        {item.text}
      </Markdown>
    </View>
  );

  return (
    <KeyboardAvoidingView style={chatStyles.chatContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={chatStyles.messagesList}
        inverted
      />
      <View style={chatStyles.inputRow}>
        <RNTextInput
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          style={chatStyles.textInput}
        />
        <IconButton icon="send" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
};
