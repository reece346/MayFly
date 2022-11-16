import HomeScreen from './screens/HomeScreen';
import Component from './screens/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
                name = "HomeScreen"
                component = {HomeScreen}
            />
            <Stack.Screen 
                name = "Profile"
                component = {Component}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

