import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/components/Home';
import Details from './screens/components/Details';
import Person from './screens/components/Person';
import Search from './screens/components/Search';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Movie" component={Details} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="Person" component={Person} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
