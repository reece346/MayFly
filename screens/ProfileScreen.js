import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {Image,StyleSheet,Text,View,TouchableOpacity, FlatList,Button, Linking} from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import tempData from './tempData';
import Interests from './Interests';
import User from '../user.js';
import {getUserByID, updateUser, getUserByPhoneNumber, createUser} from '../firebaseConfig.js';
import * as RootNavigation from '../RootNavigation';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, child, get, push } from 'firebase/database';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { useState } from 'react';
import { useRoute } from "@react-navigation/native";
const Component = () => {

const [displayName, setDisplayName] = useState('');

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyBc4K_VsAO60P-Gmqg8x9B9e2oJ4R-ECdQ',
    authDomain: 'odyssey-490.firebaseapp.com',
    databaseURL: 'https://odyssey-490-default-rtdb.firebaseio.com/',
    projectId: 'odyssey-490',
    storageBucket: 'odyssey-490.appspot.com',
    messagingSenderId: '747613227593',
    appId: '1:747613227593:web:5ea3e82de1cdc0470b8d98'
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);  
const auth = getAuth(app);

const userRef = ref(database, 'users/testuser')

useEffect(()=> {
    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setDisplayName(data.displayName);
    })
},[])

    const route = useRoute();
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => {RootNavigation.navigate("EditProfile")}}>
                    <Image style={{height:20, width:20, color: 'black', left: 315, top: 10}} source={require('./images/editProfileIcon.png')}/>
                </TouchableOpacity>
                <View style={styles.avatarBorderContainer}>
                    <Image style={{height:'100%', width:'100%', borderRadius:70, color: 'black'}} source={require('./images/blackCircleBorder.jpg')}/>
                </View>
                <View style={styles.avatarContainer}>
                    <Image style={{height:'100%', width:'100%', borderRadius:60}} source={require('./images/persona.png')}/>
                </View>
                <View style={styles.profileNameContainer}>
                   <Text style={{fontSize:20,lineheight:50,fontWeight:'bold'}}>
                        {displayName}
                    </Text>
                </View>
                <View style={styles.userNameContainer}>
                   <Text style={{fontSize:16,lineheight:50}}>
                        chadt12345
                    </Text>
                </View>
                <View style={styles.MayFlySinceContainer}>
                   <Text style={{fontSize:15,lineheight:50}}>
                        Been a MayFly since:
                    </Text>
                    <Text style={{fontSize:15,lineheight:50, left: 25}}>
                        08/10/2022
                    </Text>
                </View>
            </View>
            <View style={styles.InterestsHeader}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                    Interests
                </Text>
            </View>
            <View style={styles.FriendsHeader}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                    Friends
                </Text>
            </View>
            <View style={styles.LinkedAccountsHeader}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                    Linked Accounts
                </Text>
            </View>
            <View style={styles.InstagramButton}>
                <Button title='Instagram' onPress={()=>{Linking.openURL('https://www.instagram.com/')}}></Button>
            </View>
            <View style={styles.TwitterButton}>
                <Button title='Twitter' onPress={()=>{Linking.openURL('https://twitter.com/ChadT12054309')}}></Button>
            </View>
            <View style={styles.YoutubeButton}>
                <Button title='Youtube' onPress={()=>{Linking.openURL('https://www.youtube.com/channel/UCZjQDA528gyGjo_LNDRE3HQ')}}></Button>
            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 3,
        backgroundColor: '#3A3B50',
    },
    imageContainer:{
        left: 30,
        top:30,
        height:150,
        width:350,
        backgroundColor:'#EAEAEA',
        borderRadius:22,
        elevation:2
    },
    avatarBorderContainer:{
        height:110,
        width:110,
        position:'absolute',
        left: 15,
        top: 20
    },
    avatarContainer:{
        height:100,
        width:100,
        position:'absolute',
        left: 20,
        top: 25
    },
    profileNameContainer:{
        position:'absolute',
        top: 30,
        left: 135,
        alignItems:'center',
        color: 'black'
    },
    userNameContainer:{
        position:'absolute',
        top: 58,
        left: 145,
        alignItems:'center',
    },
    MayFlySinceContainer:{
        position:'absolute',
        top: 85,
        left: 138,
        alignItems:'center',
    },
    InterestsHeader:{
        top: 50,
        left: 30
    },
    FriendsHeader:{
        top: 200,
        left: 30
    },
    LinkedAccountsHeader:{
        top: 375,
        left: 30
    },
    InstagramButton:{
        position:'absolute',
        alignItems:'left',
        top: 630,
        left: 30
    },
    TwitterButton:{
        position:'absolute',
        alignItems:'left',
        top: 630,
        left: 173

    },
    YoutubeButton:{
        position:'absolute',
        alignItems:'left',
        top: 630,
        left: 300
    }
})

export default Component;