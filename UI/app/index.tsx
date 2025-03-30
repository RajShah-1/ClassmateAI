import React, { useEffect, useState } from 'react';
import '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import CourseScreen from './components/CourseScreen';
import { LecturesScreen } from './components/LecturesScreen';
import { LectureDetailsScreen } from './components/LectureDetails';
import { NoteViewScreen } from './components/NoteViewScreen';
import { ChatScreen } from './components/ChatScreen';
<<<<<<< HEAD
import LoginScreen from './components/LoginScreen';
=======
>>>>>>> aaa224c (Add chat UI code with dummy data)

const Stack = createStackNavigator();

export default function Index() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <PaperProvider>
<<<<<<< HEAD
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen
                name="Courses"
                component={CourseScreen}
                options={{
                  title: 'Courses',
                  headerRight: () => (
                    <Button onPress={() => auth().signOut()} >Log out</Button>
                  ),
                }}
              />
              <Stack.Screen name="Lectures" component={LecturesScreen} options={{ title: 'Lectures' }} />
              <Stack.Screen name="LectureDetails" component={LectureDetailsScreen} options={{ title: 'Lecture Details' }} />
              <Stack.Screen name="NoteView" component={NoteViewScreen} options={{ title: 'Notes' }} />
              <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat with AI' }} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          )}
        </Stack.Navigator>
=======
      <Stack.Navigator initialRouteName="Courses">
        <Stack.Screen name="Courses" component={CourseScreen} options={{ title: 'Courses' }} />
        <Stack.Screen name="Lectures" component={LecturesScreen} options={{ title: 'Lectures' }}/>
        <Stack.Screen name="LectureDetails" component={LectureDetailsScreen} options={{ title: 'Lecture Details' }}/>
        <Stack.Screen name="NoteView" component={NoteViewScreen} options={{ title: 'Notes' }}/>
        <Stack.Screen name="Chat" component={ChatScreen} options={{title: 'Chat with AI'}} />
      </Stack.Navigator>
>>>>>>> aaa224c (Add chat UI code with dummy data)
    </PaperProvider>
  );
}
