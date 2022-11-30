import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,TextInput,Button} from 'react-native';
import * as RootNavigation from '../RootNavigation';

export default function LogOutScreen(){
    const [phoneNum, setPhoneNum] = useState('');
    const [userName, setUserName] = useState('');
    const [interests, setInterests] = useState([]);

    buttonClick = () => {
        RootNavigation.navigate("HomeScreen");
        //create user here
    }
    
    return (
        <View style={styles.container}>
            <Text style = {styles.text}>Let's start with your phone number:</Text>
            <TextInput 
                clearButtonMode='always'
                style ={styles.input} 
                placeholder = 'ex. 8037779311'
                placeholderTextColor= 'gray' 
                onChangeText={(val) => setPhoneNum(val)}
                keyboardType = 'number-pad'/>
            <Text style = {styles.text}>Create a username:</Text>
            <TextInput 
                clearButtonMode='always'
                style ={styles.input} 
                placeholder = 'ex. steve1999'
                placeholderTextColor= 'gray' 
                onChangeText={(val) => setUserName(val)}/>
            <Text style = {styles.text}>What are your interests? Separate them by hitting 'Enter':</Text>
            <TextInput 
                style ={styles.input} 
                multiline
                placeholder = {'ex. Fishing\nex. Archery'}
                placeholderTextColor= 'gray' 
                onChangeText={(val) => setInterests(val.split(/\r?\n/))}/>
            <Button style ={styles.buttonStyle}
                    title='Submit'
                    color = 'white'
                    onPress={() => {buttonClick()}}
                    ></Button>
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
        padding: 8,
    },
    input:{
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
        color: 'white',
    },
    text:{
        color: 'white',
        margin: 5,
    },
})