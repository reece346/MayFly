import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import {FlatList,Image,StyleSheet,Text,View,TouchableOpacity, TextInput, Button, SafeAreaView, Alert} from 'react-native';
import { getUserByID, getUserByPhoneNumber, updateUser } from '../firebaseConfig';
import User from '../user';
import { getActiveUser, updateActiveUser} from './LoginScreen';
//import * as RootNavigation from '../RootNavigation';

const suggestedFriendsDATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'Reece Peters',
        desc: '4 Mutual Friends'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Bea Dyar',
        desc: '2 Mutual Friends'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: 'Miller Kershaw',
        desc: '3 Mutual Friends'
    },
];

const pendingFriendsDATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'Ronan Stewart',
        desc: 'Request Sent: Nov 14 2022' 
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'John Smith',
        desc: 'Request Sent: Oct 20 2022' 
    },
];

const AddFriendsScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const [phoneNum, setPhoneNum] = useState('');
    
    buttonClick = async() =>{
        //get user by phone number, update active user to have that friend id
        //if left blank, already a friend, or same as active user
        if(phoneNum == "")
            return Alert.alert("Input required");
        if(phoneNum == getActiveUser().phoneNumber){
            return Alert.alert("Invalid input");
        }
        let temp = new User();
        temp = await getUserByPhoneNumber(phoneNum);
        let friend = temp.userID;
        temp = getActiveUser();
        temp.friendIDs.push(friend);
        updateActiveUser(temp);
        //update user firebase isnt working here
        await updateUser(temp);
        return Alert.alert("Friend added");
    }
    
    const renderItem = ({ item }) => (
        //<TouchableOpacity onPress={() => RootNavigation.navigate("Profile")}>
            <View style={styles.ProfileCards}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitles}>{item.desc}</Text>
            </View>
        //</TouchableOpacity>
    );
    

    return (
        <SafeAreaView style={styles.container}>
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
                        placeholder={'Phone Number'}
                        placeholderTextColor={'#666'}
                        onChangeText={(val) => setPhoneNum(val)}
                        keyboardType = 'number-pad'
                        maxLength={11}
                        clearButtonMode='always'
                        />
                    </View>
                </View>
                <View style={styles.AddButton}>
                    <TouchableOpacity onPress={() => buttonClick()} style={{flexDirection: 'row', alignSelf: 'center', }}>
                        <Text style={{color: 'white'}}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.SuggestedFriendsSection}>
                <View style={styles.SuggestedFriendsHeader}>
                    <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                        Suggested Friends
                    </Text>
                </View>
                <FlatList
                    data={suggestedFriendsDATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>

            <View style={styles.PendingFriendsSection}>
                <View style={styles.PendingFriendsHeader}>
                    <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                        Pending Friends
                    </Text>
                </View> 
                <FlatList
                    data={pendingFriendsDATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: '#3A3B50',
        marginTop: StatusBar.currentHeight || 0,
    },
    SearchFriendsSection : {
        top: 20,
        marginHorizontal: 30
    },
    SearchFriendHeader : {
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
    SuggestedFriendsSection : {
        marginVertical: 60,
        left: 30
    },
    SuggestedFriendsHeader : {
        flexDirection: 'row'
    },
    AddButton : {
        marginVertical: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        backgroundColor: '#5D5F82',
        borderRadius: 5,
        height: 25,
        width: 75,
        flexDirection: 'row',
        top: 40
    },
    PendingFriendsSection : {
        marginVertical: 0,
        left: 30
    },
    PendingFriendsHeader : {
        flexDirection: 'row'
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



export default AddFriendsScreen;