import { StatusBar } from 'expo-status-bar';
import { getUserByID , getUserByPhoneNumber, getUserByUsername} from '../firebaseConfig';
import React from 'react';
import { useState, useEffect } from 'react';
import {FlatList,Image,StyleSheet,Text,View,TouchableOpacity, TextInput, Button, Alert} from 'react-native';
import * as RootNavigation from '../RootNavigation';
import { getActiveUser, updateActiveUser } from './LoginScreen';
import User from '../user';
import { updateUser } from '../firebaseConfig';
import { hydrate } from 'react-dom';



const FriendScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [friendsDATA, setFriendsDATA] = useState([])
    const [textInput, setTextInput] = useState('');

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const [phoneNum, setPhoneNum] = useState('')

    addFriend = async() =>{
        //get user by phone number, update active user to have that friend id
        //if left blank, already a friend, or same as active user
        if(phoneNum == "")
            return Alert.alert("Input required");
        if(phoneNum == getActiveUser().phoneNumber){
            return Alert.alert("Invalid input");
        }
        for(let i = 0; i < getActiveUser().friendIDs.length; i++){
            if(getActiveUser().friendIDs[i] == phoneNum){
                return Alert.alert("Already a friend");
            } 
        }
        let temp = new User();
        temp = await getUserByPhoneNumber(phoneNum);
        if(typeof temp.userID == 'undefined'){
            return Alert.alert("User not found");
        }
        let friend = temp.userID;
        temp = getActiveUser();
        temp.friendIDs.push(friend);
        console.log('temp is: ', temp)
        updateActiveUser(temp);
        await updateUser(temp).then(Alert.alert("Friend added")).then(navigation.replace('Friends'));  
    }
    
    useEffect(()=>{

        getActiveUser().friendIDs.map(async(ID)=>{
            await getUserByID(ID).then( user => {
                if(user){
                    setFriendsDATA(friendsDATA => [{id: user.userID, name: user.displayName, desc : user.interests.join(', ')}, ...friendsDATA])
                }
            })
        })

    },[getActiveUser.friendIDs])   
    
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
                        onChangeText={(val) => setPhoneNum(val)}
                        keyboardType='number-pad'
                        maxLength={10}
                        clearButtonMode='always'
                        />
                    </View>
                </View>
                <View style={styles.AddButton}>
                    <TouchableOpacity onPress= {() => addFriend()} style={{flexDirection: 'row', alignSelf: 'center', }}>
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