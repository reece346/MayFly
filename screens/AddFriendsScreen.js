import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import { useState } from 'react';
import {FlatList,Image,StyleSheet,Text,View,TouchableOpacity, TextInput, Button, SafeAreaView} from 'react-native';

const suggestedFriendsDATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Reece Peters',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Bea Dyar',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Miller Kershaw',
    },
];

const pendingFriendsDATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Ronan Stewart',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'John Smith',
    },
];

const Item = ({ title }) => (
    <View style={styles.ProfileCards}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const AddFriendsScreen = () => {

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const renderItem = ({ item }) => (
        <Item title={item.title} />
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
                        placeholder={'Username'}
                        placeholderTextColor={'#666'}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress= {toggleModal} style={{flexDirection: 'row', alignSelf: 'center', }}>
                    <View style={styles.AddButton}>
                        <Text style={{color: 'white', top: 4}}>Search</Text>
                    </View>
                </TouchableOpacity>
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
        backgroundColor: '#ffffff',
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
        left: '25%',
        fontWeight: 'bold',
        fontSize: 20,
    }
})


export default AddFriendsScreen;