import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet,Text,ScrollView,View,TouchableOpacity,TextInput,Button} from 'react-native';
import * as RootNavigation from '../RootNavigation';
import User from '../user';
import {createUser} from '../firebaseConfig';

export default function LogOutScreen(){
    const [phoneNum, setPhoneNum] = useState('');
    const [userName, setUserName] = useState('');
    const [interests, setInterests] = useState([]);

    buttonClick = () => {
        let thisUser = new User(userName, 0, null, phoneNum, interests, null)
        createUser(thisUser);
        RootNavigation.navigate("HomeScreen");
    }
    
    return (
            <View  style={styles.container}>
                <ScrollView keyboardShouldPersistTaps = 'handled'>
                <Text style = {styles.text}>Let's start with your phone number:</Text>
                <TextInput 
                    clearButtonMode='always'
                    style ={styles.input} 
                    placeholder = 'ex. 8037779311'
                    placeholderTextColor= 'gray' 
                    onChangeText={(val) => setPhoneNum(val)}
                    keyboardType = 'number-pad'
                    maxLength={11}/>
                <Text style = {styles.text}>Enter Full Name:</Text>
                <TextInput 
                    clearButtonMode='always'
                    style ={styles.input} 
                    placeholder = 'ex. Steve Smith'
                    placeholderTextColor= 'gray' 
                    onChangeText={(val) => setUserName(val)}/>
                <Text style = {styles.text}>What are your interests? Separate them by hitting 'Enter':</Text>
                <TextInput 
                    style ={styles.input} 
                    multiline
                    placeholder = {'ex. Fishing\nex. Archery'}
                    placeholderTextColor= 'gray' 
                    onChangeText={(val) => setInterests(val.split(/\r?\n/))}/>
                <Text style = {styles.text}>Paste the link to your profile picture:</Text>
                <TextInput 
                    style ={styles.input} 
                    multiline
                    placeholder = {'ex. imgur'}
                    placeholderTextColor= 'gray' />
                <Button style ={styles.buttonStyle}
                        title='Submit'
                        color = 'white'
                        onPress={() => {buttonClick()}}
                        ></Button>
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
        padding: 8,
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
})