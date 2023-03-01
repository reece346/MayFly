import { View , Image, Text, StyleSheet, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from "react-native"
import React, {useEffect, useState} from "react"
import * as RootNavigation from '../RootNavigation';
import { getUserByPhoneNumber , updateUser} from "../firebaseConfig";
import User from "../user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from "@firebase/util";

let userTest = {};

export function getActiveUser(){
    return userTest;
}

export function updateActiveUser(val){
    userTest = val;
}


export default function LoginScreen(){

    //save user so we don't have to log in every time
    const saveUser = async(user) => {
        try {
            const jsonValue = JSON.stringify(user)
            await AsyncStorage.setItem('@userData', jsonValue)
            console.log('user saved to disk as: ', user)
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
    login = async () => {
        if (phoneNum == ""){
            return Alert.alert("Input required");
        }
        
        //TODO: the promise rejection if you are not an existing user is never handled
        userTest = await getUserByPhoneNumber(phoneNum);
        if(userTest.phoneNumber == phoneNum){
            saveUser(userTest)
            RootNavigation.navigate("HomeScreen");
        }
        else{
            return Alert.alert("You are not an existing user!");
        }
    return;    
    }
    //function for second button being clicked
    createAccount = () => {
        RootNavigation.navigate("Startup");
    return;    
    }

    //if there is a user on the disk already send us to the homescreen
    useEffect(() => {
        (async () => {
            console.log('checking for current user')
            let user = await getCurrentUser();
            if(user) {
                console.log('there is an existing user')
                updateActiveUser(user)
                RootNavigation.navigate('HomeScreen');
                console.log('user is: ', user)
            } else {
                console.log('something aint right')
                return;
            }
        })
    }, [])

    //TODO: replace beer image with mayfly logo
    return( 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} 
                          accessible={false}>
        <View style = {styles.container}>
            <Image style = {styles.logo} source={require('./images/beer.png')}/> 
            <Text style ={styles.title}>Existing User?</Text>
            <TextInput style = {styles.input}
            clearButtonMode='always'
            placeholder = 'ex. 8037779311'
            placeholderTextColor= 'gray' 
            onChangeText={(val) => setPhoneNum(val)}
            keyboardType = 'number-pad'
            maxLength={11}
            />
            <TouchableOpacity style = {styles.button}
                onPress={() => {login()}}>
                <Text style = {styles.buttonText}>Go</Text>
            </TouchableOpacity>
            <Text style ={styles.title}>Haven't created an account?</Text>
            <TouchableOpacity style = {styles.button}
                onPress={() => {createAccount()}}>
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