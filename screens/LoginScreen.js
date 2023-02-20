import { View , Image, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert} from "react-native"
import React, {useState} from "react"
import { createUser } from "../firebaseConfig";
import * as RootNavigation from '../RootNavigation';

export default function LoginScreen(){
    const [phoneNum, setPhoneNum] = useState('');
    const USER = 8038675309;
    
    buttonClick = () => {
        if (phoneNum != USER){
            return Alert.alert("You are not an existing user!")
        }
        else{
            //login as a user in the database
            RootNavigation.navigate("HomeScreen");
        }
    return;    
    }
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
            <Button style = {styles.button}
                title='Go'
                color = 'white'
                onPress={() => {buttonClick()}}>

            </Button>
        </View>
    </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    button:{
        padding: 8,
        backgroundColor: "gray",
    },
    title: {
        color: "white"
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
        //justifyContent: "center"
        //paddingHorizontal: 10,
        //paddingBottom: 10,
      },
    input:{
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
        color: 'white',
    }
})