import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,TextInput,Button,Image} from 'react-native';
import * as RootNavigation from '../RootNavigation';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, child, get, push } from 'firebase/database';
import { getAuth} from 'firebase/auth';
import {getUserByID} from '../firebaseConfig.js';

export default function EditProfile(){
    const [displayName, setDisplayName] = useState('');
    const [userName, setUserName] = useState('');
    const [interests, setInterests] = useState([]);

    buttonClick = () => {
        RootNavigation.navigate("ProfileScreen", {
            userName: userName,
        })
    }
    let user = getUserByID('testuser')

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

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
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
                        chad.thomson34
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
            <View style={styles.EditSection}>
                <View style={styles.text}>
                    <Text style = {styles.text}>Edit Display Name</Text>
                </View>
                <TextInput 
                    clearButtonMode='always'
                    style ={styles.input} 
                    placeholder = 'ex. Steve Smith'
                    placeholderTextColor= 'gray' 
                    onChangeText={(val) => setDisplayName(val)}/>
                <View style={styles.text}>
                    <Text style = {styles.text}>Edit Your Username</Text>
                </View>
                <TextInput 
                    clearButtonMode='always'
                    style ={styles.input} 
                    placeholder = 'ex. steve1999'
                    placeholderTextColor= 'gray' 
                    value = {userName}
                    onChangeText={(text) => setUserName(text)}/>
                <View style={styles.text}>
                    <Text style = {styles.text}>Edit Your Interests</Text>
                </View>
                <TextInput 
                    style ={styles.input} 
                    multiline
                    placeholder = {'ex. Fishing\nex. Archery'}
                    placeholderTextColor= 'gray' 
                    onChangeText={(val) => setInterests(val.split(/\r?\n/))}/>
                <View style={styles.text}>
                    <Text style = {styles.text}>Edit Your Profile Picture</Text>
                </View>
                <TextInput 
                    style ={styles.input} 
                    multiline
                    placeholder = {'ex. imgur'}
                    placeholderTextColor= 'gray' 
                    onChangeText={(val) => setInterests(val.split(/\r?\n/))}/>
                <Button style ={{padding: 8}}
                        title='Submit'
                        color = 'white'
                        onPress={() => {RootNavigation.navigate("Profile")}}
                ></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 3,
        backgroundColor: '#3A3B50',
    },
    input:{
        alignItems:'center',
        justifyCOntent:'center',
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
        color: 'white',
        marginVertical: 15,
        top: 15
    },
    text:{
        alignItems:'center',
        justifyCOntent:'center',
        color: 'white',
        margin: 5,
        top: 18
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
    EditSection : {
        top: 10,
        alignSelf: 'center'
    }
})