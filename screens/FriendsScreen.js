import { StatusBar } from 'expo-status-bar';
import { getUserByID, getUserByPhoneNumber } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, push, onChildAdded } from 'firebase/database';
import React from 'react';
import { useState } from 'react';
import {FlatList,Image,StyleSheet,Text,View,TouchableOpacity, TextInput, Button} from 'react-native';
import * as RootNavigation from '../RootNavigation';
import { getActiveUser } from './LoginScreen';


export default function FriendScreen() {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: 'AIzaSyBc4K_VsAO60P-Gmqg8x9B9e2oJ4R-ECdQ',
        authDomain: 'odyssey-490.firebaseapp.com',
        databaseURL: 'https://odyssey-490-default-rtdb.firebaseio.com/',
        projectId: 'odyssey-490',
        storageBucket: 'odyssey-490.appspot.com',
        messagingSenderId: '747613227593',
        appId: '1:747613227593:web:5ea3e82de1cdc0470b8d98'
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [friendsList, setFriendsList] = useState([]);

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const myUserID = getUserByPhoneNumber(getActiveUser().phoneNumber)
  
    const friendsRef = ref(database, `users/${myUserID}/friendIDs`)

    useEffect(() => {
        onChildAdded(friendsRef, (snapshot) => {
            const data = snapshot.val();
            setFriendsList((friendsList)=>[data, ...friendsList])
        })
    },[])

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }
    // var currUser;
    // let duplicate;
    // for(let i = 0; i < getActiveUser().friendIDs.length; i++){
    //     duplicate = false;
    //     getUserByID(getActiveUser().friendIDs[i]).then(user => {
    //     currUser = user
    //     for(let j = 0; j < friendsDATA.length; j++){
    //         if(currUser.userID == friendsDATA[j].id){
    //             duplicate = true;
    //         }
    //     }
    //     if(!duplicate){
    //         friendsDATA.push({id: currUser.userID, name: currUser.displayName, desc: currUser.interests});   
    //     }
    // });}

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
                        placeholder={'Username'}
                        placeholderTextColor={'#666'}
                        />
                    </View>
                </View>
                <View style={styles.AddButton}>
                    <TouchableOpacity onPress= {toggleModal} style={{flexDirection: 'row', alignSelf: 'center', }}>
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
