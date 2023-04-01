import { StatusBar } from 'expo-status-bar';
import { getUserByID , getUserByPhoneNumber, getUserByUsername} from '../firebaseConfig';
import React from 'react';
import { useState, useEffect } from 'react';
import {FlatList,Image,StyleSheet,Text,View,TouchableOpacity, TextInput, Button, Alert} from 'react-native';
import * as RootNavigation from '../RootNavigation';
import { getActiveUser } from './LoginScreen';
import User from '../user';

const friendsDATA = [];

const FriendScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const [textInput, setTextInput] = useState('');

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    buttonClick = async() =>{
        //check if text input is valid
        let tempUser;
        //i is set to 1 because of friendIDs layout in database???
        for(let i = 1; i < getActiveUser().friendIDs.length; i++){
            tempUser = await getUserByID(getActiveUser().friendIDs[i]);
            if(textInput == ""){
                Alert.alert("Input required");
                break;
            }
            if(tempUser.phoneNumber == textInput){
                for(let j = 0; j < friendsDATA.length; j++){
                    if(friendsDATA[j].id == tempUser.userID){
                        let temp = friendsDATA[0];
                        friendsDATA[0] = friendsDATA[j];
                        friendsDATA[j] = temp;
                        break;
                    }
                }
                toggleModal();
                break;
            }
            else if(tempUser.username == textInput){
                for(let j = 0; j < friendsDATA.length; j++){
                    let temp = await getUserByID(friendsDATA[j].id)
                    if (temp.username == textInput){
                        temp = friendsDATA[0];
                        friendsDATA[0] = friendsDATA[j];
                        friendsDATA[j] = temp;
                        break;
                    }
                }
                toggleModal();
                break;
            }
            else{
                if(i == getActiveUser().friendIDs.length-1){
                    Alert.alert("Friend not found");
                } 
                continue;
            }
        }
    }
    
    var currUser;
    let duplicate;
    for(let i = 0; i < getActiveUser().friendIDs.length; i++){
        duplicate = false;
        getUserByID(getActiveUser().friendIDs[i]).then(user => {
        currUser = user;
        for(let j = 0; j < friendsDATA.length; j++){
            if(currUser.userID == friendsDATA[j].id){
                duplicate = true;
            }
        }
        if(!duplicate){
            friendsDATA.push({id: currUser.userID, name: currUser.displayName, desc: currUser.interests}); 
            toggleModal();
        }});
    }    
    
    const renderItem = ({ item }) => (
        //<TouchableOpacity onPress={() => {RootNavigation.navigate("Profile")}}>
            <View style={styles.ProfileCards}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitles}>{item.desc}</Text>
            </View>
        //</TouchableOpacity>
    );
    //friendsDATA.push({id: currUser.userID, name: currUser.displayName, desc: 'dunno'});
    
    return (
        <View style={styles.container}>
            <View style={styles.SearchFriendsSection}>
                <View style={styles.SearchFriendHeader}>
                    <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                        Search Users
                    </Text>
                    <View style={{ position: 'absolute', marginVertical: 30, width: '100%'}}>
                        <TextInput style={{
                            borderRadius: 10,
                            margin: 10,
                            color: '#000',
                            borderColor: '#666',
                            backgroundColor: '#FFF',
                            borderWidth: 1,
                            height: 45,
                            paddingHorizontal: 10,
                            fontSize: 18,
                        }}
                        placeholder={'Username or Phone Number'}
                        placeholderTextColor={'#666'}
                        onChangeText={(val) => setTextInput(val)}
                        clearButtonMode='always'
                        />
                    </View>
                </View>
                <View style={styles.AddButton}>
                    <TouchableOpacity onPress= {() => buttonClick()} style={{flexDirection: 'row', alignSelf: 'center', }}>
                        <Text style={{color: 'white'}}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.allFriendsSection}>
                <View style={styles.allFriendsHeader}>
                    <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                        All Friends
                    </Text>
                </View>
                    <FlatList
                        data={friendsDATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        extraData = {modalVisible}
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: '#3A3B50'
    },
    SearchFriendsSection : {
        top: 20,
        marginHorizontal: 30
    },
    SearchFriendHeader : {
        flexDirection: 'row'
    },
    allFriendsSection : {
        top: 80,
        left: 30
    },
    allFriendsHeader : {
        flexDirection: 'row'
    },
    ProfileCards : {
        backgroundColor: '#EAEAEA',
        top: 10,
        height: 75,
        width: 352,
        padding: 10,
        marginVertical: 8,
    },
    AddButton : {
        marginVertical: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#5D5F82',
        borderRadius: 5,
        height: 25,
        width: 75,
        flexDirection: 'row',
        top: 40
    },
    title : {
        left: '20%',
        fontWeight: 'bold',
        fontSize: 20,
    },
    subtitles : {
        left: '20%',
        marginVertical: 5,
        fontSize: 15
    }
})

export default FriendScreen;
