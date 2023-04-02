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
import NoChatScreen from './screens/NoChatScreen';
import UIHandler from './screens/UIHandler';
import { useState, View } from 'react';

const Stack = createNativeStackNavigator();

export const screens = {
    Login : LoginScreen,
    Startup : LogOutScreen,
    NoChatScreen : NoChatScreen,
    HomeScreen : HomeScreen,
    Profile : Profile,
    EditProfile : EditProfile,
    Friends : FriendScreen,
    AddFriends : AddFriendsScreen
}

export default function App() {
    const [currentScreen, setCurrentScreen] = useState('Login')
    let Screen = screens[currentScreen]

  return(
    <View>
        <UIHandler currentScreen={currentScreen} setCurrentScreen={setCurrentScreen}>
            <Screen/>
        </UIHandler>
    </View>
  );
}

