import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, child, get, push } from 'firebase/database';
import { getAuth} from 'firebase/auth';
import {getUserByID, updateUser} from '../firebaseConfig';
import { getActiveUser } from './LoginScreen';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet,Text,ScrollView,View,TextInput,Button, Alert, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Platform} from 'react-native';
import * as RootNavigation from '../RootNavigation';
import User from '../user';


export default function EditProfile(){
    const [displayName, setDisplayName] = useState('');
    const [interests, setInterests] = useState([]);

    const editUser = async () => {
        let thisUser = await getActiveUser();
        thisUser.displayName = displayName;
        thisUser.interests = interests;
        updateUser(thisUser);
        navigation.push('Profile');
    }

    const displayNameSaved = getActiveUser().displayName;
    const numberOfFriends = getActiveUser().friendIDs.length-1;

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.topSection}>
                        <View style={styles.imageContainer}>
                            <View style={styles.avatarContainer}>
                                <Image style={{height:60, width: 60, borderRadius:60, borderWidth:2, borderColor: 'grey'}} source={require('./images/standardpfp.png')}/>
                            </View>
                            <View style={styles.profileNameContainer}>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>
                                    {displayNameSaved}
                                </Text>
                            </View>
                            <View style={styles.friendsCounterContainer}>
                                <Text style={{fontSize:15}}>
                                    Friends:
                                </Text>
                                <Text style={{fontSize:15, left: 25}}>
                                    {numberOfFriends}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.EditSection}>
                        <View style={styles.editSection}>
                            <Text style = {styles.editHeader}>Edit Display Name</Text>
                        
                            <TextInput 
                                clearButtonMode='always'
                                style ={styles.input} 
                                placeholder = 'ex. steve111'
                                placeholderTextColor= 'gray' 
                                onChangeText={(val) => setDisplayName(val)}
                            />
                        </View>

                        <View style={styles.editSection}>
                            <Text style = {styles.editHeader}>Edit Your Interests</Text>
                            <Text style = {{fontSize: 17, color: 'white'}}>(Max 3 Interests)</Text>
                        
                            <TextInput 
                                style ={styles.input} 
                                multiline
                                placeholder = {'ex. Fishing\nex. Archery'}
                                placeholderTextColor= 'gray' 
                                onChangeText={(val) => setInterests(val.split(/\r?\n/))}
                            />
                        </View>
                        
                        <TouchableOpacity onPress={()=>{editUser()}}>
                            <View style= {{width: '100%', backgroundColor: 'white', borderRadius: 5, padding: '2%', marginHorizontal: '38%', marginTop: '3%'}}>
                                <Text>
                                    Submit
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#3A3B50',
    },
    input:{
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#EAEAEA',
        padding: '2%',
        marginLeft: 10,
        backgroundColor: '#EAEAEA',
        marginVertical: '2%'
    },
    text:{
    },
    imageContainer:{
        width: '100%',
        height: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    topSection:{
        width : '85%',
        marginLeft: '7.5%',
        marginVertical : '5%',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
        borderRadius: 20,
        flex: 2,
    },
    avatarBorderContainer:{
    },
    avatarContainer:{
    },
    profileNameContainer:{
    },
    userNameContainer:{
    },
    friendsCounterContainer:{
    },
    EditSection : {
        flex: 7,
        alignItems: 'flex-start',
        paddingLeft: '5%'
    },
    editHeader:{
        color: 'white',
        fontSize: 25
    },
    editSection:{
        paddingLeft: '5%',
        marginVertical: 2
    }
})