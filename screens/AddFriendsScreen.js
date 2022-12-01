import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Image,StyleSheet,Text,View,TouchableOpacity, TextInput, Button} from 'react-native';

export default function AddFriendsScreen(){
    
    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <View style={styles.container}>
            <View style={styles.SearchFriendHeader}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                    Search Users
                </Text>
            </View>
            <View style={{ position: 'absolute', top: 75, width: '90%'}}>
                <TextInput style={{
                        left: 20,
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
            <TouchableOpacity onPress={toggleModal} style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                <View style={styles.AddButton}>
                    <Text style={{color: 'white', top: 4}}>Search</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.SuggestedFriendsHeader}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                    Suggested Friends
                </Text>
            </View>
            <View style={styles.PendingFriendsHeader}>
                <Text style={{fontSize: 25, color: 'white', fontWeight: '600'}}>
                    Pending Friends
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: '#3A3B50'
    },
    SearchFriendHeader : {
        top: 20,
        left: 30,
        flexDirection: 'row',
    },
    SuggestedFriendsHeader : {
        top: 115,
        left: 30,
        flexDirection: 'row'
        
    },
    AddButton : {
        top: 100,
        justifyContent: 'center',
        alignContent: 'center',
        margin: 10,
        backgroundColor: '#5D5F82',
        borderRadius: 5,
        height: 25,
        width: 75,
        flexDirection: 'row'
    },
    PendingFriendsHeader : {
        top: 350,
        left: 30,
        flexDirection: 'row'
        
    }
})