import HomeScreen from './screens/HomeScreen';
import Profile from './screens/ProfileScreen';
import FriendScreen from './screens/FriendsScreen';
import AddFriendsScreen from './screens/AddFriendsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './RootNavigation';
import LogOutScreen from './screens/Logout';
import LoginScreen from './screens/LoginScreen';
import EditProfile from './screens/EditProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
            <Stack.Screen 
                name = "Login"
                component = {LoginScreen}
            />
            <Stack.Screen 
                name = "Startup"
                component = {LogOutScreen}
            />
            <Stack.Screen 
                name = "HomeScreen"
                component = {HomeScreen}
                options = {{headerBackVisible: false}}
            />
            <Stack.Screen 
                name = "Profile"
                component = {Profile}
            />
            <Stack.Screen 
                name = "EditProfile"
                component = {EditProfile}
            />
            <Stack.Screen 
                name = "Friends"
                component = {FriendScreen}
            />
            <Stack.Screen 
                name = "AddFriends"
                component = {AddFriendsScreen}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

