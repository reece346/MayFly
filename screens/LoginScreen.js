import { View , Image, Text, StyleSheet, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from "react-native"
import React, {useEffect, useState} from "react"
import * as RootNavigation from '../RootNavigation';
import { getUserByPhoneNumber , getUserByUsername, updateUser} from "../firebaseConfig";
import User from "../user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from "@firebase/util";
import { updateCurrentUser } from "firebase/auth";
import { Platform } from "react-native";

let userTest = {};

export async function getActiveUser(){
    return userTest;
}

export function updateActiveUser(user){
    userTest = user;
}

export default function LoginScreen({navigation}){

    //save user so we don't have to log in every time
    const saveUser = async(user) => {
        try {
            const jsonValue = JSON.stringify(user)
            await AsyncStorage.setItem('@userData', jsonValue)
            console.log('user saved to disk as: ', jsonValue)
        } catch(e) {
            console.log('error saving user: ', e)
        }
    }

    //return currently saved user
    const getCurrentUser = async () => {
        try{
            const jsonValue = await AsyncStorage.getItem('@userData')
            if(!jsonValue) {
                console.log('getCurrentUser: no user stored on disk')
            }
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log('error reading user from disk: ', e)
        }
    }

    //phone number variable
    const [phoneNum, setPhoneNum] = useState('');
    //function for first button being clicked
    const login = async () => {
        if (phoneNum == ""){
            return Alert.alert("Input required");
        }
        //TODO: the promise rejection if you are not an existing user is never handled
        userTest = await getUserByPhoneNumber(phoneNum);
        console.log("User exists: " + userTest);
        if(userTest.phoneNumber == phoneNum){
            saveUser(userTest)
            if(userTest.isBanned){
                return Alert.alert("You have been banned from MayFly");
            }
            console.log("Users current chat id: " + userTest.currentChatID)
            if(userTest.currentChatID != "") {
                navigation.replace("Home Screen");
            } else {
                navigation.replace("No Chat Screen");
            }
            
        }
        else{
            return Alert.alert("You are not an existing user!");
        }
    return;    
    }

    //if there is a user on the disk updateActiveUser
    useEffect(() => {
        async function updateUser(phoneNumber) {
            let updatedUser = await getUserByPhoneNumber(phoneNumber);
            console.log('updatedUser is: ', updatedUser)
            console.log('phoneNumber is: ', phoneNumber)
            await saveUser(updatedUser).then(updateActiveUser(updatedUser))
            updatedUser.currentChatID ? navigation.replace('Home Screen') : navigation.replace('No Chat Screen')
        }

        getCurrentUser().then(
            user => {
                if(user.isBanned){
                    return
                }
                if(user.phoneNumber){
                    updateUser(user.phoneNumber)
                }
            }
        )
    }, [])


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
                            accessible={false}>
            <View style = {styles.container}>
                <Image style = {styles.logo} source={require('./images/icon.png')}/> 
                <Text style ={styles.title}>Existing User?</Text>
                <TextInput style = {styles.input}
                clearButtonMode='always'
                placeholder = 'ex. 8037779311'
                placeholderTextColor= 'gray' 
                onChangeText={(val) => setPhoneNum(val)}
                keyboardType = {Platform.OS === 'ios' ? "number-pad" : "numeric"}
                maxLength={10}
                />
                <TouchableOpacity style = {styles.button}
                    onPress={() => {login()}}
                    testID="loginGoButton">
                    <Text style = {styles.buttonText}>Go</Text>
                </TouchableOpacity>
                <Text style ={styles.title}>Haven't created an account?</Text>
                <TouchableOpacity style = {styles.button}
                    onPress={() => {navigation.push('Startup')}}>
                    <Text style = {styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )

    
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#5D5F82',
        padding: 5,
        marginTop: 8,
        borderRadius:5
    },
    buttonText:{
        fontSize: 20,
        color: "white"
    },
    title: {
        color: "white",
        padding: 5,
        fontSize: 20
    },
    logo:{
        height: "30%",
        width: "50%",
        marginTop: 100,
    },
    container: {
        flex: 1,
        backgroundColor: '#3A3B50',
        alignItems: "center"
      },
    input:{
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        marginBottom:8,
        marginTop: 1,
        width: 200,
        color: 'white',
    }
})