import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet,Text,ScrollView,View,TextInput,Button, Alert, TouchableOpacity} from 'react-native';
import * as RootNavigation from '../RootNavigation';
import User from '../user';
import {createUser} from '../firebaseConfig';
import { Platform } from 'react-native';

export default function LogOutScreen(){
    const [phoneNum, setPhoneNum] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [userName, setUserName] = useState('');
    const [interests, setInterests] = useState([]);

    submitNewUser = () => {
        if(userName!= "" && phoneNum!= "" && interests != ""){
            let thisUser = new User(displayName, 0, null, userName, phoneNum, "", interests, null)
            createUser(thisUser);
            RootNavigation.navigate("Login");
        }
	    else{
            return Alert.alert("Invalid input. Make sure all the fields are filled out.");
        }
        return;
    }
    
    return (
        <View  style={styles.container}>
            <ScrollView keyboardShouldPersistTaps = 'handled'>
                <View style={{top:10}}>
                    <Text style = {styles.text}>Let's Start With Your Phone Number</Text>
                    <TextInput 
                        clearButtonMode='always'
                        style ={styles.input} 
                        placeholder = 'ex. 8037779311'
                        placeholderTextColor= 'gray' 
                        onChangeText={(val) => setPhoneNum(val)}
                        keyboardType = {Platform.OS === 'ios' ? "number-pad" : "numeric"}
                        maxLength={10}/>

                    <Text style = {styles.text}>Enter Full Name</Text>
                    <TextInput 
                        clearButtonMode='always'
                        style ={styles.input} 
                        placeholder = 'ex. Steve Smith'
                        placeholderTextColor= 'gray' 
                        onChangeText={(val) => setDisplayName(val)}/>

                    <Text style = {styles.text}>Enter Username</Text>
                    <TextInput 
                        clearButtonMode='always'
                        style ={styles.input} 
                        placeholder = 'ex. steve111'
                        placeholderTextColor= 'gray' 
                        onChangeText={(val) => setUserName(val)}/>

                    <Text style = {styles.text}>What Are Your Interests?</Text>
                    <Text style = {styles.subtext}>(Separate Them by Clicking 'return')</Text>
                    <TextInput 
                        style ={styles.input} 
                        multiline
                        placeholder = {'ex. Fishing\nex. Archery'}
                        placeholderTextColor= 'gray' 
                        onChangeText={(val) => setInterests(val.split(/\r?\n/))}/>

                    <Text style = {styles.text}>Paste the Link to Your Profile Picture</Text>
                    <TextInput 
                        style ={styles.input} 
                        multiline
                        placeholder = {'ex. imgur'}
                        placeholderTextColor= 'gray' />

                    <View>
                        <TouchableOpacity style ={styles.buttonStyle}
                            title='Submit'
                            testID='submitButton'
                            color = 'white'
                            onPress={() => {submitNewUser()}}
                        >
                            <Text style={{color: 'white'}}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#3A3B50',
        alignItems:'center',
        justifyCOntent:'center',
    },
    buttonStyle:{
        width: '40%',
        backgroundColor : '#5D5F82',
        alignItems: 'center',
        alignSelf : 'center',
        margin: 10,
        padding: 8
    },
    input:{
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
        color: 'white',
    },
    text:{
        color: 'white',
        alignSelf: 'center',
        margin: 5,
    },
    subtext : {
        color: 'white',
        alignSelf: 'center',
        margin: 0,
        fontSize: 12
    }
})
