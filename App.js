import HomeScreen from './screens/HomeScreen';
import Component from './screens/ProfileScreen';
import FriendScreen from './screens/FriendsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './RootNavigation';
import DropDown from './DropDown';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
            <Stack.Screen 
                name = "HomeScreen"
                component = {HomeScreen}
            />
            <Stack.Screen 
                name = "Profile"
                component = {Component}
            />
            <Stack.Screen 
                name = "Friends"
                component = {FriendScreen}
            />
        </Stack.Navigator>
        <DropDown />
    </NavigationContainer>
  );
}

