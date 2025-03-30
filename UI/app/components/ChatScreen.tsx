import React, { useState, useRef, useEffect } from 'react';
import { Alert, View, FlatList, KeyboardAvoidingView, Platform, TextInput as RNTextInput } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { IconButton } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { chatStyles, chatMarkdownStyles } from '../utils/styles';
import { fetchChatId, sendMessage, saveNote } from '../utils/chatio'; // Importing functions from chatio.tsx
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';


type ChatScreenRouterProp = RouteProp<{ ChatContext: { lectureId: string } }, 'ChatContext'>;

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export const ChatScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const route = useRoute<ChatScreenRouterProp>();
  const { lectureId } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const [isAIResponding, setIsAIResponding] = useState<boolean>(false);
  const swipeableRefs = useRef<{ [key: string]: any }>({});

  // Fetch chatId on component mount
  useEffect(() => {
    const fetchAndSetChatId = async () => {
      const fetchedChatId = await fetchChatId(lectureId);
      if (fetchedChatId) {
        setChatId(fetchedChatId);
      } else {
        Alert.alert('Error', 'Could not fetch chat ID.');
      }
    };

    fetchAndSetChatId();
  }, [lectureId]);

  const handleSend = async () => {
    if (!input.trim() || !chatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    setIsAIResponding(true);
    // Block until AI responds
    const aiMessage = await sendMessage(chatId, input); 
    if (aiMessage) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: aiMessage,
          isUser: false,
        },
      ]);
    }
    setIsAIResponding(false);
  };

  const handleAddToNotes = async (message: Message, id: string) => {
    const success = await saveNote(lectureId, message.text);
    if (success) {
      Alert.alert('Saved', 'Message added to notes.');
      swipeableRefs.current[id]?.close();
    } else {
      Alert.alert('Error', 'Could not save note.');
    }
  };

  const renderRightActions = (progress: any, dragX: any, swipeable: any, message: Message) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: dragX.value + 75 }],
      };
    });

    return (
      <Animated.View style={styleAnimation}>
        <IconButton style={{ width: 64, height: 50, backgroundColor: '#007AFF', }} icon="note-plus" iconColor="white" onPress={() => handleAddToNotes(message, message.id)} />
      </Animated.View>
    );
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <Swipeable
      ref={(ref) => (swipeableRefs.current[item.id] = ref)}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      overshootRight={false}
      renderRightActions={(progress, dragX, swipeable) => renderRightActions(progress, dragX, swipeable, item)}
    >
      <View style={item.isUser ? chatStyles.chatBubbleUser : chatStyles.chatBubbleAI}>
        <Markdown style={item.isUser ? chatMarkdownStyles.user : chatMarkdownStyles.ai}>
          {item.text}
        </Markdown>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={chatStyles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={chatStyles.messagesList}
        />
        <View style={chatStyles.inputRow}>
          <RNTextInput
            placeholder="Type your message..."
            value={input}
            onChangeText={setInput}
            style={chatStyles.textInput}
            editable={!isAIResponding}
          />
          <IconButton icon="send" onPress={handleSend} disabled={isAIResponding} />
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default ChatScreen;
