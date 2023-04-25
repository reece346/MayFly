import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet,Text,ScrollView,View,TextInput,Button, Alert, TouchableOpacity, Modal} from 'react-native';
import * as RootNavigation from '../RootNavigation';
import User from '../user';
import {createUser, getUserByUsername, app} from '../firebaseConfig';
import { Platform } from 'react-native';
import { getUserByPhoneNumber } from '../firebaseConfig';
import {FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';

export default function LogOutScreen(){
    const [phoneNum, setPhoneNum] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [userName, setUserName] = useState('');
    const [interests, setInterests] = useState([]); 

    // async function checkUsername(userName) {
    //     const user =  await getUserByUsername(userName);
    //     const nameOfUser = user.userName;
    //     console.log(nameOfUser);
    //     return nameOfUser;
    // }

    // async function checkPhoneNumber(phoneNum) {
    //     const user =  await getUserByPhoneNumber(phoneNum);
    //     const phoneOfUser = user.phoneNum;
    //     console.log(user.phoneNum);
    //     return phoneOfUser;
    // }

    async function isUserExists (phoneNum, userName) {
        let phoneNumUsed = await getUserByPhoneNumber(phoneNum)
        let userNameUsed = await getUserByUsername(userName)
        return userNameUsed || phoneNumUsed
    }
    const recaptchaVerifier = React.useRef(null);
    const firebaseConfig = app ? app.options : undefined;
    const attemptInvisibleVerification = true;

    submitNewUser = () => {
        if(userName!= "" && phoneNum!= ""){
            // console.log("Username check: " + checkUsername(userName));
            // console.log("Number check: " + checkPhoneNumber(phoneNum));
            if(isUserExists(phoneNum, userName) == phoneNum || isUserExists(phoneNum, userName) == userName) {
                return Alert.alert("Username or Phone Number already in the Database. Please Try Again");
            } else {
                let thisUser = new User(displayName, 0, null, userName, phoneNum, "", interests, null)
                createUser(thisUser);
                RootNavigation.navigate("Login");
            }
        } else {
            return Alert.alert("Invalid input. Make sure all the fields are filled out.");
        }
        return;
    }
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
	    submitNewUser();
	else
	    return Alert.alert("Invalid code!");
    }

    return (
        <View  style={styles.container}>
	    <FirebaseRecaptchaVerifierModal 
	    		ref={recaptchaVerifier}
	    		firebaseConfig={firebaseConfig}
	    		attemptInvisibleVerification={attemptInvisibleVerification}
	    	/>
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

            <KeyboardAvoidingView {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})} style={{flex: 5}}>
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
                            onChangeText={(val) => setDisplayName(val)}
                            maxLength={15}/>

                        <Text style = {styles.text}>Enter Username</Text>
                        <TextInput 
                            clearButtonMode='always'
                            style ={styles.input} 
                            placeholder = 'ex. steve111'
                            placeholderTextColor= 'gray' 
                            onChangeText={(val) => setUserName(val)}
                            maxLength={15}/>

                        <Text style = {styles.text}>What Are Your Interests?</Text>
                        <Text style = {styles.subtext}>(Separate Them by Clicking 'return')</Text>
                        <TextInput 
                            style ={styles.input} 
                            multiline
                            placeholder = {'ex. Fishing\nex. Archery'}
                            placeholderTextColor= 'gray' 
                            onChangeText={(val) => setInterests(val.split(/\r?\n/))}/>



                        <View>
                            <TouchableOpacity style ={styles.buttonStyle}
                                title='Submit'
                                testID='submitButton'
                                color = 'white'
                                onPress={() => {send2FA()}}
                            >
                                <Text style={{color: 'white'}}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
