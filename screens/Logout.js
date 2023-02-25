import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet,Text,ScrollView,View,TextInput,Button, Alert} from 'react-native';
import * as RootNavigation from '../RootNavigation';
import User from '../user';
import {createUser} from '../firebaseConfig';
import { setUser } from './ProfileScreen';

export default function LogOutScreen(){
    const [phoneNum, setPhoneNum] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [userName, setUserName] = useState('');
    const [interests, setInterests] = useState([]);

    buttonClick = () => {
        if(userName!= "" && phoneNum!= "" && interests != ""){
            let thisUser = new User(userName, 0, null, phoneNum, interests, null)
            createUser(thisUser);
            RootNavigation.navigate("HomeScreen");
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
                        keyboardType = 'number-pad'
                        maxLength={11}/>

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

                    <Button style ={styles.buttonStyle}
                            title='Submit'
                            testID='submitButton'
                            color = 'white'
                            onPress={() => {buttonClick()}}>

                    </Button>
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
    subtext : {
        color: 'white',
        alignSelf: 'center',
        margin: 0,
        fontSize: 12
    }
})
