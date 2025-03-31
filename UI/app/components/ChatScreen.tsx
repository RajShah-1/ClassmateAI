import React, { useState, useRef, useEffect } from 'react';
import { Alert, View, FlatList, KeyboardAvoidingView, Platform, TextInput as RNTextInput } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { IconButton } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { chatStyles, chatMarkdownStyles, markdownStyles } from '../utils/styles';
import { fetchChatId, sendMessage, saveNote, createNewChat, deleteChat } from '../utils/chatio'; // added createNewChat
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
      const res = await fetchChatId(lectureId);

      if (res.chatId) {
        setChatId(res.chatId);
        setMessages(res.messages);
      } else {
        Alert.alert('Error', 'Could not fetch chat ID.');
      }
    };

    fetchAndSetChatId();
  }, [lectureId]);

  // Set header right button for resetting the chat
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon="reload" onPress={handleResetChat} />
      ),
    });
  }, [navigation, lectureId]);

  const handleResetChat = async () => {
    console.log(chatId)
    if (chatId) {
      await deleteChat(chatId);
    }

    const newChatId = await createNewChat(lectureId);
    if (newChatId) {
      setChatId(newChatId);
      setMessages([]);
    } else {
      Alert.alert('Error', 'Could not reset chat.');
    }
  };

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
    // Wait for AI to respond
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
        <IconButton
          style={{ width: 64, height: 50, backgroundColor: '#007AFF' }}
          icon="note-plus"
          iconColor="white"
          onPress={() => handleAddToNotes(message, message.id)}
          disabled={isAIResponding}
        />
      </Animated.View>
    );
  };

  const combineStyles = (styles: any[]) => {
    return styles.reduce((acc, style) => {
      return { ...acc, ...style };
    }
    , {});
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
        <Markdown style={combineStyles([
          markdownStyles,
          item.isUser ? chatMarkdownStyles.user : chatMarkdownStyles.ai
        ])}>
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
