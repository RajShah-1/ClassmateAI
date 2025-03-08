import { Provider as PaperProvider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { LectureDetailsScreen } from "./components/LectureDetails";
// import { LectureDetailsScreen } from "./components/Dummy";
import { NotesScreen } from './components/NotesScreen';
import { CourseScreen } from './components/CourseScreen';
import { LecturesScreen } from './components/LecturesScreen';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <PaperProvider>
      <Stack.Navigator>
        <Stack.Screen name="Courses" component={CourseScreen} />
        <Stack.Screen name="Lectures" component={LecturesScreen} />
        <Stack.Screen name="LectureDetails" component={LectureDetailsScreen} />
        {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}
      </Stack.Navigator>
    </PaperProvider>
  );
}