import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,TextInput,Button,Image} from 'react-native';
import * as RootNavigation from '../RootNavigation';
import User from '../user';
import {createUser} from '../firebaseConfig';
import {getUserByID, updateUser, getUserByPhoneNumber} from '../firebaseConfig.js';

export default function EditProfile(){
    const [phoneNum, setPhoneNum] = useState('');
    const [userName, setUserName] = useState('');
    const [interests, setInterests] = useState([]);

    buttonClick = () => {
        let thisUser = new User(userName, 0, null,phoneNum, interests, null)
        createUser(thisUser);
        RootNavigation.navigate("ProfileScreen");
    }
    let user = getUserByID('testuser')
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
                        {user.displayName}
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
                    <Text style = {styles.text}>Edit Phone Number:</Text>
                </View>
                <TextInput 
                    clearButtonMode='always'
                    style ={styles.input} 
                    placeholder = 'ex. 8037779311'
                    placeholderTextColor= 'gray' 
                    onChangeText={(val) => setPhoneNum(val)}
                    keyboardType = 'number-pad'/>
                <View style={styles.text}>
                    <Text style = {styles.text}>Change your username:</Text>
                </View>
                <TextInput 
                    clearButtonMode='always'
                    style ={styles.input} 
                    placeholder = 'ex. steve1999'
                    placeholderTextColor= 'gray' 
                    onChangeText={(val) => setUserName(val)}/>
                <View style={styles.text}>
                    <Text style = {styles.text}>Edit your Interests:</Text>
                </View>
                <TextInput 
                    style ={styles.input} 
                    multiline
                    placeholder = {'ex. Fishing\nex. Archery'}
                    placeholderTextColor= 'gray' 
                    onChangeText={(val) => setInterests(val.split(/\r?\n/))}/>
                <View style={styles.text}>
                    <Text style = {styles.text}>Change your Profile Picture:</Text>
                </View>
                <TextInput 
                    style ={styles.input} 
                    multiline
                    placeholder = {'ex. imgur'}
                    placeholderTextColor= 'gray' 
                    onChangeText={(val) => setInterests(val.split(/\r?\n/))}/>
                <Button style ={styles.buttonStyle}
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
    buttonStyle:{
        padding: 8
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
        marginVertical: 20,
        top: 15
    },
    text:{
        alignItems:'center',
        justifyCOntent:'center',
        color: 'white',
        margin: 5,
        top: 20
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
        alignSelf: 'center'
    }
})