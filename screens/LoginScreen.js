import { View , Image, Text, StyleSheet, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from "react-native"
import React, {useState} from "react"
import { createUser } from "../firebaseConfig";
import * as RootNavigation from '../RootNavigation';

export default function LoginScreen(){
    const [phoneNum, setPhoneNum] = useState('');
    const USER = 8038675309;
    //function for first button being clicked
    buttonClick = () => {
        if (phoneNum == ""){
            return Alert.alert("Input required")
        }
        else if (phoneNum != USER){
            return Alert.alert("You are not an existing user!")
        }
        else{
            //TODO: login as a user from database
            RootNavigation.navigate("HomeScreen");
        }
    return;    
    }
    //function for second button being clicked
    buttonClick2 = () => {
        RootNavigation.navigate("Startup")
    return;    
    }
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
                onPress={() => {buttonClick()}}>
                <Text style = {styles.buttonText}>Go</Text>
            </TouchableOpacity>
            <Text style ={styles.title}>Haven't created an account?</Text>
            <TouchableOpacity style = {styles.button}
                onPress={() => {buttonClick2()}}>
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