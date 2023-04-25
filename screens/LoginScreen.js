import { View , Image, Text, StyleSheet, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, Modal} from "react-native"
import React, {useEffect, useState} from "react"
import * as RootNavigation from '../RootNavigation';
import { app, getUserByPhoneNumber , getUserByUsername, updateUser, sendCode2FA, confirm2FA } from "../firebaseConfig";
import User from "../user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from "@firebase/util";
import { Platform } from "react-native";
import {FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';

let userTest = {};

export function getActiveUser(){
    return userTest;
}

export function updateActiveUser(user){
    userTest = user;
}

export default function LoginScreen(){

     const recaptchaVerifier = React.useRef(null);
     const firebaseConfig = app ? app.options : undefined;
     const attemptInvisibleVerification = true;
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
        } // TODO remove comment block

        //TODO: the promise rejection if you are not an existing user is never handled
        userTest = await getUserByPhoneNumber(phoneNum);
        if(userTest.phoneNumber == phoneNum){
            saveUser(userTest)
            if(userTest.currentChatID != "") {
                RootNavigation.navigate("Home Screen");
            } else {
                RootNavigation.navigate("No Chat Screen");
            }
            
        }
        else{
            return Alert.alert("You are not an existing user!");
        }
    return;    
    }


    // 2FA Code Input
    const [codeVisible, setCodeVisible] = useState(false);
    const [codeNum, setCodeNum] = useState('');
    const send2FA = async () => {
	if (phoneNum == "") {
		return Alert.alert("Input required");
	}
	const sendCodeSuccess = await sendCode2FA("+1" + phoneNum, recaptchaVerifier.current);
	if (sendCodeSuccess)
	    setCodeVisible(true);
	else
	    return Alert.alert("Invalid!");
    }
    const input2FACode = async (code) => {
	if (code == "") {
		return Alert.alert("Input required");
	}
	const codeSuccess = await confirm2FA(code);
	if (codeSuccess)
	    login();
	else
	    return Alert.alert("Invalid code!");
    }
			
    const logOutCurrentUser = async () => {
        try {
            await AsyncStorage.removeItem('@userData');
            updateActiveUser({})
        }
        catch(e) {
            return false
        }
    }

    const handleLogout = () => {
        logOutCurrentUser();
        goToScreen("Login")
    }

    const handleGo = () => {
        if (userTest.currentChatID != "") {
            goToScreen('Home Screen')
        }
        else {
            goToScreen('No Chat Screen')
        }
    }

    //function for second button being clicked
    const goToScreen = (screen) => {
        RootNavigation.navigate(screen);
    return;    
    }

    //if there is a user on the disk updateActiveUser
    useEffect(() => {
        async function updateUser(phoneNumber) {
            let updatedUser = await getUserByPhoneNumber(phoneNumber);
            console.log('updatedUser is: ', updatedUser)
            console.log('phoneNumber is: ', phoneNumber)
            await saveUser(updatedUser).then(updateActiveUser(updatedUser))
            updatedUser.currentChatID ? goToScreen('Home Screen') : goToScreen('No Chat Screen')
        }

        getCurrentUser().then(
            user => {
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
	        <Modal
	    	    animationType="fade"
	    	    transparent={true}
	    	    visible={codeVisible}
	    	    onRequestClose={() => {
		        setCodeVisible(!codeVisible);
		    }}>
				<View style={styles.codeViewOutside}>
					<View style={styles.codeView}>
						<Text>Type Code Below</Text>
	    					<TextInput style = {styles.input}
	    					    clearButtonMode='always'
	    					    placeholder= 'ex. 123456'
	    					    placeholderTextColor= 'gray'
	    					    onChangeText={(code) => setCodeNum(code)}
	    					    keyboardType = {Platform.OS === 'ios' ? 
						        "number-pad" : "numeric"}
	    					    maxLength={10}
	    					/>
	    					<TouchableOpacity style={styles.button}
							onPress={() => {input2FACode(codeNum)}}>
	    						<Text style={styles.buttonText}>Go</Text>
	    					</TouchableOpacity>
					</View>
				</View>
	        </Modal>
	    	<FirebaseRecaptchaVerifierModal 
	    		ref={recaptchaVerifier}
	    		firebaseConfig={firebaseConfig}
	    		attemptInvisibleVerification={attemptInvisibleVerification}
	    	/>
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
                    onPress={() => {send2FA()}}>
                    <Text style = {styles.buttonText}>Go</Text>
                </TouchableOpacity>
                <Text style ={styles.title}>Haven't created an account?</Text>
                <TouchableOpacity style = {styles.button}
                    onPress={() => {goToScreen('Startup')}}>
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
    codeViewOutside:{
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: 55,
	backgroundColor: '#3A3B5080',
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
    },
    codeView:{
	margin: 20,
	backgroundColor: 'white',
	borderRadius: 20,
	padding: 35,
	alignItems: 'center',
	shadowColor: '#000',
	shadowOffset: {
	    width: 0,
	    height: 2,
	},
	shadowOpacity: 0.25,
	shadowRadius: 4,
	elevation: 5,
    }
})
