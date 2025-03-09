import { Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { LectureDetailsScreen } from "./components/LectureDetails";
import { CourseScreen } from './components/CourseScreen';
import { LecturesScreen } from './components/LecturesScreen';
import { NoteViewScreen } from './components/NoteViewScreen';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <PaperProvider>
      <Stack.Navigator initialRouteName="Courses">
        <Stack.Screen name="Courses" component={CourseScreen} options={{ title: 'Courses' }} />
        <Stack.Screen name="Lectures" component={LecturesScreen} options={{ title: 'Lectures' }}/>
        <Stack.Screen name="LectureDetails" component={LectureDetailsScreen} options={{ title: 'Lecture Details' }}/>
        <Stack.Screen name="NoteView" component={NoteViewScreen} options={{ title: 'Notes' }}/>
      </Stack.Navigator>
    </PaperProvider>
  );
}